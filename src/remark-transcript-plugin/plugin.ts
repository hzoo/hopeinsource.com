import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Paragraph, Text, Strong, Parent, PhrasingContent } from "mdast";

const timestampRegex = /^\[(\d{2}:\d{2})\]/;

interface PluginOptions {
  timestampClass?: string;
  wrapClass?: string;
  rightClass?: string;
  otherClass?: string;
  timestampEmoji?: string;
  textClass?: string;
}

function isTimestamp(node: Paragraph): boolean {
  if (node.children.length < 2) return false;
  const [first, second] = node.children;
  return (
    first.type === "text" &&
    second.type === "strong" &&
    timestampRegex.test((first as Text).value)
  );
}

function isSpeaker(node: Paragraph): boolean {
  return node.children.length > 0 && node.children[0].type === "strong";
}

interface HTMLStrong extends Parent {
  type: "strong";
  data: {
    hName: "strong";
  };
}

function createText(value: string): Text {
  return { type: "text", value };
}

function createSpan(
  className: string,
  children: (PhrasingContent | HTMLStrong | Text)[]
) {
  return {
    type: "span",
    data: {
      hName: "span",
      hProperties: { className: [className] },
    },
    children,
  };
}

function createStrong(children: Text[]): HTMLStrong {
  return {
    type: "strong",
    data: {
      hName: "strong",
    },
    children,
  };
}

export const remarkTranscriptPlugin: Plugin<[PluginOptions?]> = (
  options: PluginOptions = {}
) => {
  const {
    timestampClass = "timestamp",
    wrapClass = "wrap",
    rightClass = "right",
    otherClass = "other",
    timestampEmoji = "🕐",
    textClass = "text",
  } = options;

  return (tree) => {
    const speakerOrder: string[] = [];

    visit(tree, "paragraph", (node: Paragraph) => {
      let timestamp: string | null = null;
      let speaker: string | null = null;

      if (isTimestamp(node)) {
        const match = (node.children[0] as Text).value.match(timestampRegex);
        if (match) {
          timestamp = match[1];
          speaker = toString(node.children[1] as Strong);
        }
      } else if (isSpeaker(node)) {
        timestamp = "00:00";
        speaker = toString(node.children[0] as Strong);
      } else {
        return;
      }

      if (!timestamp || !speaker) return;

      if (!speakerOrder.includes(speaker)) {
        speakerOrder.push(speaker);
      }

      const timestampLink = {
        type: "link",
        url: `#t=${timestamp}`,
        children: [
          createSpan(timestampClass, [
            createText(`${timestamp} ${timestampEmoji}`),
          ]),
        ],
      };

      const content = isTimestamp(node)
        ? node.children.slice(2)
        : node.children.slice(1);

      const textSpan = createSpan(textClass, [
        createStrong([createText(`${speaker}`)]),
        ...content,
      ]);

      node.children = [
        timestampLink as PhrasingContent,
        textSpan as PhrasingContent,
      ];
      node.data = {
        hName: "p",
        hProperties: {
          className: [
            wrapClass,
            speakerOrder.indexOf(speaker) === 0 ? rightClass : otherClass,
          ],
        },
      };
    });
  };
};
