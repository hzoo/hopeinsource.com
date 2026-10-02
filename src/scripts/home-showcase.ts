const stage = document.querySelector<HTMLElement>('#home-moments');

if (stage) {
  const cards = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'));
  const status = stage.querySelector<HTMLElement>('[data-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (cards.length > 1) {
    let active = 0;
    let transition: Animation | null = null;
    let touchStart: { x: number; y: number } | null = null;

    const show = (index: number, reason: 'next' | 'previous' | 'preview' | 'swipe' | 'keyboard') => {
      transition?.cancel();
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

      if (status) status.textContent = `Showing ${cards[active].dataset.title}`;
      const target = reason === 'preview' || reason === 'keyboard' ? cards[active].querySelector<HTMLElement>('.home-moment-link')
        : reason === 'swipe' ? null : cards[active].querySelector<HTMLButtonElement>(`[data-${reason}]`);
      target?.focus({ preventScroll: true });

      if (!reducedMotion.matches && reason !== 'keyboard') {
        transition = cards[active].querySelector('.home-moment-conversation')?.animate(
          [{ opacity: 0, transform: 'translateX(8px)' }, { opacity: 1, transform: 'translateX(0)' }],
          { duration: 220, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
        ) ?? null;
      }
    };

    stage.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLButtonElement>('[data-preview], [data-previous], [data-next]');
      if (!button) return;
      if (button.hasAttribute('data-preview')) {
        const card = button.closest<HTMLElement>('[data-moment]');
        if (card) show(cards.indexOf(card), 'preview');
      } else {
        const previous = button.hasAttribute('data-previous');
        show(active + (previous ? -1 : 1), previous ? 'previous' : 'next');
      }
    });

    stage.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(active + (event.key === 'ArrowRight' ? 1 : -1), 'keyboard');
    });

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
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) transition?.cancel();
    });
  }
}
