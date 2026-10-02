import { expect, test } from "bun:test";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { remarkLinksExtractor } from "./remark-links-extractor";

const processMarkdown = (markdown: string) => unified()
  .use(remarkParse)
  .use(remarkLinksExtractor)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(markdown);

test("scheme-less site links render correctly and reference extraction uses the normalized URL", async () => {
  const result = await processMarkdown("[Hope In Source: Emotional Programming](hopeinsource.com/emotional)\n\n> [A reference](hopeinsource.com/emotional#msg-20)");
  expect(result.toString()).toContain('<a href="https://hopeinsource.com/emotional">Hope In Source: Emotional Programming</a>');
  expect(result.toString()).toContain('<a href="https://hopeinsource.com/emotional#msg-20">A reference</a>');
  expect(result.data.astro?.frontmatter?.extractedLinks).toEqual([{
    text: "A reference", url: "https://hopeinsource.com/emotional#msg-20",
    quoteText: "A reference", blockquoteIndex: 0,
  }]);
});

test("only the exact scheme-less site host is normalized", async () => {
  const unchanged = [
    "hopeinsource.com.evil/emotional", "hopeinsource.com-other/emotional",
    "/emotional", "#msg-20", "https://hopeinsource.com/emotional", "https://example.com",
  ];
  const result = await processMarkdown(unchanged.map((url, i) => `[Link ${i}](${url})`).join("\n\n"));
  for (const [i, url] of unchanged.entries()) {
    expect(result.toString()).toContain(`<a href="${url}">Link ${i}</a>`);
  }
});
