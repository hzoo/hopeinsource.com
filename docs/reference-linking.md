# Reference Linking Guide

This guide documents the approach for adding reference links to podcast transcripts.

## What to Link

Scan transcripts for:
- **People**: Authors, thinkers, researchers (e.g., Ivan Illich, Brené Brown)
- **Books/Works**: Titles mentioned in conversation (e.g., *Understanding Media*)
- **Concepts/Terms**: Technical or philosophical terms listeners might want to explore (e.g., B2C, Effective Altruism)
- **Events/Conferences**: Named gatherings (e.g., JSConf Last Call, Zeit Day)
- **Films/Media**: Documentaries or cultural references (e.g., *Gattaca*, *Indie Game: The Movie*)

## Formatting

### Inline Links
Use standard markdown directly within dialogue for seamless reading:
```markdown
[11:02] **Henry:** I can't help but bring up [Ivan Illich](https://en.wikipedia.org/wiki/Ivan_Illich)...
```

### Reference Sections
For episodes with many links, add a `### Links` section at the top with categorized bullet points.

### Blockquotes
Reserve for supplementary content *outside* the transcript, like video links or famous quotes:
```markdown
> "Beware of anything..." - [Oswald Chambers](https://...), [It Is the Lord!](https://...)
```

## Source Preference

1. **Wikipedia** — people, concepts, books, films
2. **Official sites** — products, companies, events
3. **Bible Gateway/Goodreads** — biblical references or books without Wikipedia pages

## Workflow

1. Read through the transcript, noting timestamps of linkable items
2. Research and verify URLs
3. Apply inline links, keeping changes minimal
4. Run `npm run build` to verify no broken markdown
5. Update `_refs.md` to track completed work

## Avoid

- Over-linking common terms
- Breaking reading flow with excessive links
- Paywalled or unreliable sources
- Using blockquotes for inline content
