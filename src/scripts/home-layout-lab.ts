const SESSION_SEED_KEY = "his-home-session-seed-v1";

function fnv32(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeed(): string {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const bytes = new Uint32Array(2);
    crypto.getRandomValues(bytes);
    return `${bytes[0].toString(36)}-${bytes[1].toString(36)}`;
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getSessionSeed(): string {
  try {
    const existing = window.sessionStorage.getItem(SESSION_SEED_KEY);
    if (existing) return existing;
    const seed = createSeed();
    window.sessionStorage.setItem(SESSION_SEED_KEY, seed);
    return seed;
  } catch {
    return createSeed();
  }
}

function reorderContainer(
  containerSelector: string,
  itemSelector: string,
  seed: string,
): void {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll<HTMLElement>(itemSelector);
  if (items.length < 2) return;

  const ranked = Array.from(items)
    .map((item, index) => {
      const key = item.dataset.sessionKey ?? `${item.tagName}:${index}`;
      return {
        item,
        index,
        score: fnv32(`${seed}:${containerSelector}:${key}`),
      };
    })
    .sort((a, b) => a.score - b.score || a.index - b.index);

  const frag = document.createDocumentFragment();
  for (const { item } of ranked) frag.appendChild(item);
  container.appendChild(frag);
}

const SHUFFLE_TARGETS = [
  { container: "#home-dialogue .convo-flow", item: ".convo-line" },
  { container: "#home-questions", item: ".question-item" },
  { container: "#home-assertions", item: ".assertion-item" },
  { container: "#home-open-loops", item: ".loop-item" },
  { container: "#home-lexicon", item: ".lexicon-row" },
];

function init(): void {
  const seed = getSessionSeed();

  for (const t of SHUFFLE_TARGETS) {
    reorderContainer(t.container, t.item, seed);
  }

  const showMoreButtons = document.querySelectorAll<HTMLButtonElement>(".lab-show-more");
  for (const btn of showMoreButtons) {
    btn.addEventListener("click", () => {
      const target = btn.dataset.expand;
      if (!target) return;
      const container = document.querySelector<HTMLElement>(target);
      if (!container) return;
      container.dataset.collapsed = "false";
      btn.style.display = "none";
    });
  }
}

document.addEventListener("astro:page-load", init);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
