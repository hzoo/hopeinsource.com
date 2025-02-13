import { signal } from '@preact/signals-react';
import { memo } from 'react';
import type { PodcastEntry } from '@/types/podcast';
import ErrorBoundary from './ErrorBoundary';
import { useSignals } from '@preact/signals-react/runtime';

interface EpisodeListProps {
  episodesBySeasons: Record<number, PodcastEntry[]>;
  seasons: number[];
  initialSeason: number;
}

// Memoized episode panel item component
const EpisodeItem = memo(({ episode }: { episode: PodcastEntry }) => (
  <article className="hover:bg-gray-800/50 px-4 py-1 rounded-lg transition-colors">
    <a href={`/${episode.slug}`} className="block group">
      <h3 className="text-xl font-semibold group-hover:text-his-green transition-colors">
        {episode.data.title}
      </h3>
      <div className="text-sm text-gray-400 mt-1 space-x-2">
        <span>{episode.data.date}</span>
        {episode.data.time && <span>• {episode.data.time} min 🎧</span>}
      </div>
      <p className="mt-2 text-gray-300">{episode.data.description}</p>
    </a>
  </article>
));

EpisodeItem.displayName = 'EpisodeItem';

const EpisodePanel = memo(({ episodes }: { episodes: PodcastEntry[] }) => (
  <div className="space-y-1">
    {episodes.map((episode) => (
      <EpisodeItem key={episode.id} episode={episode} />
    ))}
  </div>
));

EpisodePanel.displayName = 'EpisodePanel';

// Create a signal for active season
const activeSeasonSignal = signal(0);

export default function EpisodeList({ episodesBySeasons, seasons, initialSeason }: EpisodeListProps) {
  useSignals();
  // Initialize active season
  if (activeSeasonSignal.value === 0) {
    activeSeasonSignal.value = initialSeason;
  }

  return (
    <ErrorBoundary>
      {/* Mobile: Single List */}
      <div className="lg:hidden space-y-12">
        {seasons.map((season) => (
          <section key={season} className="space-y-6">
            {season !== 0 && (
              <h2 className="text-2xl font-bold text-his-green">Season {season}</h2>
            )}
            <EpisodePanel episodes={episodesBySeasons[season]} />
          </section>
        ))}
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden lg:block">
        <div className="flex space-x-2 rounded-xl bg-gray-800/50 p-1 mb-8" role="tablist">
          {seasons.map((season) => (
            <button
              key={season}
              type="button"
              role="tab"
              aria-selected={activeSeasonSignal.value === season}
              aria-controls={`season-${season}-panel`}
              id={`season-${season}-tab`}
              onClick={() => {
                activeSeasonSignal.value = season;
              }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${activeSeasonSignal.value === season
                  ? 'bg-his-green text-black shadow'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              {season === 0 ? 'Bonus' : `Season ${season}`}
            </button>
          ))}
        </div>
        {seasons.map((season) => (
          <div
            key={season}
            role="tabpanel"
            id={`season-${season}-panel`}
            aria-labelledby={`season-${season}-tab`}
            hidden={activeSeasonSignal.value !== season}
          >
            <EpisodePanel episodes={episodesBySeasons[season]} />
          </div>
        ))}
      </div>
    </ErrorBoundary>
  );
} 