import { visit } from "unist-util-visit";
import { toString as toStringUtil } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root, Paragraph, Text, Strong, PhrasingContent, Link, Parent } from "mdast";

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

function createLink(url: string, children: PhrasingContent[]): Link {
  return {
    type: "link",
    url,
    children,
  };
}

export const remarkTranscriptPlugin: Plugin<[PluginOptions?], Root> = (
  options: PluginOptions = {}
) => {
  const {
    timestampClass = "message-time",
    wrapClass = "message",
    timestampEmoji = "🕐",
    textClass = "message-bubble",
  } = options;

  console.log("remarkTranscriptPlugin", options);

  return (tree: Root) => {
    const speakerOrder: string[] = [];
    let speakerCount = 0;
    let lastSpeaker: string | null = null;

    visit(tree, "paragraph", (node: Paragraph, index?: number, parent?: Parent) => {
      if (index === undefined || !parent) return;

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

      const messageSpan = createSpan(textClass, [
        createStrong([createText(speaker)]),
        ...content as PhrasingContent[],
      ]);

      const timestampText = createSpan(timestampClass, [
        createText(timestamp),
      ]);

      const timestampLink = createLink(`#t=${timestamp}`, [timestampText]);

      // Check if next message is from the same speaker
      const nextNode = parent.children[index + 1] as Paragraph | undefined;
      const nextSpeaker = nextNode && (isTimestamp(nextNode) || isSpeaker(nextNode))
        ? toStringUtil((nextNode.children[nextNode.children.length > 1 ? 1 : 0] as Strong))
        : null;

      // Determine consecutive message classes
      const consecutiveClasses = [];
      if (speaker === lastSpeaker) {
        consecutiveClasses.push('consecutive');
      }
      if (speaker !== nextSpeaker && speaker === lastSpeaker) {
        consecutiveClasses.push('consecutive-end');
      }

      node.children = [messageSpan, timestampLink];
      node.data = {
        hName: "p",
        hProperties: {
          className: [
            wrapClass,
            speakerIndex === 0 ? "message-sent" :
            speakerIndex === 1 ? "message-received" :
            "message-system",
            ...consecutiveClasses
          ],
        },
      };

      lastSpeaker = speaker;
    });
  };
};
