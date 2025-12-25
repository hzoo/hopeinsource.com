/**
 * Custom Pagefind indexing script
 *
 * Indexes each transcript message as its own search result with:
 * - Direct URL: /{slug}/#msg-{seconds}
 * - Content: Speaker: message text
 * - Metadata: title, speaker, timestamp
 * - Filters: episode, speaker
 */

import * as pagefind from "pagefind";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const CONTENT_DIR = "src/content/podcast";
const OUTPUT_DIR = "dist/pagefind";

// Match: [00:31] **Nadia:** Text here...
const timestampRegex = /^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*\*\*([^*]+)\*\*:?\s*([\s\S]*)/;

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

function parseTranscriptMessages(markdown: string): Message[] {
  // Normalize line endings (CRLF -> LF)
  const normalized = markdown.replace(/\r\n/g, "\n");
  const paragraphs = normalized.split("\n\n");
  const messages: Message[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    const match = trimmed.match(timestampRegex);
    if (match) {
      const [, timestamp, speaker, text] = match;
      messages.push({
        seconds: parseTimestamp(timestamp),
        timestamp,
        speaker: speaker.replace(/:$/, "").trim(),
        text: text.trim().replace(/\n/g, " "),
      });
    }
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
  // src/content/podcast/season-1/authority.md -> authority (just the filename)
  const filename = filePath.split("/").pop() || "";
  return filename.replace(/\.md$/, "");
}

async function main() {
  console.log("Building search index...");

  const { index } = await pagefind.createIndex();
  if (!index) {
    console.error("Failed to create Pagefind index");
    process.exit(1);
  }

  const files = await getEpisodeFiles();
  console.log(`Found ${files.length} episode files`);

  let totalMessages = 0;
  const speakers = new Set<string>();

  for (const filePath of files) {
    const content = await readFile(filePath, "utf-8");
    const { data, content: body } = matter(content);
    const frontmatter = data as EpisodeFrontmatter;

    const slug = getSlugFromPath(filePath);
    const messages = parseTranscriptMessages(body);

    console.log(`  ${slug}: ${messages.length} messages`);

    for (const msg of messages) {
      speakers.add(msg.speaker);

      const result = await index.addCustomRecord({
        url: `/${slug}#msg-${msg.seconds}`,
        content: `${msg.speaker}: ${msg.text}`,
        language: "en",
        meta: {
          title: frontmatter.title,
          speaker: msg.speaker,
          timestamp: msg.timestamp,
        },
        filters: {
          episode: [slug],
          speaker: [msg.speaker],
        },
      });

      if (result.errors?.length) {
        console.error(`  Error indexing message:`, result.errors);
      }
    }

    totalMessages += messages.length;
  }

  console.log(`\nIndexed ${totalMessages} messages`);
  console.log(`Speakers: ${[...speakers].join(", ")}`);

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

main().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
