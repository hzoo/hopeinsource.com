/**
 * Lightweight search bootstrap.
 * Defers loading full search logic until user intent.
 */

type SearchModule = {
    openSearchPopover: () => Promise<void>;
};

let searchModulePromise: Promise<SearchModule | null> | null = null;

function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || Boolean(target.closest('input, textarea, select'));
}

function hasOpenDialog(): boolean {
    return document.querySelector('dialog[open]') !== null;
}

function loadSearchModule(): Promise<SearchModule | null> {
    if (!searchModulePromise) {
        searchModulePromise = import('./search').catch(() => {
            searchModulePromise = null;
            return null;
        });
    }
    return searchModulePromise;
}

async function openSearch() {
    const module = await loadSearchModule();
    if (!module || hasOpenDialog()) return;
    document.dispatchEvent(new Event('his:search-open'));
    await module.openSearchPopover();
}

function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.defaultPrevented || e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTypingTarget(e.target) || hasOpenDialog()) return;

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
