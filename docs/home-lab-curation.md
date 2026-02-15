# Home Lab Curation

Manual lab picks live in `src/lib/home-lab-curation.ts`.

## Why

- Keeps episode frontmatter focused on episode metadata.
- Lets us curate transcript-first views episode-by-episode without schema churn.
- Powers three homepage views: **Assertions**, **Wonderings**, **Words**.

## Types

```ts
assertion: { at: number; text?: string }   // strongest claim in the episode
openLoop:  { at: number; text?: string }   // unresolved question or passing thought
lexicon:   { term: string; anchors: number[] }[]  // 2-3 key terms + timestamps
```

- `at` / `anchors` = total seconds into the episode (e.g. `[23:45]` → `1425`).
- `text` is optional — if omitted, the nearest transcript line at that timestamp is used.
  Provide `text` when the transcript line is noisy or you want a cleaner excerpt.
- Duplicate `lexicon` terms across episodes are fine — the UI groups them automatically.

## Curating a new episode

1. Open the episode transcript (`src/content/podcast/<slug>.md`).
2. Read through and identify:

   **Assertion** — the single strongest planted stake. A claim, not a question.
   Look for declarative sentences with conviction. One per episode.

   **Wondering** — a passing thought left hanging. Not the episode's central question
   (that's already in the Questions view via the description). Look for asides,
   tangents, "I wonder if..." moments.

   **Words** — 2-3 terms that anchor the episode's vocabulary. Prefer terms that are:
   - Specific to the episode's domain (not generic words like "community")
   - Reusable across episodes (terms that create connections when shared)
   - Conceptual handles (compound terms, neologisms, borrowed vocabulary)

3. Convert timestamps from `[MM:SS]` to total seconds:
   `minutes * 60 + seconds` (e.g. `[42:59]` → `2579`).

4. Add the entry to `HOME_LAB_CURATION` in `src/lib/home-lab-curation.ts`:

```ts
{
  slug: "episode-slug",
  assertion: {
    at: 1425,
    text: "The verbatim or cleaned-up claim.",
  },
  openLoop: {
    at: 892,
    text: "The wondering, usually a question or speculative aside.",
  },
  lexicon: [
    { term: "subsidiary-focal integration", anchors: [456] },
    { term: "indwelling", anchors: [1149, 1320] },
    { term: "convivial tools", anchors: [2231] },
  ],
},
```

5. If providing `text`, only clean up filler words (like, um, uh, you know) and
   false starts. Never rewrite what was said — preserve the speaker's voice.

6. Build (`npx astro build`) and check the homepage views.

## Lexicon guidelines

- **Normalize near-duplicates**: pick one canonical form and use it everywhere.
  Examples: `indwelling` not `indwell`, `deskilling` not `deskilled`.
- **Compound terms**: use hyphens for multi-word concepts (`subsidiary-focal integration`).
- **Check existing terms** before adding: `grep -i "term" src/lib/home-lab-curation.ts`.
  Reusing an existing term is good — it creates cross-episode connections in the UI.

## Session shuffle

Items are randomly reordered per browser session, so the homepage shows a fresh
sample each visit. The first N items are shown (6 quotes, 9 questions, 5 assertions,
5 wonderings, 15 words) with a "show more" button for the rest.
