/**
 * Episode page interactions: Chat header shadow, Inline theme toggle, and Message deep-linking
 */

// --- Chat Header Logic ---

function initChatHeader() {
    const header = document.getElementById('chat-header');
    const scrollContainer = header?.nextElementSibling as HTMLElement | null;
    if (!header || !scrollContainer) return;

    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollTop > 10) {
            header.classList.add('shadow-md', 'shadow-black/10');
        } else {
            header.classList.remove('shadow-md', 'shadow-black/10');
        }
    }, { passive: true });

    // Hide the fixed theme toggle since we have inline one
    const fixedToggle = document.getElementById('theme-toggle');
    if (fixedToggle) fixedToggle.style.display = 'none';

    // Theme toggle
    const toggle = document.getElementById('header-theme-toggle');
    const darkIcon = document.getElementById('header-theme-dark-icon');
    const lightIcon = document.getElementById('header-theme-light-icon');

    function updateIcons() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        darkIcon?.classList.toggle('hidden', isDark);
        lightIcon?.classList.toggle('hidden', !isDark);
    }

    toggle?.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.theme = newTheme;
        updateIcons();
    });

    updateIcons();
}

// --- Message Deep-linking Logic ---

let currentPlayButton: HTMLButtonElement | null = null;

function createPlayButton(messageEl: HTMLElement) {
    // Remove any existing play button
    if (currentPlayButton) {
        currentPlayButton.remove();
        currentPlayButton = null;
    }

    const btn = document.createElement('button');
    btn.className = 'msg-play-btn';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    btn.setAttribute('aria-label', 'Play from here');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const seconds = messageEl.getAttribute('data-timestamp');
        if (seconds) {
            // Navigate to #t= to trigger autoplay
            window.location.hash = `t=${seconds}`;
        }
        btn.remove();
        currentPlayButton = null;
    });

    messageEl.appendChild(btn);
    currentPlayButton = btn;

    return btn;
}

function highlightMessage() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#msg-')) return;

    const el = document.getElementById(hash.slice(1));
    if (el) {
        // Small delay to ensure layout is complete
        setTimeout(() => {
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
            el.classList.add('highlight-flash');

            // Add play button
            const btn = createPlayButton(el);

            // Remove class and button after animation completes
            el.addEventListener('animationend', () => {
                el.classList.remove('highlight-flash');
                // Keep button visible a bit longer, then fade out
                setTimeout(() => {
                    if (btn.parentNode) {
                        btn.classList.add('fade-out');
                        btn.addEventListener('animationend', () => {
                            if (btn.parentNode) btn.remove();
                        }, { once: true });
                    }
                }, 2000);
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

function cleanupEpisode() {
    if (currentPlayButton) {
        currentPlayButton.remove();
        currentPlayButton = null;
    }
    window.removeEventListener('hashchange', highlightMessage);
}

function setupEpisode() {
    cleanupEpisode();
    initEpisode();
}

// Module script initialization on every load/nav
document.addEventListener('astro:page-load', setupEpisode);

if (document.readyState === 'complete') {
    setupEpisode();
}
