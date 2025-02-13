import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the podcast collection
const podcast = defineCollection({
  loader: glob({ 
    pattern: '**/[^_]*.md', 
    base: './src/content/podcast' 
  }),
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
});

export const collections = { podcast }; 