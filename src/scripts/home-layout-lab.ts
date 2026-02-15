import { HOME_LAYOUTS, type HomeLayoutId } from "@/lib/home-layouts";

const VALID: Set<HomeLayoutId> = new Set(HOME_LAYOUTS.map((layout) => layout.id));
const DEFAULT_LAYOUT: HomeLayoutId = "D";
const SESSION_SEED_KEY = "his-home-session-seed-v1";

function isValidLayout(value: string | undefined | null): value is HomeLayoutId {
  if (!value) return false;
  return VALID.has(value as HomeLayoutId);
}

function updateToggleState(root: HTMLElement, activeLayout: HomeLayoutId): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-layout-toggle]");
  for (const button of buttons) {
    const active = button.dataset.layout === activeLayout;
    button.dataset.active = active ? "true" : "false";
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }
}

function applyLayout(root: HTMLElement, layoutId: HomeLayoutId): void {
  root.dataset.activeLayout = layoutId;
  updateToggleState(root, layoutId);
}

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
  root: HTMLElement,
  containerSelector: string,
  itemSelector: string,
  seed: string,
): void {
  const container = root.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  const items = Array.from(container.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && child.matches(itemSelector),
  );
  if (items.length < 2) return;

  const ranked = items
    .map((item, index) => {
      const key = item.dataset.sessionKey ?? `${item.tagName}:${index}`;
      return {
        item,
        index,
        score: fnv32(`${seed}:${containerSelector}:${key}`),
      };
    })
    .sort((a, b) => a.score - b.score || a.index - b.index);

  for (const { item } of ranked) {
    container.appendChild(item);
  }
}

function applySessionShuffle(root: HTMLElement): void {
  const seed = getSessionSeed();
  reorderContainer(root, "#home-dialogue .convo-flow", ".convo-line", seed);
  reorderContainer(root, "#home-questions", ".question-item", seed);
  reorderContainer(root, "#home-assertions", ".assertion-item", seed);
  reorderContainer(root, "#home-open-loops", ".loop-item", seed);
  reorderContainer(root, "#home-lexicon", ".lexicon-row", seed);
}

function init(): void {
  const root = document.getElementById("home-layout-root") as HTMLElement | null;
  if (!root) return;

  applySessionShuffle(root);
  applyLayout(root, DEFAULT_LAYOUT);

  const toggles = root.querySelectorAll<HTMLButtonElement>("[data-layout-toggle]");
  for (const toggle of toggles) {
    toggle.addEventListener("click", () => {
      const layoutId = toggle.dataset.layout;
      if (!isValidLayout(layoutId)) return;
      if (root.dataset.activeLayout === layoutId) return;
      applyLayout(root, layoutId);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }

  const showMoreButtons = root.querySelectorAll<HTMLButtonElement>(".lab-show-more");
  for (const btn of showMoreButtons) {
    btn.addEventListener("click", () => {
      const target = btn.dataset.expand;
      if (!target) return;
      const container = root.querySelector<HTMLElement>(target);
      if (!container) return;
      container.dataset.collapsed = "false";
      btn.style.display = "none";
    });
  }
}

document.addEventListener("astro:page-load", init);
