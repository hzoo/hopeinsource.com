/**
 * Search functionality with Spotlight-style modal
 */

interface PagefindResult {
    data: () => Promise<PagefindData>;
}

interface PagefindData {
    url: string;
    excerpt: string;
    meta: {
        title: string;
        speaker?: string;
        timestamp?: string;
    };
}

interface Pagefind {
    search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

/**
 * Extract the first timestamp [MM:SS] from an HTML excerpt and convert to seconds.
 * This allows us to construct precise #msg-{seconds} anchors even when indexing by bucket.
 */
function extractTimestampSeconds(excerpt: string): number | null {
    // Pagefind may wrap matches in <mark>, so we need to strip HTML first
    const textOnly = excerpt.replace(/<[^>]*>/g, '');

    // Look for patterns like [00:31] or [1:05:30]
    const timestampMatch = textOnly.match(/\[(\d{1,2}):(\d{2})(?::(\d{2}))?\]/);
    if (!timestampMatch) return null;

    const [, first, second, third] = timestampMatch;
    if (third !== undefined) {
        // Format is HH:MM:SS
        return parseInt(first) * 3600 + parseInt(second) * 60 + parseInt(third);
    }
    // Format is MM:SS
    return parseInt(first) * 60 + parseInt(second);
}

/**
 * Extract seconds from bucket URL like /slug#bucket-123
 */
function extractBucketSeconds(url: string): number | null {
    const match = url.match(/#bucket-(\d+)/);
    return match ? parseInt(match[1]) : null;
}

let pagefind: Pagefind | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let selectedIndex = -1;
let backdrop: HTMLDivElement | null = null;
let modal: HTMLDivElement | null = null;
let input: HTMLInputElement | null = null;
let resultsArea: HTMLDivElement | null = null;
let currentSearch: { results: PagefindResult[] } | null = null;
// Load up to 500 results to ensure we can group them properly by episode
const MAX_RESULTS = 500;

// Quotes from the podcast for the empty state
const SEARCH_QUOTES = [
    {
        text: "Hope is not something that should be deprived from anyone. We want people to have hope. We all want a better world.",
        author: "Alex Kim",
        url: "/hope#msg-2601" // [43:21]
    },
    {
        text: "Hope is a personed affair, right? And so you've rooted the open source in the person.",
        author: "Esther",
        url: "/reality#msg-31" // [00:31]
    },
    {
        text: "If I give you a gift, the point is not really the object moving from me to you. It's more that it establishes a social bond between us.",
        author: "Maggie Appleton",
        url: "/gift#msg-256" // [04:16]
    },
    {
        text: "We've lost that understanding of what it means for it to be a gift economy.",
        author: "Maggie Appleton",
        url: "/metaphor#msg-791" // [13:11]
    },
    {
        text: "Code itself is just an artifact. But when we think of code as infrastructure... suddenly there's a relationship.",
        author: "Nadia Asparouhova",
        url: "/city#msg-2327" // [38:47]
    },
    {
        text: "Inhabiting is the best way to maintain a building alive.",
        author: "Marianita Palumbo",
        url: "/heritage#msg-324" // [05:24]
    },
    {
        text: "Open source is actually making the opposite, making the maintenance of it the front line, by exposing all of this.",
        author: "Bernardo Robles Hidalgo",
        url: "/heritage#msg-2009" // [33:29]
    },
    {
        text: "One of the ways that we tell our testimony is just like, sharing with people all the ways that I am broken.",
        author: "Jonathan Tsao",
        url: "/haircut#msg-1206" // [20:06]
    },
    {
        text: "Trust is about not fully knowing the other person... and just sort of accepting that things might go in different ways.",
        author: "Nadia Asparouhova",
        url: "/trust#msg-1579" // [26:19]
    }
];

function getEmptyStateHtml(): string {
    const quote = SEARCH_QUOTES[Math.floor(Math.random() * SEARCH_QUOTES.length)];
    return `
    <div class="search-splash">
      <div class="search-splash-icon">✦</div>
      <a href="${quote.url}" class="search-splash-quote-link">
        <blockquote class="search-splash-quote">
            <p>"${quote.text}"</p>
            <cite>— ${quote.author}</cite>
        </blockquote>
      </a>
    </div>
  `;
}

function getLoadingHtml(): string {
    return `
    <div class="search-loading">
      <div class="search-loading-spinner"></div>
      <span>Searching...</span>
    </div>
  `;
}

function createModal() {
    if (modal) return;

    // Backdrop
    backdrop = document.createElement('div');
    backdrop.className = 'search-backdrop';
    document.body.appendChild(backdrop);

    // Modal
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
    <div class="search-input-row">
      <svg class="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        class="search-modal-input"
        placeholder="Search transcripts..."
        autocomplete="off"
        spellcheck="false"
      />
      <kbd class="search-esc-hint">esc</kbd>
    </div>
    <div class="search-results-area"></div>
  `;
    document.body.appendChild(modal);

    input = modal.querySelector('.search-modal-input');
    resultsArea = modal.querySelector('.search-results-area');

    if (!input || !resultsArea) return;

    // Input handler
    input.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value.trim();
        if (debounceTimer) clearTimeout(debounceTimer);

        if (!query) {
            resultsArea!.innerHTML = getEmptyStateHtml();
            return;
        }

        debounceTimer = setTimeout(() => performSearch(query), 100);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const resultLinks = resultsArea!.querySelectorAll<HTMLAnchorElement>('.search-result');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, resultLinks.length - 1);
            updateSelection(resultLinks);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(resultLinks);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            resultLinks[selectedIndex]?.click();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Backdrop click
    backdrop.addEventListener('click', closeModal);

    // Handle search result clicks - close modal and navigate to hash (delegated)
    resultsArea.addEventListener('click', (e) => {
        // Handle both search results and splash quote links
        const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.search-result, .search-splash-quote-link');

        if (link) {
            e.preventDefault();
            const url = new URL(link.href, window.location.origin);
            const hash = url.hash;

            closeModal();

            // If same page, manually scroll to hash target
            if (url.pathname === window.location.pathname && hash) {
                const targetId = hash.slice(1); // Remove #
                const target = document.getElementById(targetId);
                if (target) {
                    // Small delay to let modal close animation complete
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Trigger highlight animation if message
                        if (target.classList.contains('message')) {
                            target.classList.add('highlight-flash');
                            setTimeout(() => target.classList.remove('highlight-flash'), 1500);
                        }
                    }, 100);
                }
                // Update URL hash
                history.pushState(null, '', hash);
            } else {
                // Different page - do normal navigation
                window.location.href = link.href;
            }
        }
    });
}

function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.key === '/' && !(e.target as HTMLElement).matches('input, textarea, [contenteditable]')) {
        e.preventDefault();
        openModal();
    }
}

async function openModal() {
    if (!modal) {
        createModal();
    }

    const trigger = document.getElementById('search-trigger');
    if (!pagefind && !trigger?.dataset.dev) {
        try {
            // @ts-ignore - Dynamic import of Pagefind, escaped from Vite analysis via dynamic path
            const p = 'pagefind';
            pagefind = await import(/* @vite-ignore */ `/${p}/${p}.js`);
        } catch (e) {
            console.warn('Pagefind not found. Search will be available after build.');
        }
    }

    if (!modal || !backdrop) return;
    modal.classList.add('visible');
    backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
    input?.focus();

    if (!input?.value && resultsArea) {
        resultsArea.innerHTML = pagefind ? getEmptyStateHtml() : '<div class="search-empty-state">Search available after build</div>';
    }
}

function closeModal() {
    if (!modal || !backdrop || !input || !resultsArea) return;
    modal.classList.remove('visible');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
    input.value = '';
    resultsArea.innerHTML = '';
    selectedIndex = -1;
}

async function performSearch(query: string) {
    if (!pagefind || !resultsArea) return;

    try {
        currentSearch = await pagefind.search(query);

        if (!currentSearch || currentSearch.results.length === 0) {
            resultsArea.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        // Load ALL results (up to MAX_RESULTS) so we can group effectively
        resultsArea.innerHTML = getLoadingHtml();

        const allResults: PagefindData[] = [];
        const resultsToLoad = Math.min(currentSearch.results.length, MAX_RESULTS);

        // Load in batches of 20 concurrently
        const batchSize = 20;
        for (let i = 0; i < resultsToLoad; i += batchSize) {
            const batch = currentSearch.results.slice(i, i + batchSize);
            const data = await Promise.all(batch.map(r => r.data()));
            allResults.push(...data);
        }

        renderGroupedResults(allResults);
    } catch (e) {
        resultsArea.innerHTML = '<div class="search-no-results">Search error</div>';
    }
}

// Replaced loadMoreResults/renderResults with renderGroupedResults
function renderGroupedResults(results: PagefindData[]) {
    if (!resultsArea) return;

    // Group results by episode (base URL without anchor)
    const grouped = new Map<string, { title: string; results: Array<{ result: PagefindData; index: number }> }>();

    results.forEach((result, i) => {
        const baseUrl = result.url.split('#')[0];
        // Extract clean episode title
        const rawTitle = result.meta?.title || 'Untitled';
        const cleanTitle = rawTitle.replace(/\s*\(\d{1,2}:\d{2}(?::\d{2})?\)\s*$/, '');

        if (!grouped.has(baseUrl)) {
            grouped.set(baseUrl, { title: cleanTitle, results: [] });
        }
        grouped.get(baseUrl)!.results.push({ result, index: i });
    });

    // 1. Sort matches within each group by timestamp/seconds
    for (const group of grouped.values()) {
        group.results.sort((a, b) => {
            const timeA = extractTimestampSeconds(a.result.excerpt || '') ?? extractBucketSeconds(a.result.url) ?? 0;
            const timeB = extractTimestampSeconds(b.result.excerpt || '') ?? extractBucketSeconds(b.result.url) ?? 0;
            return timeA - timeB;
        });
    }

    // 2. Sort episodes by relevance (number of matches)
    const sortedGroups = Array.from(grouped.entries()).sort((a, b) => {
        return b[1].results.length - a[1].results.length;
    });

    const resultsHtml = sortedGroups.map(([baseUrl, group]) =>
        renderEpisodeGroup(baseUrl, group.title, group.results)
    ).join('');

    resultsArea.innerHTML = `
      <div class="search-results-header">${results.length} result${results.length !== 1 ? 's' : ''}</div>
      <div class="search-results-list">${resultsHtml}</div>
    `;
}

function renderEpisodeGroup(baseUrl: string, title: string, results: Array<{ result: PagefindData; index: number }>) {
    const matchesHtml = results.map(({ result, index }) => renderMatch(result, index, baseUrl)).join('');

    return `
    <div class="search-episode-group">
      <div class="search-episode-header">
        <a href="${baseUrl}" class="search-episode-title">${escapeHtml(title)}</a>
        <span class="search-episode-count">${results.length} match${results.length !== 1 ? 'es' : ''}</span>
      </div>
      <div class="search-episode-matches">${matchesHtml}</div>
    </div>
  `;
}

function renderMatch(result: PagefindData, index: number, baseUrl: string) {
    const excerpt = result.excerpt || '';

    // Extract precise timestamp from excerpt for deep linking
    // Fall back to bucket seconds from URL if excerpt doesn't have timestamp
    let seconds = extractTimestampSeconds(excerpt);
    if (seconds === null) {
        seconds = extractBucketSeconds(result.url);
    }

    const url = seconds !== null
        ? `${baseUrl}#msg-${seconds}`
        : baseUrl;

    // Format timestamp for display
    const displayTime = formatSecondsToTime(seconds);

    // Clean up the excerpt for display
    const cleanedExcerpt = cleanExcerpt(excerpt);

    return `
    <a href="${url}"
       class="search-result"
       data-index="${index}"
       style="animation-delay: ${Math.min(index, 10) * 20}ms">
      <span class="search-result-time">${displayTime}</span>
      <div class="search-excerpt">${cleanedExcerpt}</div>
    </a>
  `;
}

/**
 * Clean up excerpt text for display:
 * - Remove timestamps like [MM:SS] or [HH:MM:SS]
 * - Convert markdown links [text](url) to just text
 * - Remove markdown bold (**text** or __text__) and italics (*text* or _text_)
 * - Remove speaker prefixes like "Speaker:" anywhere in text
 */
function cleanExcerpt(excerpt: string): string {
    return excerpt
        // Remove timestamps [MM:SS] or [HH:MM:SS] (may be wrapped in <mark>)
        .replace(/\[(?:<[^>]*>)?(\d{1,2}):(\d{2})(?::(\d{2}))?(?:<[^>]*>)?\]\s*/g, '')
        // Convert markdown links [text](url) to just text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove markdown bold **text** or __text__
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        // Remove markdown italics *text* or _text_ (be careful not to match already-processed bold)
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/(?<!\w)_([^_]+)_(?!\w)/g, '$1')
        // Remove speaker names like "Name:" or "Name: " anywhere in text
        .replace(/\b[A-Z][a-z]+:\s*/g, '')
        // Clean up any double spaces
        .replace(/\s{2,}/g, ' ')
        .trim();
}

function formatSecondsToTime(seconds: number | null): string {
    if (seconds === null) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

function escapeHtml(str: string) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateSelection(resultLinks: NodeListOf<HTMLAnchorElement>) {
    resultLinks.forEach((link, i) => {
        link.classList.toggle('selected', i === selectedIndex);
    });
    if (selectedIndex >= 0) {
        resultLinks[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
}

function initSearch() {
    const trigger = document.getElementById('search-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', openModal);
    document.addEventListener('keydown', handleGlobalKeydown);
}

function cleanupSearch() {
    backdrop?.remove();
    modal?.remove();
    backdrop = null;
    modal = null;
    input = null;
    resultsArea = null;
    document.removeEventListener('keydown', handleGlobalKeydown);
}

// Initialize and handle cleanup on every page load (including navigations)
function setupSearch() {
    cleanupSearch();
    initSearch();
}

document.addEventListener('astro:page-load', setupSearch);

// Fallback for initial load if not using View Transitions or if script loads after astro:page-load
if (document.readyState === 'complete') {
    setupSearch();
}
