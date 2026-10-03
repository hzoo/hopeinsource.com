/** Index the rendered transcript so every search result has a real passage anchor. */
import * as pagefind from "pagefind";
import { decodeHTML } from "entities";
import { mkdtemp, readdir, rename, rm, stat } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSearchVocabulary, vocabularyAsset } from "./search-vocabulary";

const BUILD_DIR = fileURLToPath(new URL("../dist/", import.meta.url));
const OUTPUT_DIR = join(BUILD_DIR, "pagefind");

interface RenderedMessage {
  anchor: string;
  seconds: number;
  speaker: string;
  text: string;
}

interface EpisodeSearchRecord {
  url: string;
  content: string;
  meta: { title: string; speaker: string; seconds: string; timestamp: string };
}

export async function extractEpisodeRecords(html: string, url: string): Promise<EpisodeSearchRecord[]> {
  let title = "";
  let headerTitle = "";
  const messages: RenderedMessage[] = [];
  let currentMessage: RenderedMessage | null = null;

  const rewriter = new HTMLRewriter()
    .on("title", {
      text(chunk) { title += chunk.text; },
    })
    .on("#chat-header h1", {
      text(chunk) { headerTitle += chunk.text; },
    })
    .on(".message[id][data-speaker]", {
      element(element) {
        const anchor = element.getAttribute("id") ?? "";
        const seconds = Number(element.getAttribute("data-timestamp"));
        if (!/^msg-\d+(?:\.\d+)?(?:-\d+)?$/.test(anchor) || !Number.isFinite(seconds) || seconds < 0) {
          throw new Error(`Invalid rendered passage in ${url}: ${anchor}`);
        }
        currentMessage = {
          anchor,
          seconds,
          speaker: decodeHTML(element.getAttribute("data-speaker") ?? "").trim(),
          text: "",
        };
        messages.push(currentMessage);
        element.onEndTag(() => { currentMessage = null; });
      },
    })
    .on(".message-text", {
      element() { if (currentMessage) currentMessage.text += " "; },
      text(chunk) { if (currentMessage) currentMessage.text += chunk.text; },
    })
    .on(".message-text br", {
      element() { if (currentMessage) currentMessage.text += " "; },
    });

  // Consume the transformed response: HTMLRewriter handlers run while it streams.
  await rewriter.transform(new Response(html)).text();
  const episodeTitle = decodeHTML(title || headerTitle).trim();
  if (messages.length && !episodeTitle) throw new Error(`Missing episode title in ${url}`);

  return messages.flatMap(message => {
    const text = decodeHTML(message.text).replace(/\s+/g, " ").trim();
    if (!text) return [];
    return [{
      url: `${url}#${message.anchor}`,
      content: text,
      meta: {
        title: episodeTitle,
        speaker: message.speaker,
        seconds: String(message.seconds),
        timestamp: formatTimestamp(message.seconds),
      },
    }];
  });
}

/** Virtual headings retain canonical passage boundaries without changing the reading UI. */
export function createEpisodeSearchHtml(records: EpisodeSearchRecord[]): string {
  const title = records[0]?.meta.title ?? "";
  const episodeRoute = Bun.escapeHTML(records[0]?.url.split("#")[0] ?? "");
  const speakers = Bun.escapeHTML(JSON.stringify(records.map(record => record.meta.speaker)));
  const passages = records.map(record => {
    const anchor = record.url.split("#")[1] ?? "";
    return `<h2 id="${Bun.escapeHTML(anchor)}"></h2><p>${Bun.escapeHTML(record.content)}</p>`;
  }).join("\n");
  return `<html lang="en"><head><meta data-pagefind-meta="passage_speakers[content]" content="${speakers}"><meta data-pagefind-filter="episode[content]" content="${episodeRoute}"></head><body data-pagefind-body><h1 data-pagefind-meta="title">${Bun.escapeHTML(title)}</h1>${passages}</body></html>`;
}

function formatTimestamp(seconds: number): string {
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

async function getHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "pagefind" || entry.name === "_astro") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await getHtmlFiles(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files.sort();
}

export function pageUrl(filePath: string): string {
  const path = relative(BUILD_DIR, filePath).split(sep).join("/");
  return path.endsWith("/index.html") ? `/${dirname(path)}/` : `/${path.replace(/index\.html$|\.html$/g, "")}`;
}

async function main() {
  await stat(join(BUILD_DIR, "index.html")).catch(() => {
    throw new Error("Build the website before indexing search: bun run build");
  });
  const { index, errors } = await pagefind.createIndex();
  if (!index || errors.length) throw new Error(`Failed to create Pagefind index: ${errors.join("; ")}`);
  const tempDir = await mkdtemp(join(BUILD_DIR, ".pagefind-"));

  try {
    let totalMessages = 0;
    let totalEpisodes = 0;
    const vocabularyRecords: EpisodeSearchRecord[] = [];
    for (const filePath of await getHtmlFiles(BUILD_DIR)) {
      const records = await extractEpisodeRecords(await Bun.file(filePath).text(), pageUrl(filePath));
      if (!records.length) continue;
      vocabularyRecords.push(...records);
      totalEpisodes++;
      const result = await index.addHTMLFile({ url: pageUrl(filePath), content: createEpisodeSearchHtml(records) });
      if (result.errors.length) throw new Error(`Failed to index ${filePath}: ${result.errors.join("; ")}`);
      totalMessages += records.length;
    }
    if (!totalMessages) throw new Error("No rendered transcript passages found; search index was not replaced");
    const result = await index.writeFiles({ outputPath: tempDir });
    if (result.errors.length) throw new Error(`Failed to write search: ${result.errors.join("; ")}`);
    const vocabulary = vocabularyAsset(buildSearchVocabulary(vocabularyRecords));
    await Bun.write(join(tempDir, vocabulary.filename), vocabulary.content);
    await Bun.write(join(tempDir, "vocabulary.json"), vocabulary.manifest);
    await rm(OUTPUT_DIR, { recursive: true, force: true });
    await rename(tempDir, OUTPUT_DIR);
    console.log(`Search indexed ${totalMessages} canonical passages in ${totalEpisodes} episodes`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
    await index.deleteIndex();
    await pagefind.close();
  }
}

if (import.meta.main) {
  main().catch(error => {
    console.error("Failed to build search index:", error);
    process.exitCode = 1;
  });
}
