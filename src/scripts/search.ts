/**
 * Search functionality with a nonmodal search popover.
 * Loaded on demand via search-entry.ts.
 */

interface PagefindResult {
    data: () => Promise<PagefindData>;
}

interface PagefindData {
    url: string;
    excerpt: string;
    plain_excerpt?: string;
    raw_content?: string;
    locations?: number[];
    anchors?: PagefindAnchor[];
    sub_results?: PagefindSubResult[];
    meta: {
        title: string;
        speaker?: string;
        timestamp?: string;
        seconds?: string;
    };
}

interface PagefindAnchor {
    id: string;
    element: string;
    text: string;
    location: number;
}

interface PagefindSubResult {
    url: string;
    excerpt: string;
    plain_excerpt?: string;
    locations: number[];
    anchor?: PagefindAnchor;
}

interface Pagefind {
    search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

interface SearchSession {
    id: number;
    results: PagefindResult[];
    passageResults: PagefindData[];
    visibleResults: number;
    nextIndex: number;
    total: number;
    query: string;
}

function resultSeconds(result: PagefindData): number | null {
    if (result.meta.seconds === undefined) return null;
    const seconds = Number(result.meta.seconds);
    return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

/** Keep Pagefind's exact passage URLs, including repeated timestamps. */
export function getPassageResults(result: PagefindData): PagefindData[] {
    const words = (result.raw_content ?? '').split(/[\r\n\s]+/);
    const anchors = (result.anchors ?? [])
        .filter((anchor) => /^msg-\d+(?:\.\d+)?(?:-\d+)?$/.test(anchor.id))
        .sort((a, b) => a.location - b.location);
    const bounds = new Map(anchors.map((anchor, index) => [anchor.id, {
        start: anchor.location + anchor.text.split(/\s+/).length,
        end: anchors[index + 1]?.location ?? words.length,
    }]));
    const passages = (result.sub_results ?? []).flatMap((subResult) => {
        const anchor = subResult.anchor;
        const seconds = anchor?.id.match(/^msg-(\d+(?:\.\d+)?)(?:-\d+)?$/)?.[1];
        if (!anchor || seconds === undefined) return [];
        const range = bounds.get(anchor.id);
        const locations = range
            ? subResult.locations.filter((location) => location >= range.start && location < range.end)
            : subResult.locations;
        if (!locations.length) return [];
        const label = escapeText(anchor.text);
        const labelPattern = label.split(/\s+/).map((word) =>
            `(?:<mark>)?${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:</mark>)?`,
        ).join('\\s+');
        const withoutLabel = (excerpt: string) => excerpt.replace(new RegExp(`^${labelPattern}\\s*`), '');
        return [{
            url: subResult.url,
            excerpt: withoutLabel(subResult.excerpt),
            plain_excerpt: withoutLabel(subResult.plain_excerpt ?? ''),
            raw_content: range ? words.slice(range.start, range.end).join(' ') : subResult.plain_excerpt,
            locations,
            meta: { ...result.meta, seconds },
        }];
    });
    // The episode title can match without any matching transcript passage.
    return [{ url: result.url, excerpt: '', locations: [], meta: result.meta }, ...passages];
}

function escapeText(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let pagefind: Pagefind | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let selectedIndex = -1;
let modal: HTMLDivElement | null = null;
let input: HTMLInputElement | null = null;
let resultsArea: HTMLDivElement | null = null;
let returnFocusTo: HTMLElement | null = null;
let activeSearchId = 0;
let searchSession: SearchSession | null = null;
let isHydratingMore = false;

// Keep initial search render cheap, then hydrate more on demand.
const EPISODES_TO_HYDRATE = 8;
const INITIAL_VISIBLE_RESULTS = 60;
const LOAD_MORE_RESULTS_STEP = 40;
const HYDRATE_BATCH_SIZE = 8;

function getLoadingHtml(): string {
    return `
    <div class="search-loading">
      <div class="search-loading-spinner"></div>
      <span>Searching...</span>
    </div>
  `;
}

function createPopover() {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'search-popover';
    modal.setAttribute('role', 'dialog');
    modal.id = 'search-popover';
    modal.setAttribute('aria-label', 'Search transcripts');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
    <div class="search-input-row">
      <svg class="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        class="search-popover-input"
        aria-label="Search transcripts"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        aria-controls="search-results-list"
        placeholder="Search transcripts..."
        autocomplete="off"
        spellcheck="false"
      />
      <button class="search-close-button" type="button" aria-label="Close search">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="search-results-area"></div>
  `;
    document.body.appendChild(modal);
    document.getElementById('search-trigger')?.setAttribute('aria-controls', modal.id);

    input = modal.querySelector('.search-popover-input');
    resultsArea = modal.querySelector('.search-results-area');

    if (!input || !resultsArea) return;

    // Input handler
    input.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value.trim();
        if (debounceTimer) clearTimeout(debounceTimer);
        selectedIndex = -1;
        input?.removeAttribute('aria-activedescendant');
        input?.setAttribute('aria-expanded', 'false');
        activeSearchId++;
        searchSession = null;
        isHydratingMore = false;

        if (!query) {
            resultsArea!.innerHTML = '';
            return;
        }

        if (!pagefind) {
            resultsArea!.innerHTML = '<div class="search-empty-state">Search available after build</div>';
            return;
        }
        resultsArea!.innerHTML = getLoadingHtml();
        debounceTimer = setTimeout(() => {
            void performSearch(query);
        }, 250);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const resultLinks = resultsArea!.querySelectorAll<HTMLAnchorElement>('[role="option"]');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const firstPassage = Array.from(resultLinks).findIndex((link) => link.classList.contains('search-result'));
            selectedIndex = selectedIndex < 0 && firstPassage >= 0
                ? firstPassage : Math.min(selectedIndex + 1, resultLinks.length - 1);
            updateSelection(resultLinks);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(resultLinks);
        } else if (e.key === 'Enter') {
            const passages = Array.from(resultLinks).filter((link) => link.classList.contains('search-result'));
            const target = selectedIndex >= 0 ? resultLinks[selectedIndex]
                : passages.length === 1 ? passages[0] : resultLinks.length === 1 ? resultLinks[0] : null;
            if (target) {
                e.preventDefault();
                target.click();
            }
        }
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
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
    modal.querySelector('.search-close-button')?.addEventListener('click', () => closePopover());

    // Delegated clicks in search area
    resultsArea.addEventListener('click', (e) => {
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

async function openPopover() {
    if (!modal) {
        createPopover();
    }

    const trigger = document.getElementById('search-trigger');
    if (!pagefind && !trigger?.dataset.dev) {
        try {
            // @ts-ignore - Dynamic import of Pagefind, escaped from Vite analysis via dynamic path
            const p = 'pagefind';
            pagefind = await import(/* @vite-ignore */ `/${p}/${p}.js`);
        } catch {
            console.warn('Pagefind not found. Search will be available after build.');
        }
    }

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

    if (!input?.value && resultsArea) {
        resultsArea.innerHTML = pagefind ? '' : '<div class="search-empty-state">Search available after build</div>';
    }
}

function closePopover(restoreFocus = true) {
    if (!modal?.classList.contains('visible') || !input || !resultsArea) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    activeSearchId++;
    searchSession = null;
    isHydratingMore = false;
    const focusTarget = returnFocusTo;
    returnFocusTo = null;
    modal.classList.remove('visible');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('search-trigger')?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) focusTarget?.focus();
    input.value = '';
    input.removeAttribute('aria-activedescendant');
    input.setAttribute('aria-expanded', 'false');
    resultsArea.innerHTML = '';
    selectedIndex = -1;
}

async function hydrateResults(
    results: PagefindResult[],
    startIndex: number,
    count: number,
    searchId: number,
): Promise<PagefindData[] | null> {
    const hydrated: PagefindData[] = [];
    const endIndex = Math.min(startIndex + count, results.length);

    for (let i = startIndex; i < endIndex; i += HYDRATE_BATCH_SIZE) {
        const batch = results.slice(i, Math.min(i + HYDRATE_BATCH_SIZE, endIndex));
        const data = await Promise.all(batch.map((r) => r.data()));
        if (searchId !== activeSearchId) return null;
        hydrated.push(...data);
    }

    return hydrated;
}

async function performSearch(query: string) {
    if (!pagefind || !resultsArea) return;

    const searchId = ++activeSearchId;
    selectedIndex = -1;
    input?.removeAttribute('aria-activedescendant');
    input?.setAttribute('aria-expanded', 'false');
    searchSession = null;
    isHydratingMore = false;

    try {
        const resultSet = await pagefind.search(query);
        if (searchId !== activeSearchId) return;

        if (!resultSet || resultSet.results.length === 0) {
            resultsArea.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        resultsArea.innerHTML = getLoadingHtml();

        const hydratedResults = await hydrateResults(
            resultSet.results,
            0,
            EPISODES_TO_HYDRATE,
            searchId,
        );
        if (!hydratedResults || searchId !== activeSearchId) return;

        const passageResults = getQueryResults(hydratedResults, query);
        let nextIndex = hydratedResults.length;
        while (!passageResults.length && nextIndex < resultSet.results.length) {
            const nextHydrated = await hydrateResults(resultSet.results, nextIndex, EPISODES_TO_HYDRATE, searchId);
            if (!nextHydrated || searchId !== activeSearchId) return;
            passageResults.push(...getQueryResults(nextHydrated, query));
            nextIndex += nextHydrated.length;
        }

        searchSession = {
            id: searchId,
            results: resultSet.results,
            passageResults,
            visibleResults: INITIAL_VISIBLE_RESULTS,
            nextIndex,
            total: resultSet.results.length,
            query,
        };

        renderSearchSession();
    } catch {
        if (searchId !== activeSearchId) return;
        resultsArea.innerHTML = '<div class="search-no-results">Search error</div>';
    }
}

async function loadMoreResults() {
    if (!searchSession || !resultsArea || isHydratingMore) return;
    if (searchSession.nextIndex >= searchSession.total && searchSession.visibleResults >= searchSession.passageResults.length) return;

    isHydratingMore = true;

    const loadMoreButton = resultsArea.querySelector<HTMLButtonElement>('#search-load-more');
    const restoreFocus = document.activeElement === loadMoreButton;
    if (loadMoreButton) {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'Loading...';
    }

    const session = searchSession;
    const firstNewIndex = Math.min(session.visibleResults, session.passageResults.length);
    try {
        if (session.visibleResults >= session.passageResults.length) {
            const nextHydrated = await hydrateResults(
                session.results,
                session.nextIndex,
                EPISODES_TO_HYDRATE,
                session.id,
            );
            if (!nextHydrated || session.id !== activeSearchId) return;
            session.passageResults.push(...getQueryResults(nextHydrated, session.query));
            session.nextIndex += nextHydrated.length;
        }
        session.visibleResults = firstNewIndex + LOAD_MORE_RESULTS_STEP;
        renderSearchSession();
        if (restoreFocus) {
            const focusTarget = resultsArea.querySelector<HTMLElement>(`[data-index="${firstNewIndex}"], #search-load-more`) ?? input;
            focusTarget?.focus();
        }
    } catch {
        if (session.id !== activeSearchId) return;
        if (loadMoreButton) {
            loadMoreButton.disabled = false;
            loadMoreButton.textContent = 'Try loading more again';
            if (restoreFocus) loadMoreButton.focus();
        }
    } finally {
        if (session.id === activeSearchId) isHydratingMore = false;
    }
}

function renderSearchSession() {
    if (!searchSession) return;
    renderGroupedResults(
        searchSession.passageResults.slice(0, searchSession.visibleResults),
        searchSession.nextIndex < searchSession.total || searchSession.visibleResults < searchSession.passageResults.length,
    );
}

const SEARCH_FILLER_WORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with',
]);

function searchTerms(query: string): string[] {
    const words = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
    const meaningful = words.filter((word) => !SEARCH_FILLER_WORDS.has(word));
    return meaningful.length ? meaningful : words;
}

function transcriptMatches(result: PagefindData, terms: string[], hasMultipleWords: boolean): boolean {
    // Metadata matches have no transcript locations. Do not turn them into timed links.
    if (result.locations?.length === 0) return false;
    if (!hasMultipleWords) return (result.locations?.length ?? 0) > 0 || /<mark>/i.test(result.excerpt);

    const words = (result.raw_content ?? result.plain_excerpt ?? '')
        .toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
    const matchesTerm = (word: string, term: string) => {
        if (word === term) return true;
        const stem = term.replace(/(?:ing|ed|s)$/, '');
        return stem.length >= 4 && word.startsWith(stem);
    };
    const markedWords = [...result.excerpt.matchAll(/<mark>(.*?)<\/mark>/gi)]
        .flatMap((match) => match[1].toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []);

    return terms.every((term) => words.some((word) => matchesTerm(word, term)))
        && terms.some((term) => markedWords.some((word) => matchesTerm(word, term)));
}

function titleMatches(title: string, terms: string[]): boolean {
    const words = new Set(title.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []);
    return terms.length > 0 && terms.every((term) => words.has(term));
}

function getQueryResults(results: PagefindData[], query: string): PagefindData[] {
    const terms = searchTerms(query);
    const hasMultipleWords = (query.match(/[\p{L}\p{N}]+/gu)?.length ?? 0) > 1;
    return results.flatMap(getPassageResults).filter((result) => result.meta.seconds === undefined
        ? titleMatches(result.meta.title, terms)
        : transcriptMatches(result, terms, hasMultipleWords));
}

function renderGroupedResults(results: PagefindData[], hasMore: boolean) {
    if (!resultsArea) return;
    selectedIndex = -1;
    input?.removeAttribute('aria-activedescendant');

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

    // 1. Sort matches within each group by timestamp/seconds
    for (const group of grouped.values()) {
        group.results.sort((a, b) => {
            const timeA = resultSeconds(a.result) ?? 0;
            const timeB = resultSeconds(b.result) ?? 0;
            return timeA - timeB;
        });
    }

    // 2. Sort episodes by relevance (number of matches)
    const sortedGroups = Array.from(grouped.entries()).sort((a, b) => {
        return b[1].results.length - a[1].results.length;
    });

    const resultsHtml = sortedGroups.map(([baseUrl, group], groupIndex) =>
        renderEpisodeGroup(baseUrl, group.title, group.results, groupIndex),
    ).join('');

    const loadMoreHtml = hasMore
        ? '<button id="search-load-more" class="search-load-more" type="button">Load more results</button>'
        : '';

    if (!sortedGroups.length && !hasMore) {
        resultsArea.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    resultsArea.innerHTML = `
      <div class="search-results-header">Search results</div>
      <div id="search-results-list" class="search-results-list" role="listbox" aria-label="Search results">${resultsHtml}</div>
      ${loadMoreHtml}
    `;
    input?.setAttribute('aria-expanded', String(sortedGroups.length > 0));
}

function renderEpisodeGroup(baseUrl: string, title: string, results: Array<{ result: PagefindData; index: number }>, groupIndex: number) {
    const matchesHtml = results.map(({ result, index }) => renderMatch(result, index)).join('');

    return `
    <div class="search-episode-group" role="group" aria-label="${escapeHtml(title)}">
      <div class="search-episode-header">
        <a id="search-episode-${groupIndex}" href="${baseUrl}" class="search-episode-title" role="option" aria-selected="false">${escapeHtml(title)}</a>
        <span class="search-episode-count">${results.length ? `${results.length} match${results.length !== 1 ? 'es' : ''}` : 'Episode'}</span>
      </div>
      <div class="search-episode-matches">${matchesHtml}</div>
    </div>
  `;
}

function renderMatch(result: PagefindData, index: number) {
    const excerpt = result.excerpt || '';
    const displayTime = formatSecondsToTime(resultSeconds(result));

    return `
    <a href="${result.url}"
       id="search-result-${index}"
       role="option"
       aria-selected="false"
       class="search-result"
       data-index="${index}"
       style="animation-delay: ${Math.min(index, 10) * 20}ms">
      <span class="search-result-time">${displayTime}</span>
      <div class="search-excerpt">${excerpt}</div>
    </a>
  `;
}

function formatSecondsToTime(seconds: number | null): string {
    if (seconds === null) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

function escapeHtml(str: string) {
    return escapeText(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function updateSelection(resultLinks: NodeListOf<HTMLAnchorElement>) {
    resultLinks.forEach((link, i) => {
        link.classList.toggle('selected', i === selectedIndex);
        link.setAttribute('aria-selected', String(i === selectedIndex));
    });
    if (selectedIndex >= 0) {
        input?.setAttribute('aria-activedescendant', resultLinks[selectedIndex].id);
        resultLinks[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    } else {
        input?.removeAttribute('aria-activedescendant');
    }
}

export async function openSearchPopover() {
    await openPopover();
}

export {};
