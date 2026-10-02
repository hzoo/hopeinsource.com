# Local transcript pilot

One mixed recording, or two **isolated speaker tracks**, to a timed raw transcript, corrected draft, conservative reading edition, and sourced editorial suggestions. Audio stays unchanged. This is a review workflow, not unattended publishing.

The full walking pilot is now available at `experiments/transcript-pilot/walk/` (episode 58, 100:07), including a conservative reading draft and reconciled listening decisions. Read its current `review-notes.json` for the remaining open items. Serve it with `python3 scripts/transcript-pipeline/serve.py experiments/transcript-pilot/walk --port 8771`. Accepted listening decisions are preserved; unresolved speaker/wording notes remain explicit.

Three earlier full pilots are available: `experiments/transcript-pilot/faith/` (episode 1, 33:39) `experiments/transcript-pilot/membership/` (episode 2, 34:44), and `experiments/transcript-pilot/motivation/` (episode 3, 43:57). Their files are local and gitignored. These model drafts have not replaced production transcripts. A separate, authorized archive cleanup removes reviewed repeated starts from the existing Markdown; see below. Start the episode 3 review with:

```sh
python3 scripts/transcript-pipeline/serve.py experiments/transcript-pilot/motivation --port 8770
```

Open http://127.0.0.1:8770/. Use Reading to judge voice, Compare to inspect **Raw → Corrected** separately from **Corrected → Reading**, and Review queue for unresolved passages. Deletions and additions are highlighted; Raw → Corrected also shows the original and corrected speaker names. Meaning cues draw attention to removed negations (including contractions), qualifications, contrasts, numbers, and long spans; they are prompts for judgment, not semantic verification. Playback uses the original recording. Review checkmarks mean “listened to”, not “correct”; exported notes must still be reconciled into the episode's edits and review notes. The JSON artifact always identifies itself as `review_draft`. Checks reset when corrected text, speaker labels, or listening notes change. They do not certify the cleanup. See each pilot's `review-report.md` and `experiments/transcript-pilot/workflow-review.md` for findings.

## The flow

Choose the entry point first. An existing usable transcript starts at reading cleanup; do not pay for new recognition or change its canonical timestamps merely to remove filler. A missing transcript starts with audio ingest. For unfamiliar recording conditions, test beginning/middle/end samples before the full run, preserving each excerpt's original timeline offset. Samples diagnose failure modes; they cannot certify the remaining recording.

1. **Ingest.** Copy/hash the input, record duration and timeline offsets. For two files, first establish whether they are isolated microphones or two mixed recordings. This implementation accepts two isolated speaker tracks, not arbitrary overlapping mixed recordings. Offsets must be measured or confirmed; it does not estimate alignment or clock drift.
2. **Transcribe.** Save raw words and times once. For isolated tracks, the speaker comes from the input. For a mixed file, run acoustic diarization and map clusters to names using introductions/listening. Cluster count is not a reliable guest count; music, changes in recording conditions, and short interjections can create extra clusters.
3. **Cross-check and audit.** Run the archive preflight for existing Markdown first: duplicate passages, chronology, explicit anchors, missing bodies, and oversized turns. Same-second turns are informational, not automatically errors. Compare an independent recognizer for new audio, inspect gaps, uncertain names and short speaker changes. A disagreement is a reason to listen, not proof the audio is difficult to hear. The audit also flags clusters of rapid alternating short fragments using canonical turn IDs; acknowledgment-only exchanges are excluded. These handoff candidates require listening before any speaker or boundary correction. Retry an excerpt when a passage appears missing. Preserve the second output and its original-timeline offset.
4. **Correct.** Record recognition, speaker, and boundary corrections with evidence. If uncertain, retain the candidate wording and add a timestamped review note. Use “unclear speech”, “overlap”, or “wind masks words” only after listening confirms that description. Do not guess missing words from context or a published transcript.
5. **Make the reading edition.** Resolve high-impact boundary/ownership problems before optimizing density. Work passage by passage with neighboring context. Remove empty filler, reviewed repeated starts and abandoned fragments; add punctuation. Do not use a word-count rule to delete short turns. Questions, corrections, sentence completions, directions, jokes, and expressions of uncertainty retain their words and ownership. Keep meaning, uncertainty, humor, examples, and individual diction. The validator rejects new/reordered words in reading edits. It cannot judge whether a deletion changes meaning: editorial review remains necessary.
6. **Preserve or draft metadata.** For an existing episode, capture the unchanged title/description and source-file hash in `published.json`, and set `editorial.json` to `{"mode":"existing","headings":[...]}`. Assembly requires the snapshot and the review hides replacement title/description options. For an unpublished episode, follow [the archive-based voice guide](editorial-voice.md): prefer a distinctive spoken phrase, with a turn ID and source quote; label near-verbatim and concept/reference choices honestly. Description sentences have source references and are labeled as editorial summaries. Do not claim a quote is audio-verified merely because it matches the corrected draft.
7. **Review.** Listen to the flagged passages, every uncertain speaker handoff, and a few unflagged samples. Read a continuous section for rhythm and voice. Fix the correction layer first, then replay cleanup. Add new evidence to edit reasons; retain the original outputs. An episode is ready only after someone accepts the unresolved wording and speaker decisions.

The published transcript is a useful reference for names and context. It is not the ground truth, and lexical agreement with it is not transcription accuracy.

## Running another episode

Python 3.10+ and FFmpeg/ffprobe are needed for the non-ML steps. Inference currently targets Apple Silicon for the primary recognizer and diarizer; the independent recognizer runs on CPU. Model/runtime choices and tested package versions are in `runtime.example.json`. Create separate environments, download the selected models, copy that file to your episode as `runtime.local.json`, and fill in the local paths. The runner sets Hugging Face offline mode; missing models must be downloaded separately. The pilot's current environments/models are in temporary directories and should be moved/reinstalled before relying on them long term. No token is needed for the models used in this pilot.

```sh
# One mixed recording:
python3 scripts/transcript-pipeline/pipeline.py ingest experiments/transcript-pilot/my-episode --audio /absolute/path/episode.mp3

# OR two isolated, synchronized speaker tracks (explicit zero offsets):
python3 scripts/transcript-pipeline/pipeline.py ingest experiments/transcript-pilot/my-episode \
  --track Henry=/absolute/path/henry.mp3 --offset Henry=0 \
  --track Guest=/absolute/path/guest.mp3 --offset Guest=0

# Use the episode's configured local runtimes:
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json transcribe experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json diarize experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json crosscheck experiments/transcript-pilot/my-episode

# Map acoustic cluster IDs in manifest.json, then freeze the first turn IDs:
python3 scripts/transcript-pipeline/pipeline.py assemble experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/pipeline.py audit experiments/transcript-pilot/my-episode \
  --crosscheck experiments/transcript-pilot/my-episode/raw/crosscheck-track-0.json

# Recheck a disputed excerpt without feeding the suspected wording to the model:
python3 scripts/transcript-pipeline/run.py --config experiments/transcript-pilot/my-episode/runtime.local.json recheck experiments/transcript-pilot/my-episode --track track-0 --start 775 --end 800

# Write/review edits.json, review-notes.json, editorial.json (and published.json for an existing episode), then replay:
python3 scripts/transcript-pipeline/pipeline.py assemble experiments/transcript-pilot/my-episode
python3 scripts/transcript-pipeline/serve.py experiments/transcript-pilot/my-episode
```

Existing raw inference outputs are reused. Use a new episode directory/version for a model rerun. Raw transcript hashes prevent silently rebuilding existing anchors from changed wording. Assembly checks the input-audio hash, preserves source word IDs and timestamps, and replays edits. Recognition changes are passage-timed; changed spellings/phrases do not receive invented individual word boundaries. Restored omissions can carry word timing from a saved excerpt. Forced alignment of newly corrected text is a possible later step when precise subtitles are needed; this pilot does not claim such alignment.

For long recordings, set `"stream_audio": true` in the runtime's `diarize` configuration (or pass `diarize --stream-audio`). The installed Sortformer file-mode implementation pre-encodes the entire recording despite its streaming interface; episode 58 exceeded Metal's maximum buffer size. The bounded mode feeds five-second audio chunks into one persistent speaker state. Segment times are rebased from model-frame coordinates to actual sample offsets to prevent accumulated frame-rounding drift. It uses the live-input API without file-mode right-context embeddings, so its output can differ from previous short pilots. Do not assume identical speaker accuracy. It retains an analysis WAV and records its mode in the output; original MP3s stay unchanged.

Two-track assembly preserves each speaker's overlapping utterances and original file offsets; the review player switches to the relevant track. It does not synthesize a mixed playback file. Two-track offset/overlap contracts have synthetic tests; a real two-microphone episode has not been piloted. `audit --crosscheck` currently accepts one mixed recording only; inspect two-track cross-checks per track. English is currently selected for the primary recognizer.

## Editable artifacts

- `manifest.json`: input hashes, files, offsets, provisional speaker names and mapping evidence.
- `raw/`: unchanged primary transcription, diarization, independent transcription, and excerpt evidence.
- `raw-turns.json`: frozen IDs and original time anchors.
- `edits.json`: separate `speakers`, `boundaries`, `joins`, `restorations`, `corrections`, `reading` arrays. See the episode-1 pilot for a complete worked example. Corrections require exact `before`, `after`, and evidence. Reading edits supply `turn_id`, `text`, and reason; words must remain a subsequence of corrected text. Boundary moves and joins retain source IDs and anchor aliases. An acknowledgment removed entirely from the reading edition keeps its link as an alias on a neighboring visible passage.
- `review-notes.json`: anchored open questions; each has `id`, `turn_id`, `kind`, `note`, and `state`.
- `published.json`: existing title, description, `source_file`, and `source_sha256`; preserve these exactly.
- `editorial.json`: existing-episode mode and headings, or unpublished working title, title options, headings, and description. Quote-derived items carry `text`, `kind`, `source_quote`, `turn_id`.
- Reading edits may include `semantic_review`: an explanation of why a flagged deletion preserves meaning. This is a text-review judgment, separate from a listening decision.
- `episode.json`, `raw.md`, `corrected.md`, `reading.md`, `index.html`: generated artifacts. Edit the source JSON, not these files.
- `audit.json`: heuristic review candidates, not confidence scores or diagnosed audio defects.

Cleanup prompt for an LLM or agent:

> Make a reading edition from these corrected, speaker-labeled passages. Preserve every substantive point, uncertainty, negation, example, joke, and each speaker's wording. Remove only nonsemantic filler, repeated starts, and abandoned fragments. Keep “yeah”, “okay”, “I think”, and “I guess” when they answer, qualify, or express attitude. Do not repair recognition errors through fluent guessing: return an anchored review question instead. Never add or reorder words, combine speakers, add claims, summarize, or make the speaker sound more certain. Return proposed per-turn text plus a reason; preserve turn IDs. Supply recognition corrections separately with audio/model evidence. For titles/headings, select phrases that actually occur and return their source turn and quote. Label any near-verbatim alternative. Keep description copy plain and traceable to specific passages.

## Existing archive cleanup

Use `cleanup_archive.py` for explicitly reviewed deletions in existing Markdown. A JSON list contains `path` (repository-relative), exact whole dialogue `before` and `after` lines, and an editorial `reason`. Dry-run is the default; `--apply` writes after all proposals pass validation. It rejects stale/ambiguous text, changed speakers/timestamps, empty passages, new/reordered words, and changed links. Every other line is preserved, including frontmatter and headings. Preserve the edit list for auditing; applying the same list twice fails rather than deleting more text.

```sh
python3 scripts/transcript-pipeline/cleanup_archive.py reviewed-edits.json
python3 scripts/transcript-pipeline/cleanup_archive.py reviewed-edits.json --apply
```

Candidate searches are only a way to locate passages. Never apply a global filler or repeated-word replacement. “Went to to see Dali” and “where you're at, at what point in time” illustrate legitimate neighboring repetitions. “Really, really”, “no, no”, and repeated acknowledgments can convey emphasis or response. Review the context and the resulting diff, without aiming for a reduction percentage. These checks enforce structural constraints, not semantic fidelity.

Distinguish a restart from a speaker's stance: “if I was- if I were” can become “if I were”, while “I guess” and “I think” can still belong in that same sentence. Keep listening sounds such as “Hm.” when they convey a reaction; the renderer can make them compact without deleting the speaker's personality. Questions such as “Hm?” retain their attributed message treatment.

Remove redundant transcription labels attached to spoken acknowledgments: “Mm-hmm (affirmative).” becomes “Mm-hmm.” Retain actual cues such as “(laughs)” and any uncertainty that matters. Hyphenated responses count as one word for the renderer; do not split or rewrite them to obtain compact presentation.

The owner does not need to adjudicate the full archive flag inventory before reading or publishing a cleaned transcript. Apply obvious, contextually reviewed filler/restart deletions; leave uncertain wording intact. Keep the listening backlog optional and unverified, rather than marking it accepted or filling it with fluent guesses. Ask for listening only when resolving a particular passage matters to the requested work.

Keep three review concerns separate: mechanical integrity, editorial meaning/voice, and audio uncertainty. The agent can handle ordinary cleanup review without requiring the owner to inspect every deletion. A fluent rewrite or agreement between recognizers cannot resolve uncertain audio. Existing model outputs are cached; resolve an uncertain span with a bounded excerpt retry and listening evidence rather than rerunning entire episodes. Keep unresolved issues explicit.

## Verification and limitations

```sh
python3 -m unittest discover -s scripts/transcript-pipeline -v
```

Tests cover reading substitutions/reordering, required correction evidence, conservative speaker joins, preservation of source words/anchors (including removed acknowledgments), isolated-track offsets/overlap, quotation provenance, restored timing, zero-duration timing support, escaped diff HTML, and meaning-cue detection. Export tests also preserve frontmatter bytes and reject lost/colliding anchors before writing. Local HTTP tests exercise audio byte ranges, durable decisions, and rejected stale or invalid saves; they need permission to bind localhost. They do not prove semantic fidelity. The pilot browser reviews also exercise filtering, seeking, raw-mode playback, anchor aliases, and mobile width. All final listening decisions remain explicit rather than being automatically approved by a second model.

## What the first two pilots changed

- **Coverage before cleanup.** Episode 1 lost a quotation in the primary full run. The independent recognizer and speech/gap audit exposed it; an unprompted excerpt recovered it.
- **Meaning before smoothness.** The episode 1 diff review restored eight passages where “yet”, “maybe”, “I guess”, or a scope-changing self-correction deserved to stay. A subsequence-only validator cannot catch those losses.
- **Model agreement is not a verdict.** In episode 2, both full recognizers and a fresh excerpt say “I've never definitely done that before”. The surprising negation stays pending listening.
- **Speaker clusters need local evidence.** Episode 2 split two people into four acoustic clusters, with one cluster drifting between speakers. Do not apply a global name mapping and assume every turn is correct. Published speaker labels can corroborate context, but cannot replace voice verification. A larger streaming memory improved one comparison slightly and left other errors; it is saved as an experiment, not a new default.
- **Study old metadata; draft new metadata later.** Existing titles/descriptions stay intact. Exact phrases are useful for new titles, but distinctiveness and fit to the whole conversation matter more than merely passing a quote check.

The working local stack remains Whisper large-v3-turbo via MLX for timed words, Parakeet Redux as a second recognizer, and Sortformer v2.1 via MLX for provisional speaker segmentation. This is a tested starting point, not a latest-model ranking. Parakeet Ultra and gated pyannote have not been evaluated here. The reading edit is currently an agent-assisted pass using these contracts, not an installed offline LLM or an unattended batch job. The full episode-58 walking draft now exercises long-recording inference and contextual review; its unresolved audio and speaker questions still need listening verification. A real pair of isolated microphone tracks still needs a pilot before processing that part of the backlog.

## Episode 3 iteration

The same settings produced a workable 43:57 draft, with 34 listening questions still open. Short replies were a weak point even when the 30-second model-comparison score looked acceptable. Review handoffs and interjections separately from the gap/window audit; that audit cannot certify completeness. Six unprompted excerpt retries recovered two useful phrases while leaving other candidates unresolved. Do not keep retrying with the published wording as a target.

A second cleanup-diff pass restored 33 words in 11 passages to retain stance and qualification. Contracted-negative cues and separate raw/corrected speaker labels make those decisions easier to inspect. The next validation should change the recording conditions—a walking episode—rather than simply accumulating more similar indoor pilots.

## Listening desk

Open `editor.html` on the episode server for a focused uncertainty queue. It supports passage audio with adjustable context, playback speed/loop, autoplay after advancing, speaker/text edits, selected-phrase flags, pass/skip/rewrite, undo, and keyboard shortcuts (`?`). Original-word selection playback is available only when token counts align; otherwise it plays the passage rather than inventing word timing.

Suggestions autosave in browser storage and, with the current `serve.py`, to `review-decisions.json` beside the episode. Restart older server processes to enable disk saving. Export is also available. Decisions are tied to the audio hashes and review revision; they do not mutate the canonical transcript or resolve pipeline review notes automatically. Reconcile suggestions into explicit edits before reassembly. Pass accepts the corrected draft; typing disables Pass until wording/speaker match again. Skip remains unresolved. Autoplay advances on a decision or navigation, never automatically marks an unheard item accepted. Playback may require an initial user gesture.

Reading punctuation: do not introduce em dashes or double hyphens (`--`, which the renderer turns into em dashes). Use commas for asides, colons for explanations, and ellipses for trailing or interrupted speech. Preserve words and qualifications. Displayed quotations can follow the same punctuation preference without changing their words or attribution; retain raw recognition and original external sources.

Leading acknowledgments: in the reading edition, remove an opening “Yeah.” when more text follows, such as “Yeah. That's amazing.” becoming “That's amazing.” Keep standalone “Yeah.” and comma-led phrases such as “Yeah, no, go ahead.” Apply this only at the start of a speaker's turn, after any canonical anchor markup. Keep internal and quoted occurrences. This is a Markdown reading edit, not a renderer rule; other filler still requires contextual review.

General cleanup principle: cut empty lead-ins when the remaining turn works on its own in the exchange. “Okay. That's funny.” can become “That's funny.” Remove pure “um”/“uh” hesitation and genuinely abandoned repeated starts when the deletion leaves the speaker's wording and intent intact. Keep acknowledgments that accept instructions, signal a physical handoff, or yield the floor when the rest of the turn does not express that. Keep surprise (“Oh”), hesitation or contrast (“Well”), uncertainty (“I think”, “I guess”, “kind of”), and approximating or comparative “like” when they carry the speaker's voice or meaning. Do not use a stop-word list to strip discourse markers throughout a paragraph. When unsure, keep the wording rather than expanding the optional review queue.


## Archive preflight and compact rendering

The full archive cleanup starts with a complete contextual read of every episode, including untimed dialogue. Regex finds candidates; it does not decide deletions or substitute for reading the rest. Record exact before/after dialogue lines and focused listening questions separately. Review deletion diffs for lost negations, qualifications, questions, comparisons, and deliberate emphasis before applying. A damaged phrase stays in the source until listening supplies evidence.

Use the passage-only review page for the owner rather than the older listening desk:

```sh
python3 scripts/transcript-pipeline/archive_review.py experiments/transcript-pilot/reviews/archive-cleanup-2026-09-30
python3 scripts/transcript-pipeline/archive_review_server.py experiments/transcript-pilot/reviews/archive-cleanup-2026-09-30 --port 8792
```

It shows one highlighted phrase, nearby audio, an editable replacement, and optional possible wording. `Space` plays, `R` replays, `Enter` saves and advances, `K` keeps the words, and `S` skips. Context and whole-passage editing stay collapsed. Choices save to `review-decisions.json` and browser storage, tied to the source hash and queue revision. Reconcile accepted choices into the source/correction ledger before rebuilding; saving a choice does not publish it. Skip remains unresolved. Exact reading-turn matches can use retained raw word timings for narrower clips; other clips use existing turn timestamps. Malformed timing uses a labeled neighboring window, while untimed passages remain explicitly untimed.

Keep an emptied acknowledgment's timestamp/speaker line and aliases in website Markdown. The renderer hides its bubble but retains its anchor and the occurrence count for later messages. For assembled pilots, synchronize archive cleanup into `edits.json` as well; avoid a fresh visible-turn export that would renumber existing integer anchors. Titles, descriptions, raw recognition, and audio remain unchanged.

```sh
python3 scripts/transcript-pipeline/audit_archive.py --output experiments/transcript-pilot/reviews/archive-preflight.json
# Or pass selected Markdown paths before --output.
```

Preflight is read-only and checks every season by default, including untimed dialogue. It catches structural defects before editorial cleanup and reports same-second turns separately from errors. Review candidates are not edits or calibrated confidence. Keep the before/after edit ledger next to the episode review. For pipeline-backed episodes, change `edits.json` and reassemble, then synchronize the website source; do not change only a generated `reading.md` or the website copy. Preserve accepted listening decisions and raw/corrected layers during reading cleanup.

A duplicate passage can be removed after comparison, but preserve its old generated suffix anchor as an alias on the retained passage. Never invent timestamp offsets to make overlapping turns look unique. Speaker repairs require local voice evidence; first-person/biographical clues are flags, not proof.

Keep reply density in the renderer with one size rule: one or two words, excluding questions, can attach beneath the preceding bubble. Contractions and hyphenated words count as one. There are no phrase lists or guesses about whether a reply is filler. Mini bubbles retain exact text, speaker side/color, accessible attribution, and playback links; substantive short answers receive the same treatment. Uncertain/third speakers, links, section/prose boundaries, mixed timed/untimed turns, backward timestamps, and pauses over 45 seconds keep visible attribution. Longer replies and same-speaker continuations stay in the main run. Do not merge two speakers in Markdown for visual compactness. Paragraph breaks within a long turn retain its existing timestamp and speaker; use actual topical breaks, not automatic sentence-count splitting. Heading edits preserve their text/aliases and belong at the topic onset. Existing title/description stay unchanged.

The latest source review and exact cleanup ledgers are in `experiments/transcript-pilot/reviews/latest-episodes-2026-09-29/`. Remaining audio questions are in `listening-queue.json`; entries are unverified hypotheses until listening supplies evidence. The Play pilot at `experiments/transcript-pilot/play/` has been exported to `src/content/podcast/season-5/play.md` as a draft transcript; unconfirmed speakers and listening questions remain.

For the normal website preview, export the assembled reading edition into the existing episode body:

```sh
python3 scripts/transcript-pipeline/export_site.py experiments/transcript-pilot/play src/content/podcast/season-5/play.md
bun run build:force
```

This preserves the existing frontmatter and all canonical source anchors, including aliases for removed nods and joined fragments. It records the export hashes in `site-preview.json` and retains a short draft note. Named speaker assignments belong in evidenced `edits.json` corrections; participant identification can establish cluster names, but does not certify every short handoff. Consecutive fragments with the same confirmed speaker can use the existing join operation. Do not delete sentence-bearing pronouns, conjunctions, or completions merely because the diarizer isolated them into one-word turns. Keep unresolved ownership explicit rather than making an incomplete sentence fluent by guessing.

Redux cross-check input is a mono 16kHz PCM16 analysis copy. Its native decoder rejected the full Play MP3's out-of-range float samples; the supported PCM conversion is recorded in inference metrics with original and derivative hashes. The original MP3 is unchanged. Whisper and diarization retain their own raw evidence.

Coincident turns in new runs receive unique `msg-<seconds>-2`, `-3` suffixes while retaining the real word time. Frozen older pilots are not silently regenerated. Play’s first draft exposed ten link collisions; these received an explicit anchor-only migration with a before checkpoint and ledger. No source words/times were altered. Provisional `Speaker N`/unconfirmed labels retain visible ownership in the pilot renderer and never become acknowledgment pills.
