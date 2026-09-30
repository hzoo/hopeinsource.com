"""Select an installed inference runtime from config, without installing or uploading."""
import argparse
import json
import os
from pathlib import Path
import subprocess
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--config',type=Path,required=True)
p.add_argument('stage',choices=['transcribe','diarize','crosscheck','recheck'])
p.add_argument('episode',type=Path)
p.add_argument('--track',default='track-0');p.add_argument('--start',type=float);p.add_argument('--end',type=float)
a=p.parse_args();config=json.loads(a.config.read_text())['transcribe' if a.stage=='recheck' else a.stage]
command=[config['python'],str(Path(__file__).with_name('pipeline.py')),a.stage,str(a.episode),'--model',config['model']]
if a.stage=='recheck':
    if a.start is None or a.end is None:p.error('recheck requires --start and --end on the episode timeline')
    command+=['--track',a.track,'--start',str(a.start),'--end',str(a.end)]
if a.stage=='crosscheck':command+=['--device',config.get('device','cpu')]
if a.stage=='diarize' and config.get('stream_audio'):
    command+=['--stream-audio']
env={**os.environ,'HF_HUB_OFFLINE':'1','HF_HUB_DISABLE_TELEMETRY':'1'}
raise SystemExit(subprocess.call(command,env=env))
