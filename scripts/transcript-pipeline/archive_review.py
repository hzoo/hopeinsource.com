"""Build the private, passage-only review queue from contextual archive reviews."""
import argparse
from collections import Counter
from difflib import SequenceMatcher
import hashlib
import html
import json
from pathlib import Path
import re
from urllib.parse import unquote

from pipeline import norm

ROOT = Path(__file__).resolve().parents[2]
TURN = re.compile(r'^(?:\[(\d+(?::\d+){1,2})\]\s+)?\*\*([^*]+)\*\*:?[ \t]*(.*)$')


def seconds(stamp):
    result = 0
    for part in stamp.split(':'):
        result = result * 60 + int(part)
    return result


def plain(text):
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.I)
    text = re.sub(r'<[^>]*>', '', text)
    text = re.sub(r'!?\[([^]]+)\]\([^)]*\)', r'\1', text)
    return html.unescape(text).strip()


def turns(text):
    body = re.sub(r'\A---\s*\n.*?\n---\s*\n', '', text, count=1, flags=re.S)
    counts = Counter()
    result = []
    first_line = text[:len(text) - len(body)].count('\n') + 1
    for line_number, line in enumerate(body.splitlines(), first_line):
        m = TURN.match(line)
        if not m:
            untitled = re.match(r'^\[(\d+(?::\d+){1,2})\]\s*(.*)$', line)
            if untitled:
                stamp, content = untitled.groups()
                start = seconds(stamp)
                aliases = re.findall(r'\bid=["\']([^"\']+)', content)
                result.append({'timestamp': stamp, 'start': start, 'speaker': 'Unconfirmed',
                               'text': plain(content), 'source_line': line,
                               'anchor': aliases[0] if aliases else f'msg-{start}',
                               'aliases': aliases, 'unlabeled': True, 'line_number': line_number})
            continue
        stamp, speaker, content = m.groups()
        if stamp and not re.fullmatch(r'\d{1,2}:\d{2}(?::\d{2})?', stamp):
            # The renderer does not recognize malformed timing. Anchor the question
            # to its preceding canonical passage and use a neighboring audio window.
            previous = next((t for t in reversed(result) if t['start'] is not None), None)
            result.append({'timestamp': None, 'source_timestamp': stamp, 'timing_invalid': True,
                           'start': None, 'speaker': speaker.rstrip(':').strip(),
                           'text': plain(content), 'source_line': line, 'line_number': line_number,
                           'anchor': previous['anchor'] if previous else 'msg-0',
                           'aliases': re.findall(r'\bid=["\']([^"\']+)', content)})
            continue
        start = seconds(stamp) if stamp else None
        anchor_second = start or 0
        counts[anchor_second] += 1
        anchor = f'msg-{anchor_second}' + (f'-{counts[anchor_second]}' if counts[anchor_second] > 1 else '')
        result.append({'timestamp': stamp, 'start': start, 'speaker': speaker.rstrip(':').strip(),
                       'text': plain(content), 'source_line': line, 'anchor': anchor,
                       'aliases': re.findall(r'\bid=["\']([^"\']+)', content), 'line_number': line_number})
    return result


def metadata(text, key):
    front = text.split('---', 2)[1]
    m = re.search(r'^' + re.escape(key) + r':\s*(.+)$', front, re.M)
    return m[1].strip().strip('"\'') if m else ''


def matched_word_clip(pilot, turn, quote):
    """Use actual raw word times only for an exact, unique reading-turn match."""
    if not pilot or turn['start'] is None:
        return None
    candidates = [t for t in pilot['reading'] if t['speaker'] == turn['speaker']
                  and int(t['start']) == turn['start'] and norm(t['text']) == norm(turn['text'])]
    at = turn['text'].lower().find(quote.lower())
    if len(candidates) != 1 or at < 0 or turn['text'].lower().find(quote.lower(), at + 1) >= 0:
        return None
    words = {w['id']: w for w in pilot['words']}
    raw_tokens, timed = [], []
    for wid in candidates[0]['word_ids']:
        for token in norm(words[wid]['text']):
            raw_tokens.append(token)
            timed.append(words[wid])
    reading = norm(turn['text'])
    mapping = {}
    for block in SequenceMatcher(None, reading, raw_tokens, autojunk=False).get_matching_blocks():
        mapping.update({block.a + k: block.b + k for k in range(block.size)})
    first, length = len(norm(turn['text'][:at])), len(norm(quote))
    selected = list(range(first, first + length))
    if not selected or len(mapping) / max(1, len(reading)) < .8 or any(i not in mapping for i in selected):
        return None
    return max(0, timed[mapping[selected[0]]]['start'] - 2), timed[mapping[selected[-1]]]['end'] + 2


def retained_quote(report, turn, quote):
    for edit in report.get('edits', []):
        if edit['after'] != turn['source_line']:
            continue
        before = TURN.match(edit['before'])
        old = plain(before[3]) if before else ''
        at = old.lower().find(quote.lower())
        if at < 0 or old.lower().find(quote.lower(), at + 1) >= 0:
            continue
        positions = []
        for block in SequenceMatcher(None, old.lower(), turn['text'].lower(), autojunk=False).get_matching_blocks():
            for offset in range(block.size):
                if at <= block.a + offset < at + len(quote):
                    positions.append(block.b + offset)
        if positions:
            return turn['text'][min(positions):max(positions) + 1].strip()
    return None


def assemble(directory):
    items = []
    episodes = []
    unresolved = []
    seen = set()
    reviewed = directory / 'reviewed'
    report_paths = reviewed.glob('*.json') if reviewed.exists() else directory.glob('batch-*/*.json')
    for report_path in sorted(report_paths):
        report = json.loads(report_path.read_text())
        source = ROOT / report['path']
        text = source.read_text()
        sha = hashlib.sha256(source.read_bytes()).hexdigest()
        slug = source.stem
        episode_turns = turns(text)
        title = metadata(text, 'title')
        link = metadata(text, 'episodeLink')
        nested = re.search(r'/((?:https?%3A|https?://).+)$', link, re.I)
        audio = unquote(nested[1]) if nested else link
        local = ROOT / 'experiments/transcript-pilot' / slug / 'input-0.mp3'
        pilot_path = local.parent / 'episode.json'
        pilot = json.loads(pilot_path.read_text()) if slug in {'walk', 'play'} and pilot_path.exists() else None
        if local.exists():
            media = directory / 'media'
            media.mkdir(exist_ok=True)
            dest = media / (slug + '.mp3')
            if not dest.exists():
                dest.symlink_to(local)
            audio = '/media/' + slug + '.mp3'
        episodes.append({'id': slug, 'title': title, 'url': 'http://127.0.0.1:8790/' + slug + '/',
                         'date': metadata(text, 'date'),
                         'speakers': list(dict.fromkeys(t['speaker'] for t in episode_turns))})
        for issue in report.get('issues', []):
            quote = issue.get('quote', '').strip()
            stamp = issue.get('timestamp')
            anchor = issue.get('anchor', '')
            candidates = [(i, t) for i, t in enumerate(episode_turns)
                          if issue.get('source_line') == t['line_number']]
            if not candidates and anchor:
                candidates = [(i, t) for i, t in enumerate(episode_turns)
                              if anchor in [t['anchor']] + t['aliases']]
            if not candidates and stamp:
                candidates = [(i, t) for i, t in enumerate(episode_turns)
                              if t['timestamp'] == stamp or t.get('source_timestamp') == stamp]
            if not candidates and quote:
                candidates = [(i, t) for i, t in enumerate(episode_turns) if quote.lower() in t['text'].lower()]
            if not candidates:
                unresolved.append({'path': report['path'], 'issue': issue, 'reason': 'No matching source passage'})
                continue
            index, turn = next(((i, t) for i, t in candidates if quote.lower() in t['text'].lower()), candidates[0])
            if not turn['text']:
                continue
            suggestion = re.sub(r'\[([^\[\]]+)\?\]', r'\1', issue.get('suggestion', '') or '')
            if not quote or quote.lower() not in turn['text'].lower():
                quote = retained_quote(report, turn, quote) or turn['text']
                # A phrase-sized candidate must never replace a whole turn after cleanup.
                suggestion = ''
            key = (slug, turn['anchor'], quote.lower())
            if key in seen:
                continue
            seen.add(key)
            start = turn['start']
            next_start = next((t['start'] for t in episode_turns[index + 1:]
                               if t['start'] is not None and start is not None and t['start'] > start), None)
            clip_start = max(0, start - 3) if start is not None else 0
            clip_end = next_start + 3 if next_start is not None else (start + 25 if start is not None else None)
            neighboring_time = False
            if turn.get('timing_invalid'):
                previous_start = next((t['start'] for t in reversed(episode_turns[:index]) if t['start'] is not None), None)
                following_start = next((t['start'] for t in episode_turns[index + 1:] if t['start'] is not None), None)
                if previous_start is not None and following_start is not None:
                    clip_start, clip_end = max(0, previous_start - 3), following_start + 3
                    neighboring_time = True
            if start is not None:
                clip_start = min(clip_start, float(issue.get('clip_start', clip_start) or clip_start))
                clip_end = max(clip_end, float(issue.get('clip_end', clip_end) or clip_end))
            word_clip = matched_word_clip(pilot, turn, quote)
            if word_clip:
                clip_start, clip_end = word_clip
            item = {'episode': slug, 'title': title, 'path': report['path'], 'source_sha256': sha,
                    'anchor': turn['anchor'], 'timestamp': turn['timestamp'], 'speaker': turn['speaker'],
                    'original': turn['text'], 'source_line': turn['source_line'], 'quote': quote,
                    'suggestion': suggestion, 'note': issue.get('note', ''),
                    'audio': audio, 'clip_start': clip_start, 'clip_end': clip_end,
                    'clip_timing': 'matched_raw_words' if word_clip else ('neighbor_window' if neighboring_time else ('turn' if start is not None else 'untimed')),
                    'before': episode_turns[index - 1]['text'] if index else '',
                    'after': episode_turns[index + 1]['text'] if index + 1 < len(episode_turns) else ''}
            item['id'] = slug + '-' + turn['anchor'] + '-' + hashlib.sha256(quote.encode()).hexdigest()[:8]
            item['revision'] = hashlib.sha256(json.dumps(item, sort_keys=True).encode()).hexdigest()[:16]
            items.append(item)
    # Keep the recording's order so consecutive reviews retain conversational context.
    episodes.sort(key=lambda e: e['date'], reverse=True)
    episode_order = {e['id']: i for i, e in enumerate(episodes)}
    items.sort(key=lambda i: (episode_order[i['episode']], i['clip_start']))
    data = {'episodes': episodes, 'items': items}
    (directory / 'review.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    (directory / 'unmatched-issues.json').write_text(json.dumps(unresolved, ensure_ascii=False, indent=2) + '\n')
    (directory / 'index.html').write_text(Path(__file__).with_name('archive-review.html').read_text())
    return {'episodes': len(episodes), 'passages': len(items), 'unmatched': len(unresolved)}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    args = parser.parse_args()
    print(json.dumps(assemble(args.directory)))
