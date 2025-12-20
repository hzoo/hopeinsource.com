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

test("remarkTranscriptPlugin handles timestamps longer than 1 hour", async () => {
  const input = "[01:00:03] **Henry**: Yeah, always. Yeah.";
  const result = await processMarkdown(input);
  
  // If it works, it should be wrapped in a p with message class
  expect(result).toContain('class="message');
  expect(result).toContain('01:00:03');
  expect(result).toContain('data-timestamp="3603"');
});
