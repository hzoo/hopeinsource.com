# hopeinsource.com

Source code for [hopeinsource.com](https://hopeinsource.com), a transcript-first podcast reading site. Astro renders static episode pages; audio and video synchronize with canonical passage anchors. Tailwind styles the UI, and Pagefind supplies browser search. There is no application server or database.

## Local development

Use **Bun 1.4.2 or newer** and **Node.js 22.12 or newer**. Bun's image API generates cover variants; Astro's CLI uses Node. Python 3.10+ is needed only for the transcript-tooling tests and local review tools.

```sh
bun install --frozen-lockfile
bun run dev
```

Astro prints the local address, normally `http://localhost:4321`. Search is generated from production HTML, so use a build preview when testing search:

```sh
bun run build
bun run preview
```

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Generate cover images and start Astro development |
| `bun run check` | Check Astro and TypeScript diagnostics |
| `bun run check:site` | Validate the completed build's links, IDs, assets, and deployment limits |
| `bun run test` | Run frontend, Markdown plugin, and search-builder regression tests |
| `bun run test:transcripts` | Run the Python review/pipeline tests without processing recordings |
| `bun run build` | Generate covers, check types, render the site, and build search in `dist/` |
| `bun run preview` | Serve the completed `dist/` build locally |
| `bun run build:images` | Generate the three WebP cover sizes in `public/artwork/` |
| `bun run build:search` | Rebuild Pagefind from already-rendered episode HTML in `dist/` |

`build` deliberately uses `astro build --force`. Astro's content cache can retain stale rendered Markdown after a local remark plugin changes; a normal build can succeed while still serving the old transcript structure.

GitHub Actions runs the frozen dependency install, both test suites, and the full build for pull requests and pushes to `main`. It does not deploy.

## Source layout

- `src/content/podcast/`: canonical episode Markdown and frontmatter, grouped by season.
- `src/pages/`: the homepage, episode pages, and error page.
- `src/components/`, `src/scripts/`, `src/styles/`: UI, browser behavior, and styles.
- `src/remark-transcript-plugin/`: local plugin that renders canonical messages, aliases, and compact replies.
- `src/plugins/`: reference extraction and responsive Markdown images.
- `src/lib/home-moments.ts`: verbatim homepage excerpts linked to original passages.
- `scripts/build-*.ts`: cover-image and production-search generation.
- `scripts/transcript-pipeline/`: separate local transcript review tools; see its [README](scripts/transcript-pipeline/README.md).
- `public/`: copied static files, Cloudflare headers, and legacy redirects.

Generated `dist/`, `.astro/`, cover variants, Python caches, and local `experiments/` are ignored. Keep `bun.lock` committed. After changing dependencies, run `bun install` and review the lockfile diff.

## Transcript and search contracts

The transcript is the primary artifact. Preserve `#t=<seconds>`, canonical `#msg-<seconds>` IDs, occurrence suffixes, and existing aliases. Headings also remain linkable. Annotations and excerpts must point to existing canonical anchors. See [AGENTS.md](AGENTS.md) and the transcript tools' [editing rules](scripts/transcript-pipeline/README.md#editing-rules).

Homepage moments must remain verbatim, preserve speaker attribution, and link to an existing canonical message. Add sparse inline links for named works, people, or unfamiliar concepts; verify destinations and preserve dialogue. Supplementary material belongs in blockquotes. Only blockquote links populate the References menu. Build and inspect the rendered passage after editing.

Time corrections keep old IDs as inline `<span id="msg-OLD"></span>` aliases. A leading `<span data-message-id="msg-SECONDS-2"></span>` preserves a later same-second occurrence when a duplicate is removed; its seconds must match the timestamp.

The search builder reads rendered `.message` elements and visible dialogue. It creates one virtual Pagefind document per episode, with empty canonical message headings as boundaries and a separate speaker metadata array. These virtual headings do not change the reading page. The client uses Pagefind's public content, anchors, and word offsets to produce passage links, including same-second occurrence suffixes. Empty headings retain anchors but are omitted from Pagefind's native excerpt list, so the client builds its own bounded excerpts.

Unquoted queries use native per-term offsets to require every meaningful term within the same speaker turn, preserving Pagefind's stemming and diacritic handling. A conservative guard rejects drastic prefix fallback, such as a misspelled `coniviality` matching `cons`. Fully quoted queries, including paired smart quotes, match ordered words and find every matching message, including occurrences omitted from native phrase excerpts. Episode titles and guest names remain searchable without inventing timed links. Excerpts reserve enough space for the whole matching word cluster when it fits within the 32-word limit.

Pagefind searches all metadata, including the speaker array used only for attribution. The client gives `passage_speakers` zero ranking weight and excludes candidates whose query terms match only that carrier before fetching fragments. Spoken names and episode-title matches remain searchable. Configuration is reapplied after every engine restart.

Search opens and focuses immediately, initializes the engine on intent, and preloads query shards during its 120ms debounce. Reading pages default to **This episode** using a native Pagefind `episode` filter keyed by the canonical route. **All episodes** preserves the query and searches the archive; homepage search always uses the archive. A scoped miss offers **Search all episodes**, without silently changing scope. The input has one Close control, with a stable scope row above the scrolling results.

Local search shows five passages initially. Archive search prepares three episodes and shows three passages per episode. **Show N more passages** reveals up to ten additional passages; **Show more episodes** fetches additional fragments on request. Episode ordering follows Pagefind relevance. Within an episode, brief turns composed only of acknowledgment words rank behind substantive turns, then term proximity and conversation order break ties. Short answers such as “Faith,” “No,” and “I don’t know” retain their rank. Every matching turn remains available; quoted searches retain exact conversation order. Links and expansion buttons use native focus, with arrow-key navigation and Escape returning focus to the trigger. Scope changes cancel pending searches and pagination; asynchronous result expansion preserves the reader's current focus. Failed requests release Pagefind's cached failures; retrying initializes a fresh engine and refreshes result handles while keeping visible passages and their expansion limits.

After a validated miss, optional spelling help offers up to three explicit query suggestions from the transcript/title/speaker vocabulary. It never rewrites input silently. Exact words, quoted phrases, short identifiers, and code names are protected. The revalidated `/pagefind/vocabulary.json` manifest points to an immutable content-hashed dictionary; ordinary successful searches never fetch it.

An empty initial episode batch is not a validated miss. Continue through native candidates until a matching passage is found or the candidates are exhausted, then offer spelling help. Real corpus regressions include `convention community` (a later Snow passage contains “conventions” and “community”) and `apologetic people` (a later Salience passage contains both). Suggestions for an absent inflection must not hide those native morphology matches.

Transcript recognition and editorial cleanup are separate, explicitly authorized work. The website build only reads the existing content; it does not run the transcript pipeline.

Homepage conversations advance only through previous/next controls, previews, arrow keys, or swipes. Reading an episode stores its path and current canonical message anchor in device-local `localStorage` under `his.reading-position`; the homepage offers **Continue reading** when that saved position is valid. Opening an episode never restores progress automatically, and explicit passage, time, or heading links keep their destination. Unavailable storage leaves navigation usable.

## Search performance and architecture

The October 2, 2026 audit used the rendered production build and an isolated headless Chromium session against local Astro preview. Browser measurements include debounce, search, passage preparation, and initial rendering; these are comparative local results, not production latency guarantees.

| Query | Before | After |
| --- | ---: | ---: |
| `illich` | 662ms | 145ms |
| `open source` | 621ms | 143ms |
| `tools for conviviality` | 537ms | 133ms |
| `community` | 397ms | 137ms |
| `"open source"` | 298ms | 139ms |

Native search took approximately 3–20ms; the previous eight-episode excerpt preparation took 100–300ms after a fixed 250ms debounce. Smaller initial batches, intent-time initialization, and direct passage extraction removed that delay. Regression tests also exercise actual generated Pagefind JS/WASM, not only mocked result shapes.

The corpus contains 63 transcript episodes, 11,017 messages, and 35,373 sentences. Message length is approximately 40 words at the median, 100 at p90, and 170 at p99. The index-granularity comparison used isolated Pagefind indexes over the same rendered dialogue:

| Storage/index unit | Files | Index bytes |
| --- | ---: | ---: |
| Episode with synthetic speaker/time headings | 111 | 3,011,755 |
| Episode with empty boundaries and speaker metadata | 108 | 2,814,386 |
| Same index with native episode filtering | 109 | 2,815,931 |
| One document per message | 11,099 | 5,713,358 |

The new optional vocabulary adds two files and approximately 57KB gzip on a miss. Its raw size makes total on-disk search bytes approximately equal to the old index, while successful searches avoid the dictionary and use a 6.6% smaller Pagefind index.

The context-search follow-up measured `faith`, `illich`, `open source`, `community`, `God`, and a smart-quoted phrase on Totems. Scoped results or misses rendered in 123–135ms; archive results rendered in 129–138ms in the same local session, including the 120ms debounce. Episode filtering adds one 590-byte hashed filter asset and about 1.5KB total index bytes. Ranking checks over eight representative queries retained identical result counts and canonical URLs while removing brief backchannels from the initial nine visible results for `yeah` (1→0) and `okay` (2→0). Browser checks cover scope preservation, explicit widening, stale-query cancellation, passage/episode expansion, canonical links, mobile overflow, and keyboard focus; the scoped accessibility audit found no violations.

Keep **episode shards for storage, message anchors for matching, and focused word/sentence windows for display**. Sentence precision does not require sentence pages or files. One Pagefind document per sentence would exceed 35,000 fragments, while sentences often omit the speaker or the neighboring answer needed to understand a conversation. Change shard size only when cold-query transfer or excerpt preparation exceeds a measured budget on representative phones; choose chapter/message batches if an episode becomes too large, preserving canonical message IDs. Do not create arbitrary time buckets or sentence URLs.

Keep [Pagefind 1.5.2](https://github.com/pagefind/pagefind/releases), already the latest stable release verified during the audit. It provides sharded static search, native stemming, and a browser worker. [MiniSearch](https://github.com/lucaong/minisearch) offers edit-distance fuzzy matching and [FlexSearch](https://github.com/nextapps-de/flexsearch) offers other matching/index modes, but either would require rebuilding shard loading, passage extraction, ranking, and caching. A small corpus spelling layer earns its cost here; a replacement search engine does not. Evaluate an alternative against real queries, named guests, spelling mistakes, exact remembered phrases, payload, and first-use latency before replacing the dependency. Consider server/semantic search only when users demonstrably need concept retrieval beyond the spoken words.

The follow-up checked official docs, pinned engine source, upstream issues, and authored integrations. [Custom sub-results](https://pagefind.app/docs/sub-results/) explicitly support arbitrary anchors and word offsets, so the episode/message/window split follows the public API. The 63 compressed episode fragments total 1,110,462 bytes, with a 16,763-byte median and a 30,492-byte maximum; there is no measured need for finer storage shards. [Metadata matching](https://pagefind.app/docs/metadata/) explained 11 of 24 native `Nadia` candidates that had no body hit. Zero carrier weight improves the order of genuine matches; candidate filtering prevents those attribution-only downloads. Across 102 sampled multiword passages, keeping fitting query clusters visible removed the one excerpt that hid a query term without changing the matched canonical URLs.

The open [truncated-search issue](https://github.com/Pagefind/pagefind/issues/1246) and [spellcheck proposal](https://github.com/Pagefind/pagefind/issues/2) support retaining explicit corpus corrections rather than tuning `termSimilarity` as if it were edit-distance matching. Do not use quoted single-term queries for offset maps: the pinned engine returns only the first contiguous occurrence, even for one word. Keep all unquoted native offsets and validate literal phrases separately. Before changing broader ranking parameters, judge a small set of real podcast queries against known passages; metadata pollution is a demonstrated defect, while a different BM25 balance has no evidence yet.

Upstream [request retry fixes](https://github.com/Pagefind/pagefind/pull/1329) were merged but are not in stable 1.5.2. Fragment errors use the documented destroy/reinitialize lifecycle and fresh result handles. Index/filter download failures can instead return an empty result and remain cached; reconnecting now resets the engine and reruns an open search. This does not detect every transient server failure. Reassess this recovery layer when the upstream fixes ship.

After these fixes, local browser checks rendered archive queries `Nadia`, `Henry`, `open source`, and `faith` in 131–145ms including debounce. A blocked index request first produced a scoped miss; restoring the request and dispatching the browser's reconnect event recovered the same query and scope in 212ms. Fragment pagination retry retained six expanded passages and advanced from three to six episodes. The final build/site check and 103 tests passed.

Keep static Astro HTML on [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/). The largest transcript is approximately 512KB raw / 69KB gzip, and audio/video make no requests until requested. Sixty mobile scroll frames produced no layout events. A content-visibility experiment reduced initial rendering but moved a distant passage landing by 117px and changed estimated scroll height by 8%; it was rejected. Full HTML currently preserves stable anchors, native browser find, accessibility, and reading context. [SSR streaming](https://docs.astro.build/en/recipes/streaming-improve-page-performance/) addresses fetch-dependent rendering; these transcripts are already precomputed. [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) becomes useful if actual dynamic APIs are added, with no measured reason to migrate the present static site.

Future annotations should load independently: one lazily fetched episode manifest keyed by canonical message IDs, then render visible or opened threads in reserved margins. Keep transcript HTML available first. Comments, authentication, and their backend remain outside this project scope.

## Deployment

The static output is deployed to the existing **Cloudflare Pages Direct Upload** project `hopeinsource-com`, with `main` as its production branch. Wrangler is pinned in the deployment commands and downloaded on demand, so local frontend installs do not include the Workers emulator toolchain.

Authenticate once with an account that can deploy the project:

```sh
bunx wrangler@4.140.0 login
```

Then choose the destination explicitly:

```sh
bun run deploy:preview  # preview branch URL
bun run deploy         # main branch
```

Both commands perform the full build and generated-site validation before uploading `dist/`. They select the project's Cloudflare account explicitly, so a fresh checkout does not depend on Wrangler's ignored local account cache. The production command explicitly sends `--branch=main`; keep it aligned with the project's production branch if that setting changes. The preview command sends `--branch=preview`. See Cloudflare's [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/) for branch behavior and account setup.

Cloudflare does not run a Git-connected build for this project. GitHub Actions validates changes; the commands above upload the completed local build.

`public/_redirects` contains permanent legacy episode redirects. `public/_headers` gives fingerprinted Astro assets and hashed Pagefind data immutable caching; the stable Pagefind loader, worker, WASM runtime, entry manifest, and spelling manifest revalidate on new deployments. Cover filenames are stable, so they do not receive immutable caching.

The audit observed a 31-day browser TTL on the live Pagefind loader despite the repository's revalidation rule. After the next deployment, verify the live loader/worker/manifest response headers; a Cloudflare browser-cache override or older deployed configuration may need correcting. Canonical search URLs include trailing slashes to avoid the production `/episode` → `/episode/` redirect.
