"""Exercise local saving and byte-range playback without touching pilot data."""
from contextlib import contextmanager
import hashlib
import http.client
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import tempfile
import threading
import unittest

from archive_review_server import make_handler
from serve import Handler


@contextmanager
def running(handler):
    class QuietHandler(handler):
        def log_message(self, *args):
            pass

    server = ThreadingHTTPServer(('127.0.0.1', 0), QuietHandler)
    thread = threading.Thread(target=server.serve_forever, kwargs={'poll_interval': .01})
    thread.start()
    try:
        yield server.server_address[1]
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


class ReviewServerContracts(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.addCleanup(self.temporary.cleanup)
        (self.root / 'audio.mp3').write_bytes(b'0123456789')
        source = self.root / 'src/content/podcast/example.md'
        source.parent.mkdir(parents=True)
        source.write_text('[00:01] **Henry:** An ambiguous word.')
        self.source = source
        self.item = {'id': 'example-1', 'revision': 'revision',
                     'path': str(source.relative_to(self.root)),
                     'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                     'original': 'An ambiguous word.', 'quote': 'ambiguous',
                     'speaker': 'Henry', 'anchor': 'msg-1'}
        (self.root / 'review.json').write_text(json.dumps({'items': [self.item]}))
        self.episode = {'review_revision': 'revision', 'manifest': {
            'episode_id': 'example', 'tracks': [{'sha256': 'audio-identity'}]}}
        (self.root / 'episode.json').write_text(json.dumps(self.episode))

    def handlers(self):
        # Standard SimpleHTTPRequestHandler accepts a directory argument.
        class EpisodeHandler(Handler):
            def __init__(inner, *args, **kwargs):
                super().__init__(*args, directory=str(self.root), **kwargs)

        return [EpisodeHandler, make_handler(self.root, self.root)]

    def request(self, port, method, path, body=None, headers=None):
        connection = http.client.HTTPConnection('127.0.0.1', port, timeout=3)
        try:
            connection.request(method, path, body=body, headers=headers or {})
            response = connection.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            connection.close()

    def test_both_servers_support_seeking_and_unsatisfiable_ranges(self):
        for handler in self.handlers():
            with self.subTest(handler=handler), running(handler) as port:
                for value, expected, content_range in [
                    ('bytes=2-5', b'2345', 'bytes 2-5/10'),
                    ('bytes=8-', b'89', 'bytes 8-9/10'),
                    ('bytes=-3', b'789', 'bytes 7-9/10'),
                ]:
                    status, headers, body = self.request(port, 'GET', '/audio.mp3', headers={'Range': value})
                    self.assertEqual(status, 206)
                    self.assertEqual(body, expected)
                    self.assertEqual(headers['Content-Range'], content_range)
                    self.assertEqual(headers['Cache-Control'], 'no-store')
                status, headers, body = self.request(port, 'GET', '/audio.mp3', headers={'Range': 'bytes=10-'})
                self.assertEqual(status, 416)
                self.assertEqual(headers['Content-Range'], 'bytes */10')
                self.assertEqual(body, b'')

    def test_invalid_json_shapes_and_cross_origin_saves_are_rejected(self):
        for handler, path, invalid_status in zip(self.handlers(), ['/review-decisions.json', '/decision'], [400, 409]):
            with self.subTest(handler=handler), running(handler) as port:
                origin = {'Origin': f'http://127.0.0.1:{port}', 'Content-Type': 'application/json'}
                for value in [[], None, 'invalid']:
                    status, _, _ = self.request(port, 'POST', path, json.dumps(value), origin)
                    self.assertEqual(status, invalid_status)
                status, _, _ = self.request(port, 'POST', path, '{}', {'Origin': 'https://example.com'})
                self.assertEqual(status, 403)
                self.assertFalse((self.root / 'review-decisions.json').exists())

    def test_episode_save_is_durable_and_stale_revisions_do_not_overwrite_it(self):
        value = {'review_revision': 'revision', 'episode_id': 'example',
                 'audio_sha256': ['audio-identity'], 'decisions': {'item': {'state': 'skipped'}}}
        with running(self.handlers()[0]) as port:
            origin = {'Origin': f'http://127.0.0.1:{port}'}
            status, _, _ = self.request(port, 'POST', '/review-decisions.json', json.dumps(value), origin)
            self.assertEqual(status, 204)
            saved = (self.root / 'review-decisions.json').read_bytes()
            status, _, _ = self.request(port, 'POST', '/review-decisions.json',
                                        json.dumps({**value, 'review_revision': 'old'}), origin)
            self.assertEqual(status, 400)
            self.assertEqual((self.root / 'review-decisions.json').read_bytes(), saved)

    def test_archive_save_keeps_source_unchanged_and_rejects_stale_source(self):
        value = {'id': self.item['id'], 'item_revision': 'revision', 'state': 'accepted',
                 'text': 'An audible word.', 'replacement': 'audible', 'speaker': 'Henry', 'full_edit': False}
        original = self.source.read_bytes()
        with running(self.handlers()[1]) as port:
            origin = {'Origin': f'http://127.0.0.1:{port}'}
            status, _, _ = self.request(port, 'POST', '/decision', json.dumps(value), origin)
            self.assertEqual(status, 204)
            self.assertEqual(self.source.read_bytes(), original)
            saved = (self.root / 'review-decisions.json').read_bytes()
            self.source.write_text('Changed source')
            status, _, _ = self.request(port, 'POST', '/decision', json.dumps(value), origin)
            self.assertEqual(status, 409)
            self.assertEqual((self.root / 'review-decisions.json').read_bytes(), saved)


if __name__ == '__main__':
    unittest.main()
