export const HOME_LAYOUTS = [
  {
    id: "C",
    label: "Chat",
    icon: "chat",
  },
  {
    id: "G",
    label: "Topics",
    icon: "hash",
  },
  {
    id: "I",
    label: "Qs",
    icon: "question",
  },
] as const;

export type HomeLayoutId = (typeof HOME_LAYOUTS)[number]["id"];
export type HomeLayout = (typeof HOME_LAYOUTS)[number];
