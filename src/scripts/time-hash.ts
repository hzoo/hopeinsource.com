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
    return Number.isFinite(seconds) ? seconds : null;
  }

  return parseClockParts(trimmed);
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
