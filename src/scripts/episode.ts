/**
 * Episode page interactions: Chat header shadow and message deep-linking
 */

// --- Chat Header Logic ---

function initChatHeader() {
    const header = document.getElementById('chat-header');
    const scrollContainer = header?.nextElementSibling as HTMLElement | null;
    if (!header || !scrollContainer) return;

    const onScroll = () => {
        if (scrollContainer.scrollTop > 10) {
            header.classList.add('shadow-md', 'shadow-black/10');
        } else {
            header.classList.remove('shadow-md', 'shadow-black/10');
        }
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

}

// --- Message Deep-linking Logic ---

function highlightMessage() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#msg-')) return;

    const el = document.getElementById(hash.slice(1));
    if (el) {
        // Small delay to ensure layout is complete
        setTimeout(() => {
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
            el.classList.add('highlight-flash');

            el.addEventListener('animationend', () => {
                el.classList.remove('highlight-flash');
            }, { once: true });
        }, 100);
    }
}

function initEpisode() {
    initChatHeader();
    highlightMessage();
    // Handle hash changes individually (like clicking TOC links)
    window.addEventListener('hashchange', highlightMessage);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEpisode, { once: true });
} else {
    initEpisode();
}
