#!/usr/bin/env python3
"""Read-only transcript integrity preflight. Does not infer or change speech."""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
import re

TURN = re.compile(r'^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s+\*\*([^*]+)\*\*\s*(.*)$', re.M)
IDS = re.compile(r'\bid\s*=\s*[\"\']([^\"\']+)[\"\']')

def seconds(timestamp):
    value = 0
    for part in timestamp.split(':'):
        value = value * 60 + int(part)
    return value

def audit_text(text, path='<memory>', long_turn_words=180):
    body = re.sub(r'\A---\s*\n.*?\n---\s*\n', '', text, count=1, flags=re.S)
    turns = []
    # Blank lines delimit Markdown paragraphs; wrapped lines belong to the turn.
    for paragraph in re.split(r'\n\s*\n', body):
        match = TURN.match(paragraph)
        if not match:
            continue
        timestamp, speaker, first = match.groups()
        content = first + paragraph[match.end():]
        plain = re.sub(r'<[^>]*>', '', content)
        words = re.findall(r"\b\w+(?:['’]\w+)*\b", plain)
        turns.append({'timestamp': timestamp, 'seconds': seconds(timestamp),
                      'speaker': speaker.rstrip(':').strip(), 'text': plain.strip(), 'words': len(words)})
    issues = []
    if not turns:
        issues.append({'kind': 'missing_transcript', 'severity': 'error'})
    seen_passages = defaultdict(list)
    counts = Counter()
    generated = []
    for index, turn in enumerate(turns):
        counts[turn['seconds']] += 1
        occurrence = counts[turn['seconds']]
        anchor = f"msg-{turn['seconds']}" + (f'-{occurrence}' if occurrence > 1 else '')
        generated.append(anchor)
        turn['anchor'] = anchor
        if index and turn['seconds'] < turns[index - 1]['seconds']:
            issues.append({'kind': 'backward_chronology', 'severity': 'error', 'anchor': anchor,
                           'previous_timestamp': turns[index - 1]['timestamp'], 'timestamp': turn['timestamp']})
        # Same words at a different time may be intentional; report for review, never delete.
        key = (turn['speaker'], turn['text'])
        if turn['text']:
            seen_passages[key].append(anchor)
    for (speaker, passage), anchors in seen_passages.items():
        if len(anchors) > 1:
            issues.append({'kind': 'exact_duplicate_passage', 'severity': 'review', 'speaker': speaker,
                           'text': passage, 'anchors': anchors})
    explicit = Counter(IDS.findall(body))
    for anchor, count in explicit.items():
        if count > 1:
            issues.append({'kind': 'duplicate_explicit_id', 'severity': 'error', 'id': anchor, 'count': count})
    collisions = sorted(set(explicit).intersection(generated))
    for anchor in collisions:
        issues.append({'kind': 'explicit_generated_id_collision', 'severity': 'error', 'id': anchor})
    same_second = [{'seconds': value, 'count': count,
                    'anchors': [t['anchor'] for t in turns if t['seconds'] == value]}
                   for value, count in counts.items() if count > 1]
    return {'path': str(path), 'turn_count': len(turns), 'word_count': sum(t['words'] for t in turns),
            'heading_count': len(re.findall(r'^#{1,6}\s+', body, re.M)),
            'long_turns': [{k: t[k] for k in ('anchor', 'timestamp', 'speaker', 'words')}
                           for t in turns if t['words'] > long_turn_words],
            'same_second': same_second, 'generated_ids_unique': len(set(generated)) == len(generated),
            'issues': issues}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('paths', nargs='*', type=Path)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    paths = args.paths or [root / 'src/content/podcast/season-5', root / 'src/content/podcast/season-6']
    files = sorted({file for path in paths for file in (path.rglob('*.md') if path.is_dir() else [path])})
    reports = [audit_text(file.read_text(), file) for file in files]
    result = {'read_only': True, 'episodes': reports,
              'error_count': sum(issue['severity'] == 'error' for report in reports for issue in report['issues'])}
    output = json.dumps(result, indent=2, ensure_ascii=False) + '\n'
    if args.output:
        args.output.write_text(output)
    else:
        print(output, end='')
    return 1 if result['error_count'] else 0

if __name__ == '__main__':
    raise SystemExit(main())
