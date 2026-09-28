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

// --- Transcript Deep-linking Logic ---

function handleDeepLink() {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (target?.matches('#episode-content-shell h4')) {
        setTimeout(() => target.scrollIntoView({ block: 'start' }), 100);
        return;
    }

    if (!hash.startsWith('#msg-')) return;

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
    handleDeepLink();
    window.addEventListener('hashchange', handleDeepLink);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEpisode, { once: true });
} else {
    initEpisode();
}
