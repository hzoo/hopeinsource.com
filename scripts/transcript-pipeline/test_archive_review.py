import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from archive_review import turns, matched_word_clip, retained_quote
from archive_review_server import save_decision


class PassageReviewContracts(unittest.TestCase):
    def test_empty_and_untimed_passages_keep_the_renderer_anchor_sequence(self):
        source = '---\ntitle: Test\n---\n\n[00:02] **Henry:** Yeah.\n\n[00:02] **Guest:**\n\n[00:02] **Henry:** A thought.\n\n**Guest:** An untimed thought.'
        result = turns(source)
        self.assertEqual([t['anchor'] for t in result], ['msg-2', 'msg-2-2', 'msg-2-3', 'msg-0'])
        self.assertIsNone(result[-1]['start'])

    def test_unlabeled_timestamp_keeps_quote_and_source_line_without_guessing_speaker(self):
        result = turns('---\ntitle: Test\n---\n\n[26:29]Words without a label.')
        self.assertEqual(result[0]['anchor'], 'msg-1589')
        self.assertEqual(result[0]['speaker'], 'Unconfirmed')
        self.assertEqual(result[0]['text'], 'Words without a label.')
        self.assertEqual(result[0]['line_number'], 5)

    def test_phrase_clip_uses_retained_words_and_rejects_unmatched_corrections(self):
        turn = {'start': 10, 'speaker': 'Henry', 'text': 'A difficult phrase.'}
        words = [{'id': str(i), 'text': text, 'start': 10 + i, 'end': 10.5 + i}
                 for i, text in enumerate(['A', 'like', 'difficult', 'phrase.'])]
        pilot = {'words': words, 'reading': [{'speaker': 'Henry', 'start': 10.2,
                 'text': turn['text'], 'word_ids': [w['id'] for w in words]}]}
        self.assertEqual(matched_word_clip(pilot, turn, 'difficult phrase'), (10, 15.5))
        self.assertIsNone(matched_word_clip(pilot, turn, 'other words'))

    def test_flag_follows_its_retained_phrase_after_cleanup(self):
        before = '[00:01] **Henry:** I mean this is like a garbled phrase.'
        after = '[00:01] **Henry:** This is a garbled phrase.'
        turn = turns(after)[0]
        report = {'edits': [{'before': before, 'after': after}]}
        self.assertEqual(retained_quote(report, turn, 'like a garbled phrase'), 'a garbled phrase')

    def test_malformed_time_is_not_converted_into_a_fictitious_timestamp(self):
        result = turns('[31:00] **Henry:** Before.\n\n[31:121] **Henry:** Uncertain timing.\n\n[31:53] **Guest:** After.')
        self.assertIsNone(result[1]['start'])
        self.assertIsNone(result[1]['timestamp'])
        self.assertEqual(result[1]['source_timestamp'], '31:121')
        self.assertEqual(result[1]['anchor'], 'msg-1860')

    def test_decisions_are_durable_but_stale_or_mismatched_edits_are_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source = root / 'src/content/podcast/example.md'
            source.parent.mkdir(parents=True)
            source.write_text('[00:01] **Henry:** An ambiguous word.')
            item = {'id': 'example-1', 'revision': 'revision', 'path': 'src/content/podcast/example.md',
                    'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                    'original': 'An ambiguous word.', 'quote': 'ambiguous', 'speaker': 'Henry', 'anchor': 'msg-1'}
            (root / 'review.json').write_text(json.dumps({'items': [item]}))
            value = {'id': item['id'], 'item_revision': 'revision', 'state': 'accepted',
                     'text': 'An audible word.', 'replacement': 'audible', 'speaker': 'Henry', 'full_edit': False}
            save_decision(root, value, root)
            saved = json.loads((root / 'review-decisions.json').read_text())['decisions'][item['id']]
            self.assertEqual(saved['text'], value['text'])
            self.assertEqual(source.read_text(), '[00:01] **Henry:** An ambiguous word.')
            with self.assertRaises(ValueError):
                save_decision(root, {**value, 'text': 'Unrelated text.'}, root)
            source.write_text('Changed source')
            with self.assertRaises(ValueError):
                save_decision(root, value, root)


if __name__ == '__main__':
    unittest.main()
