import { getCollection, type CollectionEntry } from "astro:content";

export type PodcastEntry = CollectionEntry<'podcast'> & {
  slug: string;
};

// Parse title to separate episode name from guest name(s)
function parseTitle(title: string): { episodeTitle: string; guests: string[] } {
  const match = title.match(/^(.+?)\s*\(([^)]+)\)$/);
  if (match) {
    const guests = match[2].split(',').map(g => g.trim());
    return { episodeTitle: match[1].trim(), guests };
  }
  return { episodeTitle: title, guests: [] };
}

export interface GuestDisplay {
  name: string;
  count: number;
}

export interface EnrichedEpisode extends PodcastEntry {
  episodeTitle: string;
  guests: string[];
  guestDisplays: GuestDisplay[];
  epNumber: number;
}

export interface EpisodeData {
  episodes: EnrichedEpisode[];
  episodesBySeasons: Record<number, EnrichedEpisode[]>;
  seasons: number[];
  guestCounts: Map<string, number>;
}

export async function getEpisodeData(): Promise<EpisodeData> {
  const rawPosts = await getCollection("podcast");

  // Sort episodes
  const posts: PodcastEntry[] = rawPosts
    .sort((a, b) => {
      const aSeason = a.data.season || 0;
      const bSeason = b.data.season || 0;
      if (bSeason !== aSeason) {
        return bSeason - aSeason;
      }
      return b.data.sidebar.order - a.data.sidebar.order;
    })
    .map(post => ({
      ...post,
      slug: post.id.split('/').pop() || ''
    }));

  // Build guest appearance counts
  const guestCounts = new Map<string, number>();
  posts.forEach(post => {
    const { guests } = parseTitle(post.data.title);
    guests.forEach(guest => {
      guestCounts.set(guest, (guestCounts.get(guest) || 0) + 1);
    });
  });

  // Pre-compute episode numbers
  const episodeNumbers = new Map(
    posts.map((post, index) => [post.slug, posts.length - index])
  );

  // Enrich episodes with all computed data
  const episodes: EnrichedEpisode[] = posts.map(post => {
    const { episodeTitle, guests } = parseTitle(post.data.title);
    return {
      ...post,
      episodeTitle,
      guests,
      guestDisplays: guests.map(g => ({
        name: g,
        count: guestCounts.get(g) || 0
      })),
      epNumber: episodeNumbers.get(post.slug) || 0
    };
  });

  // Group by season
  const episodesBySeasons = episodes.reduce((acc, episode) => {
    const season = episode.data.season || 0;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {} as Record<number, EnrichedEpisode[]>);

  // Sort seasons descending
  const seasons = Object.keys(episodesBySeasons)
    .map(Number)
    .sort((a, b) => b - a);

  return { episodes, episodesBySeasons, seasons, guestCounts };
}
