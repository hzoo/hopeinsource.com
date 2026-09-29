const stage = document.querySelector<HTMLElement>('#home-moments');

if (stage) {
  const cards = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'));
  const status = stage.querySelector<HTMLElement>('[data-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (cards.length > 1) {
    let active = 0;
    let progress: Animation | null = null;
    let userPaused = false;
    let pointerDown = false;
    let inView = false;
    let touchStart: { x: number; y: number } | null = null;

    const focusedByKeyboard = () =>
      stage.contains(document.activeElement) && document.activeElement?.matches(':focus-visible');

    const syncPlayback = () => {
      if (!progress) return;
      const paused = userPaused || pointerDown || !inView || document.hidden || focusedByKeyboard();
      if (paused) progress.pause();
      else progress.play();
    };

    const startProgress = () => {
      progress?.cancel();
      progress = null;
      if (reducedMotion.matches) return;

      const card = cards[active];
      const fill = card.querySelector<SVGCircleElement>('[data-progress-fill]');
      if (!fill) return;
      const text = Array.from(card.querySelectorAll<HTMLElement>('.home-moment-context .message-bubble, .home-moment-text'))
        .map((element) => element.textContent ?? '').join(' ');
      const words = text.match(/\S+/g)?.length ?? 0;
      const duration = Math.min(30_000, Math.max(14_000, words * 330 + 4_000));
      progress = fill.animate(
        [{ strokeDashoffset: '100' }, { strokeDashoffset: '0' }],
        { duration, easing: 'linear', fill: 'forwards' },
      );
      progress.onfinish = () => show(active + 1, 'auto');
      syncPlayback();
    };

    const show = (index: number, reason: 'auto' | 'next' | 'preview' | 'swipe') => {
      active = (index + cards.length) % cards.length;
      cards.forEach((card, cardIndex) => {
        const distance = (cardIndex - active + cards.length) % cards.length;
        const slot = distance === 0 ? 'focus' : distance === 1 ? 'up-next'
          : distance === cards.length - 1 ? 'previous' : undefined;
        card.hidden = !slot;
        if (slot) card.dataset.slot = slot;
        else delete card.dataset.slot;
        const direction = card.querySelector<HTMLElement>('[data-teaser-direction]');
        if (direction && slot !== 'focus') direction.textContent = slot === 'previous' ? 'Previous' : 'Up next';
      });

      if (reason !== 'auto') {
        if (status) status.textContent = `Showing ${cards[active].dataset.title}`;
        const target = reason === 'preview' ? cards[active].querySelector<HTMLElement>('.home-moment-link')
          : reason === 'next' ? cards[active].querySelector<HTMLButtonElement>('[data-next]') : null;
        target?.focus({ preventScroll: true });
      }

      if (!reducedMotion.matches) {
        cards[active].querySelector('.home-moment-conversation')?.animate(
          [{ opacity: 0, transform: 'translateX(8px)' }, { opacity: 1, transform: 'translateX(0)' }],
          { duration: 220, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
        );
      }
      startProgress();
    };

    stage.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLButtonElement>('[data-preview], [data-pause], [data-next]');
      if (!button) return;
      if (button.hasAttribute('data-pause')) {
        userPaused = !userPaused;
        stage.dataset.userPaused = String(userPaused);
        stage.querySelectorAll<HTMLButtonElement>('[data-pause]').forEach((control) => {
          control.setAttribute('aria-pressed', String(userPaused));
          control.setAttribute('aria-label', userPaused ? 'Resume automatic advance' : 'Pause automatic advance');
        });
        syncPlayback();
        return;
      }

      const card = button.closest<HTMLElement>('[data-moment]');
      const index = card ? cards.indexOf(card) : active;
      if (button.hasAttribute('data-preview')) show(index, 'preview');
      else show(active + 1, 'next');
    });

    stage.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(active + (event.key === 'ArrowRight' ? 1 : -1), 'preview');
    });

    stage.addEventListener('pointerdown', () => { pointerDown = true; syncPlayback(); });
    window.addEventListener('pointerup', () => { pointerDown = false; syncPlayback(); });
    window.addEventListener('pointercancel', () => { pointerDown = false; syncPlayback(); });
    stage.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    }, { passive: true });
    stage.addEventListener('touchend', (event) => {
      const touch = event.changedTouches[0];
      if (!touchStart || !touch) return;
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      event.preventDefault();
      show(active + (dx < 0 ? 1 : -1), 'swipe');
    }, { passive: false });
    stage.addEventListener('touchcancel', () => { touchStart = null; });
    stage.addEventListener('focusin', syncPlayback);
    stage.addEventListener('focusout', () => queueMicrotask(syncPlayback));
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', startProgress);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.intersectionRatio >= 0.35;
        syncPlayback();
      }, { threshold: [0, 0.35, 0.6] }).observe(stage);
    } else {
      inView = true;
    }
    startProgress();
  }
}
