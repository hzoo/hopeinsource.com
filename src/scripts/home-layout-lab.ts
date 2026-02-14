import { HOME_LAYOUTS, type HomeLayoutId } from "@/lib/home-layouts";

const VALID: Set<HomeLayoutId> = new Set(HOME_LAYOUTS.map((layout) => layout.id));
const DEFAULT_LAYOUT: HomeLayoutId = "C";
const RANDOM_START_LAYOUTS: HomeLayoutId[] = ["C", "I"];
const DAILY_SEED_NAMESPACE = "his-home-daily-seed-v1";

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

function getLocalDateStamp(): string {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDailySeed(): string {
  return `${DAILY_SEED_NAMESPACE}:${getLocalDateStamp()}`;
}

function pickRandomStartLayout(): HomeLayoutId {
  const index = Math.floor(Math.random() * RANDOM_START_LAYOUTS.length);
  return RANDOM_START_LAYOUTS[index] ?? DEFAULT_LAYOUT;
}

function pickSeededStartLayout(seed: string): HomeLayoutId {
  if (RANDOM_START_LAYOUTS.length === 0) return DEFAULT_LAYOUT;
  const index = fnv32(`${seed}:start-layout`) % RANDOM_START_LAYOUTS.length;
  const picked = RANDOM_START_LAYOUTS[index];
  return isValidLayout(picked) ? picked : pickRandomStartLayout();
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

function applySeededShuffle(root: HTMLElement, seed: string): void {
  reorderContainer(root, "#home-dialogue .convo-flow", ".convo-line", seed);
  reorderContainer(root, "#home-topics", ".topic-cluster", seed);
  reorderContainer(root, "#home-questions", ".question-item", seed);
}

function init(): void {
  const root = document.getElementById("home-layout-root") as HTMLElement | null;
  if (!root) return;

  const dailySeed = getDailySeed();
  applySeededShuffle(root, dailySeed);
  applyLayout(root, pickSeededStartLayout(dailySeed));

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
}

document.addEventListener("astro:page-load", init);
