import { HOME_LAYOUTS, type HomeLayoutId } from "@/lib/home-layouts";

const VALID: Set<HomeLayoutId> = new Set(HOME_LAYOUTS.map((layout) => layout.id));
const DEFAULT_LAYOUT: HomeLayoutId = "C";
const CONVO_COLLAPSED_LIMIT = 6;

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

function initConversationStream(root: HTMLElement): void {
  const stream = root.querySelector<HTMLElement>("[data-convo-stream]");
  if (!stream) return;

  const flow = stream.querySelector<HTMLElement>(".convo-flow");
  if (!flow) return;

  const items = Array.from(flow.querySelectorAll<HTMLElement>("[data-convo-item]"));
  if (items.length === 0) return;

  const showMoreButton = stream.querySelector<HTMLButtonElement>("[data-convo-show-more]");

  let expanded = false;

  const applyVisibility = (): void => {
    const collapsed = !expanded;
    for (const [index, item] of items.entries()) {
      item.hidden = collapsed && index >= CONVO_COLLAPSED_LIMIT;
    }

    if (showMoreButton) {
      showMoreButton.hidden = expanded || items.length <= CONVO_COLLAPSED_LIMIT;
    }
  };

  showMoreButton?.addEventListener("click", () => {
    expanded = true;
    applyVisibility();
  });

  applyVisibility();
}

function init(): void {
  const root = document.getElementById("home-layout-root") as HTMLElement | null;
  if (!root) return;

  applyLayout(root, DEFAULT_LAYOUT);
  initConversationStream(root);

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
