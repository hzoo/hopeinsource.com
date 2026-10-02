import { expect, test } from 'bun:test';
import { getPassageResults } from './search';

const anchors = [
  { id: 'msg-21', element: 'h2', text: '[0:21] Henry:', location: 1 },
  { id: 'msg-21-2', element: 'h2', text: '[0:21] Nadia:', location: 5 },
  { id: 'msg-42', element: 'h2', text: '[0:42] Henry:', location: 9 },
];

test('search preserves repeated-timestamp URLs and scopes text to the exact message', () => {
  const result = {
    url: '/episode',
    meta: { title: 'Episode' },
    excerpt: 'Red apples. Green apples.',
    raw_content: 'Episode. [0:21] Henry: Red apples. [0:21] Nadia: Green apples. [0:42] Henry: Pears only.',
    anchors,
    sub_results: [
      { url: '/episode#msg-21', anchor: anchors[0], locations: [4], excerpt: '[0:21] Henry: Red <mark>apples.</mark>' },
      { url: '/episode#msg-21-2', anchor: anchors[1], locations: [8], excerpt: '[0:21] Nadia: Green <mark>apples.</mark>' },
    ],
  };

  const [summary, first, second] = getPassageResults(result);
  expect(summary.url).toBe('/episode');
  expect(summary.locations).toEqual([]);
  expect(first.url).toBe('/episode#msg-21');
  expect(first.raw_content).toBe('Red apples.');
  expect(second.url).toBe('/episode#msg-21-2');
  expect(second.raw_content).toBe('Green apples.');
  expect(second.excerpt).toBe('Green <mark>apples.</mark>');
  expect(second.meta.seconds).toBe('21');
});

test('title matches remain episode links and never become invented passage links', () => {
  const result = {
    url: '/episode',
    meta: { title: 'Episode' },
    excerpt: '<mark>Episode</mark>',
    sub_results: [{ url: '/episode', excerpt: '<mark>Episode</mark>', locations: [0] }],
  };
  expect(getPassageResults(result)).toEqual([
    { url: '/episode', meta: result.meta, excerpt: '', locations: [] },
  ]);
});

test('encoded speaker labels are removed without stripping body text or highlights', () => {
  const anchor = { id: 'msg-0', element: 'h2', text: '[0:00] Henry & Guest:', location: 1 };
  const results = getPassageResults({
    url: '/episode',
    meta: { title: 'Episode' },
    excerpt: '',
    raw_content: 'Episode. [0:00] Henry &amp; Guest: Words matter.',
    anchors: [anchor],
    sub_results: [{ url: '/episode#msg-0', anchor, locations: [5], excerpt: '[0:00] Henry &amp; Guest: <mark>Words</mark> matter.' }],
  });
  expect(results[1].excerpt).toBe('<mark>Words</mark> matter.');
  expect(results[1].raw_content).toBe('Words matter.');
});

test('synthetic speaker headings do not become transcript text matches', () => {
  const results = getPassageResults({
    url: '/episode',
    meta: { title: 'Episode' },
    excerpt: '',
    raw_content: 'Episode. [0:21] Henry: Red apples.',
    anchors: [anchors[0]],
    sub_results: [{ url: '/episode#msg-21', anchor: anchors[0], locations: [2], excerpt: '[0:21] <mark>Henry:</mark> Red apples.' }],
  });
  expect(results).toHaveLength(1);
  expect(results[0].locations).toEqual([]);
});
