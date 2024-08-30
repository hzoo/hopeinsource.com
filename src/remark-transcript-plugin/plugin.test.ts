import { test, expect } from "bun:test";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

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

  const expectedOutput = `<p class="wrap right"><a href="#t=00:28"><span class="timestamp">00:28 🕐</span></a><span class="text"><strong>Speaker 1</strong>: Hello, this is a test.</span></p>
<p class="wrap other"><a href="#t=01:15"><span class="timestamp">01:15 🕐</span></a><span class="text"><strong>Speaker 2</strong>: This is another test line.</span></p>
<p class="wrap right"><a href="#t=00:00"><span class="timestamp">00:00 🕐</span></a><span class="text"><strong>Speaker 1</strong>: This is a line without a timestamp.</span></p>`;

  const result = await processMarkdown(input);
  expect(result.trim()).toBe(expectedOutput.trim());
});

test("remarkTranscriptPlugin handles empty input", async () => {
  const input = "";
  const result = await processMarkdown(input);
  expect(result).toBe("");
});

test("remarkTranscriptPlugin ignores non-transcript paragraphs", async () => {
  const input = "This is a regular paragraph without timestamps or speakers.";
  const result = await processMarkdown(input);
  expect(result).toBe("<p>" + input + "</p>");
});

test("remarkTranscriptPlugin handles custom options", async () => {
  const input = "[00:28] **Speaker**: Test with custom options.";

  const result = await processMarkdown(input, {
    timestampClass: "custom-timestamp",
    timestampEmoji: "⏰",
  });

  expect(result).toContain('class="custom-timestamp"');
  expect(result).toContain("⏰");
});
