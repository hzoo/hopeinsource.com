"""Local podcast pilot. Immutable model outputs; edits are replayed separately.

Use --help. ML dependencies are imported only by their inference commands.
All audio time is seconds on the original episode timeline. Two-track inputs
must be isolated speaker tracks, with explicit offsets; never concatenate them.
"""
import argparse
import copy
import dataclasses
import difflib
import hashlib
import html
import json
from pathlib import Path
import re
import shutil
import subprocess
import time


def read(path):
    return json.loads(Path(path).read_text())


def save(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temp.replace(path)


def norm(text):
    return re.findall(r"[\w]+(?:['’][\w]+)*", text.lower().replace('’', "'"))


def stamp(t):
    # Milliseconds preserve distinct short speaker turns in the pilot export.
    return f'{int(t)//3600:02}:{int(t)//60%60:02}:{t%60:06.3f}'


def probe(path):
    data = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
        'format=duration:stream=codec_type,channels,sample_rate', '-of', 'json', str(path)]))
    return {'duration': float(data['format']['duration']), 'streams': data['streams']}


def validate_manifest(m):
    tracks = m['tracks']
    if m['mode'] == 'mixed':
        if len(tracks) != 1:
            raise ValueError('mixed mode requires exactly one recording')
    elif m['mode'] == 'speaker_tracks':
        if len(tracks) != 2 or len({t['speaker'] for t in tracks}) != 2:
            raise ValueError('speaker_tracks requires two named isolated speaker tracks')
    else:
        raise ValueError('Choose mixed or speaker_tracks explicitly')
    for t in tracks:
        if 'offset_seconds' not in t or t['offset_seconds'] < 0:
            raise ValueError('Every track needs an explicit, nonnegative timeline offset')


def ingest(args):
    root = Path(args.episode)
    if (root/'manifest.json').exists():
        raise ValueError('Episode already exists; use a new directory to preserve its raw state')
    sources = [(None, args.audio, 0.0)] if args.audio else []
    offsets = dict(item.split('=', 1) for item in args.offset)
    for item in args.track:
        name, path = item.split('=', 1)
        if name not in offsets:
            raise ValueError(f'Provide --offset {name}=0 (or the measured offset) explicitly')
        sources.append((name, path, float(offsets[name])))
    m = {'schema': 1, 'episode_id': root.name, 'mode': 'mixed' if args.audio else 'speaker_tracks',
         'tracks': [], 'speaker_names': {}, 'speaker_name_evidence': {}, 'state': 'ingested'}
    for i, (speaker, source, offset) in enumerate(sources):
        source = Path(source).expanduser().resolve()
        info = probe(source)
        m['tracks'].append({'id': f'track-{i}', 'audio': f'input-{i}{source.suffix}',
            'source_path': str(source), 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'speaker': speaker, 'offset_seconds': offset, **info})
    validate_manifest(m)
    root.mkdir(parents=True, exist_ok=True)
    for t in m['tracks']:
        shutil.copy2(t['source_path'], root/t['audio'])
    save(root/'manifest.json', m)
    print(f'Ingested {len(m["tracks"])} recording(s); originals untouched')


def transcribe(args):
    import mlx_whisper
    root = Path(args.episode)
    m = read(root/'manifest.json')
    validate_manifest(m)
    for t in m['tracks']:
        output = root/'raw'/f'{t["id"]}.json'
        if output.exists():
            print(f'Keeping existing raw output {output}')
            continue
        started = time.perf_counter()
        result = mlx_whisper.transcribe(str(root/t['audio']), path_or_hf_repo=args.model,
            language='en', word_timestamps=True, temperature=0,
            condition_on_previous_text=False, verbose=False)
        save(output, result)
        save(output.with_suffix('.metrics.json'), {'seconds': time.perf_counter()-started,
            'model': args.model, 'language': 'en', 'word_timestamps': True,
            'temperature': 0, 'condition_on_previous_text': False})


def diarize(args):
    from mlx_audio.vad import load
    root = Path(args.episode)
    m = read(root/'manifest.json')
    validate_manifest(m)
    if m['mode'] == 'speaker_tracks':
        print('Speaker identity comes from the isolated input tracks; no diarizer needed')
        return
    output = root/'raw'/'diarization.json'
    if output.exists():
        print('Keeping existing diarization')
        return
    started = time.perf_counter()
    model = load(args.model)
    segments = []
    if getattr(args, 'stream_audio', False):
        import numpy as np
        import wave
        audio = root/'raw'/'diarization-input.wav'
        audio.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(root/m['tracks'][0]['audio']),
                        '-ac','1','-ar','16000','-c:a','pcm_s16le',str(audio)],check=True)
        state = model.init_streaming_state()
        proc = model._processor_config
        frame_seconds = proc.hop_length * model.config.fc_encoder_config.subsampling_factor / proc.sampling_rate
        samples = 0
        with wave.open(str(audio), 'rb') as source:
            while data := source.readframes(16000*5):
                chunk = np.frombuffer(data, dtype='<i2').astype(np.float32)/32768
                model_offset = state.frames_processed * frame_seconds
                result, state = model.feed(chunk, state, sample_rate=16000,
                    threshold=.5, min_duration=.08, merge_gap=.08)
                segments.extend(rebase_segments(
                    [dataclasses.asdict(s) for s in result.segments], model_offset,
                    samples/16000, len(chunk)/16000))
                samples += len(chunk)
                if samples % (16000*200) == 0:
                    print(f'Diarized {samples/16000:g}s', flush=True)
        save(output, {'model':args.model,'seconds':time.perf_counter()-started,
            'mode':'stateful_audio_chunks','chunk_seconds':5,'sample_rate':16000,
            'timeline':'sample-count rebased; model frame rounding does not accumulate',
            'segments':segments})
        return
    for i, result in enumerate(model.generate_stream(str(root/m['tracks'][0]['audio']),
            chunk_duration=5, threshold=.5, min_duration=.08, merge_gap=.08)):
        segments.extend(dataclasses.asdict(s) for s in result.segments)
        if i % 40 == 0:
            print(f'Diarized approximately {i*5}s', flush=True)
    save(output, {'model': args.model, 'seconds': time.perf_counter()-started, 'segments': segments})


def rebase_segments(segments, model_offset, audio_offset, duration):
    """Retain model speaker state but anchor each chunk to actual audio samples."""
    result = []
    for segment in segments:
        start = max(0, min(duration, segment['start']-model_offset))
        end = max(0, min(duration, segment['end']-model_offset))
        if end > start:
            result.append({**segment,'start':start+audio_offset,'end':end+audio_offset})
    return result


def crosscheck(args):
    import moondream
    root=Path(args.episode);m=read(root/'manifest.json');validate_manifest(m)
    model=None
    for track in m['tracks']:
        output=root/'raw'/f'crosscheck-{track["id"]}.json'
        if output.exists():
            print(f'Keeping existing cross-check {output}')
            continue
        if model is None:
            model=moondream.photon(args.model,device=args.device)
        # Some MP3 decoders yield finite samples just outside [-1, 1]. Redux's
        # native reader rejects those; a PCM analysis copy gives it a supported
        # representation without touching the original recording or timeline.
        analysis_audio=root/'raw'/f'crosscheck-input-{track["id"]}.wav'
        analysis_audio.parent.mkdir(parents=True,exist_ok=True)
        subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',str(root/track['audio']),
                        '-ac','1','-ar','16000','-c:a','pcm_s16le',str(analysis_audio)],check=True)
        started=time.perf_counter()
        result=model.transcribe(audio=str(analysis_audio),timestamps='word')
        save(output,result)
        save(output.with_suffix('.metrics.json'),{'seconds':time.perf_counter()-started,
            'model':args.model,'device':args.device,'timestamps':'word',
            'source_sha256':track['sha256'],'analysis_audio':str(analysis_audio),
            'analysis_sha256':hashlib.sha256(analysis_audio.read_bytes()).hexdigest(),
            'analysis_format':'mono 16kHz PCM16; original audio unchanged'})


def recheck(args):
    """Independently retry a suspect span, keeping original-timeline evidence."""
    import mlx_whisper
    root=Path(args.episode);m=read(root/'manifest.json')
    track=next(t for t in m['tracks'] if t['id']==args.track)
    start=args.start-track['offset_seconds'];end=args.end-track['offset_seconds']
    if not 0<=start<end<=track['duration']:
        raise ValueError('Excerpt must be within this input track on the episode timeline')
    output=root/'raw'/'excerpts'/f'{args.track}-{args.start:g}-{args.end:g}.json'
    if output.exists():
        print(f'Keeping existing excerpt {output}');return
    output.parent.mkdir(parents=True,exist_ok=True)
    clip=output.with_suffix('.wav')
    subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-ss',str(start),'-i',str(root/track['audio']),
                    '-t',str(end-start),'-ar','16000','-ac','1',str(clip)],check=True)
    started=time.perf_counter()
    result=mlx_whisper.transcribe(str(clip),path_or_hf_repo=args.model,language='en',
        word_timestamps=True,temperature=0,condition_on_previous_text=False,verbose=None)
    save(output,{'clip_start_seconds':args.start,'clip_end_seconds':args.end,'track_id':track['id'],
        'source_sha256':track['sha256'],'model':args.model,'seconds':time.perf_counter()-started,'result':result})
    print(result['text'])


def label_word(word, segments):
    start, end = word['start'], word['end']
    if start==end:
        # A zero-length ASR word can still sit inside an acoustic speaker turn.
        # Keep its original time and low support; do not invent a word duration.
        containing={str(s['speaker']) for s in segments if s['start']<=start<s['end']}
        if len(containing)==1:
            return next(iter(containing)), .15, False
        if len(containing)>1:
            return 'unknown', 0, True
    duration = max(end-start, .02)
    scores = {}
    for s in segments:
        overlap = max(0, min(end, s['end'])-max(start, s['start']))
        if overlap:
            speaker = str(s['speaker'])
            scores[speaker] = scores.get(speaker, 0)+overlap
    ranked = sorted(scores.items(), key=lambda v: v[1], reverse=True)
    if not ranked:
        # Bridge a short timing gap only when both neighboring acoustic segments
        # name the same speaker. Preserve low support so review can find it.
        before=max((s for s in segments if s['end']<=start),key=lambda s:s['end'],default=None)
        after=min((s for s in segments if s['start']>=end),key=lambda s:s['start'],default=None)
        if before and after and before['speaker']==after['speaker'] and after['start']-before['end']<=2:
            return str(before['speaker']), .25, False
        near=min(segments,key=lambda s:min(abs(start-s['end']),abs(end-s['start'])),default=None)
        if near and min(abs(start-near['end']),abs(end-near['start']))<=.12:
            return str(near['speaker']), .15, False
        return 'unknown', 0, False
    speaker, weight = ranked[0]
    overlap = len(ranked)>1 and ranked[1][1]/duration>.25
    return speaker, min(1, weight/duration), overlap


def make_words(m, raw_by_track, segments):
    validate_manifest(m)
    words = []
    for track in m['tracks']:
        raw = raw_by_track[track['id']]
        n=0
        for s in raw['segments']:
            for word in s.get('words', []):
                w = {'id':f'{track["id"]}-w{n:05d}', 'track_id':track['id'],
                    'text': word['word'].strip(), 'start': round(word['start']+track['offset_seconds'],3),
                    'end': round(word['end']+track['offset_seconds'],3),
                    'probability':word.get('probability'), 'asr_segment':s['id']}
                if not 0 <= w['start'] <= w['end'] <= track['duration']+track['offset_seconds']+.1:
                    raise ValueError(f'Invalid word time: {w}')
                if m['mode']=='speaker_tracks':
                    w.update(speaker=track['speaker'], speaker_support=1, overlap=False)
                else:
                    speaker, support, overlap = label_word(w, segments)
                    w.update(speaker=m.get('speaker_names',{}).get(speaker,f'Speaker {speaker}'),
                             speaker_cluster=speaker, speaker_support=support, overlap=overlap)
                words.append(w)
                n+=1
    return sorted(words,key=lambda w:(w['start'],w['track_id'],w['id']))


def assign_turn_anchors(turns):
    """Coincident turns keep their real time and get individually linkable IDs."""
    counts={}
    for turn in turns:
        base=f'msg-{turn["start"]:g}'
        counts[base]=counts.get(base,0)+1
        turn['anchor']=base+(f'-{counts[base]}' if counts[base]>1 else '')
    return turns


def make_turns(words, gap=3):
    tracks={w['track_id'] for w in words}
    if len(tracks)>1:
        # Keep each isolated speaker's utterance intact during simultaneous
        # speech instead of alternating one-word turns across the two tracks.
        groups=[]
        for track in sorted(tracks):
            groups.extend(make_turns([w for w in words if w['track_id']==track],gap=.8))
        groups.sort(key=lambda t:(t['start'],t['word_ids'][0]))
        for i,t in enumerate(groups):
            t['id']=f'turn-{i:04d}'
        return assign_turn_anchors(groups)
    turns = []
    for w in words:
        prev = turns[-1] if turns else None
        split = (not prev or prev['speaker'] != w['speaker'] or
            w['start']-prev['end']>gap or
            (len(prev['word_ids'])>=65 and re.search(r'[.!?]["\']?$',prev['text'])))
        if split:
            anchor = f'msg-{w["start"]:g}'
            turns.append({'id':f'turn-{len(turns):04d}','anchor':anchor,'speaker':w['speaker'],
                'start':w['start'],'end':w['end'],'word_ids':[w['id']],'text':w['text']})
        else:
            prev['word_ids'].append(w['id'])
            prev['text']+=' '+w['text']
            prev['end']=max(prev['end'],w['end'])
    return assign_turn_anchors(turns)


def is_subtractive(before, after):
    source = iter(norm(before))
    return all(any(token==candidate for candidate in source) for token in norm(after))


def text_diff(before, after):
    """Lexical changes with original punctuation/context; HTML is always escaped."""
    pattern=re.compile(r"[\w]+(?:['’][\w]+)*")
    a=list(pattern.finditer(before));b=list(pattern.finditer(after))
    tokens=lambda matches:[m[0].lower().replace('’',"'") for m in matches]
    opcodes=difflib.SequenceMatcher(None,tokens(a),tokens(b),autojunk=False).get_opcodes()
    deleted=[]; left=[];right=[]
    for tag,i,j,k,l in opcodes:
        if tag in ('delete','replace'):
            start,end=a[i].start(),a[j-1].end();left.append((start,end))
            deleted.append({'text':before[start:end],
                'context':before[max(0,start-45):min(len(before),end+45)]})
        if tag in ('insert','replace'):
            right.append((b[k].start(),b[l-1].end()))
    def mark(text,spans,tag):
        result=[];pos=0
        for start,end in spans:
            result += [html.escape(text[pos:start]),f'<{tag}>',html.escape(text[start:end]),f'</{tag}>'];pos=end
        return ''.join(result)+html.escape(text[pos:])
    signals=[]
    for item in deleted:
        ts=norm(item['text']);joined=' '.join(ts)
        words={'maybe','might','could','perhaps','probably','yet','but','not','never','only','always','everyone','all','some'}&set(ts)
        # A deleted contracted negative matters just as much as a deleted "not".
        words |= {t for t in ts if t.endswith("n't") or t in {'no','neither','nor','nobody','nothing','without'}}
        phrases=[phrase for phrase in ['i think','i guess',"i don't know",'i feel','i wonder','kind of','sort of'] if phrase in joined]
        extra=(['long deletion'] if len(ts)>=8 else [])+(['number'] if any(t.isdigit() for t in ts) else [])
        if words or phrases or extra:
            signals.append({**item,'cues':sorted(words)+phrases+extra})
    return {'before_html':mark(before,left,'del'),'after_html':mark(after,right,'ins'),
        'removed':deleted,'meaning_review':signals}


def preserve_reading_anchors(reading):
    """A removed acknowledgment still links to the next readable passage."""
    visible=[t for t in reading if t['text']]
    for t in reading:
        if t['text'] or t.get('merged_into') or not visible:
            continue
        target=next((v for v in visible if v['start']>=t['start']),visible[-1])
        t['reading_merged_into']=target['id']
        for anchor in [t['anchor']]+t.get('alias_anchors',[]):
            if anchor!=target['anchor'] and anchor not in target.get('reading_alias_anchors',[]):
                target.setdefault('reading_alias_anchors',[]).append(anchor)


def apply_edits(turns, edits):
    result = copy.deepcopy(turns)
    by_id = {t['id']:t for t in result}
    log=[]
    # Repair turn boundaries before changing wording. Moves/joins conserve all
    # source words; original IDs and anchors remain available in the raw edition.
    for e in edits.get('speakers',[]):
        t=by_id[e['turn_id']]
        if t['speaker']!=e['before'] or not e.get('evidence'):
            raise ValueError(f'Speaker correction failed validation: {e}')
        t['speaker']=e['after']
        log.append({**e,'kind':'speaker'})
    for e in edits.get('boundaries',[]):
        a,b=by_id[e['from']],by_id[e['to']]
        if result.index(b)!=result.index(a)+1 or not e.get('evidence'):
            raise ValueError('Boundary move must be forward to the adjacent turn, with evidence')
        phrase=e['text']
        if not a['text'].endswith(phrase) or not a['word_ids']:
            raise ValueError(f'Boundary suffix does not match: {e}')
        count=e['word_count']
        if count<1 or count>len(a['word_ids']):
            raise ValueError('Invalid boundary word count')
        b['word_ids']=a['word_ids'][-count:]+b['word_ids']
        a['word_ids']=a['word_ids'][:-count]
        b['text']=phrase+' '+b['text'];a['text']=a['text'][:-len(phrase)].rstrip()
        log.append({**e,'turn_id':b['id'],'kind':'boundary'})
    for e in edits.get('joins',[]):
        group=[by_id[i] for i in e['turn_ids']]
        indexes=[result.index(t) for t in group]
        if indexes!=list(range(indexes[0],indexes[0]+len(group))) or not e.get('evidence'):
            raise ValueError('Join must use adjacent turns in chronological order with evidence')
        if len({t['speaker'] for t in group})!=1:
            raise ValueError('Correct speaker labels explicitly before joining turns')
        first=group[0]
        first['text']=' '.join(t['text'] for t in group)
        first['end']=max(t['end'] for t in group)
        first['word_ids']=[w for t in group for w in t['word_ids']]
        first['source_turn_ids']=[t['id'] for t in group]
        first['alias_anchors']=list(dict.fromkeys(t['anchor'] for t in group[1:] if t['anchor']!=first['anchor']))
        for t in group[1:]:
            t.update(text='',word_ids=[],merged_into=first['id'])
        log.append({**e,'turn_id':first['id'],'kind':'join'})
    for e in edits.get('restorations',[]):
        t=by_id[e['turn_id']]
        if not e.get('evidence') or not e.get('source_file') or not e.get('words'):
            raise ValueError('Restored speech needs a saved recognizer output and timed words')
        previous=t['end']; restored=[]
        for i,w in enumerate(e['words']):
            if w['start']<previous or w['end']<w['start']:
                raise ValueError('Restored words must follow the passage in time')
            previous=w['end']
            restored.append({**w,'id':f'restored-{t["id"]}-{i:04d}',
                             'text':w['word'].strip(),'track_id':e['track_id'],'speaker':t['speaker']})
        t['text']+=' '+' '.join(w['text'] for w in restored)
        t['end']=restored[-1]['end'];t['restored_words']=restored
        t['word_ids'] += [w['id'] for w in restored]
        log.append({**e,'kind':'restoration'})
    # Recognition corrections and speaker corrections are separate from style edits.
    for e in edits.get('corrections',[]):
        t=by_id[e['turn_id']]
        if e['before'] not in t['text'] or not e.get('evidence'):
            raise ValueError(f'Correction lacks matching text/evidence: {e}')
        old=t['text']
        t['text']=old.replace(e['before'],e['after'],1)
        log.append({**e,'kind':'recognition','before_turn':old,'after_turn':t['text']})
    corrected=copy.deepcopy(result)
    for e in edits.get('reading',[]):
        t=by_id[e['turn_id']]
        before=t['text']
        if not e.get('reason'):
            raise ValueError('Reading edits need a reason')
        if 'text' in e:
            after=e['text']
        else:
            after=before
            for phrase in e['remove']:
                if phrase not in after:
                    raise ValueError(f'Reading deletion not found in {t["id"]}: {phrase!r}')
                after=after.replace(phrase,'',1)
            after=re.sub(r'\s+',' ',after).strip()
        if not is_subtractive(before,after):
            raise ValueError(f'Reading edition adds or reorders words in {t["id"]}')
        t['text']=after
        if before==after:
            continue
        log.append({**e,'kind':'reading','before_turn':before,'after_turn':after})
    return corrected,result,log


def validate_editorial(editorial, turns):
    by_id={t['id']:t for t in turns}
    for item in editorial.get('titles',[])+editorial.get('headings',[]):
        t=by_id[item['turn_id']]
        phrase=' '.join(norm(item['source_quote']))
        if phrase not in ' '.join(norm(t['text'])):
            raise ValueError(f'Editorial source quote not found: {item}')
        if item['kind']=='verbatim' and norm(item['text'])!=norm(item['source_quote']):
            raise ValueError(f'Verbatim label is inaccurate: {item}')
        if item['kind'] not in ('verbatim','near-verbatim'):
            raise ValueError('Editorial phrase needs an explicit provenance kind')
    for sentence in editorial.get('description',[]):
        if not sentence.get('turn_ids') or not sentence.get('kind'):
            raise ValueError('Description sentences need passage references and editorial kind')
        for tid in sentence['turn_ids']:
            if tid not in by_id:
                raise ValueError(f'Description references missing passage {tid}')


def assemble(args):
    root=Path(args.episode)
    m=read(root/'manifest.json')
    for t in m['tracks']:
        if hashlib.sha256((root/t['audio']).read_bytes()).hexdigest()!=t['sha256']:
            raise ValueError('Input audio changed; create a new episode version')
    raw={t['id']:read(root/'raw'/f'{t["id"]}.json') for t in m['tracks']}
    segments=read(root/'raw'/'diarization.json')['segments'] if m['mode']=='mixed' else []
    words=make_words(m,raw,segments)
    snapshot={'raw_sha256':{k:hashlib.sha256(json.dumps(v,sort_keys=True).encode()).hexdigest()
                             for k,v in raw.items()}}
    snapshot_path=root/'raw-snapshot.json'
    if snapshot_path.exists() and read(snapshot_path)!=snapshot:
        raise ValueError('Raw transcript changed; create a new episode version')
    if not snapshot_path.exists():
        save(snapshot_path,snapshot)
    turns_path=root/'raw-turns.json'
    if turns_path.exists():
        # Frozen turn IDs/anchors survive every editorial rebuild.
        turns=read(turns_path)
        if sorted(w for t in turns for w in t['word_ids']) != sorted(w['id'] for w in words):
            raise ValueError('Raw words changed; create a new episode version instead of moving anchors')
    else:
        turns=make_turns(words)
        save(turns_path,turns)
    edits=read(root/'edits.json') if (root/'edits.json').exists() else {}
    corrected,reading,log=apply_edits(turns,edits)
    preserve_reading_anchors(reading)
    for t in corrected:
        words.extend(t.get('restored_words',[]))
    for e in edits.get('restorations',[]):
        if not (root/e['source_file']).is_file():
            raise ValueError('Missing restoration source file')
        source=read(root/e['source_file'])
        offset=source['clip_start_seconds']
        source_words={(w['word'].strip(),round(w['start']+offset,3),round(w['end']+offset,3))
            for s in source['result']['segments'] for w in s.get('words',[])}
        if any((w['word'].strip(),w['start'],w['end']) not in source_words for w in e['words']):
            raise ValueError('Restored speech must match the saved excerpt words and times')
    # Boundaries can move the first/last word while canonical links stay stable.
    timed={w['id']:w for w in words}
    for version in (corrected,reading):
        for t in version:
            if t['word_ids']:
                t['start']=min(timed[w]['start'] for w in t['word_ids'])
                t['end']=max(timed[w]['end'] for w in t['word_ids'])
    editorial=read(root/'editorial.json') if (root/'editorial.json').exists() else {}
    publication=read(root/'published.json') if (root/'published.json').exists() else None
    if editorial.get('mode')=='existing' and not publication:
        raise ValueError('Existing-episode review needs a published metadata snapshot')
    validate_editorial(editorial,corrected)
    issues=read(root/'review-notes.json') if (root/'review-notes.json').exists() else []
    for issue in issues:
        if issue['turn_id'] not in {t['id'] for t in turns}:
            raise ValueError('Review marker must reference a canonical turn')
    raw_by_id={t['id']:t for t in turns};corrected_by_id={t['id']:t for t in corrected}
    comparisons={t['id']:{'cleanup':text_diff(corrected_by_id[t['id']]['text'],t['text']),
        'recognition':text_diff(' '.join(raw_by_id[i]['text'] for i in t.get('source_turn_ids',[t['id']])),corrected_by_id[t['id']]['text'])}
        for t in reading}
    for e in edits.get('reading',[]):
        if e.get('semantic_review'):
            comparisons[e['turn_id']]['cleanup']['review_note']=e['semantic_review']
    review_revision=hashlib.sha256(json.dumps({'corrected':corrected,'issues':issues},sort_keys=True).encode()).hexdigest()[:16]
    data={'manifest':m,'state':'review_draft','words':words,'raw':turns,'corrected':corrected,
          'publication':publication,'comparisons':comparisons,'review_revision':review_revision,
          'reading':reading,'edits':log,'editorial':editorial,'review':issues,
          'stats':{'words':sum(len(t['word_ids']) for t in turns),'turns':len(turns),'reading_words':sum(len(norm(t['text'])) for t in reading),
                   'raw_lexical_words':sum(len(norm(t['text'])) for t in turns),
                   'open_review_items':sum(x.get('state','open')=='open' for x in issues)}}
    save(root/'episode.json',data)
    headings={h['turn_id']:h['text'] for h in editorial.get('headings',[])}
    for label,version in [('raw',turns),('corrected',corrected),('reading',reading)]:
        lines=['# '+(publication['title'] if publication else editorial.get('working_title',m['episode_id'])),'',
               '> Pilot draft. See review-notes.json for unresolved passages.','']
        seen=set()
        for t in version:
            if label=='reading' and t['id'] in headings:
                lines += ['#### '+headings[t['id']],'']
            if t['text']:
                for anchor in [t['anchor']]+t.get('alias_anchors',[])+t.get('reading_alias_anchors',[]):
                    if anchor not in seen:
                        lines.append(f'<a id="{anchor}"></a>');seen.add(anchor)
                lines += [f'[{stamp(t["start"])}] **{t["speaker"]}:** {t["text"]}','']
        (root/f'{label}.md').write_text('\n'.join(lines))
    template=Path(__file__).with_name('review.html').read_text()
    compact=(Path(__file__).resolve().parents[2]/'src/remark-transcript-plugin/compact-reply.js').read_text().replace('export function', 'function')
    template=template.replace('/*__COMPACT_REPLY__*/',compact)
    payload=json.dumps(data,ensure_ascii=False).replace('<','\\u003c')
    (root/'index.html').write_text(template.replace('/*__EPISODE__*/',payload))
    (root/'editor.html').write_text(Path(__file__).with_name('editor.html').read_text())
    print(json.dumps(data['stats']))


def speaker_handoff_candidates(turns):
    """Locate rapid fragmented handoffs for listening, without proposing edits."""
    acknowledgments={'yeah','yes','okay','ok','right','cool','totally','sure','oh','wow','nice','mhm','mm','hmm'}
    candidates=[]
    cluster=[]

    def flush():
        if len(cluster)<3 or all(set(norm(t['text']))<=acknowledgments for t in cluster):
            return
        candidates.append({'kind':'speaker_handoff','priority':'listen',
            'start':cluster[0]['start'],'end':max(t['end'] for t in cluster),
            'turn_ids':[t['id'] for t in cluster],
            'context':[{'turn_id':t['id'],'anchor':t['anchor'],'speaker':t['speaker'],
                        'start':t['start'],'end':t['end'],'text':t['text']} for t in cluster],
            'note':'Rapid short speaker handoffs may contain sentence fragments or overlap. Listen before changing wording or speakers; this is not evidence of inaudibility.'})

    for turn in turns:
        short=0<len(norm(turn['text']))<=3
        if not short:
            flush();cluster=[]
            continue
        if cluster and (turn['speaker']==cluster[-1]['speaker'] or
                        turn['start']-cluster[-1]['end']>1):
            flush();cluster=[]
        cluster.append(turn)
    flush()
    return candidates


def audit(args):
    """Make review candidates, not assertions that audio is unintelligible."""
    root=Path(args.episode);m=read(root/'manifest.json')
    raw={t['id']:read(root/'raw'/f'{t["id"]}.json') for t in m['tracks']}
    segments=read(root/'raw'/'diarization.json')['segments'] if m['mode']=='mixed' else []
    words=make_words(m,raw,segments); candidates=[]
    for track in m['tracks']:
        ws=[w for w in words if w['track_id']==track['id']]
        for a,b in zip(ws,ws[1:]):
            if b['start']-a['end']>2:
                speech=sum(max(0,min(b['start'],s['end'])-max(a['end'],s['start'])) for s in segments)
                candidates.append({'kind':'gap','start':a['end'],'end':b['start'],
                    'track_id':track['id'],'acoustic_speech_seconds':round(speech,2),
                    'priority':'listen' if speech>1 else 'check','note':'Gap in recognizer words; could be silence or omitted speech.'})
    if args.crosscheck:
        if m['mode']!='mixed':
            raise ValueError('Window cross-check currently supports one mixed recording')
        alternate=read(args.crosscheck)
        alternate_words=[w for s in alternate['segments'] for w in s.get('words',[])]
        for start in range(0,int(m['tracks'][0]['duration']),30):
            a=' '.join(w['text'] for w in words if start<=w['start']<start+30)
            b=' '.join(w['word'] for w in alternate_words if start<=w['start']<start+30)
            similarity=difflib.SequenceMatcher(None,norm(a),norm(b),autojunk=False).ratio()
            if similarity<.75 and (a or b):
                candidates.append({'kind':'model_disagreement','start':start,'end':start+30,
                    'similarity':round(similarity,3),'primary':a,'alternate':b,
                    'note':'Heuristic lexical difference, not calibrated accuracy or evidence of inaudibility.'})
    turns_path=root/'raw-turns.json'
    turns=read(turns_path) if turns_path.exists() else make_turns(words)
    candidates.extend(speaker_handoff_candidates(turns))
    save(root/'audit.json',{'candidates':candidates,'notes':'Review candidates only. Do not auto-correct from model agreement.'})
    print(f'{len(candidates)} candidates saved to {root/"audit.json"}')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    sub=parser.add_subparsers(dest='command',required=True)
    p=sub.add_parser('ingest');p.add_argument('episode')
    source=p.add_mutually_exclusive_group(required=True)
    source.add_argument('--audio');source.add_argument('--track',action='append',default=[])
    p.add_argument('--offset',action='append',default=[]);p.set_defaults(run=ingest)
    for name,fn in [('transcribe',transcribe),('diarize',diarize)]:
        p=sub.add_parser(name);p.add_argument('episode');p.add_argument('--model',required=True);p.set_defaults(run=fn)
        if name=='diarize':p.add_argument('--stream-audio',action='store_true')
    p=sub.add_parser('assemble');p.add_argument('episode');p.set_defaults(run=assemble)
    p=sub.add_parser('audit');p.add_argument('episode');p.add_argument('--crosscheck');p.set_defaults(run=audit)
    p=sub.add_parser('crosscheck');p.add_argument('episode');p.add_argument('--model',required=True)
    p.add_argument('--device',default='cpu');p.set_defaults(run=crosscheck)
    p=sub.add_parser('recheck');p.add_argument('episode');p.add_argument('--model',required=True)
    p.add_argument('--track',default='track-0');p.add_argument('--start',type=float,required=True)
    p.add_argument('--end',type=float,required=True);p.set_defaults(run=recheck)
    args=parser.parse_args();args.run(args)


if __name__=='__main__':
    main()
