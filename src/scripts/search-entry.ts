/**
 * Lightweight search bootstrap.
 * Defers loading full search logic until user intent.
 */

type SearchModule = {
    openSearchModal: () => Promise<void>;
};

let initAbort: AbortController | null = null;
let searchModulePromise: Promise<SearchModule> | null = null;

function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    return target.matches('input, textarea, [contenteditable], [contenteditable="true"]');
}

function loadSearchModule(): Promise<SearchModule> {
    if (!searchModulePromise) {
        searchModulePromise = import('./search');
    }
    return searchModulePromise;
}

async function openSearch() {
    const module = await loadSearchModule();
    await module.openSearchModal();
}

function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;

    e.preventDefault();
    void openSearch();
}

function initSearchBootstrap() {
    initAbort?.abort();
    initAbort = new AbortController();
    const { signal } = initAbort;

    const trigger = document.getElementById('search-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
        void openSearch();
    }, { signal });

    document.addEventListener('keydown', handleGlobalKeydown, { signal });
}

function setupSearchBootstrap() {
    initSearchBootstrap();
}

document.addEventListener('astro:page-load', setupSearchBootstrap);

if (document.readyState === 'complete') {
    setupSearchBootstrap();
}

export {};
