export const HOME_LAYOUTS = [
  {
    id: "A",
    label: "Episodes",
    icon: "list",
  },
  {
    id: "C",
    label: "Quotes",
    icon: "chat",
  },
  {
    id: "G",
    label: "Topics",
    icon: "hash",
  },
  {
    id: "I",
    label: "Questions",
    icon: "question",
  },
] as const;

export type HomeLayoutId = (typeof HOME_LAYOUTS)[number]["id"];
export type HomeLayout = (typeof HOME_LAYOUTS)[number];
