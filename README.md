# Findable — concept note

A one-page Next.js site in four scenes. The first is a search box and nothing
else: it demonstrates searching a research library by what you remember of a
document rather than by its filename. The three below it state the idea, state
the price, and invite the reader to argue with both.

```bash
npm run dev
```

Read `NOTES.md` before sending this to anyone — it lists the placeholders that
still need decisions, and the one thing the redesign took away.

## Where things are

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The four scenes: hero, the idea, the price, the coda |
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
| `components/ResponseForm.tsx` | The three questions — **not mounted.** See `NOTES.md` |
