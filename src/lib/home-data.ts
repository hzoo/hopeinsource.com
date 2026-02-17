import type { TranscriptLine } from "./content-extraction";

export function nearestTranscriptLine(
  lines: TranscriptLine[],
  seconds: number,
): TranscriptLine | null {
  if (lines.length === 0) return null;
  let best = lines[0];
  let bestDistance = Math.abs(lines[0].seconds - seconds);
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    const distance = Math.abs(line.seconds - seconds);
    if (distance < bestDistance) {
      best = line;
      bestDistance = distance;
    }
  }
  return best;
}

export function stableHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function convoSide(
  speaker: string,
  slug: string,
  seconds: number,
): "sent" | "received" {
  const seed = stableHash(`${speaker}:${slug}:${seconds}`) / 4294967295;
  if (speaker === "Henry") return seed < 0.82 ? "sent" : "received";
  return seed < 0.72 ? "received" : "sent";
}

export function buildBodyMap(
  rawFiles: Record<string, string>,
): Map<string, string> {
  const bodyMap = new Map<string, string>();
  for (const [path, content] of Object.entries(rawFiles)) {
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";
    const bodyStart = content.indexOf("---", 3);
    const body = bodyStart >= 0 ? content.slice(bodyStart + 3).trim() : content;
    bodyMap.set(slug, body);
  }
  return bodyMap;
}
