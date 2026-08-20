# Findable — concept note

A one-page Next.js site carrying the concept note in `Findable_Concept_Note_1.md`.
The first scene is the note's title page over a live search box: it demonstrates
searching a research library by what you remember of a document rather than by
its filename. Below it, the note in full — the problem, what it is, the
ten-feature grid, the two promises, who it's for, the price, and the five
questions the note exists to ask.

```bash
npm run dev
```

Read `NOTES.md` before sending this to anyone — it lists the placeholders that
still need decisions.

## Where things are

| Path | What it is |
| --- | --- |
| `Findable_Concept_Note_1.md` | The note itself — the source of the page's copy |
| `app/page.tsx` | The scenes: hero, problem, what it is, features, promises, who it's for, price, coda |
| `app/globals.css` | Broadsheet design tokens, ported from the design project |
| `lib/config.ts` | Brand name, price, reply address — all the placeholders |
| `lib/corpus.ts` | The ten sample documents. **Swap for the recipient's field.** |
| `lib/search.ts` | Name matching, content matching, snippet carving |
| `lib/useDemo.ts` | The four-scene timeline, ported from the animation |
| `lib/summon.ts` | ⌘K and the top bar both send focus back to the one box |
| `components/TopBar.tsx` | Arrives once the hero is behind you |
| `components/HeroSearch.tsx` | Wires the demo, the box and ⌘K together |
| `components/SearchSurface.tsx` | The card and the floating result panel |
| `components/DocumentSheet.tsx` | The opened document, inline and as a modal |
| `components/ResponseForm.tsx` | The note's five questions, with the copy-answers flow |
| `components/SummonLink.tsx` | Inline link that summons the box with a query pre-typed |
