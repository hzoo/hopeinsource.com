import type { CollectionEntry } from 'astro:content';

export type PodcastEntry = CollectionEntry<'podcast'> & {
  slug: string;
};

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  embedUrl?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
} 