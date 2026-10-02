/**
 * Mobile sidebar interactions
 */

function initSidebar() {
    // Helper to get elements lazily
    const getSidebar = () => document.getElementById('episode-sidebar');
    const getBackdrop = () => document.getElementById('sidebar-backdrop');
    const getToggle = () => document.getElementById('header-sidebar-toggle');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    if (!getSidebar() || !getBackdrop()) return;
    let sidebarOpen = false;

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
        if (desktopQuery.matches || sidebarOpen) return;
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        sidebarOpen = true;
        setSidebarAccessible(true);
        document.getElementById('episode-shell')?.setAttribute('inert', '');
        sidebar?.classList.remove('-translate-x-full');
        backdrop?.classList.remove('opacity-0', 'invisible');
        backdrop?.classList.add('opacity-100');
        getToggle()?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        sidebar?.querySelector<HTMLElement>('input, button, a')?.focus({ preventScroll: true });
    }

    function closeSidebar(returnFocus = false) {
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        sidebarOpen = false;
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
            if (!sidebarOpen) {
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

    function handleGlobalKeydown(e: KeyboardEvent) {
        if (!sidebarOpen || desktopQuery.matches) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeSidebar(true);
        } else if (e.key === 'Tab') {
            const controls = Array.from(getSidebar()?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled)') ?? [])
                .filter((control) => control.getClientRects().length > 0);
            const first = controls[0];
            const last = controls.at(-1);
            if (first && last && ((e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last))) {
                e.preventDefault();
                (e.shiftKey ? last : first).focus();
            }
        }
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
        if (desktopQuery.matches) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);

        if (diffY < 100) {
            if (touchStartX < 30 && diffX > 80) openSidebar();
            else if (diffX < -80 && sidebarOpen) closeSidebar();
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
        closeSidebar();
        setSidebarAccessible(desktopQuery.matches);
    };
    desktopQuery.addEventListener('change', syncResponsiveAccessibility);
    syncResponsiveAccessibility();

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar, { once: true });
} else {
    initSidebar();
}
