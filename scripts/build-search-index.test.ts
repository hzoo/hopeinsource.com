import { expect, test } from "bun:test";
import * as pagefind from "pagefind";
import { createEpisodeSearchHtml, extractEpisodeRecords } from "./build-search-index";

test("search records use rendered canonical anchors and decode only visible dialogue", async () => {
  const html = `<header id="chat-header"><h1>A &amp; B</h1></header>
    <p class="message" id="msg-21-2" data-timestamp="21" data-speaker="Henry">
      <span class="message-speaker">Henry</span><span class="message-text">
        <span id="msg-21.12-2"></span>Hello <em>world</em> &amp; &#x2019;quotes&#x2019;.
      </span><a class="message-time">0:21</a>
    </p>`;
  const [record] = await extractEpisodeRecords(html, "/play");
  expect(record?.url).toBe("/play#msg-21-2");
  expect(record?.content).toBe("Hello world & ’quotes’.");
  expect(record?.meta).toEqual({ title: "A & B", speaker: "Henry", seconds: "21", timestamp: "0:21" });
});

test("compact replies, untimed turns, and line breaks remain searchable without empty aliases", async () => {
  const html = `<header id="chat-header"><h1>Conversation</h1></header>
    <span class="transcript-anchor" id="msg-0" data-timestamp="0"></span>
    <div class="conversation-run">
      <p class="message" id="msg-0-2" data-timestamp="0" data-speaker="Nadia">
        <span class="message-text">First<br>second</span>
      </p>
      <p class="message message-nod" id="msg-0-3" data-timestamp="0" data-speaker="Henry">
        <a><span class="message-text">Yep.</span></a>
      </p>
    </div>`;
  const records = await extractEpisodeRecords(html, "/faith");
  expect(records.map(record => record.url)).toEqual(["/faith#msg-0-2", "/faith#msg-0-3"]);
  expect(records.map(record => record.content)).toEqual(["First second", "Yep."]);
});

test("non-episode HTML does not enter the transcript index", async () => {
  expect(await extractEpisodeRecords("<h1>Home</h1><nav>Episodes</nav>", "/")).toEqual([]);
});

test("rendered document titles preserve guest-name search metadata", async () => {
  const records = await extractEpisodeRecords(`<title>Digital Disembodiment (Maggie Appleton)</title>
    <header id="chat-header"><h1>Digital Disembodiment</h1></header>
    <p class="message" id="msg-0" data-timestamp="0" data-speaker="Maggie"><span class="message-text">Hello.</span></p>`, "/disembodiment");
  expect(records[0]?.meta.title).toBe("Digital Disembodiment (Maggie Appleton)");
  expect(createEpisodeSearchHtml(records)).toContain("Digital Disembodiment (Maggie Appleton)");
});

test("invalid passage metadata fails the build instead of publishing broken search links", async () => {
  const error = await extractEpisodeRecords(`<p class="message" id="bucket-21" data-timestamp="21" data-speaker="Henry"><span class="message-text">Hello</span></p>`, "/play").then(() => null, error => error);
  expect(error).toBeInstanceOf(Error);
  expect(String(error)).toContain("Invalid rendered passage");
});

test("Pagefind native sections retain duplicate-second canonical anchors in one episode fragment", async () => {
  const records = await extractEpisodeRecords(`<header id="chat-header"><h1>Conversation</h1></header>
    <p class="message" id="msg-21" data-timestamp="21" data-speaker="Henry"><span class="message-text">Apple red.</span></p>
    <p class="message" id="msg-21-2" data-timestamp="21" data-speaker="Nadia"><span class="message-text">Apple green.</span></p>`, "/play");
  const { index } = await pagefind.createIndex();
  if (!index) throw new Error("Pagefind did not create an index");
  try {
    const result = await index.addHTMLFile({ url: "/play", content: createEpisodeSearchHtml(records) });
    expect(result.errors).toEqual([]);
    const { files } = await index.getFiles();
    const fragments = files.filter(file => file.path.includes("fragment/"));
    expect(fragments).toHaveLength(1);
    const content = fragments[0]!.content;
    if (typeof content === "string") throw new Error("Expected a binary Pagefind fragment");
    const decoded = new TextDecoder().decode(Bun.gunzipSync(new Uint8Array(content)));
    const fragment = JSON.parse(decoded.slice(decoded.indexOf("{")));
    expect(fragment.anchors.map((anchor: { id: string }) => anchor.id)).toEqual(["msg-21", "msg-21-2"]);
    expect(fragment.content).toContain("Apple red.");
    expect(fragment.content).toContain("Apple green.");
    expect(fragment.content).not.toContain("<span");
  } finally {
    await index.deleteIndex();
    await pagefind.close();
  }
});
