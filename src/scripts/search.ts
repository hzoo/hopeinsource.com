import { getQueryResults, searchTerms, escapeSearchText, normalizeSearchQuery, hasVisibleSearchMatch, type PagefindResult, type PagefindData } from './search-results';
import { PAGEFIND_PATH } from '../lib/pagefind-path';
export { getPassageResults } from './search-results';
import { loadSearchVocabulary, suggestQuery } from './search-spelling';

/**
 * Search functionality with a nonmodal search popover.
 * Loaded on demand via search-entry.ts.
 */

interface Pagefind {
    search: (query: string, options?: SearchOptions) => Promise<{ results: PagefindResult[] }>;
    init: () => Promise<void>;
    preload: (query: string, options?: SearchOptions) => Promise<void>;
    destroy: () => Promise<void>;
    options: (options: { ranking: { metaWeights: Record<string, number> } }) => Promise<void>;
}

type SearchScope = 'episode' | 'all';
interface SearchOptions { filters: { episode: string } }

interface SearchSession {
    id: number;
    results: PagefindResult[];
    passageResults: PagefindData[];
    visiblePassages: Map<string, number>;
    nextIndex: number;
    total: number;
    query: string;
    termMatches: Map<string, number[]>[];
    scope: SearchScope;
    pagination: 'idle' | 'loading' | 'retry';
}

function resultSeconds(result: PagefindData): number | null {
    if (result.meta.seconds === undefined) return null;
    const seconds = Number(result.meta.seconds);
    return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

let pagefind: Pagefind | null = null;
let pagefindPromise: Promise<Pagefind | null> | null = null;
let pagefindCleanup: Promise<void> | null = null;
let refreshPagefindOnQuery = false;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let modal: HTMLDivElement | null = null;
let input: HTMLInputElement | null = null;
let resultsArea: HTMLDivElement | null = null;
let returnFocusTo: HTMLElement | null = null;
let activeSearchId = 0;
let searchSession: SearchSession | null = null;
let currentEpisode: string | null = null;
let searchScope: SearchScope = 'all';

// Keep initial search render cheap, then hydrate more on demand.
const EPISODES_TO_HYDRATE = 3;
const PASSAGES_PER_EPISODE = 3;
const LOCAL_PASSAGES = 5;
const MORE_PASSAGES_STEP = 10;
const HYDRATE_BATCH_SIZE = 3;
const SEARCH_DEBOUNCE_MS = 120;

function getLoadingHtml(): string {
    return `
    <div class="search-loading">
      <div class="search-loading-spinner"></div>
      <span>Searching...</span>
    </div>
  `;
}

function isCompositionKey(event: KeyboardEvent): boolean {
    // Safari can dispatch the confirming key after compositionend.
    return event.isComposing || event.keyCode === 229;
}

function createPopover() {
    if (modal) return;

    currentEpisode = document.getElementById('episode-content-shell')
        ? `${window.location.pathname.replace(/\/$/, '')}/`
        : null;
    searchScope = currentEpisode ? 'episode' : 'all';
    modal = document.createElement('div');
    modal.className = 'search-popover';
    modal.setAttribute('role', 'dialog');
    modal.id = 'search-popover';
    modal.setAttribute('aria-label', 'Search transcripts');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
    <div class="search-input-row">
      <svg class="search-input-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        inputmode="search"
        class="search-popover-input"
        aria-label="Search transcripts"
        role="searchbox"
        aria-controls="search-results"
        placeholder="Words, names, or &quot;a phrase&quot;"
        autocomplete="off"
        spellcheck="false"
      />
      <button class="search-close-button" type="button" aria-label="Close search">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    ${currentEpisode ? `<div class="search-scope" role="group" aria-label="Search scope">
      <button type="button" data-search-scope="episode" aria-pressed="true">This episode</button>
      <button type="button" data-search-scope="all" aria-pressed="false">All episodes</button>
    </div>` : ''}
    <div id="search-results" class="search-results-area"></div>
    <span class="search-status sr-only" role="status" aria-live="polite" aria-atomic="true"></span>
  `;
    document.body.appendChild(modal);
    document.getElementById('search-trigger')?.setAttribute('aria-controls', modal.id);

    input = modal.querySelector('.search-popover-input');
    resultsArea = modal.querySelector('.search-results-area');

    if (!input || !resultsArea) return;

    updateScopeControls();
    input.addEventListener('input', queueSearch);
    modal.addEventListener('click', (event) => {
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-search-scope]');
        const scope = button?.dataset.searchScope;
        if (scope !== 'episode' && scope !== 'all') return;
        if ((scope === 'episode' && !currentEpisode) || scope === searchScope) return;
        searchScope = scope;
        // An empty-state action is replaced during search; keep focus in the input.
        if (resultsArea?.contains(button!)) input?.focus();
        updateScopeControls();
        queueSearch();
    });

    // Native links/buttons keep every expansion and episode reachable by keyboard.
    input.addEventListener('keydown', (event) => {
        if (isCompositionKey(event)) return;
        if (event.key === 'ArrowDown') {
            const first = resultsArea?.querySelector<HTMLElement>('.search-result')
                ?? resultsArea?.querySelector<HTMLElement>('.search-episode-title');
            if (first) { event.preventDefault(); first.focus(); }
        } else if (event.key === 'Enter') {
            const links = resultsArea?.querySelectorAll<HTMLAnchorElement>('.search-result');
            if (links?.length === 1 && searchSession?.nextIndex === searchSession?.total) {
                event.preventDefault(); links[0].click();
            }
        }
    });
    resultsArea.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        const controls = [...resultsArea!.querySelectorAll<HTMLElement>('a, button:not(:disabled)')];
        const index = controls.indexOf(document.activeElement as HTMLElement);
        if (index < 0) return;
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? Math.min(index + 1, controls.length - 1) : index - 1;
        if (next < 0) input?.focus();
        else controls[next]?.focus();
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !isCompositionKey(e)) {
            e.preventDefault();
            closePopover();
        }
    });

    document.addEventListener('pointerdown', (event) => {
        const target = event.target as Node;
        if (!modal?.contains(target) && !document.getElementById('search-trigger')?.contains(target)) {
            closePopover(false);
        }
    });
    document.addEventListener('focusin', (event) => {
        if (modal?.classList.contains('visible') && !modal.contains(event.target as Node)) {
            closePopover(false);
        }
    });
    window.addEventListener('online', () => {
        // Failed index/filter downloads can be cached as empty native results.
        // Visible results still need their engine for pagination.
        if (searchSession?.passageResults.length) {
            refreshPagefindOnQuery = true;
            return;
        }
        resetPagefind();
        if (modal?.classList.contains('visible')) queueSearch();
    });
    modal.querySelector('.search-close-button')?.addEventListener('click', () => closePopover());

    // Delegated clicks in search area
    resultsArea.addEventListener('click', (e) => {
        const suggestion = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-search-suggestion]');
        if (suggestion && input) {
            input.value = suggestion.dataset.searchSuggestion ?? '';
            input.focus();
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }
        const expandButton = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-expand-episode]');
        if (expandButton && searchSession) {
            const episode = expandButton.dataset.expandEpisode ?? '';
            const firstNew = passageLimit(episode);
            searchSession.visiblePassages.set(episode, firstNew + MORE_PASSAGES_STEP);
            renderSearchSession();
            const group = [...resultsArea!.querySelectorAll<HTMLElement>('.search-episode-group')]
                .find(element => element.dataset.episode === episode);
            group?.querySelectorAll<HTMLAnchorElement>('.search-result')[firstNew]?.focus();
            return;
        }
        const loadMoreButton = (e.target as HTMLElement).closest<HTMLButtonElement>('#search-load-more');
        if (loadMoreButton) {
            e.preventDefault();
            void loadMoreResults();
            return;
        }

        // Follow transcript results.
        const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.search-result');

        if (link) {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            const url = new URL(link.href, window.location.origin);
            const hash = url.hash;

            closePopover();

            const samePage = url.origin === window.location.origin
                && url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '');
            if (samePage && hash) {
                if (window.location.hash === hash) {
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                } else {
                    window.location.hash = hash;
                }
            } else {
                window.location.href = link.href;
            }
        }
    });
}

function scopeOptions(): SearchOptions | undefined {
    return searchScope === 'episode' && currentEpisode
        ? { filters: { episode: currentEpisode } }
        : undefined;
}

function updateScopeControls() {
    modal?.querySelectorAll<HTMLButtonElement>('.search-scope button').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.searchScope === searchScope));
    });
    input?.setAttribute('aria-label', searchScope === 'episode' ? 'Search this episode' : 'Search all transcripts');
}

function queueSearch() {
    if (!input || !resultsArea) return;
    const query = input.value.trim();
    if (debounceTimer) clearTimeout(debounceTimer);
    activeSearchId++;
    searchSession = null;
    resultsArea.scrollTop = 0;
    setSearchStatus('');
    if (!query) {
        resultsArea.innerHTML = '';
        resultsArea.setAttribute('aria-busy', 'false');
        return;
    }
    resultsArea.innerHTML = getLoadingHtml();
    resultsArea.setAttribute('aria-busy', 'true');
    if (refreshPagefindOnQuery) resetPagefind();
    if (pagefind) void pagefind.preload(normalizeSearchQuery(query), scopeOptions()).catch(() => {});
    debounceTimer = setTimeout(() => { void performSearch(query); }, SEARCH_DEBOUNCE_MS);
}

function setSearchStatus(text: string) {
    const status = modal?.querySelector('.search-status');
    if (status) status.textContent = text;
}

async function loadPagefind(): Promise<Pagefind | null> {
    if (pagefind) return pagefind;
    if (document.getElementById('search-trigger')?.dataset.dev) return null;
    if (!pagefindPromise) {
        pagefindPromise = (async () => {
            try {
                await pagefindCleanup;
                pagefindCleanup = null;
                const module = await import(/* @vite-ignore */ `${PAGEFIND_PATH}/pagefind.js`) as Pagefind;
                await module.options({ ranking: { metaWeights: { passage_speakers: 0 } } });
                await module.init();
                pagefind = module;
                return module;
            } catch {
                pagefindPromise = null;
                return null;
            }
        })();
    }
    return pagefindPromise;
}

function resetPagefind() {
    refreshPagefindOnQuery = false;
    const engine = pagefind;
    if (!engine) return;
    pagefind = null;
    pagefindPromise = null;
    // Pagefind memoizes failed fragment promises. Release those caches now,
    // then initialize on the next user action, once the connection may recover.
    pagefindCleanup = engine.destroy().catch(() => {});
}

async function findResults(engine: Pagefind, query: string, options: SearchOptions | undefined, searchId: number) {
    const resultSet = await engine.search(normalizeSearchQuery(query), options);
    if (searchId !== activeSearchId) return null;
    const terms = searchTerms(query);
    // Native offsets preserve stemming while requiring all terms in one turn.
    const termSets = !resultSet.results.length ? [] : terms.length === 1
        ? [resultSet] : await Promise.all(terms.map(term => engine.search(term, options)));
    const visibleTermIds = termSets.map(set => new Set(set.results.filter(hasVisibleSearchMatch).map(result => result.id)));
    return {
        results: resultSet.results.filter(result => hasVisibleSearchMatch(result)
            && visibleTermIds.every(ids => ids.has(result.id))),
        termMatches: termSets.map(set => new Map(set.results.map(result => [result.id ?? '', result.words ?? []]))),
    };
}

async function openPopover() {
    if (!modal) createPopover();
    const trigger = document.getElementById('search-trigger');
    if (!modal) return;
    if (modal.classList.contains('visible')) {
        input?.focus();
        return;
    }
    returnFocusTo = document.activeElement instanceof HTMLElement
        && document.activeElement !== document.body
        && !modal.contains(document.activeElement)
        ? document.activeElement
        : trigger;
    if (returnFocusTo?.closest('#episode-sidebar') && window.matchMedia('(max-width: 1023px)').matches) {
        returnFocusTo = document.getElementById('header-sidebar-toggle');
    }
    modal.removeAttribute('inert');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('visible');
    trigger?.setAttribute('aria-expanded', 'true');
    input?.focus();

    // Focus immediately; load the engine in parallel with the user's typing.
    const engine = await loadPagefind();
    if (!engine && modal.classList.contains('visible') && !input?.value && resultsArea) {
        resultsArea.innerHTML = '<div class="search-empty-state">Search is unavailable. Try reopening it.</div>';
    }
}

function closePopover(restoreFocus = true) {
    if (!modal?.classList.contains('visible') || !input || !resultsArea) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    activeSearchId++;
    searchSession = null;
    const focusTarget = returnFocusTo;
    returnFocusTo = null;
    modal.classList.remove('visible');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('search-trigger')?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) focusTarget?.focus();
    input.value = '';
    resultsArea.innerHTML = '';
    resultsArea.setAttribute('aria-busy', 'false');
    setSearchStatus('');
}

async function hydrateResults(
    results: PagefindResult[],
    startIndex: number,
    count: number,
    searchId: number,
    termMatches: Map<string, number[]>[],
): Promise<PagefindData[] | null> {
    const hydrated: PagefindData[] = [];
    const endIndex = Math.min(startIndex + count, results.length);

    for (let i = startIndex; i < endIndex; i += HYDRATE_BATCH_SIZE) {
        const batch = results.slice(i, Math.min(i + HYDRATE_BATCH_SIZE, endIndex));
        const data = await Promise.all(batch.map((r) => r.data()));
        if (searchId !== activeSearchId) return null;
        hydrated.push(...data.map((result, index) => ({
            ...result,
            term_locations: termMatches.map(matches => matches.get(batch[index].id ?? '') ?? []),
        })));
    }

    return hydrated;
}

async function performSearch(query: string) {
    if (!resultsArea) return;

    const searchId = ++activeSearchId;
    searchSession = null;

    try {
        const engine = await loadPagefind();
        if (searchId !== activeSearchId) return;
        if (!engine) throw new Error('Search unavailable');
        const scope = searchScope;
        const options = scopeOptions();
        const resultSet = await findResults(engine, query, options, searchId);
        if (searchId !== activeSearchId) return;
        if (!resultSet) return;
        if (resultSet.results.length === 0) {
            await renderNoResults(query, searchId);
            return;
        }

        const termMatches = resultSet.termMatches;
        resultsArea.innerHTML = getLoadingHtml();

        const hydratedResults = await hydrateResults(
            resultSet.results,
            0,
            EPISODES_TO_HYDRATE,
            searchId,
            termMatches,
        );
        if (!hydratedResults || searchId !== activeSearchId) return;

        const passageResults = getQueryResults(hydratedResults, query);
        let nextIndex = hydratedResults.length;
        while (!passageResults.length && nextIndex < resultSet.results.length) {
            const nextHydrated = await hydrateResults(resultSet.results, nextIndex, EPISODES_TO_HYDRATE, searchId, termMatches);
            if (!nextHydrated || searchId !== activeSearchId) return;
            passageResults.push(...getQueryResults(nextHydrated, query));
            nextIndex += nextHydrated.length;
        }

        searchSession = {
            id: searchId,
            results: resultSet.results,
            passageResults,
            visiblePassages: new Map(),
            nextIndex,
            total: resultSet.results.length,
            query,
            termMatches,
            scope,
            pagination: 'idle',
        };

        if (!passageResults.length) await renderNoResults(query, searchId);
        else renderSearchSession();
    } catch {
        if (searchId !== activeSearchId) return;
        resetPagefind();
        resultsArea.innerHTML = '<div class="search-no-results">Search couldn’t load. Try typing again.</div>';
        resultsArea.setAttribute('aria-busy', 'false');
        setSearchStatus('Search couldn’t load.');
    }
}

async function renderNoResults(query: string, searchId: number, knownSuggestions?: string[]) {
    if (!resultsArea || searchId !== activeSearchId) return;
    const message = searchScope === 'episode' ? 'No matches in this episode' : 'No matching passages';
    const allEpisodes = searchScope === 'episode'
        ? '<button class="search-all-episodes" type="button" data-search-scope="all">Search all episodes</button>'
        : '';
    resultsArea.innerHTML = `<div class="search-no-results">${message}<div class="search-suggestions"></div>${allEpisodes}</div>`;
    resultsArea.setAttribute('aria-busy', 'false');
    setSearchStatus(`${message}.`);
    const vocabulary = knownSuggestions ? null : await loadSearchVocabulary();
    if (searchId !== activeSearchId || !resultsArea) return;
    const suggestions = knownSuggestions ?? (vocabulary ? suggestQuery(query, vocabulary) : []);
    const suggestionArea = resultsArea.querySelector('.search-suggestions');
    if (suggestionArea && suggestions.length) {
        suggestionArea.innerHTML = 'Try ' + suggestions.map(suggestion => `<button type="button" data-search-suggestion="${escapeHtml(suggestion)}">${escapeHtml(suggestion)}</button>`).join(' · ');
    }
    resultsArea.setAttribute('aria-busy', 'false');
    setSearchStatus(suggestions.length ? `${message}. Try ${suggestions.join(' or ')}.` : `${message}.`);
}

async function loadMoreResults() {
    const session = searchSession;
    if (!session || !resultsArea || session.pagination === 'loading' || session.nextIndex >= session.total) return;

    const loadMoreButton = resultsArea.querySelector<HTMLButtonElement>('#search-load-more');
    const startedFromButton = document.activeElement === loadMoreButton;
    const refreshResults = session.pagination === 'retry';
    session.pagination = 'loading';
    updateLoadMoreButton();

    const firstNewIndex = session.passageResults.length;
    try {
        if (refreshResults) {
            const engine = await loadPagefind();
            if (session.id !== activeSearchId) return;
            if (!engine) throw new Error('Search unavailable');
            const refreshed = await findResults(engine, session.query, scopeOptions(), session.id);
            if (!refreshed || session.id !== activeSearchId) return;
            // A deployment may have replaced the index during the failed request.
            // Restart the search if its consumed result order changed.
            if (!session.results.slice(0, session.nextIndex).every((result, index) => result.id === refreshed.results[index]?.id)) {
                await performSearch(session.query);
                return;
            }
            session.results = refreshed.results;
            session.termMatches = refreshed.termMatches;
            session.total = refreshed.results.length;
        }
        do {
            const nextHydrated = await hydrateResults(session.results, session.nextIndex, EPISODES_TO_HYDRATE, session.id, session.termMatches);
            if (!nextHydrated || session.id !== activeSearchId) return;
            session.passageResults.push(...getQueryResults(nextHydrated, session.query));
            session.nextIndex += nextHydrated.length;
        } while (session.passageResults.length === firstNewIndex && session.nextIndex < session.total);
        const focused = document.activeElement as HTMLElement;
        // Disabling the loading button can move focus to body. If the reader
        // focused another control while waiting, preserve that control instead.
        const restoreFocus = focused === loadMoreButton || (startedFromButton && focused === document.body);
        const focusedId = resultsArea.contains(focused) ? focused.id : '';
        session.pagination = 'idle';
        renderSearchSession();
        if (restoreFocus) {
            const firstNew = session.passageResults[firstNewIndex]?.url.split('#')[0];
            const focusTarget = [...resultsArea.querySelectorAll<HTMLAnchorElement>('.search-episode-title')]
                .find(link => link.getAttribute('href') === firstNew) ?? input;
            focusTarget?.focus();
        } else if (focusedId) document.getElementById(focusedId)?.focus({ preventScroll: true });
    } catch {
        if (session.id !== activeSearchId) return;
        session.pagination = 'retry';
        resetPagefind();
        const retryButton = updateLoadMoreButton();
        if (startedFromButton && document.activeElement === document.body) retryButton?.focus();
    }
}

function updateLoadMoreButton() {
    const button = resultsArea?.querySelector<HTMLButtonElement>('#search-load-more');
    if (!button) return;
    const pagination = searchSession?.pagination;
    button.disabled = pagination === 'loading';
    button.textContent = pagination === 'loading' ? 'Loading...'
        : pagination === 'retry' ? 'Try loading more again' : 'Show more episodes';
    return button;
}

function renderSearchSession() {
    if (!searchSession) return;
    renderGroupedResults(
        searchSession.passageResults,
        searchSession.nextIndex < searchSession.total,
    );
}

function renderGroupedResults(results: PagefindData[], hasMore: boolean) {
    if (!resultsArea) return;

    // Group results by episode (base URL without anchor)
    const grouped = new Map<string, { title: string; results: Array<{ result: PagefindData; index: number }> }>();

    results.forEach((result, i) => {
        const baseUrl = result.url.split('#')[0];
        const cleanTitle = result.meta?.title || 'Untitled';

        if (!grouped.has(baseUrl)) {
            grouped.set(baseUrl, { title: cleanTitle, results: [] });
        }
        if (result.meta.seconds !== undefined) {
            grouped.get(baseUrl)!.results.push({ result, index: i });
        }
    });

    // Preserve the engine's relevance order. Match count favors long episodes.
    const sortedGroups = Array.from(grouped.entries());

    const resultsHtml = sortedGroups.map(([baseUrl, group], groupIndex) =>
        renderEpisodeGroup(baseUrl, group.title, group.results, groupIndex),
    ).join('');

    const loadMoreHtml = hasMore
        ? '<button id="search-load-more" class="search-load-more" type="button">Show more episodes</button>'
        : '';

    if (!sortedGroups.length && !hasMore) {
        resultsArea.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    resultsArea.innerHTML = `
      <div id="search-results-list" class="search-results-list">${resultsHtml}</div>
      ${loadMoreHtml}
    `;
    updateLoadMoreButton();
    resultsArea.setAttribute('aria-busy', 'false');
    setSearchStatus(searchSession?.scope === 'episode'
        ? `${sortedGroups[0]?.[1].results.length ?? 0} matching passages in this episode.`
        : `Showing ${sortedGroups.length} matching episode${sortedGroups.length === 1 ? '' : 's'}${hasMore ? ', more available' : ''}.`);
}

function passageLimit(baseUrl: string): number {
    return searchSession?.visiblePassages.get(baseUrl)
        ?? (searchSession?.scope === 'episode' ? LOCAL_PASSAGES : PASSAGES_PER_EPISODE);
}

function renderEpisodeGroup(baseUrl: string, title: string, results: Array<{ result: PagefindData; index: number }>, groupIndex: number) {
    const limit = passageLimit(baseUrl);
    const visible = results.slice(0, limit);
    const matchesHtml = visible.map(({ result, index }) => renderMatch(result, index)).join('');
    const nextCount = Math.min(MORE_PASSAGES_STEP, results.length - visible.length);
    const more = nextCount > 0
        ? `<button id="search-expand-${groupIndex}" type="button" class="search-more-passages" data-expand-episode="${escapeHtml(baseUrl)}">Show ${nextCount} more passage${nextCount === 1 ? '' : 's'}</button>` : '';

    return `
    <div class="search-episode-group" role="group" aria-label="${escapeHtml(title)}" data-episode="${escapeHtml(baseUrl)}">
      <div class="search-episode-header">
        <a id="search-episode-${groupIndex}" href="${baseUrl}" class="search-episode-title">${escapeHtml(title)}</a>
        <span class="search-episode-count">${results.length ? `${results.length} match${results.length !== 1 ? 'es' : ''}` : 'Episode'}</span>
      </div>
      <div class="search-episode-matches">${matchesHtml}</div>${more}
    </div>
  `;
}

function renderMatch(result: PagefindData, index: number) {
    const excerpt = result.excerpt || '';
    const displayTime = formatSecondsToTime(resultSeconds(result));

    return `
    <a href="${result.url}"
       id="search-result-${index}"
       class="search-result"
       data-index="${index}">
      <span class="search-result-time">${displayTime}</span>
      <div class="search-result-copy">${result.meta.speaker ? `<span class="search-result-speaker">${escapeHtml(result.meta.speaker)}</span>` : ''}<span class="search-excerpt">${excerpt}</span></div>
    </a>
  `;
}

function formatSecondsToTime(seconds: number | null): string {
    if (seconds === null) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds) % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

function escapeHtml(str: string) {
    return escapeSearchText(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function openSearchPopover() {
    await openPopover();
}

export {};
