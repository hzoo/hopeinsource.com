export const HOME_LAYOUTS = [
  {
    id: "A",
    label: "Episodes",
    icon: "list",
    group: "core",
  },
  {
    id: "B",
    label: "Quotes",
    icon: "chat",
    group: "core",
  },
{
    id: "D",
    label: "Questions",
    icon: "question",
    group: "core",
  },
  {
    id: "G",
    label: "Assertions",
    icon: "bolt",
    group: "lab",
  },
  {
    id: "I",
    label: "Wonderings",
    icon: "loop",
    group: "lab",
  },
  {
    id: "J",
    label: "Words",
    icon: "seed",
    group: "lab",
  },
] as const;

export type HomeLayoutId = (typeof HOME_LAYOUTS)[number]["id"];
export type HomeLayout = (typeof HOME_LAYOUTS)[number];
