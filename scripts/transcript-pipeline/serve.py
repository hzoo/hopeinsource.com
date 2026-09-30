"""Serve the local review with byte ranges so long MP3 files can seek."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import json
import os
import tempfile

import argparse
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('directory',type=Path)
parser.add_argument('--port',type=int,default=8768)
args=parser.parse_args()
ROOT = args.directory.resolve()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        # Only same-origin JSON suggestions; never modify canonical transcript files.
        if self.path != '/review-decisions.json':
            self.send_error(404); return
        if self.headers.get('Origin') != 'http://' + self.headers.get('Host', ''):
            self.send_error(403); return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 2_000_000:
                raise ValueError('Invalid size')
            value = json.loads(self.rfile.read(size))
            episode = json.loads((ROOT/'episode.json').read_text())
            if (value.get('review_revision') != episode['review_revision'] or
                value.get('episode_id') != episode['manifest']['episode_id'] or
                value.get('audio_sha256') != [t['sha256'] for t in episode['manifest']['tracks']] or
                not isinstance(value.get('decisions'), dict)):
                raise ValueError('Stale or invalid review')
            with tempfile.NamedTemporaryFile(mode='w', dir=ROOT, delete=False) as file:
                json.dump(value, file, indent=2)
                temporary = file.name
            os.replace(temporary, ROOT/'review-decisions.json')
        except (ValueError, KeyError, TypeError):
            self.send_error(400, 'Invalid review'); return
        self.send_response(204)
        self.end_headers()

    def send_head(self):
        self.remaining = None
        path = Path(self.translate_path(self.path))
        value = self.headers.get('Range', '')
        if not value or not path.is_file():
            return super().send_head()
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', value)
        size = path.stat().st_size
        if not match or not any(match.groups()):
            self.send_error(400, 'Unsupported range')
            return None
        left, right = match.groups()
        start = int(left) if left else max(0, size-int(right))
        end = min(size-1, int(right)) if left and right else size-1
        if start >= size or end < start:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        file = path.open('rb')
        file.seek(start)
        self.remaining = end-start+1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(self.remaining))
        self.end_headers()
        return file

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def copyfile(self, source, outputfile):
        if self.remaining is None:
            return super().copyfile(source, outputfile)
        try:
            while self.remaining:
                chunk = source.read(min(65536, self.remaining))
                if not chunk:
                    break
                outputfile.write(chunk)
                self.remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError):
            pass


if __name__ == '__main__':
    print(f'Review: http://127.0.0.1:{args.port}/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
