import unittest
from audit_archive import audit_text

class ArchiveAuditTests(unittest.TestCase):
    def test_legitimate_overlap_has_unique_suffixes_and_no_errors(self):
        report = audit_text('[00:01] **Henry:** Are you hungry?\n\n[00:01] **Melody:** Yeah.')
        self.assertEqual(report['same_second'][0]['anchors'], ['msg-1', 'msg-1-2'])
        self.assertTrue(report['generated_ids_unique'])
        self.assertEqual(report['issues'], [])

    def test_backward_repeated_pair_is_detected(self):
        report = audit_text('[00:10] **Henry:** A full thought.\n\n[00:12] **Melody:** A different thought.\n\n[00:10] **Henry:** A full thought.\n\n[00:12] **Melody:** A different thought.')
        kinds = [issue['kind'] for issue in report['issues']]
        self.assertEqual(kinds.count('backward_chronology'), 1)
        self.assertEqual(kinds.count('exact_duplicate_passage'), 2)

    def test_duplicate_aliases_and_generated_collision(self):
        report = audit_text('[00:01] **Henry:** <span id="msg-0.4"></span>Hello.\n\n[00:02] **Melody:** <span id="msg-0.4"></span><span id="msg-1"></span>Hi.')
        self.assertIn('duplicate_explicit_id', [x['kind'] for x in report['issues']])
        self.assertIn('explicit_generated_id_collision', [x['kind'] for x in report['issues']])

    def test_missing_body_ignores_frontmatter(self):
        report = audit_text('---\ntitle: Test\ndescription: "[00:01] **Henry:** Not a transcript"\n---\n\nComing soon.')
        self.assertEqual(report['turn_count'], 0)
        self.assertEqual(report['issues'][0]['kind'], 'missing_transcript')

    def test_untimed_turns_share_the_renderer_anchor_sequence_without_fake_chronology(self):
        report = audit_text('[00:10] **Henry:** A timed thought.\n\n**Guest:** Untimed thought.\n\n'
                            '**Henry:** Another untimed thought.\n\n[00:11] **Guest:** A timed reply.')
        self.assertEqual(report['turn_count'], 4)
        self.assertEqual(report['same_second'][0]['anchors'], ['msg-0', 'msg-0-2'])
        self.assertEqual(report['issues'], [])
        collision = audit_text('**Henry:** <span id="msg-0"></span>Untimed thought.')
        self.assertEqual(collision['issues'][0]['kind'], 'explicit_generated_id_collision')

    def test_multiline_and_grammatical_repetition_preserved(self):
        report = audit_text('[01:00] **Henry:** From there there was\na different way.\n\n#### Heading\n\n[01:02] **Melody:** Yeah.')
        self.assertEqual(report['word_count'], 8)
        self.assertEqual(report['issues'], [])
        self.assertEqual(report['heading_count'], 1)

if __name__ == '__main__':
    unittest.main()
