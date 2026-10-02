import { expect, test } from 'bun:test';
import {
  READING_POSITION_KEY,
  findReadingMessageIndex,
  parseReadingPosition,
  readReadingPosition,
  readingAnchorForDestination,
  writeReadingPosition,
} from './reading-position';

const episodePaths = new Set(['/totems', '/snow']);
const position = { path: '/totems', anchor: '#msg-1539-2' };

test('reading progress accepts known episode paths and canonical occurrence anchors', () => {
  expect(parseReadingPosition(JSON.stringify(position), episodePaths)).toEqual(position);
  expect(parseReadingPosition('{"path":"/snow","anchor":"#msg-0"}', episodePaths)).toEqual({ path: '/snow', anchor: '#msg-0' });
});

test('reading progress rejects corrupt storage, external paths, unknown episodes, and non-message anchors', () => {
  for (const value of [null, 'oops', 'null', '[]', '{}', '{"path":12,"anchor":"#msg-1"}',
    '{"path":"https://example.com/totems","anchor":"#msg-1"}',
    '{"path":"//example.com","anchor":"#msg-1"}',
    '{"path":"/unknown","anchor":"#msg-1"}',
    '{"path":"/totems","anchor":"#t=1539"}',
    '{"path":"/totems","anchor":"#a-heading"}',
    '{"path":"/totems","anchor":"#msg-1<script>"}']) {
    expect(parseReadingPosition(value, episodePaths)).toBeNull();
  }
});

test('unavailable storage leaves reading and navigation usable', () => {
  const blocked = {
    getItem() { throw new Error('Storage blocked'); },
    setItem() { throw new Error('Storage blocked'); },
  };
  expect(readReadingPosition(null, episodePaths)).toBeNull();
  expect(readReadingPosition(blocked, episodePaths)).toBeNull();
  expect(writeReadingPosition(blocked, position)).toBeFalse();
  expect(writeReadingPosition(null, position)).toBeFalse();
});

test('reading storage contains only the local path and canonical anchor', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem(key: string) { return values.get(key) ?? null; },
    setItem(key: string, value: string) { values.set(key, value); },
  };
  expect(writeReadingPosition(storage, position)).toBeTrue();
  expect(values.get(READING_POSITION_KEY)).toBe(JSON.stringify(position));
  expect(readReadingPosition(storage, episodePaths)).toEqual(position);
});

test('an explicit canonical destination wins over the earlier passage still visible during scrolling', () => {
  const resolve = (id: string) => id === 'msg-1539-2' ? id : null;
  expect(readingAnchorForDestination('#msg-1539-2', '#msg-1515', resolve)).toBe('#msg-1539-2');
  expect(readingAnchorForDestination('#msg-99999', '#msg-1515', resolve)).toBeNull();
});

test('existing message aliases resolve to their outer canonical anchor', () => {
  expect(readingAnchorForDestination('#msg-3560.88', '#msg-3500',
    (id) => id === 'msg-3560.88' ? 'msg-3560' : null)).toBe('#msg-3560');
});

test('time and chapter destinations retain the passage reached by their own scroll', () => {
  expect(readingAnchorForDestination('#t=1539', '#msg-1539', () => null)).toBe('#msg-1539');
  expect(readingAnchorForDestination('#words-are-totems', '#msg-1515', () => null)).toBe('#msg-1515');
});

test('reading-position lookup uses logarithmic geometry reads even for a large transcript', () => {
  let reads = 0;
  const index = findReadingMessageIndex(10_000, (messageIndex) => { reads++; return { top: messageIndex * 50, bottom: messageIndex * 50 + 40 }; }, 123_450);
  expect(index).toBe(2469);
  expect(reads).toBeLessThanOrEqual(14);
  const bounds = (messageIndex: number) => ({ top: messageIndex * 50, bottom: messageIndex * 50 + 40 });
  expect(findReadingMessageIndex(3, bounds, -1)).toBe(0);
  expect(findReadingMessageIndex(3, bounds, 1000)).toBe(2);
  expect(findReadingMessageIndex(0, bounds, 0)).toBe(-1);
});

test('chapter and time-link gaps save the following passage instead of an offscreen message', () => {
  const chapterGap = [{ top: 70, bottom: 108 }, { top: 200, bottom: 260 }];
  const timeGap = [{ top: 80, bottom: 138 }, { top: 148, bottom: 240 }];
  expect(findReadingMessageIndex(chapterGap.length, (index) => chapterGap[index], 140)).toBe(1);
  expect(findReadingMessageIndex(timeGap.length, (index) => timeGap[index], 140)).toBe(1);
  expect(findReadingMessageIndex(chapterGap.length, (index) => chapterGap[index], 90)).toBe(0);
});
