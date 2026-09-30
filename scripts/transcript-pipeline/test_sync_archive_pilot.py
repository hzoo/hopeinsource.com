"""Contracts for safe synchronization of the website and local reading pilot."""
import copy
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

import sync_archive_pilot as sync


class ArchivePilotSync(unittest.TestCase):
    def fixture(self, root):
        pilot = root / 'experiments/transcript-pilot/walk'
        (pilot / 'raw').mkdir(parents=True)
        audio = b'fixture audio identity; assemble does not decode audio'
        (pilot / 'input.mp3').write_bytes(audio)
        manifest = {'schema': 1, 'episode_id': 'walk', 'mode': 'mixed',
                    'speaker_names': {'0': 'Henry'},
                    'tracks': [{'id': 'track-0', 'audio': 'input.mp3', 'speaker': 'Henry',
                                'sha256': hashlib.sha256(audio).hexdigest(),
                                'offset_seconds': 0, 'duration': 4}]}
        words = [{'word': word, 'start': start, 'end': end}
                 for word, start, end in [('Yeah,', 1.18, 1.3), ('yeah,', 1.3, 1.5),
                                          ('hello.', 1.5, 1.8), ('Okay.', 2.18, 2.4)]]
        turns = [{'id': 't0', 'anchor': 'msg-1.18', 'speaker': 'Henry',
                  'start': 1.18, 'end': 1.8, 'text': 'Yeah, yeah, hello.',
                  'word_ids': ['track-0-w00000', 'track-0-w00001', 'track-0-w00002']},
                 {'id': 't1', 'anchor': 'msg-2.18', 'speaker': 'Henry',
                  'start': 2.18, 'end': 2.4, 'text': 'Okay.', 'word_ids': ['track-0-w00003']}]
        edits = {'reading': [{'turn_id': 't0', 'text': 'Yeah, hello.', 'reason': 'First cleanup',
                              'semantic_review': 'Already accepted wording', 'state': 'accepted'}],
                 'speakers': [], 'joins': [], 'accepted_choices': {'id': 'keep'}}
        for name, data in [('manifest.json', manifest), ('raw-turns.json', turns),
                           ('raw/track-0.json', {'segments': [{'id': 0, 'words': words}]}),
                           ('raw/diarization.json', {'segments': [{'speaker': 0, 'start': 0, 'end': 4}]}),
                           ('edits.json', edits), ('review-decisions.json', {'accepted': 'do not touch'})]:
            (pilot / name).write_text(json.dumps(data))
        subprocess.run([sys.executable, str(Path(sync.__file__).with_name('pipeline.py')),
                        'assemble', str(pilot)], check=True, capture_output=True)
        source = root / 'src/content/podcast/season-5/walk.md'
        source.parent.mkdir(parents=True)
        before = '[00:00:01] **Henry:** <span id="msg-1.18"></span>Yeah, hello.'
        after = before.replace('Yeah, ', '')
        source.write_bytes(('---\r\ntitle: Original\r\n---\r\n\r\n' + before + '\r\n\r\n'
                            '[00:00:02] **Henry:** <span id="msg-2.18"></span>Okay.\r\n').encode())
        ledger = [{'path': str(source.relative_to(root)), 'before': before,
                   'after': after, 'reason': 'Remove a reviewed acknowledgment'}]
        return pilot, source, ledger

    def test_dry_run_updates_existing_entry_and_preserves_inputs(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            inputs = {p: p.read_bytes() for p in root.rglob('*') if p.is_file()}
            plan = sync.prepare(ledger, 'walk', root)
            self.assertEqual(len(plan['edits']['reading']), 1)
            entry = plan['edits']['reading'][0]
            self.assertEqual(entry['text'], 'hello.')
            self.assertEqual(entry['state'], 'accepted')
            self.assertEqual(entry['semantic_review'], 'Already accepted wording')
            self.assertEqual(plan['edits']['accepted_choices'], {'id': 'keep'})
            self.assertEqual(plan['report']['visible_turns_verified'], 2)
            self.assertTrue(all(p.read_bytes() == value for p, value in inputs.items()))

    def test_apply_assembles_without_exporting_or_changing_decisions(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            source.write_bytes(source.read_bytes().replace(ledger[0]['before'].encode(),
                                                           ledger[0]['after'].encode()))
            source_bytes = source.read_bytes()
            decision = (pilot / 'review-decisions.json').read_bytes()
            plan = sync.prepare(ledger, 'walk', root)
            report = sync.apply(plan)
            self.assertEqual(report['mode'], 'applied')
            self.assertEqual(source.read_bytes(), source_bytes)
            self.assertEqual((pilot / 'review-decisions.json').read_bytes(), decision)
            result = json.loads((pilot / 'episode.json').read_text())
            self.assertEqual(result['reading'][0]['text'], 'hello.')
            self.assertEqual(result['reading'][0]['anchor'], 'msg-1.18')
            self.assertEqual(result['reading'][0]['speaker'], 'Henry')

    def test_empty_filler_keeps_the_canonical_anchor(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            before = '[00:00:02] **Henry:** <span id="msg-2.18"></span>Okay.'
            ledger = [{'path': ledger[0]['path'], 'before': before,
                       'after': before.replace('Okay.', ''), 'reason': 'Reviewed empty acknowledgment'}]
            plan = sync.prepare(ledger, 'walk', root)
            sync.apply(plan)
            reading = json.loads((pilot / 'episode.json').read_text())['reading']
            self.assertEqual(reading[1]['anchor'], 'msg-2.18')
            self.assertEqual(reading[1]['text'], '')
            self.assertIn('msg-2.18', reading[0]['reading_alias_anchors'])
            self.assertIn('Okay.', source.read_text())  # website is deliberately untouched

    def test_stale_wording_ownership_and_duplicate_entries_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            for before in [ledger[0]['before'].replace('hello.', 'hi.'),
                           ledger[0]['before'].replace('Henry', 'Laurel')]:
                bad = copy.deepcopy(ledger)
                bad[0]['before'] = before
                bad[0]['after'] = before.replace('Yeah, ', '')
                with self.assertRaises(ValueError):
                    sync.prepare(bad, 'walk', root)
            edits = json.loads((pilot / 'edits.json').read_text())
            edits['reading'].append(copy.deepcopy(edits['reading'][0]))
            (pilot / 'edits.json').write_text(json.dumps(edits))
            with self.assertRaises(ValueError):
                sync.prepare(ledger, 'walk', root)

    def test_ambiguous_time_text_and_conflicting_aliases_fail(self):
        turns = [{'id': 'a', 'anchor': 'msg-1.1', 'speaker': 'Henry', 'start': 1.1,
                  'text': 'Yeah.'}, {'id': 'b', 'anchor': 'msg-1.2', 'speaker': 'Henry',
                                    'start': 1.2, 'text': 'Yeah.'}]
        with self.assertRaises(ValueError):
            sync.match_turn(sync.passage('[00:01] **Henry:** Yeah.'), turns)
        turns[1]['text'] = 'Okay.'
        with self.assertRaises(ValueError):
            sync.match_turn(sync.passage('[00:01] **Henry:** <span id="msg-1.1"></span>'
                                         '<span id="msg-1.2"></span>Yeah.'), turns)

    def test_full_visible_review_rejects_unrelated_source_drift(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            source.write_bytes(source.read_bytes().replace(b'Okay.', b'No.'))
            with self.assertRaises(ValueError):
                sync.prepare(ledger, 'walk', root)

    def test_assembly_failure_rolls_back_outputs(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pilot, source, ledger = self.fixture(root)
            plan = sync.prepare(ledger, 'walk', root)
            snapshots = {name: (pilot / name).read_bytes() for name in sync.OUTPUTS
                         if (pilot / name).exists()}
            with patch.object(sync.subprocess, 'run', side_effect=RuntimeError('assembly failed')):
                with self.assertRaises(RuntimeError):
                    sync.apply(plan)
            self.assertTrue(all((pilot / name).read_bytes() == content
                                for name, content in snapshots.items()))


if __name__ == '__main__':
    unittest.main()
