/**
 * Lightweight search bootstrap.
 * Defers loading full search logic until user intent.
 */

type SearchModule = {
    openSearchModal: () => Promise<void>;
};

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
    document.dispatchEvent(new Event('his:search-open'));
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
    const trigger = document.getElementById('search-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
        void openSearch();
    });

    document.addEventListener('keydown', handleGlobalKeydown);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchBootstrap, { once: true });
} else {
    initSearchBootstrap();
}

export {};
