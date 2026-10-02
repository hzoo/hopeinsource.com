/** Verify the generated site's links, assets, landmarks, and canonical anchors. */
import { readdir } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import { decodeHTML } from "entities";
import { parseTimeHash } from "../src/scripts/time-hash";

const root = resolve(import.meta.dir, "../dist");
const origin = "https://hopeinsource.com";

async function filesIn(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return nested.flat();
}

const files = await filesIn(root);
const paths = new Set(files.map(file => `/${relative(root, file)}`));
const pages = new Map<string, { ids: Set<string>; links: string[]; assets: string[] }>();
const errors: string[] = [];
let passages = 0;

for (const file of files.filter(file => file.endsWith(".html"))) {
  const path = relative(root, file);
  const route = path === "index.html" ? "/" : path.endsWith("/index.html")
    ? `/${dirname(path)}` : `/${path.slice(0, -5)}`;
  const page = { ids: new Set<string>(), links: [] as string[], assets: [] as string[] };
  let titles = 0;
  let mains = 0;
  const rewriter = new HTMLRewriter()
    .on("[id]", { element(element) {
      const id = decodeHTML(element.getAttribute("id") ?? "");
      if (page.ids.has(id)) errors.push(`${route}: duplicate id ${id}`);
      page.ids.add(id);
    } })
    .on("h1", { element() { titles++; } })
    .on("main", { element() { mains++; } })
    .on(".message[id][data-timestamp]", { element() { passages++; } })
    .on("a[href]", { element(element) { page.links.push(decodeHTML(element.getAttribute("href") ?? "")); } })
    .on("[src]", { element(element) { page.assets.push(decodeHTML(element.getAttribute("src") ?? "")); } })
    .on('link[rel="stylesheet"]', { element(element) { page.assets.push(decodeHTML(element.getAttribute("href") ?? "")); } });
  await rewriter.transform(new Response(await Bun.file(file).text())).text();
  if (titles !== 1) errors.push(`${route}: expected one h1, found ${titles}`);
  if (mains !== 1) errors.push(`${route}: expected one main, found ${mains}`);
  pages.set(route, page);
}

for (const [route, page] of pages) {
  for (const reference of [...page.links, ...page.assets]) {
    let url: URL;
    try { url = new URL(reference, `${origin}${route}`); }
    catch { errors.push(`${route}: invalid URL ${reference}`); continue; }
    if (url.origin !== origin) continue;
    const path = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
    const target = pages.get(path) ?? (path.endsWith(".html") ? pages.get(path.slice(0, -5)) : undefined);
    if (!target) {
      if (!paths.has(path)) errors.push(`${route}: missing file or page ${reference}`);
      continue;
    }
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (anchor.startsWith("t=")) {
      if (!parseTimeHash(`#${anchor}`)) errors.push(`${route}: invalid time link ${reference}`);
    } else if (anchor && !target.ids.has(anchor)) {
      errors.push(`${route}: missing anchor ${reference}`);
    }
  }
}

if (files.length > 20_000) errors.push(`Deployment has ${files.length} files, above the Pages direct-upload limit`);
const largest = Math.max(...files.map(file => Bun.file(file).size));
if (largest > 25 * 1024 * 1024) errors.push(`Deployment contains an asset above the Pages 25 MiB limit`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${pages.size} pages, ${passages} passages, and ${files.length} deployment files; all local links and assets resolve`);
}
