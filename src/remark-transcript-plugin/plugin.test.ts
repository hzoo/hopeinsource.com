import { expect, test } from "bun:test";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { remarkTranscriptPlugin } from "./plugin";

const processMarkdown = async (markdown: string, options = {}) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkTranscriptPlugin, options)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
};

test("provisional speakers keep visible acknowledgment attribution", async () => {
  for (const [lead, reply] of [["Speaker 0", "Speaker 1"], ["Henry", "Speaker unknown"], ["Unconfirmed voice", "Henry"]]) {
    const result = await processMarkdown(`[00:01] **${lead}:** A complete thought.\n\n[00:04] **${reply}:** Yeah.`);
    expect(result).not.toContain('message-nod');
    expect(result).not.toContain('message-ack');
    expect(result).toContain(`<strong>${reply}</strong>`);
    expect(result).toContain('href="#t=4"');
  }
});

test("removed filler retains anchors and same-second occurrence IDs without an empty bubble", async () => {
  const result = await processMarkdown(`[00:01] **Henry:** A thought.\n\n[00:02] **Guest:** <span id="msg-2.4"></span>\n\n[00:02] **Henry:** Another thought.`);
  expect(result).toMatch(/<span id="msg-2" class="transcript-anchor" data-timestamp="2">\s*<span id="msg-2.4"><\/span><\/span>/);
  expect(result).toContain('id="msg-2-2"');
  expect(result.match(/class="message /g)?.length).toBe(2);
  expect(result).not.toContain('<strong>Guest</strong>');
});

test("remarkTranscriptPlugin transforms markdown correctly", async () => {
  const input = `
[00:28] **Speaker 1**: Hello, this is a test.

[01:15] **Speaker 2**: This is another test line.

**Speaker 1**: This is a line without a timestamp.
`;

  const result = await processMarkdown(input);
  
  expect(result).toContain('id="msg-28"');
  expect(result).toContain('class="message message-sent"');
  expect(result).toContain('data-timestamp="28"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('<span class="message-speaker"><strong>Speaker 1</strong></span>');
  expect(result).toContain('<span class="message-text">');
  expect(result).toContain('<a href="#t=28" class="message-time" aria-label="Jump to 00:28" title="Jump to 0:28">0:28</a>');

  expect(result).toContain('id="msg-75"');
  expect(result).toContain('class="message message-received"');
  expect(result).toContain('data-timestamp="75"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('<a href="#t=75" class="message-time" aria-label="Jump to 01:15" title="Jump to 1:15">1:15</a>');

  expect(result).toContain('id="msg-0"');
  expect(result).toContain('data-timestamp="0"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).not.toContain('href="#t=0"');
});

test("remarkTranscriptPlugin handles timestamps longer than 1 hour", async () => {
  const input = "[01:00:03] **Henry**: Yeah, always. Yeah.";
  const result = await processMarkdown(input);
  
  expect(result).toContain('id="msg-3603"');
  expect(result).toContain('data-timestamp="3603"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('<a href="#t=3603" class="message-time" aria-label="Jump to 01:00:03" title="Jump to 1:00:03">1:00:03</a>');
  expect(result).toContain('<strong>Henry</strong>');
});

test("remarkTranscriptPlugin groups consecutive speaker-only messages", async () => {
  const result = await processMarkdown(`
[00:28] **Henry:** First thought.

**Henry:** Second thought with **emphasis**.

[00:30] **Xiq:** Reply.
`);

  expect(result).toMatch(/class="message message-sent[^"]*consecutive consecutive-start/);
  expect(result).toMatch(/class="message message-sent[^"]*consecutive consecutive-end hide-speaker/);
  expect(result).toContain('<span class="message-speaker"><strong>Henry</strong></span>');
  expect(result).toContain('<span class="message-text"> Second thought with <strong>emphasis</strong>.</span>');
});

test("remarkTranscriptPlugin disambiguates duplicate same-second message ids", async () => {
  const input = `
[00:28] **Speaker 1**: First line.

[00:28] **Speaker 2**: Second line same second.

[00:28] **Speaker 1**: Third line same second.
`;

  const result = await processMarkdown(input);

  expect(result).toContain('id="msg-28"');
  expect(result).toContain('id="msg-28-2"');
  expect(result).toContain('id="msg-28-3"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('data-msg-occurrence="2"');
  expect(result).toContain('data-msg-occurrence="3"');
});

test("remarkTranscriptPlugin handles empty input", async () => {
  const input = "";
  const result = await processMarkdown(input);
  expect(result).toBe("");
});

test("remarkTranscriptPlugin ignores non-transcript paragraphs", async () => {
  const input = "This is a regular paragraph without timestamps or speakers.";
  const result = await processMarkdown(input);
  expect(result).toBe(`<p>${input}</p>`);
});

test("remarkTranscriptPlugin handles custom options", async () => {
  const input = "[00:28] **Speaker**: Test with custom options.";

  const result = await processMarkdown(input, {
    timestampClass: "custom-timestamp",
  });

  expect(result).toContain('class="custom-timestamp"');
  expect(result).toContain("0:28");
});

test('short replies compact by length while questions and longer replies remain separate', async () => {
  const result = await processMarkdown('[00:01] **A:** That you cannot get to it.\n\n[00:02] **B:** Yeah, yeah, yeah.\n\n[00:03] **A:** Really?\n\n[00:04] **B:** Okay.\n\n[00:05] **A:** Not yet.');
  expect(result.match(/message-ack/g)?.length).toBe(2);
  expect(result).toContain('id="msg-2"');
  expect(result).toContain('Yeah, yeah, yeah.');
  expect(result).toContain('data-timestamp="2"');
  expect(result.match(/<p id="msg-2"[^>]+>/)?.[0]).not.toContain('message-nod');
  expect(result.match(/<p id="msg-3"[^>]+>/)?.[0]).not.toContain('message-nod');
  expect(result).toContain('A · 0:05: Not yet. Jump to passage');
});


test('brief reactions can form a compact exchange without changing their words', async () => {
  const result = await processMarkdown('[00:01] **A:** That was the idea.\n\n[00:02] **B:** Yeah. Cool.\n\n[00:03] **A:** Cool.\n\n[00:04] **B:** Cool weather today.');
  expect(result.match(/message-ack/g)?.length).toBe(2);
  expect(result).toContain('Yeah. Cool.');
  expect(result).toContain('id="msg-3"');
});


test('compact confirmations retain uncertainty and do not swallow questions or clauses', async () => {
 const result = await processMarkdown('[00:01] **A:** The audio player?\n\n[00:02] **B:** Okay okay.\n\n[00:03] **A:** Possibly. Yeah,\n\n[00:04] **B:** Oh, yeah?\n\n[00:05] **A:** We should do that. Okay.');
 expect(result.match(/message-ack/g)?.length).toBe(2);
 expect(result).toContain('Possibly. Yeah,');
 expect(result).toContain('We should do that. Okay.');
});

test('the word-count rule preserves speaker alignment, aliases, and original uncertainty', async () => {
 const { isCompactReply } = await import('./compact-reply.js');
 for (const phrase of ['Not yet.', 'Your surroundings.', 'Possibly. Yeah,', 'Okay okay.']) expect(isCompactReply(phrase)).toBe(true);
 for (const phrase of ['Oh, yeah?', 'We should do that. Okay.', "Oh that’s neat.", 'Yeah I guess and.', 'Like that yeah.', "No that's cool but.", "Maybe. I don't know.", 'Yeah it would drain my battery.']) expect(isCompactReply(phrase)).toBe(false);
 const result=await processMarkdown('[00:01] **A:** A thought.\n\n[00:02] **B:** <span id="alias"></span>Mm-hmm.');
 expect(result).toContain('message message-received message-ack');
 expect(result).toContain('reply-left');
 expect(result).toContain('id="alias"');
});

test('verbal nod pills keep playable words and accessible attribution', async () => {
 const result=await processMarkdown('[00:01] **A:** A thought.\n\n[00:02] **B:** Yeah.');
 expect(result).toContain('message-nod');
 expect(result).toContain('href="#t=2"');
 expect(result).toContain('B · 0:02: Yeah. Jump to passage');
 expect(result).toContain('message-text');
});

test('one-word responses and short stage cues compact by shape without deleting their meaning', async () => {
 const { isCompactReply } = await import('./compact-reply.js');
 for (const phrase of ['Ah.', '(laughs)', '(laughs).', '(clears throat)', 'Inertia.', 'No.', 'Natalia.', 'Mhmm.', 'Non-Christian.', 'Café.', 'Yeah-', '…']) {
   expect(isCompactReply(phrase)).toBe(phrase !== '…');
 }
 for (const phrase of ['Really?', 'SDO?', '(laughs) That was funny.']) expect(isCompactReply(phrase)).toBe(false);
 const result = await processMarkdown('[00:01] **Henry:** A complete thought.\n\n[00:02] **Nadia:** Ah.\n\n[00:03] **Henry:** (laughs)\n\n[00:04] **Nadia:** Inertia.\n\n[00:05] **Henry:** Really?');
 expect(result.match(/message-nod/g)?.length).toBe(3);
 expect(result).toContain('Nadia · 0:04: Inertia. Jump to passage');
 expect(result).toContain('Henry · 0:03: (laughs) Jump to passage');
 expect(result.match(/<p id="msg-5"[^>]+>/)?.[0]).not.toContain('message-nod');
});

test('two-word replies use one size rule for reactions, substantive answers, and stage cues', async () => {
 const { isCompactReply } = await import('./compact-reply.js');
 for (const phrase of ['I agree.', 'Me too.', 'Totally agreed.', 'Ah, yeah.', 'Mm-hmm, yeah.', "That's interesting.", 'Yeah (laughs).', 'Right. (laughs)', '(laughs) Yeah.', 'GitHub Sponsors.', 'Version control.', 'Your surroundings.', 'Ordinary Time.', 'Not yet.', 'In theory.', "There's a-", "They don't.", '(laughs) Fundraising.', 'Yeah, cryogenics.']) expect(isCompactReply(phrase)).toBe(true);
 for (const phrase of ['GitHub Sponsors program.', 'Version control system.', 'Your immediate surroundings.', '(laughs) I agree.', 'I agree?', 'Me too?']) expect(isCompactReply(phrase)).toBe(false);
 const result = await processMarkdown('[00:01] **Nadia:** A thought.\n\n[00:02] **Henry:** Yeah (laughs).\n\n[00:03] **Nadia:** Another thought.');
 expect(result).toContain('Henry · 0:02: Yeah (laughs). Jump to passage');
 expect(result).toContain('data-reply-to="msg-1"');
});

test('a speaker taking the lead after their own mini reply regains visible attribution', async () => {
 const result = await processMarkdown('[00:01] **Nadia:** A thought.\n\n[00:02] **Henry:** I agree.\n\n[00:03] **Henry:** Here is my perspective on it.\n\n[00:04] **Nadia:** Yeah.\n\n[00:05] **Henry:** And another part of that perspective.');
 const newLead = result.match(/<p id="msg-3"[^>]+>/)?.[0];
 expect(newLead).not.toContain('hide-speaker');
 expect(newLead).not.toContain('message-continuation');
 expect(result.match(/<p id="msg-5"[^>]+>/)?.[0]).toContain('message-continuation');
});

test('mini replies stop at structural boundaries, timing gaps, and content links', async () => {
 for (const divider of ['## Next', '> A quoted passage.', '- A list item.', 'An editorial note.', '[00:02] **Nadia:**']) {
   const result = await processMarkdown('[00:01] **Henry:** A thought.\n\n' + divider + '\n\n[00:03] **Nadia:** Ah.');
   expect(result).not.toContain('message-nod');
 }
 for (const reply of ['[02:00] **Nadia:** Ah.', '[00:00] **Nadia:** Ah.', '[00:02] **Nadia:** [Incarnation](https://example.com).']) {
   const result = await processMarkdown('[00:01] **Henry:** A thought.\n\n' + reply);
   expect(result).not.toContain('message-nod');
 }
 const result = await processMarkdown('**Henry:** A thought.\n\n[00:02] **Nadia:** Ah.');
 expect(result).not.toContain('message-nod');
});


test('qualified replies use the same pill anchored to the previous speaker', async () => {
 const result=await processMarkdown('[00:01] **A:** A thought.\n\n[00:02] **B:** Possibly. Yeah.');
 expect(result).toContain('message-nod reply-left');
 expect(result).toContain('Possibly. Yeah.');
 expect(result).toContain('B · 0:02');
});

test('listening sounds attach to the prior message without losing speaker or audio anchors', async () => {
 const { isCompactReply } = await import('./compact-reply.js');
 for (const phrase of ['Hm.', 'Hmm.', 'Mmm.', 'Mm-hmm.']) expect(isCompactReply(phrase)).toBe(true);
 for (const phrase of ['Hm?', 'Hmm, what about trust?', 'Hmm, I disagree.']) expect(isCompactReply(phrase)).toBe(false);
 const result = await processMarkdown('[06:17] **Nadia:** To me, that’s a big part of trust.\n\n[06:33] **Henry:** Hm.\n\n[06:34] **Nadia:** You continue to trust that person anyway.');
 expect(result.match(/<p id="msg-393"[^>]+>/)?.[0]).toContain('message-nod reply-left');
 expect(result).toContain('data-reply-to="msg-377"');
 expect(result).toContain('href="#t=393"');
 expect(result).toContain('Henry · 6:33: Hm. Jump to passage');
 expect(result).toContain('message-continuation');
});

test('reply groups preserve chronology and attach multiple responses to one parent', async () => {
 const result=await processMarkdown('[00:01] **A:** A thought.\n\n[00:02] **B:** Yeah.\n\n[00:03] **A:** Cool.\n\n## Next\n\n[00:04] **B:** Okay.');
 expect(result.match(/class="message-thread/g)?.length).toBe(1);
 expect(result.match(/data-reply-to="msg-1"/g)?.length).toBe(2);
 expect(result).toContain('data-reply-parent="msg-1"');
 expect(result.indexOf('id="msg-2"')).toBeLessThan(result.indexOf('id="msg-3"'));
 expect(result).not.toContain('<blockquote');
});


test('continuing speakers share attribution across nods but reset at headings, speaker changes and pauses', async () => {
 const result = await processMarkdown('[00:01] **Henry:** A first thought.\n\n[00:02] **Laurel:** Yeah.\n\n[00:03] **Henry:** Another complete thought.\n\n[00:04] **Laurel:** Cool.\n\n## Next\n\n[00:05] **Henry:** A new section.\n\n[00:06] **Laurel:** A different perspective.\n\n[00:07] **Henry:** An actual answer.\n\n[02:00] **Henry:** After a pause.');
 expect(result.match(/message-continuation/g)?.length).toBe(1);
 expect(result).toContain('thread-continuation');
 expect(result).toContain('data-speaker="Laurel"');
 expect(result).toContain('href="#t=3"');
 expect(result).toContain('Laurel · 0:02: Yeah. Jump to passage');
});


test('alternating nods retain their own speaker side', async () => {
 const result = await processMarkdown('[09:33] **Laurel:** A voice note will automatically do that.\n\n[09:36] **Henry:** Yeah.\n\n[09:37] **Laurel:** Yeah and.');
 expect(result.match(/<p id="msg-576"[^>]+>/)?.[0]).toContain('reply-left');
 expect(result.match(/<p id="msg-577"[^>]+>/)?.[0]).toContain('reply-right');
 expect(result).toContain('Henry · 9:36');
 expect(result).toContain('Laurel · 9:37');
});


test('reply rows pair nearby opposite speakers while preserving chronology and boundaries', async () => {
 const result = await processMarkdown('[00:01] **Laurel:** A thought.\n\n[00:02] **Henry:** Yeah.\n\n[00:03] **Laurel:** Cool.\n\n[00:04] **Henry:** Right.\n\n[00:20] **Laurel:** Okay.\n\n## Next\n\n[00:21] **Henry:** A new thought.');
 expect(result.match(/reply-row-pair/g)?.length).toBe(1);
 expect(result.match(/class="reply-row/g)?.length).toBe(3);
 expect(result.indexOf('id="msg-2"')).toBeLessThan(result.indexOf('id="msg-3"'));
 expect(result).toContain('href="#t=3"');
 expect(result).toContain('Laurel · 0:03: Cool. Jump to passage');
 expect(result).not.toContain('<blockquote');
});


test('uncertain and third speakers keep visible attribution rather than becoming nods', async () => {
 const result = await processMarkdown('[00:01] **Laurel:** A thought.\n\n[00:02] **Henry:** Yeah.\n\n[00:03] **Unconfirmed:** Okay.\n\n[00:04] **Guest:** Cool.');
 expect(result.match(/message-nod/g)?.length).toBe(1);
 expect(result).toContain('<strong>Unconfirmed</strong>');
 expect(result).toContain('<strong>Guest</strong>');
});


test('short substantive replies keep accessible attribution and chronological reading order', async () => {
 const result = await processMarkdown('[00:00] **Laurel:** First thought.\n\n[00:01] **Henry:** A thought.\n\n[00:02] **Laurel:** Yeah.\n\n[00:03] **Henry:** Cool.\n\n[00:04] **Laurel:** Your surroundings.\n\n[00:05] **Henry:** What does that mean?');
 expect(result.indexOf('id="msg-2"')).toBeLessThan(result.indexOf('id="msg-3"'));
 expect(result.indexOf('id="msg-3"')).toBeLessThan(result.indexOf('id="msg-4"'));
 expect(result.match(/<p id="msg-4"[^>]+>/)?.[0]).toContain('message-nod');
 expect(result).toContain('Laurel · 0:04: Your surroundings. Jump to passage');
 expect(result.match(/<p id="msg-5"[^>]+>/)?.[0]).not.toContain('message-nod');
 expect(result).toContain('<strong>Laurel</strong>');
 expect(result).toContain('href="#t=5"');
});
