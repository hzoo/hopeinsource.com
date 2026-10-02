# Focused timestamp review

October 2, 2026. The four backward transitions identified by the site audit were checked with local Whisper large-v3-turbo, Parakeet Redux, and Phonon-2. Short windows were expanded when the labeled time did not contain the expected passage. This is model-derived timing evidence, without a human listening sign-off or a full archive alignment. Recognition was unprompted; existing transcript words, speakers, titles, and descriptions were retained, apart from one exact duplicated paragraph.

## Corrections

Time labels use whole seconds near the first retained source words. False starts or fillers absent from the published passage do not determine its start. Old message IDs remain aliases inside the same passage.

| Episode / passage | Previous label | Updated label | Preserved ID |
| --- | --- | --- | --- |
| Motivation: “I've had people” | 11:54 | 11:07 | `msg-714` |
| Motivation: maintainer/public question | 12:16 | 11:26 | `msg-736` |
| Motivation: “And I saw” | 12:33 | 11:45 | `msg-753` |
| Speedrunning: “I would say most people” | 20:41 | 21:00 | `msg-1241` |
| Speedrunning: open-source comparison | 21:55 | 21:16 | `msg-1315` |
| Speedrunning: quantity versus quality | 22:09 | 21:32 | `msg-1329` |
| Speedrunning: decentralization | 1:23:33 | 1:24:58 | `msg-5013` |
| Speedrunning: pendulum response | 1:24:00 | 1:25:27 | `msg-5040` |
| Speedrunning: closing questions/thanks | 1:24:13 | 1:25:45 | `msg-5053` |
| Speedrunning: guest thanks | 1:24:22 | 1:25:52 | `msg-5062` |
| Speedrunning: online question | 1:24:20 | 1:25:56 | `msg-5060` |
| Speedrunning: online answer | 1:24:25 | 1:26:00 | `msg-5065` |
| Speedrunning: final thanks | 1:25:05 | 1:26:43 | `msg-5105` |
| Speedrunning: guest farewell | 1:25:06 | 1:26:45 | `msg-5106` |

Illich's limits paragraph appears once in the recognized sequence at approximately 24:47, followed by the Weil paragraph around 25:06 and the “instead of imagining” paragraph around 25:33. Remove its identical second copy and preserve `msg-1533` as an alias on the retained `msg-1487` passage. The distinct later paragraph retains `msg-1533-2` at 25:33 through an explicit message-ID marker. No one-second timestamp adjustment was invented to work around the occurrence suffix.

Time hashes and message aliases have different destinations here: `/illich#t=1533` seeks and scrolls to the actual 25:33 passage; `/illich#msg-1533` points to the retained limits paragraph at 24:47.

## Evidence and limits

The checks use the original Motivation pilot recording and the episode's public Speedrunning and Illich recordings. The [evidence ledger](timestamp-evidence.json) retains clip hashes/offsets, selected phrase timings, model versions, raw-output hashes, and the exact source edit list. Full raw outputs and analysis-copy provenance were saved separately before source editing. Whisper used `mlx-whisper==0.4.3` with word timestamps, temperature zero, no initial prompt, and no previous-text conditioning. Redux used the existing cached ternary weights through `mlx-audio==0.5.7`. Phonon-2 used `fermion-research==0.2.7`, the verified five-value checkpoint, greedy decoding, and JSON word timestamps; no hotwords were supplied. Motivation's initial “I think” is a lower-confidence turn onset: longer clips misrecognize it, while an unchanged short cached excerpt recognizes it near 11:26. The source words stay intact.

The original Speedrunning closing window at 1:24:08 contains the earlier Speed Demos Archive discussion. Its actual closing remarks occur after 1:25:45. Timing drift also affects neighboring passages outside the changes above: the “But it's really about finding that value” paragraph starts around 20:17 rather than 20:56. This needs a separate full-episode timing alignment; fixing one preceding label alone would introduce another backward transition. This pass does not certify every remaining time label.

Whisper and Phonon-2 disagree on some false-start and acknowledgment boundaries, and Phonon-2 omitted words from the Illich window despite reporting no token-budget truncation. Their recognized wording was not substituted into the transcript. Word error benchmarks do not measure timestamp accuracy or establish speaker ownership.

Verification passed: 65 Bun tests, 48 Python tests, TypeScript and Astro checks, the full build/site validator, and a comparison retaining every original ID across all 66 pages. The complete archive audit reports zero backward transitions. Browser checks verified the distinct Illich time/message destinations and Speedrunning's old closing link, including 320-pixel width without horizontal overflow. Production remains subject to the previously requested iPhone Safari check.
