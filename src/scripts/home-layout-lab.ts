import { HOME_LAYOUTS, type HomeLayoutId } from "@/lib/home-layouts";

const VALID: Set<HomeLayoutId> = new Set(HOME_LAYOUTS.map((layout) => layout.id));
const SHOWCASE: HomeLayoutId[] = HOME_LAYOUTS.map((layout) => layout.id);

function isValidLayout(value: string | undefined | null): value is HomeLayoutId {
  if (!value) return false;
  return VALID.has(value as HomeLayoutId);
}

function pickRandomLayout(exclude?: HomeLayoutId): HomeLayoutId {
  const pool = exclude ? SHOWCASE.filter((id) => id !== exclude) : SHOWCASE;
  return pool[Math.floor(Math.random() * pool.length)] ?? SHOWCASE[0];
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

function init(): void {
  const root = document.getElementById("home-layout-root") as HTMLElement | null;
  if (!root) return;

  applyLayout(root, pickRandomLayout());

  const toggles = root.querySelectorAll<HTMLButtonElement>("[data-layout-toggle]");
  for (const toggle of toggles) {
    toggle.addEventListener("click", () => {
      const layoutId = toggle.dataset.layout;
      if (!isValidLayout(layoutId)) return;
      applyLayout(root, layoutId);
    });
  }

}

document.addEventListener("astro:page-load", init);
