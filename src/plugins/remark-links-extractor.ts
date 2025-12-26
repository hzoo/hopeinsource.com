import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Blockquote, Link, Root } from "mdast";
import type { Plugin } from "unified";

export interface ExtractedLink {
  text: string;
  url: string;
  quoteText?: string;
  blockquoteIndex: number;
}

/**
 * Remark plugin that extracts links from blockquotes.
 * These are inline references (bible verses, essays, tweets, etc.)
 * that appear below transcript paragraphs.
 *
 * - Adds IDs to blockquotes (ref-0, ref-1, etc.) for scroll-to navigation
 * - Stores extracted links in vfile.data.astro.frontmatter.extractedLinks
 */
export const remarkLinksExtractor: Plugin<[], Root> = () => {
  return (tree: Root, vfile) => {
    const extractedLinks: ExtractedLink[] = [];
    let refIndex = 0;

    visit(tree, "blockquote", (node: Blockquote) => {
      // Get the full text of the blockquote for context
      const quoteText = toString(node);

      // Find all links within this blockquote
      const links: Link[] = [];
      visit(node, "link", (linkNode: Link) => {
        links.push(linkNode);
      });

      // Add each link with the current blockquote index
      for (const linkNode of links) {
        const linkText = toString(linkNode);
        const link: ExtractedLink = {
          text: linkText,
          url: linkNode.url,
          quoteText: quoteText,
          blockquoteIndex: refIndex,
        };
        extractedLinks.push(link);
      }

      refIndex++;
    });

    // Store in vfile data for access in Astro components
    if (!vfile.data.astro) {
      vfile.data.astro = {};
    }
    if (!vfile.data.astro.frontmatter) {
      vfile.data.astro.frontmatter = {};
    }

    (vfile.data.astro.frontmatter as Record<string, unknown>).extractedLinks = extractedLinks;
  };
};
