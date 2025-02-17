import { visit } from "unist-util-visit";
import { toString as toStringUtil } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root, Paragraph, Text, Strong, PhrasingContent, Parent, RootContent, Heading } from "mdast";

const timestampRegex = /^\[(\d{2}:\d{2})\]/;

interface PluginOptions {
  timestampClass?: string;
  wrapClass?: string;
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

function isHeading(node: RootContent): node is Heading {
  return node.type === 'heading';
}

function createText(value: string): Text {
  return { type: "text", value };
}

function createSpan(
  className: string,
  children: PhrasingContent[]
): PhrasingContent {
  return {
    type: "span",
    data: {
      hName: "span",
      hProperties: { className: [className] },
    },
    children,
  } as unknown as PhrasingContent;
}

function createStrong(children: Text[]): Strong {
  return {
    type: "strong",
    children,
  };
}

function timeToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] * 60 + parts[1];
}

export const remarkTranscriptPlugin: Plugin<[PluginOptions?], Root> = (
  options: PluginOptions = {}
) => {
  const {
    timestampClass = "message-time",
    wrapClass = "message",
    textClass = "message-bubble",
  } = options;

  return (tree: Root) => {
    const speakerOrder: string[] = [];
    let speakerCount = 0;
    let lastSpeaker: string | null = null;

    visit(tree, "paragraph", (node: Paragraph, index?: number, parent?: Parent) => {
      if (index === undefined || !parent) return;

      // Check if previous node was a heading
      const prevNode = index > 0 ? parent.children[index - 1] : null;
      if (prevNode && isHeading(prevNode)) {
        lastSpeaker = null;
      }

      let timestamp: string | null = null;
      let speaker: string | null = null;

      if (isTimestamp(node)) {
        const match = (node.children[0] as Text).value.match(timestampRegex);
        if (match) {
          timestamp = match[1];
          speaker = toStringUtil(node.children[1] as Strong);
        }
      } else if (isSpeaker(node)) {
        timestamp = "00:00";
        speaker = toStringUtil(node.children[0] as Strong);
      } else {
        return;
      }

      if (!timestamp || !speaker) return;

      let speakerIndex = speakerOrder.indexOf(speaker);
      if (speakerIndex === -1) {
        speakerIndex = speakerCount++;
        speakerOrder.push(speaker);
      }

      const content = isTimestamp(node)
        ? node.children.slice(2)
        : node.children.slice(1);

      const seconds = timeToSeconds(timestamp);
      const messageId = `msg-${seconds}`;
      
      // Look ahead for next speaker
      const nextNode = parent.children[index + 1] as RootContent;
      let nextSpeaker = null;
      
      if (nextNode) {
        if (isHeading(nextNode)) {
          nextSpeaker = null;
        } else if ((nextNode as Paragraph).children && (isTimestamp(nextNode as Paragraph) || isSpeaker(nextNode as Paragraph))) {
          nextSpeaker = toStringUtil(((nextNode as Paragraph).children[(nextNode as Paragraph).children.length > 1 ? 1 : 0] as Strong));
        }
      }

      // Handle consecutive messages
      const isNextConsecutive = speaker === nextSpeaker;
      const isPrevConsecutive = speaker === lastSpeaker;

      const messageSpan = createSpan(textClass, [
        createStrong([createText(speaker)]),
        createText(" "),
        ...content as PhrasingContent[],
        createSpan(timestampClass, [
          createText(timestamp),
        ])
      ]);

      // Determine message grouping
      const classes = [wrapClass];
      
      // Add alignment class
      classes.push(
        speakerIndex === 0 ? "message-sent" :
        speakerIndex === 1 ? "message-received" :
        "message-system"
      );

      // Add consecutive classes
      if (isPrevConsecutive || isNextConsecutive) {
        classes.push('consecutive');
      }

      if (isPrevConsecutive && !isNextConsecutive) {
        classes.push('consecutive-end');
      }

      if (!isPrevConsecutive && isNextConsecutive) {
        classes.push('consecutive-start');
      }

      // Add class to hide speaker name if it's a consecutive message (not start)
      if (isPrevConsecutive) {
        classes.push('hide-speaker');
      }

      node.children = [messageSpan];
      node.data = {
        hName: "p",
        hProperties: {
          id: messageId,
          className: classes,
          "data-timestamp": String(seconds)
        },
      };

      lastSpeaker = speaker;
    });
  };
};
