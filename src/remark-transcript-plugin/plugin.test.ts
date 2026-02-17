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
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

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
  expect(result).toContain('<span class="message-time">00:28</span>');
  expect(result).toContain('<strong>Speaker 1</strong>');

  expect(result).toContain('id="msg-75"');
  expect(result).toContain('class="message message-received"');
  expect(result).toContain('data-timestamp="75"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('<span class="message-time">01:15</span>');

  expect(result).toContain('id="msg-0"');
  expect(result).toContain('data-timestamp="0"');
  expect(result).toContain('data-msg-occurrence="1"');
});

test("remarkTranscriptPlugin handles timestamps longer than 1 hour", async () => {
  const input = "[01:00:03] **Henry**: Yeah, always. Yeah.";
  const result = await processMarkdown(input);
  
  expect(result).toContain('id="msg-3603"');
  expect(result).toContain('data-timestamp="3603"');
  expect(result).toContain('data-msg-occurrence="1"');
  expect(result).toContain('<span class="message-time">01:00:03</span>');
  expect(result).toContain('<strong>Henry</strong>');
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
  expect(result).toContain("00:28");
});
