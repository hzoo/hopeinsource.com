# Site audit and cleanup

Audited October 2, 2026. The site remains a static Astro transcript reader with optional synchronized media. This pass covered source code, Markdown rendering, search, local transcript tools, dependencies, build scripts, Cloudflare deployment, documentation, and browser UX. Worthwhile reversible fixes are implemented locally. Production has not been deployed.

The largest change is search: results now come from rendered transcript passages and retain their canonical message URLs. Existing episode content, transcript words, timestamps, speaker assignments, and source aliases were not edited. Comparing all 66 generated pages found no removed IDs.

## Changes by area

| Area | Finding and resulting change |
| --- | --- |
| Search | Independent Markdown parsing and five-minute buckets could disagree with the reader and fabricate passage links. Index the rendered dialogue using one virtual Pagefind document per episode and native passage sections. Preserve repeated-second suffixes and guest names. Scope multiword matches to their actual message. |
| Search interaction | Cancel stale requests immediately when input changes. Fetch eight episode fragments initially, cap the first render at 60 entries, and reveal more on demand. Failed loading can retry. Keyboard selection has combobox semantics; pagination preserves focus. Modified clicks retain native browser behavior. |
| Transcript rendering | Speaker attribution now resets correctly across long pauses, structural boundaries, mixed timed and untimed turns, and uncertain or third speakers. Normalize section headings to h2 beneath the episode h1; preserve heading text and IDs. Update chapters and deep-link handling accordingly. |
| Navigation and accessibility | Add a first-tab skip link and focusable main landmarks. Drawer resizing releases scroll locks and inert content. Escape restores TOC focus. Use a native modal dialog for audio shortcuts. Correct search highlight contrast, favicon MIME, and 404 metadata. |
| Media and themes | Audio and video ignore modified shortcuts and links. Alias links resolve their containing timed message. Theme controls tolerate unavailable browser storage. Chapter scrolling honors reduced motion. |
| Unused code and dependencies | Remove unused episode enrichment outputs, an unused theme transition controller, a dead plugin option, gray-matter, the plugin's unused remark dependency, and obsolete bun-types. Simplify TypeScript configuration and declare the existing entity decoder directly. Preserve intentional curation data. |
| Local transcript tools | Audit all 63 episodes, including untimed dialogue. Fix a source-ledger variable collision. Handle malformed review JSON, disable review-response caching, and preserve frontmatter bytes and line endings during export. Add regressions for save durability, stale/cross-origin decisions, audio ranges, and export preservation. |
| Build and deployment | Add explicit check and test commands, generated-site validation, and GitHub CI. Keep forced Markdown rebuilds. Pin on-demand Wrangler and name production/main and preview branches explicitly. Both deploy commands validate the generated site before upload. Fix permanent legacy redirects and revalidate stable Pagefind entry files. |
| Documentation | Rewrite the root README around the current runtime, commands, architecture, search contracts, and verified Cloudflare setup. Correct stale reference, curation, and Play pilot instructions. |

The link validator also exposed one scheme-less internal URL in an old transcript. The reference plugin now adds the scheme only for the exact `hopeinsource.com` host, preserving the source and displayed wording.

## Performance findings

Local measurements are comparisons from this checkout, not production traffic averages.

| Measurement | Result |
| --- | --- |
| Search index generation | 2.53 seconds with native sections versus 3.19 seconds for the previous bucket implementation in a local comparison |
| Final search output | 11,018 visible passages across 63 episodes; 111 index files totaling 3.01 MB |
| Initial search hydration | Eight episode fragments; at most 60 rendered entries |
| Final static deployment | 193 files totaling 17.25 MB; largest asset is the Play page at 512 KB |
| Shared stylesheet | 63.6 KB raw, 12.1 KB gzip |
| Restricting Tailwind scanning to src | Saved approximately 10 gzip bytes in the comparison; left unchanged |

An unforced build retained old transcript heading markup after the local plugin changed. The forced build is therefore retained for correctness. A final warm forced Astro build took about 10 seconds; the initial cold content pass took substantially longer. Removing force would disguise stale output rather than resolve the cache dependency.

The existing media strategy is sound: audio uses `preload="none"`, and reading video episodes creates no YouTube iframe request. Watch loads the embed on demand; Read unloads it. Cover images already have responsive WebP variants. All ten remote transcript images returned HTTP 200 and render with lazy loading, async decoding, and intrinsic dimensions. They total 2.26 MB and occur only in Emotional Programming, so they do not burden initial reading elsewhere.

## Deployment findings

Authenticated read-only inspection confirmed `hopeinsource-com` is a Cloudflare Pages Direct Upload project, with current production deployments on `main` and the expected custom domains. GitHub does not build or deploy this Pages project automatically. The added workflow validates changes; local deploy commands upload `dist/`.

Wrangler 4.140.0 and its branch/project flags were verified. A fresh worktree exposed an additional deployment issue: multiple authenticated accounts prevent noninteractive account selection when Wrangler's local cache is absent. Both commands now explicitly select the verified account that owns `hopeinsource-com`. The configured Bun release-age policy excluded the newer release during this audit, so the eligible version is pinned. CI action tags were resolved against their official repositories. Stable Pagefind loader and entry metadata now revalidate, while hashed data remains immutable.

## Verification

- 52 Bun tests passed, including canonical search sections, speaker boundaries, aliases, URL normalization, and time parsing.
- 46 Python tests passed, including the local HTTP review-server tests.
- Astro check reported zero errors, warnings, or hints. Standalone TypeScript, including unused locals and parameters, passed.
- The full forced build produced 66 pages. Generated-site validation found no duplicate IDs, missing local pages/assets/anchors, invalid time links, or deployment-size violations.
- Frozen-lockfile installation passed. The dependency advisory audit reported zero vulnerabilities across 501 checked packages.
- Browser checks covered homepage, archive, timed/untimed episodes, search, audio, video modes, chapters, drawer resizing, skip links, and both themes. Homepage widths from 320 to 1440 pixels showed no horizontal overflow. The narrow dark episode layout also fit.
- Settled automated accessibility scans reported zero violations for the tested homepage, archive, desktop/mobile episodes, dark theme, and search. Some contrast/link/ARIA checks remained marked incomplete by the scanner; DOM relationships and visible interactions were checked separately.
- No transcript source or experiment files changed. Git whitespace validation passed.

Hosted CI passed for the initial cleanup commit. Hosted preview checks verified all 111 search files, permanent redirects, cache headers, canonical passage navigation, and actual muted YouTube playback advancing from 1:58 to 2:02. Read unloaded the player. Real iPhone Safari verification remains pending. Audio playback was verified with sound muted.

## Remaining source review

The read-only archive audit reports four backward timestamp transitions. Listening is needed before changing these source times or their linkable IDs.

| Episode | Transition | Flagged anchor |
| --- | --- | --- |
| Intrinsic Motivation | 12:33 → 12:09 | [msg-729](https://hopeinsource.com/motivation#msg-729) |
| Speedrunning as Research | 20:56 → 20:41 | [msg-1241](https://hopeinsource.com/speedrunning#msg-1241) |
| Speedrunning as Research | 1:24:22 → 1:24:20 | [msg-5060](https://hopeinsource.com/speedrunning#msg-5060) |
| Ivan Illich | 25:33 → 25:06 | [msg-1506](https://hopeinsource.com/illich#msg-1506) |

The audit also flags 89 exact repeated passages for contextual review, including ordinary repeated acknowledgments. These are candidates, not demonstrated duplicate-content bugs, and were left intact. All 63 episodes have dialogue; Legacy uses untimed turns.

`home-lab-curation.ts` is currently unused by the frontend but contains intentional editorial material documented for future metadata. It adds no browser payload and was retained. No backend, auth, annotation system, transcript reprocessing, or visual redesign was introduced.

## Repeating the checks

```sh
bun install --frozen-lockfile
bun run test
bun run test:transcripts
bun run build
bun run check:site
bunx tsc --noEmit
bun audit
```

For source chronology review without processing audio:

```sh
python3 scripts/transcript-pipeline/audit_archive.py --output /tmp/archive-preflight.json
```

Current operational instructions are in the [root README](../README.md). Pagefind's [native sections](https://pagefind.app/docs/sub-results/) and Cloudflare's [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/) describe the relevant platform behavior.
