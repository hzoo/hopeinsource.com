import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const podcastSchema = z.object({
  title: z.string(),
  season: z.number(),
  date: z.date(),
  time: z.string(),
  description: z.string(),
  episodeLink: z.string(),
  sauntercast: z.boolean().optional(),
  video: z.object({
    url: z.url(),
    offsetSeconds: z.number().int().nonnegative().optional(),
  }).optional(),
  sidebar: z.object({
    order: z.number(),
  }),
  speakers: z.record(z.string(), z.enum(['left', 'right', 'other'])).optional(),
  quotes: z.array(
    z.object({
      text: z.string(),
      speaker: z.string(),
      timestamp: z.string(),
      topic: z.string().optional(),
    })
  ).max(2).optional(),
});

// Define the podcast collection
const podcast = defineCollection({
  loader: glob({ 
    pattern: '**/[^_]*.md', 
    base: 'src/content/podcast' 
  }),
  schema: podcastSchema,
});

export const collections = { podcast };
