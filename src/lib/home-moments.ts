export interface HomeMoment {
  slug: string;
  seconds: number;
  speaker: string;
  text: string;
  side: "sent" | "received";
  context?: {
    before: HomeMomentLine;
    after: HomeMomentLine;
  };
}

interface HomeMomentLine {
  seconds: number;
  speaker: string;
  text: string;
  side: "sent" | "received";
}

// Exact sentences from the linked transcript messages. Keep the anchor at the
// original message even when the visible sentence is only part of that message.
export const HOME_MOMENTS: HomeMoment[] = [
  {
    slug: "totems",
    seconds: 1529,
    speaker: "Xiq",
    text: "Words are totems. Yes. Yes, yes, yes.",
    side: "sent",
    context: {
      before: { seconds: 1515, speaker: "Henry", text: "But it's literally a totem. Words work like that too.", side: "received" },
      after: { seconds: 1532, speaker: "Henry", text: "Oh, that's a good one.", side: "received" },
    },
  },
  {
    slug: "totems",
    seconds: 230,
    speaker: "Xiq",
    text: "So one thing I really want is a swarm of AI fairies conspiring in my favor at all times.",
    side: "sent",
  },
  {
    slug: "reality",
    seconds: 1038,
    speaker: "Esther",
    text: "Reality really is in the driver's seat.",
    side: "received",
  },
  {
    slug: "feeling",
    seconds: 288,
    speaker: "Sonya",
    text: "No matter where you are in life, you can come to the table.",
    side: "sent",
  },
  {
    slug: "checkpoint",
    seconds: 2552,
    speaker: "Henry",
    text: "where's our agency?",
    side: "received",
  },
  {
    slug: "artificial",
    seconds: 817,
    speaker: "Drew",
    text: "But in the physical world, you can be silent and present at the same time.",
    side: "received",
    context: {
      before: { seconds: 807, speaker: "Drew", text: "And there's no like silence paired with presence.", side: "received" },
      after: { seconds: 835, speaker: "Henry", text: "So this reminds me of a game that I play a lot. It's called The Mind.", side: "sent" },
    },
  },
  {
    slug: "emotional",
    seconds: 362,
    speaker: "Omar",
    text: "I think emotions are a big deal in programming.",
    side: "sent",
    context: {
      before: { seconds: 352, speaker: "Omar", text: "we're just trying to find the right answer to do things.", side: "sent" },
      after: { seconds: 375, speaker: "Henry", text: "Yeah. So it kinda makes me think of how in tech, I guess maybe the dominant thinking is sort of assumed to be the right way or the neutral thing.", side: "received" },
    },
  },
  {
    slug: "snow",
    seconds: 957,
    speaker: "Henry",
    text: "It helps me to remember that life is about being interrupted and being okay with it.",
    side: "received",
  },
  {
    slug: "snow",
    seconds: 3343,
    speaker: "Melody",
    text: "your perspective is valuable because it's your perspective.",
    side: "sent",
  },
  {
    slug: "snow",
    seconds: 3542,
    speaker: "Melody",
    text: "things were always broken. But now they're just revealed.",
    side: "sent",
  },
  {
    slug: "checkpoint",
    seconds: 1805,
    speaker: "Henry",
    text: "The whole point of all this is not so the AI would know. It's that I would know. If it doesn't help me understand, then what's the point?",
    side: "received",
  },
  {
    slug: "salience",
    seconds: 2288,
    speaker: "Sonya",
    text: "The very substance of life itself is shape.",
    side: "sent",
  },
  {
    slug: "silence",
    seconds: 30,
    speaker: "Michael",
    text: "I was struck by the fact that silence is a critical part of human communication.",
    side: "received",
    context: {
      before: { seconds: 26, speaker: "Henry", text: "Maybe we can start with one of your posts called Impossible Silences.", side: "sent" },
      after: { seconds: 45, speaker: "Michael", text: "Two bodies in proximity being silent before one another are still having a kind of meaningful exchange as it were between the two of them.", side: "received" },
    },
  },
];

export function formatMomentTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}`
    : `${minutes}:${remainder}`;
}
