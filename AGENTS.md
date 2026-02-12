# AGENTS.md

## Theory v2: Transcript-First Annotation Lab

### Quick Answers
- Primary artifact: transcript.
- Annotation layer: secondary, anchored to canonical transcript/heading IDs.
- Experiments: allowed by default when intent and rollback are explicit.

<project_theory>
  <metaphor>
    A living group-chat thread with temporal anchors.
  </metaphor>

  <problem>
    Podcast players optimize playback. We optimize understanding.
    Ctrl+F is not enough for relational, concept-level recall.
  </problem>

  <organizing_principle>
    Transcript-first conversation interface.
    Audio/video are optional synchronized lenses.
  </organizing_principle>

  <purpose>
    Build an experimental annotation medium for podcast now,
    extensible to essay/video later.
  </purpose>

  <annotation_stance>
    Layered interpretation. Transcript is primary source.
    Annotations are explicitly secondary.
  </annotation_stance>

  <participation_stance>
    Marginalia culture over heavy forum culture.
    Local, passage-anchored interaction beats global feed discourse.
  </participation_stance>

  <ux_target>
    Beautiful. Quick. Engaging. Elegant.
    Defaults prioritize reading speed and comprehension.
  </ux_target>

  <guardrail_strength>
    Soft defaults, not hard bans.
    Experiments are encouraged with explicit intent and rollback.
  </guardrail_strength>
</project_theory>

## Non-Negotiables (Contracts)
1. Deep-link contract is canonical:
   - `#t=<seconds>`
   - `#msg-<seconds>`
2. Canonical linkability units:
   - Message anchors
   - Heading anchors
3. Annotation payloads must reference canonical anchors; no free-floating annotation objects.
4. Transcript cleanup boundary:
   - Remove disfluency/filler only
   - No paraphrase
   - No added claims
   - No speaker drift

## Working Defaults
1. Optimize readability and speed of comprehension over ornamentation.
2. Prefer quiet motion and comfortable reading density.
3. Avoid duplicate chrome by default.
4. Preserve stable linkability for each meaningful unit.
5. Any deviation is an experiment and must include the full protocol below.

## Experiment Protocol (Required)
1. Hypothesis
2. Affected surface
3. Success signal
4. Rollback condition

## Current Scope
- Frontend iteration on homepage/episode reading experience.
- No backend/auth/comment-system changes in this phase.
- No transcript reprocessing run in this phase.

## Contributor Checklist
1. Does this advance transcript-first annotation theory?
2. Is transcript readability improved or unchanged?
3. Are anchor contracts preserved (`#t`, `#msg-*`)?
4. Is any extra chrome introduced, and is it justified?
5. If this is a deviation, is the full experiment protocol present?

## PR Template
```md
Experiment:
- Hypothesis:
- Affected surface:
- Success signal:
- Rollback condition:
```
