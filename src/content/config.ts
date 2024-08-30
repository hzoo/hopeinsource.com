import { z, defineCollection } from "astro:content";

export const collections = {
  docs: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      season: z.number(),
      date: z.string(),
      time: z.string(),
      description: z.string(),
      episodeLink: z.string(),
      embedUrl: z.string(),
      sidebar: z.object({
        order: z.number(),
      }),
    }),
  }),
};
