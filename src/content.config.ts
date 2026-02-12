import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const podcastSchema = z.object({
  title: z.string(),
  season: z.number(),
  date: z.date(),
  time: z.string(),
  description: z.string(),
  episodeLink: z.string(),
  embedUrl: z.string(),
  video: z.object({
    url: z.string().url(),
    offsetSeconds: z.number().int().nonnegative().optional(),
    summary: z.string().optional(),
    recordedOn: z.string().optional(),
    chapters: z.array(
      z.object({
        time: z.string(),
        title: z.string(),
      }),
    ).optional(),
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
