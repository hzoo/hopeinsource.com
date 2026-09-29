export interface HomeMoment {
  slug: string;
  seconds: number;
  speaker: string;
  text: string;
  preview?: string;
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
    seconds: 1539,
    speaker: "Xiq",
    text: "Words are totems. Definitely. If you know the etymology. If you don't, you're just looking at the top of the totem. You don't know where it comes from.",
    preview: "Words are totems. Definitely.",
    side: "received",
    context: {
      before: { seconds: 1515, speaker: "Henry", text: "Words work like that too.", side: "sent" },
      after: { seconds: 1548, speaker: "Xiq", text: "Wow. Cool. I wanna tweet that.", side: "received" },
    },
  },
  {
    slug: "overparticipation",
    seconds: 606,
    speaker: "Nadia",
    text: "Like, if you were to publish something online or even if you're just like reading news articles or whatever. I mean, we're all familiar with this idea that, \"don't read the comments section\" and you see just sort of all sorts of people come out of the woodwork in the comment section.",
    preview: "\"don't read the comments section\"",
    side: "received",
    context: {
      before: { seconds: 583, speaker: "Henry", text: "I liked your point about the whole post comment model of social media, every single website essentially has that.", side: "sent" },
      after: { seconds: 641, speaker: "Henry", text: "We're kind of facing the fact that being open kind of needs its own limits, that more is not always better.", side: "sent" },
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
    preview: "But in the physical world, you can be silent and present at the same time.",
    side: "received",
    context: {
      before: { seconds: 807, speaker: "Drew", text: "And there's no like silence paired with presence. It's like people would notice if you, if you were silent and on Twitter, then it would be perceived as an absence.", side: "received" },
      after: { seconds: 835, speaker: "Henry", text: "So this reminds me of a game that I play a lot. It's called The Mind. You're supposed to be silent when you're playing it.", side: "sent" },
    },
  },
  {
    slug: "emotional",
    seconds: 362,
    speaker: "Omar",
    text: "And I think often there are these aesthetic choices or there are these emotional choices or there are different goals people have. I think emotions are a big deal in programming. I think most of the work in programming is managing your own feelings about it.",
    preview: "I think emotions are a big deal in programming.",
    side: "received",
    context: {
      before: { seconds: 352, speaker: "Omar", text: "Often one of the problems I have with a lot of discussion of programming languages or libraries or whatever, is this idea that we're just trying to find the right answer to do things.", side: "received" },
      after: { seconds: 375, speaker: "Henry", text: "Yeah. So it kinda makes me think of how in tech, I guess maybe the dominant thinking is sort of assumed to be the right way or the neutral thing.", side: "sent" },
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
    text: "Various things have led me over the years to think about silence. And in this particular case, I was struck by the fact that silence is a critical part of human communication. It's meaningful. This is I think the important word, right?",
    preview: "It's meaningful. This is I think the important word, right?",
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
