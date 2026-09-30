"""Apply explicitly reviewed dialogue deletions; never generate automatic edits.

Usage: python3 cleanup_archive.py reviewed-edits.json [--apply]
Each edit contains path (relative to repository), before, after, and reason.
Dry-run is the default. All files are validated before any writes.
"""
import argparse
import json
from pathlib import Path
import re

from pipeline import is_subtractive, norm

ROOT = Path(__file__).resolve().parents[2]
DIALOGUE = re.compile(r'^((?:\[\d+(?::\d+){1,2}(?:\.\d+)?\]\s+)?\*\*[^*]+\*\*:?)\s*(.*)$')


def validate_edit(before, after):
    a, b = DIALOGUE.fullmatch(before), DIALOGUE.fullmatch(after)
    if not a or not b or a[1] != b[1]:
        raise ValueError('Only dialogue text may change; retain speaker and timestamp')
    if not is_subtractive(a[2], b[2]):
        raise ValueError('Do not add/reorder spoken words')
    if not re.sub(r'<[^>]*>', '', b[2]).strip():
        filler = {'uh', 'um', 'yeah', 'yep', 'yup', 'okay', 'ok', 'oh', 'mm', 'mhm',
                  'hmm', 'right', 'cool', 'nice', 'sure', 'well', 'so', 'like', 'and',
                  'all', 'alright'}
        if set(norm(re.sub(r'<[^>]*>', '', a[2]))) - filler:
            raise ValueError('Whole-turn deletion must contain only reviewed filler')
    # Linked references and formatting anchors must survive verbatim.
    links = r'!?\[[^\]]*\]\([^)]*\)|<[^>]+>'
    if re.findall(links, before) != re.findall(links, after):
        raise ValueError('Preserve links and embedded markup')


def prepare(edits, root=ROOT):
    originals, updated = {}, {}
    allowed = (root / 'src/content/podcast').resolve()
    for edit in edits:
        path = (root / edit['path']).resolve()
        if not path.is_relative_to(allowed) or path.suffix != '.md':
            raise ValueError('Edit must target a podcast Markdown file')
        if not edit.get('reason', '').strip():
            raise ValueError('Each edit needs an editorial reason')
        validate_edit(edit['before'], edit['after'])
        if path not in originals:
            # Path.read_text normalizes CRLF; preserve the source bytes' endings.
            originals[path] = path.read_bytes().decode('utf-8')
            updated[path] = originals[path].splitlines(keepends=True)
        matches = [i for i, line in enumerate(updated[path])
                   if line.rstrip('\r\n') == edit['before']]
        if len(matches) != 1:
            raise ValueError(f'Stale or ambiguous passage in {path}')
        i = matches[0]
        ending = updated[path][i][len(edit['before']):]
        updated[path][i] = edit['after'] + ending
    return {path: ''.join(lines) for path, lines in updated.items()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('edits', type=Path)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    edits = json.loads(args.edits.read_text())
    outputs = prepare(edits)
    if args.apply:
        for path, content in outputs.items():
            path.write_bytes(content.encode('utf-8'))
    print(f'{"Applied" if args.apply else "Validated"} {len(edits)} reviewed edits in {len(outputs)} episodes')


if __name__ == '__main__':
    main()
