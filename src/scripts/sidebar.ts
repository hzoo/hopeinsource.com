/**
 * Mobile sidebar interactions
 */

function initSidebar() {
    // Helper to get elements lazily
    const getSidebar = () => document.getElementById('episode-sidebar');
    const getBackdrop = () => document.getElementById('sidebar-backdrop');
    const getToggle = () => document.getElementById('header-sidebar-toggle');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    if (!getSidebar() || !getBackdrop()) return null;

    function setSidebarAccessible(isAccessible: boolean) {
        const sidebar = getSidebar();
        if (!sidebar) return;
        if (isAccessible) {
            sidebar.removeAttribute('inert');
            sidebar.removeAttribute('aria-hidden');
        } else {
            sidebar.setAttribute('inert', '');
            sidebar.setAttribute('aria-hidden', 'true');
        }
    }

    function openSidebar() {
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        setSidebarAccessible(true);
        document.getElementById('episode-shell')?.setAttribute('inert', '');
        sidebar?.classList.remove('-translate-x-full');
        backdrop?.classList.remove('opacity-0', 'invisible');
        backdrop?.classList.add('opacity-100');
        getToggle()?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        window.setTimeout(() => {
            sidebar?.querySelector<HTMLElement>('input, button, a')?.focus();
        }, 200);
    }

    function closeSidebar(returnFocus = false) {
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        sidebar?.classList.add('-translate-x-full');
        backdrop?.classList.add('opacity-0', 'invisible');
        backdrop?.classList.remove('opacity-100');
        getToggle()?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.getElementById('episode-shell')?.removeAttribute('inert');
        if (returnFocus) getToggle()?.focus();
        if (!desktopQuery.matches) setSidebarAccessible(false);
    }

    // Global click delegation
    function handleClick(e: MouseEvent) {
        const target = e.target as HTMLElement;

        // Toggle button or Sidebar close button
        if (target.closest('#header-sidebar-toggle')) {
            const sidebar = getSidebar();
            if (sidebar?.classList.contains('-translate-x-full')) {
                openSidebar();
            } else {
                closeSidebar(true);
            }
            return;
        }

        if (target.closest('#sidebar-close')) {
            closeSidebar(true);
            return;
        }

        // Alternative triggers (open only)
        if (target.closest('.sidebar-trigger')) {
            openSidebar();
            return;
        }

        // Backdrop click (close)
        if (target.id === 'sidebar-backdrop') {
            closeSidebar(true);
            return;
        }
    }

    document.addEventListener('click', handleClick);

    const closeForSearch = () => {
        if (!desktopQuery.matches) closeSidebar();
    };
    document.addEventListener('his:search-open', closeForSearch);

    // Global listeners - will be cleaned up by cleanupSidebar
    function handleGlobalKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') closeSidebar(true);
    }
    document.addEventListener('keydown', handleGlobalKeydown);

    // Swipe gesture for mobile drawer
    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
        const sidebar = getSidebar();
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);

        if (diffY < 100) {
            if (touchStartX < 30 && diffX > 80) openSidebar();
            else if (diffX < -80 && !sidebar?.classList.contains('-translate-x-full')) closeSidebar();
        }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Bring the active episode into view only when it starts outside the list.
    const sidebar = getSidebar();
    const activeLink = sidebar?.querySelector('[aria-current="page"]');
    const episodeList = sidebar?.querySelector('.overflow-y-auto');
    if (activeLink && episodeList) {
        const activeRect = activeLink.getBoundingClientRect();
        const listRect = episodeList.getBoundingClientRect();
        if (activeRect.top < listRect.top || activeRect.bottom > listRect.bottom) {
            activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
    }

    const syncResponsiveAccessibility = () => {
        if (desktopQuery.matches) {
            setSidebarAccessible(true);
            document.getElementById('episode-shell')?.removeAttribute('inert');
        } else {
            const isOpen = !getSidebar()?.classList.contains('-translate-x-full');
            setSidebarAccessible(isOpen);
            if (!isOpen) document.getElementById('episode-shell')?.removeAttribute('inert');
        }
    };
    desktopQuery.addEventListener('change', syncResponsiveAccessibility);
    syncResponsiveAccessibility();

    // Return cleanup function
    return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('his:search-open', closeForSearch);
        document.removeEventListener('keydown', handleGlobalKeydown);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        desktopQuery.removeEventListener('change', syncResponsiveAccessibility);
        document.body.style.overflow = '';
        document.getElementById('episode-shell')?.removeAttribute('inert');
    };
}

let sidebarCleanup: (() => void) | null = null;

function setupSidebar() {
    if (sidebarCleanup) sidebarCleanup();
    sidebarCleanup = initSidebar();
}

document.addEventListener('astro:page-load', setupSidebar);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSidebar, { once: true });
} else {
    setupSidebar();
}
