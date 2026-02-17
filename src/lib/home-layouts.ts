export const HOME_LAYOUTS = [
  { id: "D", label: "Questions", icon: "question", group: "core", href: "/" },
  { id: "A", label: "Episodes", icon: "list", group: "core", href: "/episodes" },
  { id: "B", label: "Quotes", icon: "chat", group: "core", href: "/quotes" },
  { id: "G", label: "Assertions", icon: "bolt", group: "lab", href: "/assertions" },
  { id: "I", label: "Wonderings", icon: "loop", group: "lab", href: "/wonderings" },
  { id: "J", label: "Words", icon: "seed", group: "lab", href: "/words" },
] as const;

export type HomeLayoutId = (typeof HOME_LAYOUTS)[number]["id"];
export type HomeLayout = (typeof HOME_LAYOUTS)[number];
