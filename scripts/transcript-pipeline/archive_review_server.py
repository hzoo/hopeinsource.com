"""Local-only passage review server with durable decisions and seekable audio."""
import argparse
from datetime import datetime, timezone
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import re
import tempfile
import threading

PROJECT = Path(__file__).resolve().parents[2]
LOCK = threading.Lock()


def save_decision(directory, value, project=PROJECT):
    if not isinstance(value, dict):
        raise ValueError('Invalid decision')
    queue = json.loads((directory / 'review.json').read_text())
    item = next((i for i in queue['items'] if i['id'] == value.get('id')), None)
    if not item or value.get('item_revision') != item['revision']:
        raise ValueError('This passage changed. Reload before saving.')
    source = (project / item['path']).resolve()
    if not source.is_relative_to((project / 'src/content/podcast').resolve()):
        raise ValueError('Invalid source path')
    if hashlib.sha256(source.read_bytes()).hexdigest() != item['source_sha256']:
        raise ValueError('The source transcript changed. Rebuild the review queue.')
    if value.get('state') not in {'draft', 'accepted', 'kept', 'skipped'}:
        raise ValueError('Invalid decision')
    for key, maximum in [('text', 50000), ('replacement', 50000), ('speaker', 120)]:
        if not isinstance(value.get(key), str) or len(value[key]) > maximum:
            raise ValueError('Invalid correction')
    if not value['speaker'].strip() or not isinstance(value.get('full_edit'), bool):
        raise ValueError('Invalid speaker or edit mode')
    if value['state'] == 'kept' and (value['text'] != item['original'] or value['speaker'] != item['speaker']):
        raise ValueError('Keep must retain the original passage')
    if not value['full_edit'] and value['state'] != 'kept':
        quote = item['quote']
        start = item['original'].lower().find(quote.lower())
        unique = start >= 0 and item['original'].lower().find(quote.lower(), start + 1) < 0
        end = start + len(quote) if unique else len(item['original'])
        start = start if unique else 0
        expected = item['original'][:start] + value['replacement'] + item['original'][end:]
        if expected != value['text']:
            raise ValueError('Correction does not match the selected phrase')
    decision = {key: value[key] for key in ['id', 'item_revision', 'state', 'text', 'replacement', 'speaker', 'full_edit']}
    decision['updated_at'] = datetime.now(timezone.utc).isoformat()
    decision['source_sha256'] = item['source_sha256']
    decision['path'] = item['path']
    decision['anchor'] = item['anchor']
    decision['original'] = item['original']
    decision['quote'] = item['quote']
    target = directory / 'review-decisions.json'
    with LOCK:
        prior = json.loads(target.read_text()) if target.exists() else {'decisions': {}}
        prior['decisions'][item['id']] = decision
        with tempfile.NamedTemporaryFile(mode='w', dir=directory, delete=False) as file:
            json.dump(prior, file, indent=2, ensure_ascii=False)
            temporary = file.name
        os.replace(temporary, target)
    return decision


def make_handler(directory, project=PROJECT):
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(directory), **kwargs)

        def do_POST(self):
            if self.path != '/decision':
                self.send_error(404); return
            if self.headers.get('Origin') != 'http://' + self.headers.get('Host', ''):
                self.send_error(403); return
            try:
                size = int(self.headers.get('Content-Length', 0))
                if not 0 < size <= 200000:
                    raise ValueError('Invalid request size')
                save_decision(directory, json.loads(self.rfile.read(size)), project)
            except (ValueError, KeyError, TypeError, OSError) as error:
                self.send_response(409)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.end_headers()
                self.wfile.write(str(error).encode()); return
            self.send_response(204); self.end_headers()

        def end_headers(self):
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Accept-Ranges', 'bytes')
            super().end_headers()

        def send_head(self):
            self.remaining = None
            path = Path(self.translate_path(self.path))
            value = self.headers.get('Range', '')
            if not value or not path.is_file():
                return super().send_head()
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', value)
            size = path.stat().st_size
            if not match or not any(match.groups()):
                self.send_error(400, 'Unsupported range'); return None
            left, right = match.groups()
            start = int(left) if left else max(0, size - int(right))
            end = min(size - 1, int(right)) if left and right else size - 1
            if start >= size or end < start:
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers(); return None
            file = path.open('rb'); file.seek(start); self.remaining = end - start + 1
            self.send_response(206)
            self.send_header('Content-Type', self.guess_type(str(path)))
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            self.send_header('Content-Length', str(self.remaining))
            self.end_headers()
            return file

        def copyfile(self, source, outputfile):
            if self.remaining is None:
                return super().copyfile(source, outputfile)
            try:
                while self.remaining:
                    chunk = source.read(min(65536, self.remaining))
                    if not chunk: break
                    outputfile.write(chunk); self.remaining -= len(chunk)
            except (BrokenPipeError, ConnectionResetError):
                pass
    return Handler


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--port', type=int, default=8792)
    args = parser.parse_args()
    directory = args.directory.resolve()
    print(f'Review: http://127.0.0.1:{args.port}/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), make_handler(directory)).serve_forever()
