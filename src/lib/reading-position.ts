export const READING_POSITION_KEY = 'his.reading-position';

export interface ReadingPosition {
  path: string;
  anchor: string;
}

type ReadingStorage = Pick<Storage, 'getItem' | 'setItem'>;
const episodePathPattern = /^\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const messageAnchorPattern = /^#msg-\d+(?:\.\d+)?(?:-\d+)?$/;

export function isCanonicalReadingAnchor(anchor: string): boolean {
  return anchor.length <= 96 && messageAnchorPattern.test(anchor);
}

export function parseReadingPosition(raw: string | null, episodePaths?: ReadonlySet<string>): ReadingPosition | null {
  if (!raw || raw.length > 512) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const { path, anchor } = value as Record<string, unknown>;
    if (typeof path !== 'string' || path.length > 128 || !episodePathPattern.test(path)) return null;
    if (episodePaths && !episodePaths.has(path)) return null;
    if (typeof anchor !== 'string' || !isCanonicalReadingAnchor(anchor)) return null;
    return { path, anchor };
  } catch {
    return null;
  }
}

export function readReadingPosition(storage: ReadingStorage | null, episodePaths?: ReadonlySet<string>): ReadingPosition | null {
  try {
    return parseReadingPosition(storage?.getItem(READING_POSITION_KEY) ?? null, episodePaths);
  } catch {
    return null;
  }
}

export function writeReadingPosition(storage: ReadingStorage | null, position: ReadingPosition): boolean {
  if (!storage || !parseReadingPosition(JSON.stringify(position))) return false;
  try {
    storage.setItem(READING_POSITION_KEY, JSON.stringify({ path: position.path, anchor: position.anchor }));
    return true;
  } catch {
    return false;
  }
}

/** An explicit passage destination takes precedence while its scroll is settling. */
export function readingAnchorForDestination(
  hash: string,
  visibleAnchor: string | null,
  resolveMessageId: (id: string) => string | null,
): string | null {
  if (hash.startsWith('#msg-')) {
    const id = resolveMessageId(hash.slice(1));
    const anchor = id ? `#${id}` : null;
    return anchor && isCanonicalReadingAnchor(anchor) ? anchor : null;
  }
  return visibleAnchor && isCanonicalReadingAnchor(visibleAnchor) ? visibleAnchor : null;
}

/** Read only logarithmically many message positions, rather than scanning a transcript. */
export function findReadingMessageIndex(
  count: number,
  getBounds: (index: number) => { top: number; bottom: number },
  readingLine: number,
): number {
  let low = 0;
  let high = count - 1;
  let current = -1;
  let currentBottom = -Infinity;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const bounds = getBounds(middle);
    if (bounds.top <= readingLine) {
      current = middle;
      currentBottom = bounds.bottom;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  if (current < 0) return count > 0 ? 0 : -1;
  // A chapter or spacing gap belongs to the following passage, not the one above it.
  return currentBottom < readingLine ? Math.min(current + 1, count - 1) : current;
}
