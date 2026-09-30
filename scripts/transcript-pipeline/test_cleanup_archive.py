import unittest
import tempfile
from pathlib import Path
from cleanup_archive import validate_edit, prepare


class ArchiveContracts(unittest.TestCase):
    def test_reviewed_empty_filler_retains_source_prefix_and_aliases(self):
        validate_edit('[00:02] **Henry:** <span id="msg-2.4"></span>Yeah, um.',
                      '[00:02] **Henry:** <span id="msg-2.4"></span>')
        validate_edit('**Henry:** Um, um.', '**Henry:**')
        with self.assertRaises(ValueError):
            validate_edit('[00:02] **Henry:** <span id="msg-2.4"></span>Yeah.',
                          '[00:02] **Henry:**')

    def test_preserves_metadata_line_endings_and_rejects_stale_edits(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            path = root / 'src/content/podcast/example.md'
            path.parent.mkdir(parents=True)
            before = '[00:01] **A:** And, and maybe.'
            after = '[00:01] **A:** And maybe.'
            source = f'---\r\ntitle: Original\r\n---\r\n\r\n{before}\r\n'
            path.write_bytes(source.encode())
            edits = [dict(path=str(path.relative_to(root)), before=before,
                          after=after, reason='Reviewed restart')]
            result = prepare(edits, root)
            self.assertEqual(result[path], source.replace(before, after))
            self.assertEqual(path.read_bytes(), source.encode())
            path.write_bytes(result[path].encode())
            with self.assertRaises(ValueError):
                prepare(edits, root)

    def test_preserves_speaker_timestamp_and_passage(self):
        before = '[01:02:03] **Henry:** And, and maybe we can.'
        validate_edit(before, '[01:02:03] **Henry:** And maybe we can.')
        for after in ['[01:02:04] **Henry:** And maybe we can.',
                      '[01:02:03] **Guest:** And maybe we can.',
                      '[01:02:03] **Henry:** ',
                      'title: A new title']:
            with self.assertRaises(ValueError):
                validate_edit(before, after)

    def test_rejects_rewriting_and_lost_reference(self):
        for before, after in [
            ('[00:01] **A:** Maybe we can.', '[00:01] **A:** We should.'),
            ('[00:01] **A:** We can.', '[00:01] **A:** Can we.'),
            ('[00:01] **A:** Read [this](https://example.com).',
             '[00:01] **A:** Read this.')]:
            with self.assertRaises(ValueError):
                validate_edit(before, after)
