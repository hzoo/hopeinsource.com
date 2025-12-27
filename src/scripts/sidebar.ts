/**
 * Mobile sidebar interactions
 */

function initSidebar() {
    // Helper to get elements lazily
    const getSidebar = () => document.getElementById('episode-sidebar');
    const getBackdrop = () => document.getElementById('sidebar-backdrop');

    function openSidebar() {
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        sidebar?.classList.remove('-translate-x-full');
        backdrop?.classList.remove('opacity-0', 'invisible');
        backdrop?.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        const sidebar = getSidebar();
        const backdrop = getBackdrop();

        sidebar?.classList.add('-translate-x-full');
        backdrop?.classList.add('opacity-0', 'invisible');
        backdrop?.classList.remove('opacity-100');
        document.body.style.overflow = '';
    }

    // Global click delegation
    function handleClick(e: MouseEvent) {
        const target = e.target as HTMLElement;

        // Toggle button or Sidebar close button
        if (target.closest('#header-sidebar-toggle') || target.closest('#sidebar-close')) {
            const sidebar = getSidebar();
            if (sidebar?.classList.contains('-translate-x-full')) {
                openSidebar();
            } else {
                closeSidebar();
            }
            return;
        }

        // Alternative triggers (open only)
        if (target.closest('.sidebar-trigger')) {
            openSidebar();
            return;
        }

        // Backdrop click (close)
        if (target.id === 'sidebar-backdrop') {
            closeSidebar();
            return;
        }
    }

    document.addEventListener('click', handleClick);

    // Global listeners - will be cleaned up by cleanupSidebar
    function handleGlobalKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') closeSidebar();
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

    // Scroll to active episode
    const sidebar = getSidebar();
    const activeLink = sidebar?.querySelector('[aria-current="page"]');
    if (activeLink) {
        activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
    }

    // Return cleanup function
    return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleGlobalKeydown);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
    };
}

let sidebarCleanup: (() => void) | null = null;

function setupSidebar() {
    if (sidebarCleanup) sidebarCleanup();
    sidebarCleanup = initSidebar();
}

document.addEventListener('astro:page-load', setupSidebar);

if (document.readyState === 'complete') {
    setupSidebar();
}
