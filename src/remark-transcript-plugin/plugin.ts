import { isCompactReply } from "./compact-reply.js";
import { toString as toStringUtil } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import type { Heading, Link, Paragraph, Parent, PhrasingContent, Root, RootContent, Strong, Text } from "mdast";
import type { Plugin } from "unified";

const timestampRegex = /^\[(\d{1,2}:\d{2}(?::\d{2})?)\]/;
const maxConversationGapSeconds = 45;

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

function isProvisionalSpeaker(speaker: string): boolean {
  return /^(?:unconfirmed\b|speaker\s+(?:\d+|unknown)\b)/i.test(speaker);
}

// A mini bubble is itself a playback link; never put another link/control inside it.
function hasInteractiveContent(node: PhrasingContent): boolean {
  if (['link', 'linkReference', 'image', 'imageReference'].includes(node.type)) return true;
  if (node.type === 'html' && !/^\s*(?:<span\s+id=["'][^"']+["']\s*>\s*(?:<\/span>)?|<\/span>)\s*$/u.test(node.value)) return true;
  return 'children' in node && node.children.some(hasInteractiveContent);
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

function createTimestampLink(
  className: string,
  timestamp: string,
  seconds: number,
): Link {
  return {
    type: "link",
    url: `#t=${seconds}`,
    data: {
      hProperties: {
        className: [className],
        "aria-label": `Jump to ${timestamp}`,
        title: `Jump to ${formatTimestamp(seconds)}`,
      },
    },
    children: [createText(formatTimestamp(timeToSeconds(timestamp)))],
  };
}

function timeToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] * 60 + parts[1];
}

function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}`
    : `${minutes}:${remainder}`;
}

export const remarkTranscriptPlugin: Plugin<[PluginOptions?], Root> = (
  options: PluginOptions = {}
) => {
  const {
    timestampClass = "message-time",
    wrapClass = "message",
    textClass = "message-bubble",
  } = options;

  return (tree: Root, vfile) => {
    const speakerConfig: Record<string, string> = (vfile.data?.astro?.frontmatter?.speakers as Record<string, string>) || {};
    const speakerOrder: string[] = [];
    const messageIdCountsBySecond = new Map<number, number>();
    let speakerCount = 0;
    let lastSpeaker: string | null = null;
    let replyParent = "";
    let previousTime: number | null = null;
    let previousTimed = false;

    visit(tree, "paragraph", (node: Paragraph, index?: number, parent?: Parent) => {
      if (index === undefined || !parent) return;

      // Check if previous node was a heading
      const prevNode = index > 0 ? parent.children[index - 1] : null;
      if (prevNode && isHeading(prevNode)) {
        lastSpeaker = null;
        replyParent = "";
        previousTime = null;
      }

      let timestamp: string | null = null;
      let speaker: string | null = null;

      const hasExplicitTimestamp = isTimestamp(node);
      if (hasExplicitTimestamp) {
        const textValue = (node.children[0] as Text).value;
        const match = textValue.match(timestampRegex);
        if (match) {
          timestamp = match[1];
          speaker = toStringUtil(node.children[1] as Strong);
        }
      } else if (isSpeaker(node)) {
        timestamp = "00:00";
        speaker = toStringUtil(node.children[0] as Strong);
      } else {
        // Prose, quotations, lists, and other Markdown interrupt reply attachment.
        lastSpeaker = null;
        replyParent = "";
        previousTime = null;
        return;
      }

      if (!timestamp || !speaker) return;
      
      // use frontmatter config if present, else fallback to original logic
      let alignmentClass = "";

      if (speaker.replace(/:$/, "") in speakerConfig) {
        const order = speakerConfig[speaker.replace(/:$/, "")];
        if (order === "left") {
          alignmentClass = "message-sent";
        } else if (order === "right") {
          alignmentClass = "message-received";
        } else {
          alignmentClass = "message-system";
        }
      } else {
        let speakerIndex = speakerOrder.indexOf(speaker);
        if (speakerIndex === -1) {
          speakerIndex = speakerCount++;
          speakerOrder.push(speaker);
        }
        alignmentClass = speakerIndex === 0 ? "message-sent" :
                         speakerIndex === 1 ? "message-received" : "message-system";
      }

      const content = hasExplicitTimestamp
        ? node.children.slice(2)
        : node.children.slice(1);

      const seconds = timeToSeconds(timestamp);
      const nextOccurrence = (messageIdCountsBySecond.get(seconds) ?? 0) + 1;
      messageIdCountsBySecond.set(seconds, nextOccurrence);
      const messageId = nextOccurrence === 1
        ? `msg-${seconds}`
        : `msg-${seconds}-${nextOccurrence}`;
      
      // Look ahead for next speaker
      const nextNode = parent.children[index + 1] as RootContent;
      let nextSpeaker = null;
      if (nextNode) {
        if (isHeading(nextNode)) {
          nextSpeaker = null;
        } else if (nextNode.type === "paragraph" && isTimestamp(nextNode)) {
          nextSpeaker = toStringUtil(nextNode.children[1] as Strong);
        } else if (nextNode.type === "paragraph" && isSpeaker(nextNode)) {
          nextSpeaker = toStringUtil(nextNode.children[0] as Strong);
        }
      }

      // Handle consecutive messages
      const isNextConsecutive = speaker === nextSpeaker;
      const previousClasses = prevNode?.data?.hProperties?.className;
      const isPrevConsecutive = speaker === lastSpeaker
        && !(Array.isArray(previousClasses) && previousClasses.includes('message-ack'));

      const messageChildren: PhrasingContent[] = [
        createSpan("message-text", content as PhrasingContent[]),
      ];
      if (hasExplicitTimestamp) {
        messageChildren.push(createTimestampLink(timestampClass, timestamp, seconds));
      }
      const messageSpan = createSpan(textClass, messageChildren);

      const spokenText = content.map(part => toStringUtil(part)).join("").replace(/<[^>]*>/g, "").trim().replace(/^:\s*/, "");
      // Reviewed empty filler turns retain their original anchor and occurrence.
      // Keeping the source turn also keeps later same-second IDs stable.
      if (!spokenText) {
        node.children = content;
        node.data = { hName: 'span', hProperties: { id: messageId, className: ['transcript-anchor'], 'data-timestamp': String(seconds) } };
        replyParent = "";
        previousTime = null;
        return;
      }
      const previousProps = prevNode?.data?.hProperties;
      const adjacentMessage = Boolean(previousProps?.['data-speaker']
        && Array.isArray(previousProps.className) && !previousProps.className.includes('message-system'));
      const nearby = previousTime !== null && previousTimed === hasExplicitTimestamp
        && (!hasExplicitTimestamp || (seconds >= previousTime && seconds - previousTime <= maxConversationGapSeconds));
      const compactReply = Boolean(adjacentMessage && nearby && replyParent && lastSpeaker && lastSpeaker !== speaker
        && alignmentClass !== 'message-system' && !isProvisionalSpeaker(speaker) && !isProvisionalSpeaker(lastSpeaker)
        && !content.some(hasInteractiveContent) && isCompactReply(spokenText));
      const classes = [wrapClass, alignmentClass];
      if (compactReply) classes.push('message-ack');
      else if (spokenText.split(/\s+/).length <= 4 && alignmentClass !== 'message-system'
        && !isProvisionalSpeaker(speaker)) classes.push('message-brief');
      const nod = compactReply && hasExplicitTimestamp;
      const nodLabel = `${speaker.replace(/:$/, "")} · ${formatTimestamp(seconds)}`;
      if (nod) {
        classes.push('message-nod', alignmentClass === 'message-received' ? 'reply-left' : 'reply-right');
        const play = createTimestampLink(`${timestampClass} nod-play`, timestamp, seconds);
        play.children = [messageChildren[0]];
        play.data!.hProperties!['aria-label'] = `${nodLabel}: ${spokenText} Jump to passage`;
        messageChildren.splice(0, messageChildren.length, play);
      }

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

      node.children = [
        createSpan("message-speaker", [createStrong([createText(speaker.replace(/:$/, ""))])]),
        messageSpan,
      ];
      node.data = {
        hName: "p",
        hProperties: {
          id: messageId,
          className: classes,
          "data-timestamp": String(seconds),
          "data-speaker": speaker.replace(/:$/, ""),
          "data-msg-occurrence": String(nextOccurrence),
          ...(nod ? { "data-nod-label": nodLabel, "data-reply-to": replyParent } : {}),
        },
      };

      lastSpeaker = speaker;
      previousTime = seconds;
      previousTimed = hasExplicitTimestamp;
      if (!compactReply) { replyParent = messageId; }
    });

    // Group only adjacent rendered turns. Markdown and canonical passage IDs stay flat.
    const grouped: RootContent[] = [];
    for (const node of tree.children) {
      const replyTo = node.data?.hProperties?.['data-reply-to'];
      const previous = grouped.at(-1);
      if (replyTo && previous) {
        const previousId = previous.data?.hProperties?.id;
        const groupId = previous.data?.hProperties?.['data-reply-parent'];
        if (groupId === replyTo && previous.type === 'blockquote') {
          previous.children.push(node as Paragraph);
          continue;
        }
        if (previousId === replyTo && previous.type === 'paragraph') {
          const classes = String(previous.data?.hProperties?.className || '');
          grouped[grouped.length - 1] = {
            type: 'blockquote',
            data: { hName: 'div', hProperties: {
              className: ['message-thread', classes.includes('message-received') ? 'thread-left' : 'thread-right'],
              'data-reply-parent': replyTo,
            } },
            children: [previous, node as Paragraph],
          };
          continue;
        }
      }
      grouped.push(node);
    }
    // A brief response does not restart the main speaker's visual run.
    // Structural boundaries and longer pauses restore the visible attribution.
    let previousLead: string | null = null;
    let previousEnd = 0;
    for (const node of grouped) {
      const lead = node.type === 'blockquote' && node.data?.hProperties?.['data-reply-parent']
        ? node.children[0] : node;
      const props = lead.data?.hProperties;
      const speaker = props?.['data-speaker'];
      const classes = props?.className;
      if (typeof speaker !== 'string' || !Array.isArray(classes) || classes.includes('message-nod')) {
        previousLead = null;
        continue;
      }
      const start = Number(props?.['data-timestamp']);
      if (previousLead === speaker && start >= previousEnd && start - previousEnd <= maxConversationGapSeconds) {
        if (!classes.includes('hide-speaker')) classes.push('hide-speaker');
        classes.push('message-continuation');
        if (node !== lead) {
          (node.data!.hProperties!.className as string[]).push('thread-continuation');
        }
      }
      previousLead = speaker;
      const tail = node.type === 'blockquote' ? node.children.at(-1) : node;
      previousEnd = Number(tail?.data?.hProperties?.['data-timestamp'] ?? start);
    }
    // Pair nearby responses on opposite sides without reordering their DOM/audio sequence.
    for (const group of grouped) {
      if (group.type !== 'blockquote' || !group.data?.hProperties?.['data-reply-parent']) continue;
      const children = [group.children[0]];
      for (const reply of group.children.slice(1)) {
        const previous = children.at(-1);
        const previousReply = previous?.type === 'blockquote' ? previous.children[0] : null;
        const left = (reply.data?.hProperties?.className as string[])?.includes('reply-left');
        const previousLeft = (previousReply?.data?.hProperties?.className as string[])?.includes('reply-left');
        const gap = Number(reply.data?.hProperties?.['data-timestamp'])
          - Number(previousReply?.data?.hProperties?.['data-timestamp']);
        if (previous?.type === 'blockquote' && previous.children.length === 1
          && left !== previousLeft && gap >= 0 && gap <= 8 && (previousLeft || gap === 0)) {
          previous.children.push(reply);
          (previous.data!.hProperties!.className as string[]).push('reply-row-pair');
        } else {
          children.push({ type: 'blockquote', data: { hName: 'div', hProperties: {
            className: ['reply-row'],
          } }, children: [reply] });
        }
      }
      group.children = children;
    }
    tree.children = grouped;
  };
};
