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

`build` deliberately uses `astro build --force`. Astro's content cache can retain stale rendered Markdown after a local remark plugin changes; a normal build can succeed while still serving the old transcript structure. `build:force` is an alias for the complete build.

GitHub Actions runs the frozen dependency install, both test suites, and the full build for pull requests and pushes to `main`. It does not deploy.

## Source layout

- `src/content/podcast/`: canonical episode Markdown and frontmatter, grouped by season.
- `src/pages/`: the homepage, episode pages, and error page.
- `src/components/`, `src/scripts/`, `src/styles/`: UI, browser behavior, and styles.
- `src/remark-transcript-plugin/`: workspace package that renders canonical messages, aliases, and compact replies.
- `src/plugins/`: reference extraction and responsive Markdown images.
- `src/lib/home-moments.ts`: verbatim homepage excerpts linked to original passages.
- `scripts/build-*.ts`: cover-image and production-search generation.
- `scripts/transcript-pipeline/`: separate local transcript review tools; see its [README](scripts/transcript-pipeline/README.md).
- `public/`: copied static files, Cloudflare headers, and legacy redirects.

Generated `dist/`, `.astro/`, cover variants, Python caches, and local `experiments/` are ignored. Keep `bun.lock` committed. After changing dependencies, run `bun install` and review the lockfile diff.

## Transcript and search contracts

The transcript is the primary artifact. Preserve `#t=<seconds>`, canonical `#msg-<seconds>` IDs, occurrence suffixes, and existing aliases. Headings also remain linkable. Annotations and excerpts must point to existing canonical anchors. See [AGENTS.md](AGENTS.md), [curation](docs/home-lab-curation.md), and [reference linking](docs/reference-linking.md).

After correcting a time, keep the old passage ID as an empty inline `<span id="msg-OLD"></span>` inside that passage. If removing a duplicate would renumber a later same-second passage, a leading `<span data-message-id="msg-SECONDS-2"></span>` preserves its outer ID. The marker must match the passage's timestamp; the renderer consumes it. Time links use the actual timestamp, while message aliases retain their passage destination.

The search builder reads the rendered `.message` elements and their visible dialogue. It creates one virtual Pagefind document per episode, with canonical message IDs as section boundaries. Native [Pagefind sub-results](https://pagefind.app/docs/sub-results/) then link directly to passages, including same-second occurrence suffixes. The virtual headings do not change the reading page. This keeps indexing aligned with the renderer while avoiding one deployed index fragment per message.

Transcript recognition and editorial cleanup are separate, explicitly authorized work. The website build only reads the existing content; it does not run the transcript pipeline.

Homepage conversations advance only through previous/next controls, previews, arrow keys, or swipes. Reading an episode stores its path and current canonical message anchor in device-local `localStorage` under `his.reading-position`; the homepage offers **Continue reading** when that saved position is valid. Opening an episode never restores progress automatically, and explicit passage, time, or heading links keep their destination. Unavailable storage leaves navigation usable.

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

`public/_redirects` contains permanent legacy episode redirects. `public/_headers` gives fingerprinted Astro assets and hashed Pagefind data immutable caching; the stable Pagefind loader and entry manifest revalidate on new deployments. Cover filenames are stable, so they do not receive immutable caching.
