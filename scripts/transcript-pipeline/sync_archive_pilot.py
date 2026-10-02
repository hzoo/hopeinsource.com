"""Sync vetted archive cleanup into a pilot, without exporting website Markdown.

Usage: python3 sync_archive_pilot.py reviewed-edits.json walk [--apply]
Dry-run is the default. The ledger is a list of path/before/after/reason edits.
The website may contain either the exact before or already-applied after line.
Both editions must match completely after the proposed changes, including
speaker ownership. Ambiguous mappings fail before writes.
"""
import argparse
from collections import defaultdict
import copy
import hashlib
import html
import json
import math
from pathlib import Path
import re
import subprocess
import sys
import unicodedata

from cleanup_archive import validate_edit
from pipeline import apply_edits, preserve_reading_anchors


ROOT = Path(__file__).resolve().parents[2]
LINE = re.compile(r'^\[([\d:.]+)\]\s+\*\*([^*]+):\*\*\s*(.*)$')
ANCHOR = re.compile(r'\bid=["\'](msg-[^"\']+)["\']')
OUTPUTS = ('edits.json', 'episode.json', 'raw.md', 'corrected.md',
           'reading.md', 'index.html', 'editor.html', 'raw-snapshot.json')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def plain(text):
    """Normalize rendering whitespace/markup, not words or punctuation."""
    text = re.sub(r'<br\s*/?>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\[([^\]]+)\]\(<?[^)]+>?\)', r'\1', text)
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFC', text)).strip()


def passage(line):
    match = LINE.fullmatch(line)
    if not match:
        raise ValueError('Pilot sync requires a timestamped dialogue line')
    stamp, speaker, body = match.groups()
    seconds = 0.0
    for part in stamp.split(':'):
        seconds = seconds * 60 + float(part)
    return {'stamp': stamp, 'seconds': seconds, 'speaker': speaker,
            'text': plain(body), 'body': body,
            'aliases': ANCHOR.findall(body)}


def same_time(item, turn):
    # Website exports use whole seconds; decimal source times must match exactly.
    if '.' in item['stamp']:
        return abs(item['seconds'] - turn['start']) < 0.001
    return math.floor(item['seconds']) == math.floor(turn['start'])


def match_turn(item, turns):
    active = [t for t in turns if plain(t['text'])]
    owners = defaultdict(set)
    for turn in active:
        for anchor in ([turn['anchor']] + turn.get('alias_anchors', [])
                       + turn.get('reading_alias_anchors', [])):
            owners[anchor].add(turn['id'])
    known = [owners[a] for a in item['aliases'] if a in owners]
    candidates = set.union(*known) if known else {t['id'] for t in active}
    matches = [t for t in active if t['id'] in candidates
               and t['speaker'] == item['speaker']
               and same_time(item, t) and plain(t['text']) == item['text']]
    if len(matches) != 1:
        raise ValueError(f"Stale or ambiguous pilot passage at {item['stamp']} "
                         f"({item['speaker']}): {len(matches)} exact matches")
    if any(matches[0]['id'] not in owner for owner in known):
        raise ValueError(f"Conflicting canonical aliases at {item['stamp']}")
    return matches[0]


def verify_visible(source, reading):
    """One source passage per visible turn: exact wording, time and ownership."""
    seen = set()
    for line in source.splitlines():
        if not LINE.fullmatch(line):
            continue
        item = passage(line)
        if not item['text']:
            continue  # canonical website anchor remains on this invisible line
        turn = match_turn(item, reading)
        if turn['id'] in seen:
            raise ValueError(f"Two website passages map to {turn['id']}")
        seen.add(turn['id'])
    expected = {t['id'] for t in reading if plain(t['text'])}
    if seen != expected:
        raise ValueError(f'Visible website/pilot coverage differs: {sorted(expected - seen)}')
    return len(seen)


def replay(raw, edits):
    corrected, reading, _ = apply_edits(raw, edits)
    preserve_reading_anchors(reading)
    return corrected, reading


def fingerprint(turns):
    return [(t['id'], t['anchor'], t['speaker'], plain(t['text'])) for t in turns]


def skeleton(turns):
    keys = ('id', 'anchor', 'alias_anchors', 'reading_alias_anchors',
            'source_turn_ids', 'merged_into', 'reading_merged_into')
    return [{key: t[key] for key in keys if key in t} for t in turns]


def prepare(ledger, slug, root=ROOT):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug):
        raise ValueError('Invalid episode slug')
    root = root.resolve()
    pilot = root / 'experiments/transcript-pilot' / slug
    paths = list((root / 'src/content/podcast').rglob(slug + '.md'))
    if len(paths) != 1:
        raise ValueError('Need exactly one canonical website episode')
    source = paths[0]
    watched = [p for p in pilot.rglob('*.json') if p.name not in OUTPUTS]
    watched += [source, pilot / 'edits.json', pilot / 'episode.json']
    hashes = {str(p.relative_to(root)): digest(p) for p in watched}
    original = source.read_bytes().decode('utf-8')
    current = json.loads((pilot / 'episode.json').read_text())
    edits = json.loads((pilot / 'edits.json').read_text())
    raw = json.loads((pilot / 'raw-turns.json').read_text())
    if raw != current['raw']:
        raise ValueError('Frozen raw turns disagree with the assembled pilot')
    _, replayed = replay(raw, edits)
    if fingerprint(replayed) != fingerprint(current['reading']):
        raise ValueError('Assembled pilot is stale relative to edits.json')
    planned = copy.deepcopy(edits)
    entries = defaultdict(list)
    for entry in planned.get('reading', []):
        entries[entry['turn_id']].append(entry)
    mapped, used, virtual_lines = [], set(), original.splitlines(keepends=True)
    relative = str(source.relative_to(root))
    selected = [e for e in ledger if Path(e['path']).stem == slug]
    if not selected:
        raise ValueError(f'Ledger has no edits for {slug}')
    for edit in selected:
        if (root / edit['path']).resolve() != source.resolve():
            raise ValueError('Ledger path is not the canonical episode')
        validate_edit(edit['before'], edit['after'])
        if not edit.get('reason', '').strip():
            raise ValueError('Every vetted edit needs a reason')
        before, after = passage(edit['before']), passage(edit['after'])
        turn = match_turn(before, current['reading'])
        tid = turn['id']
        if tid in used:
            raise ValueError(f'Coalesce ledger edits for {tid} before syncing')
        used.add(tid)
        if len(entries[tid]) > 1:
            raise ValueError(f'Multiple existing reading edits for {tid}; resolve explicitly')
        matches = [i for i, line in enumerate(virtual_lines)
                   if line.rstrip('\r\n') in {edit['before'], edit['after']}]
        if len(matches) != 1:
            raise ValueError(f'Stale or ambiguous website source at {before["stamp"]}')
        index = matches[0]
        line = virtual_lines[index]
        existing = line.rstrip('\r\n')
        virtual_lines[index] = edit['after'] + line[len(existing):]
        entry = entries[tid][0] if entries[tid] else {'turn_id': tid}
        entry['text'] = re.sub(r'<br\s*/?>', '\n\n', after['body'], flags=re.I)
        # Canonical HTML belongs to the website, not to the spoken pilot wording.
        entry['text'] = html.unescape(re.sub(r'<[^>]+>', '', entry['text'])).strip()
        entry.pop('remove', None)
        entry['reason'] = edit['reason']
        if not entries[tid]:
            planned.setdefault('reading', []).append(entry)
            entries[tid].append(entry)
        mapped.append({'turn_id': tid, 'anchor': turn['anchor'],
                       'speaker': turn['speaker'], 'timestamp': before['stamp'],
                       'website_already_applied': existing == edit['after'],
                       'before': turn['text'], 'after': entry['text']})
    _, reading = replay(raw, planned)
    # apply_edits does not recalculate times; canonical episode has timed starts.
    timed = {t['id']: t for t in current['reading']}
    for turn in reading:
        turn['start'], turn['end'] = timed[turn['id']]['start'], timed[turn['id']]['end']
    visible = verify_visible(''.join(virtual_lines), reading)
    # Decision and evidence files are read-only inputs, including any accepted choices.
    for watched_relative, expected in hashes.items():
        if digest(root / watched_relative) != expected:
            raise ValueError(f'Input changed during preflight: {watched_relative}')
    report = {'slug': slug, 'mode': 'dry-run', 'mapped_edits': mapped,
              'visible_turns_verified': visible, 'source': relative,
              'source_sha256': digest(source), 'input_sha256': hashes,
              'verification': 'Exact plain wording, speaker, timestamp and known aliases; '
                              'all visible website passages map one-to-one to pilot reading turns. '
                              'Frozen raw turn IDs/anchors and decision/evidence inputs retained. '
                              'Website Markdown is never exported or written.'}
    return {'root': root, 'pilot': pilot, 'source': source, 'edits': planned,
            'reading': reading, 'report': report}


def apply(plan):
    pilot, root = plan['pilot'], plan['root']
    for relative, expected in plan['report']['input_sha256'].items():
        if digest(root / relative) != expected:
            raise ValueError(f'Input changed since preflight: {relative}')
    snapshots = {name: (pilot / name).read_bytes() if (pilot / name).exists() else None
                 for name in OUTPUTS}
    try:
        (pilot / 'edits.json').write_text(json.dumps(plan['edits'], ensure_ascii=False, indent=2) + '\n')
        command = [sys.executable, str(Path(__file__).with_name('pipeline.py')),
                   'assemble', str(pilot)]
        completed = subprocess.run(command, check=True, capture_output=True, text=True)
        assembled = json.loads((pilot / 'episode.json').read_text())
        if fingerprint(assembled['reading']) != fingerprint(plan['reading']):
            raise ValueError('Assembled reading differs from the verified plan')
        if skeleton(assembled['reading']) != skeleton(plan['reading']):
            raise ValueError('Assembly changed a canonical anchor or merge relationship')
        for turn, expected in zip(assembled['reading'], plan['reading']):
            if turn['start'] != expected['start'] or turn['end'] != expected['end']:
                raise ValueError('Assembly changed a frozen passage time')
        for relative, expected in plan['report']['input_sha256'].items():
            if relative.endswith('/edits.json') or relative.endswith('/episode.json'):
                continue
            if digest(root / relative) != expected:
                raise ValueError(f'Read-only input changed during assembly: {relative}')
        report = copy.deepcopy(plan['report'])
        report['mode'] = 'applied'
        report['source_sha256_after'] = digest(plan['source'])
        report['pilot_sha256_after'] = {name: digest(pilot / name)
                                       for name in OUTPUTS if (pilot / name).exists()}
        report['assemble_stdout'] = completed.stdout.strip()
        return report
    except Exception:
        for name, content in snapshots.items():
            path = pilot / name
            if content is None:
                path.unlink(missing_ok=True)
            else:
                path.write_bytes(content)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('ledger', type=Path)
    parser.add_argument('slug')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    ledger = json.loads(args.ledger.read_text())
    if not isinstance(ledger, list):
        raise ValueError('Ledger must be a list of vetted line edits')
    plan = prepare(ledger, args.slug)
    print(json.dumps(apply(plan) if args.apply else plan['report'], ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
