"""Export an assembled reading draft into an existing episode's Markdown body."""
import argparse
from collections import Counter
import hashlib
import html
import json
import math
from pathlib import Path
import re


def export(episode, destination):
    source = episode / 'episode.json'
    data = json.loads(source.read_text())
    original = destination.read_text()
    frontmatter = re.match(r'\A---\n.*?\n---(?:\n|$)', original, re.S)
    if not frontmatter:
        raise ValueError('Destination needs existing episode frontmatter')
    visible = [t for t in data['reading'] if t['text'].strip()]
    headings = {h['turn_id']: h['text'] for h in data['editorial'].get('headings', [])}
    counts = Counter()
    generated = {}
    for t in visible:
        second = math.floor(t['start'])
        counts[second] += 1
        generated[t['id']] = f'msg-{second}' + (f'-{counts[second]}' if counts[second] > 1 else '')
    owners = {anchor: tid for tid, anchor in generated.items()}
    emitted = set(owners)
    unresolved = any(re.match(r'^(?:Speaker\s+(?:\d+|unknown)\b|Unconfirmed\b)', t['speaker'], re.I) for t in visible)
    note = 'Draft transcript.' + (' Some speaker labels remain unconfirmed.' if unresolved else '')
    lines = [frontmatter[0].rstrip(), '', '> ' + note, '']
    for t in visible:
        if t['id'] in headings:
            lines += ['#### ' + headings[t['id']], '']
        aliases = list(dict.fromkeys([t['anchor']] + t.get('alias_anchors', []) + t.get('reading_alias_anchors', [])))
        spans = []
        for anchor in aliases:
            if anchor in owners and owners[anchor] != t['id']:
                raise ValueError(f'Canonical anchor collides with another passage: {anchor}')
            if anchor not in emitted:
                spans.append(f'<span id="{html.escape(anchor, quote=True)}"></span>')
                emitted.add(anchor)
        second = math.floor(t['start'])
        stamp = f'{second // 3600:02}:{second // 60 % 60:02}:{second % 60:02}'
        text = t['text'].replace('\n\n', '<br /><br />')
        lines += [f'[{stamp}] **{t["speaker"]}:** {"".join(spans)}{text}', '']
    required = {t['anchor'] for t in data['raw']}
    if not required.issubset(emitted):
        raise ValueError('Reading export would lose canonical source anchors')
    destination.write_text('\n'.join(lines))
    ledger = {'source': 'episode.json', 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
              'destination': str(destination), 'destination_sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
              'state': data['state'], 'visible_turns': len(visible), 'headings': len(headings),
              'canonical_anchors_preserved': len(required), 'unconfirmed_speakers': unresolved}
    (episode / 'site-preview.json').write_text(json.dumps(ledger, indent=2) + '\n')
    return ledger


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('episode', type=Path)
    parser.add_argument('destination', type=Path)
    args = parser.parse_args()
    print(json.dumps(export(args.episode, args.destination)))
