/**
 * Custom Pagefind indexing script
 *
 * Indexes transcripts in 5-minute chunks to reduce file count.
 * Embeds [MM:SS] timestamps in content so client can extract exact anchors.
 * - Direct URL: /{slug} (base, client rewrites to exact anchor)
 * - Content: [MM:SS] Speaker: text...
 * - Metadata: title, speakers
 */

import * as pagefind from "pagefind";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const CONTENT_DIR = "src/content/podcast";
const OUTPUT_DIR = "dist/pagefind";
const BUCKET_SIZE_SECONDS = 120; // 2 minutes

// Match: [00:31] **Nadia:** Text here...
const timestampRegex = /^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*\*\*([^*]+)\*\*:?\s*(.*)/;
// Match: **Nadia:** Text here... (No timestamp)
const speakerRegex = /^\*\*([^*]+)\*\*:?\s*(.*)/;

interface Message {
  seconds: number;
  timestamp: string;
  speaker: string;
  text: string;
}

interface EpisodeFrontmatter {
  title: string;
  season: number;
  date: Date;
  description?: string;
}

function parseTimestamp(timestamp: string): number {
  const parts = timestamp.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] * 60 + parts[1];
}

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function parseTranscriptMessages(markdown: string): Message[] {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const messages: Message[] = [];

  let currentMessage: Message | null = null;
  let lastSeconds = 0;
  let lastTimestamp = "00:00";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const tsMatch = trimmed.match(timestampRegex);
    const speakerMatch = trimmed.match(speakerRegex);

    if (tsMatch) {
      if (currentMessage) messages.push(currentMessage);

      const [, timestamp, speaker, text] = tsMatch;
      const seconds = parseTimestamp(timestamp);

      lastSeconds = seconds;
      lastTimestamp = timestamp;

      currentMessage = {
        seconds,
        timestamp,
        speaker: speaker.replace(/:$/, "").trim(),
        text: text.trim(),
      };
    } else if (speakerMatch) {
      if (currentMessage) messages.push(currentMessage);

      const [, speaker, text] = speakerMatch;

      currentMessage = {
        seconds: lastSeconds,
        timestamp: lastTimestamp,
        speaker: speaker.replace(/:$/, "").trim(),
        text: text.trim(),
      };
    } else if (currentMessage) {
      if (!trimmed.startsWith("#") && !trimmed.startsWith("---")) {
        currentMessage.text += " " + trimmed;
      }
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
}

async function getEpisodeFiles(): Promise<string[]> {
  const files: string[] = [];

  async function walkDir(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  await walkDir(CONTENT_DIR);
  return files;
}

function getSlugFromPath(filePath: string): string {
  const filename = filePath.split("/").pop() || "";
  return filename.replace(/\.md$/, "");
}

async function main() {
  console.log("Building search index with 2-minute buckets...");

  const { index } = await pagefind.createIndex();
  if (!index) {
    console.error("Failed to create Pagefind index");
    process.exit(1);
  }

  const files = await getEpisodeFiles();
  console.log(`Found ${files.length} episode files`);

  let totalBuckets = 0;
  let totalMessages = 0;

  for (const filePath of files) {
    const content = await readFile(filePath, "utf-8");
    const { data, content: body } = matter(content);
    const frontmatter = data as EpisodeFrontmatter;
    const slug = getSlugFromPath(filePath);

    const messages = parseTranscriptMessages(body);
    totalMessages += messages.length;

    console.log(`  ${slug}: ${messages.length} msgs`);

    let currentBucketEnd = BUCKET_SIZE_SECONDS;
    let currentBucketMessages: Message[] = [];

    for (const msg of messages) {
      if (msg.seconds >= currentBucketEnd && currentBucketMessages.length > 0) {
        await indexBucket(index, slug, frontmatter, currentBucketMessages);
        totalBuckets++;

        currentBucketMessages = [];
        while (msg.seconds >= currentBucketEnd) {
          currentBucketEnd += BUCKET_SIZE_SECONDS;
        }
      }
      currentBucketMessages.push(msg);
    }

    if (currentBucketMessages.length > 0) {
      await indexBucket(index, slug, frontmatter, currentBucketMessages);
      totalBuckets++;
    }
  }

  console.log(`\nIndexed ${totalMessages} messages into ${totalBuckets} buckets`);
  console.log(`\nWriting index to ${OUTPUT_DIR}...`);
  const writeResult = await index.writeFiles({ outputPath: OUTPUT_DIR });

  if (writeResult.errors?.length) {
    console.error("Errors writing index:", writeResult.errors);
    process.exit(1);
  }

  await index.deleteIndex();
  await pagefind.close();

  console.log("Search index built successfully!");
}

async function indexBucket(
  index: any,
  slug: string,
  frontmatter: EpisodeFrontmatter,
  messages: Message[]
) {
  if (messages.length === 0) return;

  const startMsg = messages[0];
  const uniqueSpeakers = [...new Set(messages.map(m => m.speaker))];

  // IMPORTANT: Embed [MM:SS] in content so Pagefind excerpts include timestamps
  // This allows client-side extraction of exact anchor
  const fullText = messages.map(m =>
    `[${m.timestamp}] ${m.speaker}: ${m.text}`
  ).join("\n\n");

  // URL needs unique anchor so Pagefind doesn't deduplicate buckets
  // Client will rewrite to precise #msg-{seconds} based on excerpt
  const url = `/${slug}#bucket-${startMsg.seconds}`;
  const bucketTitle = `${frontmatter.title} (${startMsg.timestamp})`;

  const result = await index.addCustomRecord({
    url,
    content: fullText,
    language: "en",
    meta: {
      title: bucketTitle,
      speakers: uniqueSpeakers.join(", "),
      timestamp: startMsg.timestamp,
    },
    filters: {
      episode: [slug],
      speaker: uniqueSpeakers,
    },
  });

  if (result.errors?.length) {
    console.error(`  Error indexing bucket ${slug} at ${startMsg.timestamp}:`, result.errors);
  }
}

main().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
