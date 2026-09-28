export const HOME_LAYOUTS = [
  { id: "episodes", label: "Episodes", group: "core", href: "/" },
  { id: "excerpts", label: "Excerpts", group: "core", href: "/quotes" },
  { id: "questions", label: "Questions", group: "core", href: "/questions" },
  { id: "assertions", label: "Assertions", group: "lab", href: "/assertions" },
  { id: "wonderings", label: "Wonderings", group: "lab", href: "/wonderings" },
  { id: "words", label: "Words", group: "lab", href: "/words" },
] as const;

export type HomeLayoutId = (typeof HOME_LAYOUTS)[number]["id"];
