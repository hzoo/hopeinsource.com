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

let pagefind: Pagefind | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let selectedIndex = -1;
let backdrop: HTMLDivElement | null = null;
let modal: HTMLDivElement | null = null;
let input: HTMLInputElement | null = null;
let resultsArea: HTMLDivElement | null = null;
let currentSearch: { results: PagefindResult[] } | null = null;
let loadedCount = 0;
const PAGE_SIZE = 15;

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
            resultsArea!.innerHTML = '<div class="search-empty-state">Type to search transcripts</div>';
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
            // @ts-ignore - Dynamic import of Pagefind, escaped from Vite analysis via string template
            pagefind = await import(/* @vite-ignore */ `/pagefind/` + `pagefind.js`);
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
        const msg = pagefind ? 'Type to search transcripts' : 'Search available after build (run preview)';
        resultsArea.innerHTML = `<div class="search-empty-state">${msg}</div>`;
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
        loadedCount = 0;

        if (!currentSearch || currentSearch.results.length === 0) {
            resultsArea.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        selectedIndex = -1;
        await loadMoreResults();
    } catch (e) {
        resultsArea.innerHTML = '<div class="search-no-results">Search error</div>';
    }
}

async function loadMoreResults() {
    if (!currentSearch || !resultsArea) return;

    const total = currentSearch.results.length;
    const nextBatch = currentSearch.results.slice(loadedCount, loadedCount + PAGE_SIZE);
    const results = await Promise.all(nextBatch.map(r => r.data()));
    const startIndex = loadedCount;
    loadedCount += results.length;

    renderResults(results, total, startIndex);
}

function renderResults(results: PagefindData[], totalCount: number, startIndex: number) {
    if (!resultsArea) return;

    const hasMore = loadedCount < totalCount;
    const resultsHtml = results.map((result, i) => renderResult(result, startIndex + i)).join('');

    if (startIndex === 0) {
        resultsArea.innerHTML = `
      <div class="search-results-header">${totalCount} result${totalCount !== 1 ? 's' : ''}</div>
      <div class="search-results-list">${resultsHtml}</div>
      ${hasMore ? '<button class="search-load-more">Load more</button>' : ''}
    `;
    } else {
        const list = resultsArea.querySelector('.search-results-list');
        if (list) list.insertAdjacentHTML('beforeend', resultsHtml);

        const btn = resultsArea.querySelector<HTMLButtonElement>('.search-load-more');
        if (btn) {
            if (hasMore) {
                btn.textContent = 'Load more';
            } else {
                btn.remove();
            }
        }
    }

    const loadMoreBtn = resultsArea.querySelector<HTMLButtonElement>('.search-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => loadMoreResults();
    }
}

function renderResult(result: PagefindData, index: number) {
    const episodeTitle = result.meta?.title || 'Untitled';
    const speaker = result.meta?.speaker || '';
    const timestamp = result.meta?.timestamp || '';
    const url = result.url;
    const excerpt = result.excerpt || '';

    return `
    <a href="${url}"
       class="search-result"
       data-index="${index}"
       style="animation-delay: ${index * 30}ms">
      <div class="search-result-meta">
        <span class="search-result-speaker">${escapeHtml(speaker)}</span>
        <span class="search-result-timestamp">${escapeHtml(timestamp)}</span>
      </div>
      ${excerpt ? `<div class="search-excerpt">${excerpt}</div>` : ''}
      <div class="search-result-episode">${escapeHtml(episodeTitle)}</div>
    </a>
  `;
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
