import {
  READING_POSITION_KEY,
  findReadingMessageIndex,
  isCanonicalReadingAnchor,
  readReadingPosition,
  readingAnchorForDestination,
  writeReadingPosition,
  type ReadingPosition,
} from '../lib/reading-position';

function localReadingStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function initContinueReading() {
  const row = document.getElementById('home-continue');
  const link = document.getElementById('continue-reading') as HTMLAnchorElement | null;
  const catalog = document.getElementById('reading-episodes');
  if (!row || !link || !catalog) return;
  let episodes: Map<string, string>;
  try {
    const data = JSON.parse(catalog.textContent ?? '') as Array<{ path: string; title: string }>;
    episodes = new Map(data.map((episode) => [episode.path, episode.title]));
  } catch {
    return;
  }
  const episodePaths = new Set(episodes.keys());
  const update = () => {
    const position = readReadingPosition(localReadingStorage(), episodePaths);
    row.hidden = !position;
    if (!position) {
      link.removeAttribute('href');
      return;
    }
    link.href = `${position.path}${position.anchor}`;
    link.setAttribute('aria-label', `Continue reading ${episodes.get(position.path)}`);
    link.title = episodes.get(position.path) ?? '';
  };
  update();
  window.addEventListener('pageshow', update);
  window.addEventListener('storage', (event) => {
    if (event.key === READING_POSITION_KEY || event.key === null) update();
  });
}

function initReadingPosition() {
  const container = document.getElementById('episode-scroll-container');
  const content = document.getElementById('episode-content-shell');
  if (!container || !content) return;
  const messages = Array.from(content.querySelectorAll<HTMLElement>('.message[id][data-timestamp]'))
    .filter((message) => isCanonicalReadingAnchor(`#${message.id}`));
  if (!messages.length) return;

  const path = window.location.pathname.replace(/\/$/, '');
  const storage = localReadingStorage();
  const previous = readReadingPosition(storage);
  let lastSavedAnchor = previous?.path === path ? previous.anchor : null;
  let pending: ReadingPosition | null = null;
  let saveTimer: ReturnType<typeof setTimeout> | null = null;
  let scrollFrame: number | null = null;
  let settlingDestination = false;
  let destinationVersion = 0;

  const flush = () => {
    if (saveTimer !== null) clearTimeout(saveTimer);
    saveTimer = null;
    if (pending && writeReadingPosition(storage, pending)) {
      lastSavedAnchor = pending.anchor;
      pending = null;
    }
  };
  const remember = (anchor: string | null) => {
    if (!anchor) return;
    if (anchor === lastSavedAnchor) {
      pending = null;
      if (saveTimer !== null) clearTimeout(saveTimer);
      saveTimer = null;
      return;
    }
    if (anchor === pending?.anchor) return;
    pending = { path, anchor };
    if (saveTimer !== null) clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, 600);
  };
  const visibleAnchor = () => {
    const bounds = container.getBoundingClientRect();
    const readingLine = bounds.top + Math.min(48, bounds.height * 0.2);
    const index = findReadingMessageIndex(messages.length,
      (messageIndex) => messages[messageIndex].getBoundingClientRect(), readingLine);
    return index >= 0 ? `#${messages[index].id}` : null;
  };
  const resolveMessageId = (id: string) => {
    const target = document.getElementById(id)?.closest<HTMLElement>('.message[id]');
    return target && content.contains(target) ? target.id : null;
  };
  const recordScroll = () => {
    scrollFrame = null;
    if (!settlingDestination) remember(visibleAnchor());
  };
  const settleDestination = () => {
    settlingDestination = true;
    const version = ++destinationVersion;
    if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
    scrollFrame = null;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (version !== destinationVersion) return;
      settlingDestination = false;
      remember(readingAnchorForDestination(window.location.hash, visibleAnchor(), resolveMessageId));
    }));
  };

  container.addEventListener('scroll', () => {
    if (!settlingDestination && scrollFrame === null) scrollFrame = requestAnimationFrame(recordScroll);
  }, { passive: true });
  window.addEventListener('hashchange', settleDestination);
  window.addEventListener('pagehide', () => {
    if (scrollFrame !== null) {
      cancelAnimationFrame(scrollFrame);
      recordScroll();
    }
    if (settlingDestination && window.location.hash.startsWith('#msg-')) {
      remember(readingAnchorForDestination(window.location.hash, null, resolveMessageId));
    }
    flush();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flush();
  });

  // Saved progress is a link on the homepage, never an automatic scroll target.
  if (window.location.hash) settleDestination();
}

function init() {
  initContinueReading();
  initReadingPosition();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
