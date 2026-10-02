"""Exports preserve source metadata and canonical links before writing a draft."""
import json
from pathlib import Path
import tempfile
import unittest

from export_site import export


class SiteExportContracts(unittest.TestCase):
    def fixture(self, root, reading, raw):
        episode = root / 'pilot'
        episode.mkdir()
        (episode / 'episode.json').write_text(json.dumps({
            'state': 'review_draft', 'reading': reading, 'raw': raw,
            'editorial': {'headings': []}}))
        source = root / 'episode.md'
        source.write_bytes(b'---\r\ntitle: "Original title"\r\ndescription: Original description\r\n---\r\n\r\nOriginal body.\r\n')
        return episode, source

    def test_preserves_frontmatter_bytes_aliases_and_same_second_occurrences(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            reading = [
                {'id': 'a', 'start': 1.2, 'speaker': 'Henry', 'text': 'First thought.', 'anchor': 'msg-1.2'},
                {'id': 'b', 'start': 1.4, 'speaker': 'Guest', 'text': 'Second thought.',
                 'anchor': 'msg-1.4', 'reading_alias_anchors': ['msg-0.9']},
            ]
            episode, source = self.fixture(root, reading, [{'anchor': t['anchor']} for t in reading] + [{'anchor': 'msg-0.9'}])
            frontmatter = source.read_bytes().split(b'\r\n\r\n', 1)[0] + b'\r\n'
            ledger = export(episode, source)
            output = source.read_bytes()
            self.assertTrue(output.startswith(frontmatter + b'\r\n'))
            self.assertNotIn(b'\n', output.replace(b'\r\n', b''))
            for anchor in ['msg-1.2', 'msg-1.4', 'msg-0.9']:
                self.assertIn(f'id="{anchor}"'.encode(), output)
            self.assertEqual(ledger['canonical_anchors_preserved'], 3)

    def test_lost_or_colliding_anchors_fail_before_writing(self):
        for raw, anchor in [([{'anchor': 'msg-missing'}], 'msg-1.2'), ([{'anchor': 'msg-1'}], 'msg-1')]:
            with self.subTest(anchor=anchor), tempfile.TemporaryDirectory() as folder:
                root = Path(folder)
                reading = [
                    {'id': 'a', 'start': 1.2, 'speaker': 'Henry', 'text': 'First thought.', 'anchor': 'msg-1.2'},
                    {'id': 'b', 'start': 2.4, 'speaker': 'Guest', 'text': 'Second thought.', 'anchor': anchor},
                ]
                episode, source = self.fixture(root, reading, raw)
                original = source.read_bytes()
                with self.assertRaises(ValueError):
                    export(episode, source)
                self.assertEqual(source.read_bytes(), original)
                self.assertFalse((episode / 'site-preview.json').exists())


if __name__ == '__main__':
    unittest.main()
