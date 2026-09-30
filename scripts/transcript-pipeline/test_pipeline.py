"""Contract tests for fidelity, identity, and isolated-track timing."""
import copy
import unittest
import pipeline as p


class TranscriptContracts(unittest.TestCase):
    def test_fragmented_handoff_queue_keeps_canonical_identity(self):
        turns=[self.turn(0,'On okay','A'),self.turn(1,'Some skipping','B'),
               self.turn(2,"No worries but",'A'),self.turn(3,'Fine','B')]
        turns[1]['id']='frozen-57';turns[1]['anchor']='msg-419.04'
        candidates=p.speaker_handoff_candidates(turns)
        self.assertEqual(len(candidates),1)
        self.assertEqual(candidates[0]['kind'],'speaker_handoff')
        self.assertEqual(candidates[0]['turn_ids'],['t0','frozen-57','t2','t3'])
        self.assertEqual(candidates[0]['context'][1]['anchor'],'msg-419.04')
        self.assertEqual(candidates[0]['start'],0)
        self.assertEqual(candidates[0]['end'],3.9)
        self.assertEqual(turns[1]['text'],'Some skipping')

    def test_handoff_queue_does_not_flag_ordinary_acknowledgments(self):
        turns=[self.turn(0,'Yeah.','A'),self.turn(1,'Okay.','B'),self.turn(2,'Oh, cool.','A')]
        self.assertEqual(p.speaker_handoff_candidates(turns),[])

    def test_handoff_queue_requires_cluster_not_isolated_short_turn(self):
        turns=[self.turn(0,'I want to record the ambience here.','A'),
               self.turn(1,'Your surroundings.','B'),self.turn(2,'That makes a lot of sense.','A')]
        self.assertEqual(p.speaker_handoff_candidates(turns),[])
        fragments=[self.turn(0,'On okay','A'),self.turn(1,'Some skipping','B'),self.turn(4,'No worries but','A')]
        self.assertEqual(p.speaker_handoff_candidates(fragments),[])

    def test_chunk_frame_rounding_cannot_shift_audio_timeline(self):
        result=p.rebase_segments([{'start':5040,'end':5045.04,'speaker':1}],5040,5000,5)
        self.assertEqual(result,[{'start':5000,'end':5005,'speaker':1}])
        self.assertEqual(p.rebase_segments([{'start':5046,'end':5047,'speaker':1}],5040,5000,5),[])

    def test_meaning_cues_are_flagged_even_when_subtractive(self):
        before='I think maybe we should not do it, yet.'
        after='We should do it.'
        self.assertTrue(p.is_subtractive(before,after))
        cues={c for signal in p.text_diff(before,after)['meaning_review'] for c in signal['cues']}
        self.assertTrue({'i think','maybe','not','yet'}<=cues)

    def test_diff_markup_escapes_source_text(self):
        diff=p.text_diff('<script>alert(1)</script> I guess yes.','Yes.')
        self.assertNotIn('<script>',diff['before_html'])
        self.assertIn('&lt;',diff['before_html'])
        self.assertIn('<del>',diff['before_html'])

    def test_deleted_contracted_negative_is_a_meaning_cue(self):
        before="I can't say yes."
        after='I say yes.'
        self.assertTrue(p.is_subtractive(before,after))
        cues={c for signal in p.text_diff(before,after)['meaning_review'] for c in signal['cues']}
        self.assertIn("can't",cues)

    def test_removed_acknowledgment_retains_anchors(self):
        reading=[self.turn(0,''),self.turn(1,'Hello.')]
        reading[0]['alias_anchors']=['msg-0.5']
        p.preserve_reading_anchors(reading)
        p.preserve_reading_anchors(reading)
        self.assertEqual(reading[0]['reading_merged_into'],'t1')
        self.assertEqual(reading[1]['reading_alias_anchors'],['msg-0','msg-0.5'])

    def test_zero_duration_word_inside_acoustic_segment(self):
        label,support,overlap=p.label_word({'start':2,'end':2},[{'start':1,'end':3,'speaker':0}])
        self.assertEqual(label,'0');self.assertLess(support,1);self.assertFalse(overlap)

    def turn(self,n,text,speaker='A'):
        return {'id':f't{n}','anchor':f'msg-{n}','start':float(n),'end':n+.9,
                'speaker':speaker,'text':text,'word_ids':[f'w{n}']}

    def test_reading_rejects_paraphrase_and_reordering(self):
        source=[self.turn(0,'I guess we could try it.')]
        for text in ['We should try it.','Try it, I guess.']:
            with self.assertRaises(ValueError):
                p.apply_edits(source,{'reading':[{'turn_id':'t0','text':text,'reason':'cleanup'}]})
        _,reading,_=p.apply_edits(source,{'reading':[{'turn_id':'t0','text':'We could try it.','reason':'Example only; uncertainty still requires editorial judgment.'}]})
        self.assertEqual(reading[0]['text'],'We could try it.')
        self.assertEqual(source[0]['text'],'I guess we could try it.')

    def test_correction_requires_evidence_and_exact_before(self):
        for before,evidence in [('wrong','model check'),('I','')]:
            with self.assertRaises(ValueError):
                p.apply_edits([self.turn(0,'I')],{'corrections':[{'turn_id':'t0','before':before,'after':'We','evidence':evidence}]})

    def test_boundary_and_join_preserve_words_anchors_and_raw(self):
        raw=[self.turn(0,'So we need'),self.turn(1,'to','unknown'),self.turn(2,'think.')]
        original=copy.deepcopy(raw)
        corrected,_,_=p.apply_edits(raw,{'speakers':[{'turn_id':'t1','before':'unknown','after':'A','evidence':'neighboring audio'}],
            'joins':[{'turn_ids':['t0','t1','t2'],'evidence':'continuous sentence'}]})
        self.assertEqual(raw,original)
        self.assertEqual(corrected[0]['text'],'So we need to think.')
        self.assertEqual(corrected[0]['word_ids'],['w0','w1','w2'])
        self.assertEqual(corrected[0]['alias_anchors'],['msg-1','msg-2'])
        self.assertEqual(corrected[1]['merged_into'],'t0')
        a=self.turn(0,'Hi do');a['word_ids']=['w0','w1']
        b=self.turn(1,'you agree?','B');b['word_ids']=['w2','w3']
        c,_,_=p.apply_edits([a,b],{'boundaries':[{'from':'t0','to':'t1','text':'do','word_count':1,'evidence':'handoff'}]})
        self.assertEqual([t['text'] for t in c],['Hi','do you agree?'])
        self.assertEqual([w for t in c for w in t['word_ids']],['w0','w1','w2','w3'])

    def test_cannot_merge_distinct_speakers_or_nonadjacent_turns(self):
        raw=[self.turn(0,'A'),self.turn(1,'B','B'),self.turn(2,'C')]
        for ids in [['t0','t1'],['t0','t2']]:
            with self.assertRaises(ValueError):p.apply_edits(raw,{'joins':[{'turn_ids':ids,'evidence':'test'}]})

    def test_two_tracks_offsets_overlap_and_turn_integrity(self):
        m={'mode':'speaker_tracks','tracks':[{'id':'a','speaker':'Henry','duration':10,'offset_seconds':0},{'id':'b','speaker':'Nadia','duration':10,'offset_seconds':.5}]}
        def output(words):return {'segments':[{'id':0,'words':words}]}
        raw={'a':output([{'word':'One','start':1,'end':1.4},{'word':'sentence.','start':1.4,'end':2}]),
             'b':output([{'word':'Yes.','start':.7,'end':1}])}
        words=p.make_words(m,raw,[]);turns=p.make_turns(words)
        self.assertEqual([t['text'] for t in turns],['One sentence.','Yes.'])
        self.assertEqual(turns[1]['start'],1.2)
        self.assertEqual(turns[1]['speaker'],'Nadia')
        self.assertEqual(sorted(w for t in turns for w in t['word_ids']),sorted(w['id'] for w in words))
        self.assertGreater(turns[0]['end'],turns[1]['start'])
        m['tracks'][1].pop('offset_seconds')
        with self.assertRaises(ValueError):p.validate_manifest(m)

    def test_coincident_turns_have_unique_links_without_inventing_times(self):
        words=[{'id':f'w{i}','track_id':'a','speaker':s,'start':1.2,'end':1.2,'text':s}
               for i,s in enumerate(['A','B','A'])]
        turns=p.make_turns(words)
        self.assertEqual([t['anchor'] for t in turns],['msg-1.2','msg-1.2-2','msg-1.2-3'])
        self.assertEqual([t['start'] for t in turns],[1.2]*3)
        self.assertEqual([w for t in turns for w in t['word_ids']],['w0','w1','w2'])
        words[1]['track_id']='b'
        turns=p.make_turns(words)
        self.assertEqual(len({t['anchor'] for t in turns}),len(turns))
        self.assertTrue(all(t['start']==1.2 for t in turns))

    def test_quote_provenance_is_required(self):
        turns=[self.turn(0,'You are showing up for a reason.')]
        p.validate_editorial({'titles':[{'text':'Showing up for a reason','kind':'verbatim','source_quote':'showing up for a reason','turn_id':'t0'}]},turns)
        with self.assertRaises(ValueError):
            p.validate_editorial({'titles':[{'text':'Community changes everything','kind':'verbatim','source_quote':'Community changes everything','turn_id':'t0'}]},turns)

    def test_restoration_keeps_source_timing(self):
        c,_,_=p.apply_edits([self.turn(0,'It says:')],{'restorations':[{'turn_id':'t0','track_id':'a','source_file':'raw/clip.json','evidence':'second pass','words':[{'word':'Hello.','start':1.1,'end':1.5}]}]})
        self.assertEqual(c[0]['text'],'It says: Hello.')
        self.assertEqual(c[0]['end'],1.5)
        self.assertEqual(c[0]['restored_words'][0]['start'],1.1)


if __name__=='__main__': unittest.main()
