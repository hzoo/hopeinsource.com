export interface ParsedTimeHash {
  seconds: number;
  canonicalHash: string;
}

function parseClockParts(value: string): number | null {
  const parts = value.split(":");
  if (parts.length === 2) {
    const [minutesRaw, secondsRaw] = parts;
    if (!/^\d+$/.test(minutesRaw) || !/^\d{2}$/.test(secondsRaw)) return null;
    const minutes = Number.parseInt(minutesRaw, 10);
    const seconds = Number.parseInt(secondsRaw, 10);
    if (seconds >= 60) return null;
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hoursRaw, minutesRaw, secondsRaw] = parts;
    if (!/^\d+$/.test(hoursRaw) || !/^\d{2}$/.test(minutesRaw) || !/^\d{2}$/.test(secondsRaw)) {
      return null;
    }
    const hours = Number.parseInt(hoursRaw, 10);
    const minutes = Number.parseInt(minutesRaw, 10);
    const seconds = Number.parseInt(secondsRaw, 10);
    if (minutes >= 60 || seconds >= 60) return null;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
}

export function parseTimeValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) {
    const seconds = Number.parseInt(trimmed, 10);
    return Number.isSafeInteger(seconds) ? seconds : null;
  }

  const seconds = parseClockParts(trimmed);
  return seconds !== null && Number.isSafeInteger(seconds) ? seconds : null;
}

export function parseTimeHash(hash: string): ParsedTimeHash | null {
  if (!hash.startsWith("#t=")) return null;
  const seconds = parseTimeValue(hash.slice(3));
  if (seconds === null) return null;
  return {
    seconds,
    canonicalHash: `#t=${seconds}`,
  };
}

interface TimePoint<T> {
  time: number;
  el: T;
}

const transcriptTimePoints = new WeakMap<HTMLElement, TimePoint<HTMLElement>[]>();

export function getTranscriptTimePoints(transcript: HTMLElement): readonly TimePoint<HTMLElement>[] {
  let points = transcriptTimePoints.get(transcript);
  if (!points) {
    points = Array.from(transcript.querySelectorAll<HTMLElement>('.message[id][data-timestamp]'), el => ({
      time: Number.parseInt(el.dataset.timestamp ?? '', 10),
      el,
    })).filter(point => Number.isFinite(point.time)).sort((a, b) => a.time - b.time);
    transcriptTimePoints.set(transcript, points);
  }
  return points;
}

export function findTimePointIndex(points: readonly TimePoint<unknown>[], seconds: number): number {
  let low = 0;
  let high = points.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (points[middle].time <= seconds) low = middle + 1;
    else high = middle - 1;
  }
  return high;
}

/** Exact timestamps win over aliases. Between passages, use the preceding turn. */
export function timeHashTarget<T extends { dataset: { timestamp?: string } }>(
  seconds: number,
  candidate: T | null,
  points: readonly TimePoint<T>[],
): T | undefined {
  if (candidate && parseTimeValue(candidate.dataset.timestamp ?? '') === seconds) return candidate;
  return points[Math.max(0, findTimePointIndex(points, seconds))]?.el;
}
