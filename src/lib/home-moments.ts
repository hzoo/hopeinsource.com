export interface HomeMoment {
  slug: string;
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
  },
  {
    slug: "emotional",
    seconds: 362,
    speaker: "Omar",
    text: "I think emotions are a big deal in programming.",
    side: "sent",
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
    slug: "totems",
    seconds: 1529,
    speaker: "Xiq",
    text: "Words are totems. Yes. Yes, yes, yes.",
    side: "sent",
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
