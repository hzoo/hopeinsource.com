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

function messageIdMarkerCount(node: PhrasingContent): number {
  if (node.type === 'html') return (node.value.match(/\bdata-message-id\b/g) ?? []).length;
  return 'children' in node ? node.children.reduce((total, child) => total + messageIdMarkerCount(child), 0) : 0;
}

/** Preserve a reviewed same-second occurrence without changing its playback time. */
function extractMessageIdOverride(content: PhrasingContent[], seconds: number, timed: boolean) {
  const markers = content.map(messageIdMarkerCount);
  if (!markers.some(Boolean)) return { content, override: null };
  const index = markers.findIndex(Boolean);
  const leading = content.slice(0, index).every(node => node.type === 'text' && !node.value.trim());
  const node = content[index];
  let markup = node.type === 'html' ? node.value : '';
  let consumed = 1;
  if (!/<\/span>\s*$/.test(markup)) {
    while (content[index + consumed]?.type === 'text'
      && !(content[index + consumed] as Text).value.trim()) {
      markup += (content[index + consumed] as Text).value;
      consumed++;
    }
    const closing = content[index + consumed];
    if (closing?.type === 'html') {
      markup += closing.value;
      consumed++;
    }
  }
  const match = markup.match(/^<span\s+data-message-id=(["'])([^"'<>]+)\1\s*>\s*<\/span>$/);
  const identity = match?.[2].match(/^msg-(0|[1-9]\d*)-([1-9]\d*)$/);
  const occurrence = Number(identity?.[2]);
  if (markers.reduce((total, count) => total + count, 0) !== 1 || !leading || !timed
    || !identity || Number(identity[1]) !== seconds || !Number.isSafeInteger(occurrence) || occurrence < 2) {
    throw new Error('Invalid data-message-id: use a leading empty span with a same-timestamp occurrence ID (msg-<seconds>-<occurrence>, occurrence >= 2).');
  }
  return { content: [...content.slice(0, index), ...content.slice(index + consumed)], override: match![2] };
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
    // Episode titles are the page's h1; transcript sections follow at h2.
    visit(tree, 'heading', (node: Heading) => {
      if (node.depth === 3 || node.depth === 4) node.depth = 2;
    });
    const speakerConfig: Record<string, string> = (vfile.data?.astro?.frontmatter?.speakers as Record<string, string>) || {};
    const speakerOrder: string[] = [];
    const messageIdCountsBySecond = new Map<number, number>();
    const timedMessageIds = new Set<string>();
    const usedMessageIds = new Set<string>();
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

      const originalContent = hasExplicitTimestamp
        ? node.children.slice(2)
        : node.children.slice(1);

      const seconds = timeToSeconds(timestamp);
      const { content, override } = extractMessageIdOverride(originalContent, seconds, hasExplicitTimestamp);
      const nextOccurrence = (messageIdCountsBySecond.get(seconds) ?? 0) + 1;
      messageIdCountsBySecond.set(seconds, nextOccurrence);
      const messageId = override ?? (nextOccurrence === 1
        ? `msg-${seconds}`
        : `msg-${seconds}-${nextOccurrence}`);
      if (usedMessageIds.has(messageId)) throw new Error(`Duplicate transcript message ID: ${messageId}`);
      usedMessageIds.add(messageId);
      if (hasExplicitTimestamp) timedMessageIds.add(messageId);

      const previousProps = prevNode?.data?.hProperties;
      const adjacentMessage = Boolean(previousProps?.['data-speaker']
        && Array.isArray(previousProps.className) && !previousProps.className.includes('message-system'));
      const nearby = previousTime !== null && previousTimed === hasExplicitTimestamp
        && (!hasExplicitTimestamp || (seconds >= previousTime && seconds - previousTime <= maxConversationGapSeconds));
      
      // Look ahead for next speaker
      const nextNode = parent.children[index + 1] as RootContent;
      let nextSpeaker = null;
      let nextTimed = false;
      let nextSeconds = 0;
      if (nextNode) {
        if (isHeading(nextNode)) {
          nextSpeaker = null;
        } else if (nextNode.type === "paragraph" && isTimestamp(nextNode)) {
          nextSpeaker = toStringUtil(nextNode.children[1] as Strong);
          nextTimed = true;
          nextSeconds = timeToSeconds((nextNode.children[0] as Text).value.match(timestampRegex)![1]);
        } else if (nextNode.type === "paragraph" && isSpeaker(nextNode)) {
          nextSpeaker = toStringUtil(nextNode.children[0] as Strong);
        }
      }

      // Handle consecutive messages
      const canShareAttribution = alignmentClass !== 'message-system' && !isProvisionalSpeaker(speaker);
      const isNextConsecutive = canShareAttribution && speaker === nextSpeaker
        && hasExplicitTimestamp === nextTimed
        && (!hasExplicitTimestamp || (nextSeconds >= seconds && nextSeconds - seconds <= maxConversationGapSeconds));
      const previousClasses = prevNode?.data?.hProperties?.className;
      const isPrevConsecutive = canShareAttribution && adjacentMessage && nearby && speaker === lastSpeaker
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
    let previousEndTimed = false;
    for (const node of grouped) {
      const lead = node.type === 'blockquote' && node.data?.hProperties?.['data-reply-parent']
        ? node.children[0] : node;
      const props = lead.data?.hProperties;
      const speaker = props?.['data-speaker'];
      const classes = props?.className;
      if (typeof speaker !== 'string' || !Array.isArray(classes)
        || classes.includes('message-nod') || classes.includes('message-system') || isProvisionalSpeaker(speaker)) {
        previousLead = null;
        continue;
      }
      const start = Number(props?.['data-timestamp']);
      const timed = timedMessageIds.has(String(props?.id));
      if (previousLead === speaker && timed === previousEndTimed
        && start >= previousEnd && start - previousEnd <= maxConversationGapSeconds) {
        if (!classes.includes('hide-speaker')) classes.push('hide-speaker');
        classes.push('message-continuation');
        if (node !== lead) {
          (node.data!.hProperties!.className as string[]).push('thread-continuation');
        }
      }
      previousLead = speaker;
      const tail = node.type === 'blockquote' ? node.children.at(-1) : node;
      previousEnd = Number(tail?.data?.hProperties?.['data-timestamp'] ?? start);
      previousEndTimed = timedMessageIds.has(String(tail?.data?.hProperties?.id));
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
