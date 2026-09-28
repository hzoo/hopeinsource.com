# Transcript curation

`src/lib/home-lab-curation.ts` preserves episode-level assertions, open questions, and vocabulary with canonical timestamps. These are data for future metadata, search, and passage-level annotations; they no longer generate separate homepage routes.

`src/lib/home-moments.ts` holds the shorter verbatim sentences shown on the homepage. Each item links to its original `#msg-<seconds>` transcript message. Keep text exact to the transcript; a short excerpt may omit surrounding sentences but must not paraphrase, add claims, or change the speaker. The homepage chooses one focal sentence at random on load and places other episodes around it.

To curate another moment, read the source transcript, choose a sentence that works on its own, record its speaker and timestamp in seconds, and check the resulting message link. If a transcript line needs cleanup, only remove disfluency or filler under the project transcript contract.

The older `assertion`, `openLoop`, and `lexicon` fields remain available for metadata work. Their `at` and `anchors` values are seconds into the episode. Any future public excerpt derived from them should be checked against the canonical transcript before display.
