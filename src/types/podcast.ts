import type { CollectionEntry } from 'astro:content';

export type PodcastEntry = CollectionEntry<'podcast'> & {
  slug: string;
};