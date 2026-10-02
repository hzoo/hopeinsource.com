# Local transcript tools

Optional local recognition, review, cleanup, and draft-export tools. The website build reads existing Markdown and never runs inference. Audio and local review state stay in ignored `experiments/` directories.

An existing usable transcript starts with contextual reading cleanup, without new recognition or timestamp changes. A missing transcript starts with audio ingest. Whisper is the primary recognizer; retry a bounded excerpt or use a second recognizer only when a specific uncertainty warrants it. Model agreement is a reason to inspect a passage, not a verdict on wording or speaker identity.

## Runtime and new recordings

Use Python 3.10+ and FFmpeg/ffprobe. Recognition and diarization use separately installed environments and downloaded models; see [runtime.example.json](runtime.example.json). Copy it to the episode directory as `runtime.local.json` and supply actual Python/model paths. `run.py` selects those environments and enables Hugging Face offline mode; it does not install dependencies or upload audio. Assembly, cleanup, review, export, and tests do not require ML packages.

```sh
python3 scripts/transcript-pipeline/pipeline.py ingest experiments/transcript-pilot/my-episode --audio /absolute/path/episode.mp3
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json transcribe experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json diarize experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/pipeline.py assemble experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/pipeline.py audit experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/serve.py experiments/transcript-pilot/my-episode
```

For a mixed recording, map acoustic clusters to speaker names in `manifest.json` with local voice evidence. A cluster count is not a guest count, and a global cluster/name mapping does not verify every handoff. Uncertain speaker labels remain explicit. For long recordings, `"stream_audio": true` in the diarizer configuration feeds five-second chunks into persistent speaker state with sample-based timing. This avoids whole-recording buffering; it can produce different results from file mode.

Two inputs must be isolated speaker tracks with measured or confirmed offsets, not two mixed recordings. Ingest them instead with:

```sh
python3 scripts/transcript-pipeline/pipeline.py ingest experiments/transcript-pilot/my-episode \
  --track Henry=/absolute/path/henry.mp3 --offset Henry=0 \
  --track Guest=/absolute/path/guest.mp3 --offset Guest=0
```

These tracks provide speaker identity, so omit diarization. Assembly preserves overlap and offsets; playback switches tracks without synthesizing a mix. Alignment and clock drift are not estimated. This path has synthetic tests but still needs a real two-microphone pilot. Primary recognition currently selects English.

For a disputed passage, retry without feeding the suspected words to the model:

```sh
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json recheck experiments/transcript-pilot/my-episode --track track-0 --start 775 --end 800
```

The optional `crosscheck` stage uses the configured Parakeet Redux adapter. If that runtime is installed, run it like `transcribe`, then add `--crosscheck experiments/transcript-pilot/my-episode/raw/crosscheck-track-0.json` to `audit`. This comparison currently supports one mixed recording; inspect isolated-track results separately. A second recognizer is not required for assembly.

Raw outputs are reused rather than overwritten. Use a new directory/version for a model rerun. Corrections preserve passage times; they do not invent word alignment for newly corrected text. Saved excerpt words can support a restoration with original-timeline timing.

## Editing rules

- Remove only empty filler, genuine stutters, and abandoned repeated starts. Never paraphrase, reorder words, repair spoken grammar, add claims, or move words between speakers for fluency. Read neighboring turns and the resulting deletion diff.
- Keep negation, qualifications, comparisons, questions, examples, jokes, deliberate repetition, and meaningful reactions. “I think”, “I guess”, hedging “like”, and “kind of” often carry meaning; do not impose a one-hedge-per-thought rule. Emotional hesitations stay intact. When unsure, keep the wording.
- An opening “Yeah.” followed by substantive text may be removed. Keep standalone acknowledgments, comma-led “Yeah, no…” phrases, internal/quoted occurrences, and responses that accept instructions or yield the floor. Never delete a substantive short turn solely for its length.
- Use commas, colons, or ellipses for new reading punctuation rather than em dashes or `--`. Remove redundant labels such as “(affirmative)” after a spoken acknowledgment; retain actual cues such as “(laughs)”.
- Recognition, speaker, and boundary corrections belong in the correction layer with evidence. Do not guess missing words from context, biographies, or a published transcript. Call audio “unclear” or “masked by wind” only after listening confirms it.
- Preserve canonical IDs, times, aliases, speaker ownership, headings, and existing title/description. Keep an emptied acknowledgment's timestamp/speaker line and markup in website Markdown so later occurrence suffixes remain stable. A removed duplicate needs its old anchor preserved as an alias; never invent timing offsets to avoid collisions.

A word-subsequence validator catches additions/reordering, not a meaning-changing deletion. Mechanical checks and model comparisons do not replace contextual editorial judgment. Ordinary reviewed cleanup does not require the owner to adjudicate every heuristic flag; leave uncertain wording intact and the listening backlog optional.

## Source files and review

| Keep as editable inputs | Purpose |
| --- | --- |
| Original audio and `manifest.json` | Input hashes, track files, offsets, provisional names, and mapping evidence |
| `raw/` JSON | Primary recognition, diarization, optional comparisons, and excerpt/restoration evidence |
| `raw-snapshot.json`, `raw-turns.json` | Frozen raw hashes, source IDs, and original anchors |
| `edits.json` | Separate `speakers`, `boundaries`, `joins`, `restorations`, `corrections`, and `reading` changes |
| `review-notes.json`, `review-decisions.json` | Anchored open questions and saved listening decisions |
| `published.json`, `editorial.json` | Existing metadata snapshot or unpublished editorial draft |

Corrections require exact `before`/`after` and evidence. Reading edits require `turn_id`, proposed `text`, and a reason; words must remain a subsequence of corrected text. An optional `semantic_review` records why a flagged deletion preserves meaning. Joins and boundary moves conserve source words and anchor aliases. Restoration words must match their retained excerpt JSON.

For existing episodes, preserve title, description, source path/hash in `published.json` and use `{"mode":"existing","headings":[...]}` in `editorial.json`. Assembly requires that metadata snapshot. Its historical hash does not prove the pilot still matches today's publication.

`assemble` replays those inputs without running models, producing `episode.json`, the three Markdown editions, `index.html`, and `editor.html`. Edit source JSON rather than generated pages. `audit.json` contains heuristic candidates, not confidence scores. Full analysis WAVs can be recreated from retained audio with FFmpeg; keep excerpt files that a current listening view links to.

Open the server's `/` page to read and compare Raw → Corrected separately from Corrected → Reading. Open `/editor.html` for focused listening, text/speaker suggestions, and playback controls. Decisions save to browser storage and `review-decisions.json`, tied to audio hashes and the review revision. They do not modify canonical content or resolve notes automatically: reconcile accepted suggestions into explicit edits before reassembly. Skip stays unresolved. Consult `?` for listening-desk shortcuts.

Keep originals, frozen IDs, raw evidence, edits, accepted decisions, and unique checkpoints. Generated editions can be rebuilt, but deleting them disables their review pages until assembly runs again. Local experiments and models are outside the deployment; they are not required website assets.

## Existing archive

Run the read-only structural preflight before editing existing Markdown:

```sh
python3 scripts/transcript-pipeline/audit_archive.py --output /tmp/archive-preflight.json
```

It checks every season by default, including untimed dialogue. Selected Markdown paths may precede `--output`. Same-second messages are informational; candidates require review, not automatic deletion.

`cleanup_archive.py` applies a JSON list of repository-relative `path`, exact whole dialogue `before` and `after` lines, and `reason`. It defaults to dry-run, rejects stale/ambiguous matches and changed speakers/timestamps/links, and validates all proposals before writing. Reviewed filler-only turns may become empty while retaining markup. Other lines, frontmatter, and line endings survive.

```sh
python3 scripts/transcript-pipeline/cleanup_archive.py reviewed-edits.json
python3 scripts/transcript-pipeline/cleanup_archive.py reviewed-edits.json --apply
```

For an assembled pilot, synchronize the same vetted ledger into its editable state. This requires complete agreement between the website and pilot, preserves frozen IDs/times/decisions, and never exports website Markdown:

```sh
python3 scripts/transcript-pipeline/sync_archive_pilot.py reviewed-edits.json my-episode
python3 scripts/transcript-pipeline/sync_archive_pilot.py reviewed-edits.json my-episode --apply
```

The passage-only archive queue consumes JSON reports from `my-review/reviewed/*.json`, or `my-review/batch-*/*.json` when `reviewed/` is absent. Reports contain a repository-relative `path` and `issues` with a source line, anchor, timestamp, or quoted phrase. It is a separate view of existing Markdown:

```sh
python3 scripts/transcript-pipeline/archive_review.py experiments/transcript-pilot/reviews/my-review
python3 scripts/transcript-pipeline/archive_review_server.py experiments/transcript-pilot/reviews/my-review --port 8792
```

`Space` plays, `R` replays, `Enter` saves/advances, `K` keeps, and `S` skips. Saves stay in `review-decisions.json`; reconcile accepted changes into the exact edit ledger before rebuilding the queue. Source hashes/revisions reject stale saves. Keep decisions before regenerating a queue. Untimed passages remain explicitly untimed; a neighboring audio window is not a verified timestamp.

## Export and metadata

Only export an assembled draft when replacing the existing episode body is intended:

```sh
python3 scripts/transcript-pipeline/export_site.py experiments/transcript-pilot/my-episode src/content/podcast/season-5/my-episode.md
bun run build
```

Export preserves existing frontmatter, rejects missing/colliding canonical source anchors, and records hashes in `site-preview.json`. It retains a draft note and unconfirmed speaker labels. Preview and inspect links afterward. For an existing published transcript, prefer exact reviewed source edits: exporting only visible turns can renumber existing integer occurrence anchors.

For future unpublished metadata, read the corrected conversation first. Suggest at most three distinctive titles, preferably a short spoken phrase; record speaker, turn ID, time, source quote, and context. Label verbatim, near-verbatim, and concept/reference choices honestly. The current JSON validator accepts only `verbatim`/`near-verbatim` title or heading items with matching `source_quote`; keep concept/reference candidates outside those quote fields.

Draft one plain description: an actual question, who is talking, and a few distinctive details. Prefer Henry's “I”/“we” voice where appropriate, with passage references for factual claims. A synthesized question is editorial prose rather than a quotation. Do not invent scenes, personal opinions, mood, conclusions, or promotional promises. Compare a few relevant existing episodes, keep uncertainty, and leave new metadata as a draft. Existing episode metadata stays unchanged.

## Verification

```sh
bun run test:transcripts
```

Tests cover edit/evidence constraints, frozen anchors and offsets, restoration timing, metadata provenance, exports, escaped review HTML, and both servers' audio seeking and stale-save rejection. They run without model execution; HTTP tests bind localhost. Passing tests verifies these contracts, not audio accuracy or editorial fidelity.
