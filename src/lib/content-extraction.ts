import type { EnrichedEpisode } from "./episodes";

// ── Types ──────────────────────────────────────────────────

export interface TranscriptLine {
  timestamp: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface TopicCluster {
  topic: string;
  episodeSlugs: string[];
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

// ── First & Last Lines ─────────────────────────────────────

export function getFirstLastLines(
  lines: TranscriptLine[],
): { first: TranscriptLine; last: TranscriptLine } | null {
  if (lines.length < 2) return null;
  return { first: lines[0], last: lines[lines.length - 1] };
}

// ── Topic Derivation ───────────────────────────────────────

const TOPIC_VOCAB: Record<string, string[]> = {
  "Faith & Practice": [
    "faith", "prayer", "liturgy", "ritual", "advent", "communion",
    "sacred", "christian", "church", "worship", "spiritual",
  ],
  "Community & Belonging": [
    "community", "membership", "trust", "boundaries", "charity",
    "belonging", "neighbor", "together", "gathering", "authority",
    "leadership", "conversation",
  ],
  "Knowledge & Embodiment": [
    "knowledge", "embodied", "perception", "reality", "essence",
    "silence", "embodiment", "disembodiment", "feeling", "mastery",
    "learning", "research", "games",
  ],
  "Gift & Economy": [
    "gift", "money", "value", "free", "dorean", "economy",
    "giving", "sustainability", "sustain", "funding", "motivation",
    "intrinsic",
  ],
  "Time & Memory": [
    "legacy", "nostalgia", "history", "tradition", "hope",
    "burnout", "heritage", "preservation", "old", "memory",
    "uptime", "saving", "forever",
  ],
  "Technology & Limits": [
    "digital", "online", "artificial", "disembodiment", "convivial",
    "limits", "technology", "internet", "process", "standards",
    "speedrunning",
  ],
  "Language & Meaning": [
    "metaphor", "naming", "mythology", "symbolism", "language",
    "myth", "meaning", "word", "narrative", "evangelism",
  ],
};

function scoreEpisodeForTopic(
  ep: EnrichedEpisode,
  keywords: string[],
  bodyHeaders: string,
): number {
  const haystack = [
    ep.episodeTitle,
    ep.data.description,
    bodyHeaders,
  ]
    .join(" ")
    .toLowerCase();

  let hits = 0;
  for (const kw of keywords) {
    if (haystack.includes(kw)) hits++;
  }
  return hits;
}

/** Extract H4 headers from markdown body as a single searchable string */
function extractHeaders(body: string): string {
  const h4s: string[] = [];
  const re = /^####\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    h4s.push(m[1]);
  }
  return h4s.join(" ");
}

export function deriveTopics(
  episodes: EnrichedEpisode[],
  bodies: Map<string, string>,
): TopicCluster[] {
  const clusters: TopicCluster[] = [];
  const assigned = new Set<string>();

  for (const [topic, keywords] of Object.entries(TOPIC_VOCAB)) {
    const matching = episodes.filter((ep) => {
      const headers = extractHeaders(bodies.get(ep.slug) ?? "");
      return scoreEpisodeForTopic(ep, keywords, headers) >= 2;
    });
    if (matching.length > 0) {
      clusters.push({
        topic,
        episodeSlugs: matching.map((e) => e.slug),
      });
      for (const e of matching) assigned.add(e.slug);
    }
  }

  // Second pass: assign unassigned episodes to their best-fit topic
  const unassigned = episodes.filter((ep) => !assigned.has(ep.slug));
  for (const ep of unassigned) {
    const headers = extractHeaders(bodies.get(ep.slug) ?? "");
    let bestTopic = "";
    let bestScore = 0;
    for (const [topic, keywords] of Object.entries(TOPIC_VOCAB)) {
      const score = scoreEpisodeForTopic(ep, keywords, headers);
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }
    if (bestTopic) {
      const cluster = clusters.find((c) => c.topic === bestTopic);
      if (cluster) {
        cluster.episodeSlugs.push(ep.slug);
      }
    }
  }

  return clusters;
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
