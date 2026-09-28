// ── Types ──────────────────────────────────────────────────

export interface TranscriptLine {
  timestamp: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface EpisodeQuestion {
  question: string;
  slug: string;
  episodeTitle: string;
  source: "description";
}

// ── Transcript Parsing ─────────────────────────────────────

const TRANSCRIPT_RE =
  /\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*\*\*([^*:]+):?\*\*:?\s*(.+)/g;

export function timestampToSeconds(ts: string): number {
  const parts = ts.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function parseTranscript(body: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  let m: RegExpExecArray | null;
  // Reset lastIndex for safety
  TRANSCRIPT_RE.lastIndex = 0;
  while ((m = TRANSCRIPT_RE.exec(body)) !== null) {
    lines.push({
      timestamp: m[1],
      seconds: timestampToSeconds(m[1]),
      speaker: m[2].trim(),
      text: stripMarkdownLinks(m[3].trim()),
    });
  }
  return lines;
}

// ── Question Extraction ────────────────────────────────────

/** Returns question from the first description sentence when it ends with ? */
export function extractQuestions(
  slug: string,
  episodeTitle: string,
  description: string,
): EpisodeQuestion[] {
  const descMatch = description.match(/^(.+?\?)\s/);
  if (descMatch) {
    return [{ question: descMatch[1], slug, episodeTitle, source: "description" }];
  }

  return [];
}
