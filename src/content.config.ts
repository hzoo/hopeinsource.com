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
  sidebar: z.object({
    order: z.number(),
  }),
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