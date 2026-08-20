# Internal notes — not for the recipient

Nothing in this file is rendered on the page. It records the choices behind the
note, and the questions those choices leave open.

## Carried over from the brief

- **"Findable" is a placeholder name, not a recommendation.** Check trademark
  availability before using it anywhere real. It is set in one place —
  `BRAND` in `lib/config.ts` — so it can be changed everywhere at once.
- **€79 is stated as a fact rather than asked as a question,** because "would
  you pay something?" produces polite yes-answers and a concrete number
  produces a real reaction. The page says "It costs €79." flat, followed by
  "A statement, not an opening bid."
- **The example quote is E. P. Thompson,** chosen so a humanities reader
  recognises the register immediately. **Swap it — and the rest of the sample
  library — for material from the recipient's own field before sending.** It
  materially increases the chance they picture their own shelves. Everything
  lives in `lib/corpus.ts`; the two demo queries that must keep working are in
  `CYCLES` at the top of `lib/useDemo.ts`.
- **Question one explicitly invites rejection.** Validation notes that only
  permit enthusiasm collect nothing. The single most valuable outcome of this
  note is a well-argued "I don't need this."
- **The word "AI" appears nowhere** — not in the copy, not in the metadata, not
  in the demo. Deliberate: in humanities departments it currently costs more
  credibility than it buys. Its neighbours are avoided too — no "semantic", no
  "model", no "intelligent". Keep it that way when editing.

## Judgement calls made while building — worth a second look

- **"A well-argued 'I don't need this' is worth more than a yes" was moved onto
  the page.** In the brief this was an internal justification for question one.
  It is on the page because the invitation to reject works better stated than
  implied. If it reads as fishing for humility, cut it — it is the last block
  before the colophon and removing it costs nothing.
- **€79 per what?** The brief fixes the number but not the unit. One payment?
  A year? Per device? It is the first thing a recipient will ask, and answers
  to question one will be muddier without it. Left exactly as specified —
  but decide before sending.
- **Where the documents go is unaddressed.** For this audience — unpublished
  work, embargoed archives, permissions that name a single researcher — "does
  anything leave my machine?" is the likeliest answer to question two. The note
  is currently silent, so question two will surface it. That is arguably the
  right outcome for a validation note: let them raise it rather than
  pre-empting it. But it is silence by choice, not by oversight.
- **No reply address is baked into the page.** `RECIPIENT_EMAIL` in
  `lib/config.ts` is empty on purpose — filling it in publishes an address to
  every scraper that reads the page. Empty, the response block offers "copy
  answers" only. Set it if the page will only ever be sent privately.
- **Nothing is collected.** The three answer fields are local state and there is
  no server. If you want answers to arrive on their own, that is a real
  decision with real consequences (a backend, a privacy line that means
  something) — not a small addition.

## The redesign — and the one thing it removes

Source: the `Findable Redesign.dc.html` project. It keeps the Broadsheet
palette, the serif and the search behaviour verbatim, and changes the frame:
one scrolling column becomes four full-height scenes (hero, the idea, the
price, the coda), the search box lifts off the page as a card with its results
floating clear beneath it, and the masthead is replaced by a bar that only
arrives once the hero is behind you.

- **The three questions are gone.** The redesign has no response form, no
  reply address and no mechanism of any kind for sending an answer back — only
  the coda's standing invitation to argue. That is a real loss for a note whose
  entire purpose is to collect three answers, and it is the first thing to
  reconsider before this is sent. `components/ResponseForm.tsx` is still in the
  tree and its CSS is still in `app/globals.css`, marked dormant, so restoring
  it is one import in `app/page.tsx` and one `<ResponseForm />` between the
  price scene and the coda. `RECIPIENT_EMAIL` and the copy-answers flow are
  untouched.
- **The price is now its own scene**, set at `clamp(4.5rem, 16vw, 12rem)` and
  printed slightly out of register in the two process accents. It is stated
  before the reader is asked anything, which is the same argument as before —
  a concrete number produces a real reaction — made louder.
- **⌘K no longer opens a second search box.** There was a spotlight overlay; now
  the shortcut scrolls back to the hero and focuses the one box that exists. The
  top bar's search box is dormant for the same reason: it is a way back, not a
  second field. `lib/summon.ts` is the whole mechanism.
- **The demo loop stops once you scroll past the hero**, in addition to stopping
  permanently on first contact. A page performing to itself under the fold is
  just a running animation frame.
- **`DATELINE` in `lib/config.ts` is now unused** — the masthead that printed it
  is gone.

**The page opens with an overture.** Four beats, about 2.4 seconds: a ⌘K
keycap alone in the middle of an empty screen; the keycap is pressed; the
search box bursts out of where it stood and holds at the centre of the
viewport, the only thing on the page; then it descends into its place in the
layout and the headline rises into the room it leaves. This is the source
animation's "Summon" scene, which the first port had dropped — the design's own
note says the beat existed because a web page already prints the shortcut in
its hint line. It now does both: the overture presses a keycap, and the demo
loop presses the printed one a moment later.

Three things it has to get right:

- **The keycap is `position: fixed`, the box's hold is measured.** The keycap
  is on screen before React hydrates, so its centring cannot depend on
  JavaScript — anchored to the box it would appear low and then jump. Fixed to
  the viewport, it is centred from the first painted frame. The box's hold
  position is a different problem: the distance from its place in the layout up
  to the centre of the screen depends on how the headline above it wraps, so it
  is measured on mount into `--summon-lift`. Safe, because the box is invisible
  for the first 0.72s — long after hydration. Unset, both degrade to a pop in
  place.
- **The words wait for the box to land.** An earlier cut had them rising while
  the box was still descending, and a glass pane sliding down through the
  subheading reads as a collision rather than a settle.
- **It is skippable and it is skipped.** Any pointerdown or keydown ends it
  immediately (`.intro-skipped` on the root collapses every delay), and
  `prefers-reduced-motion` never plays it at all. The demo loop does not start
  until the overture is over — nothing types into a box that is still arriving.

While removing the machinery behind an earlier version of this, `isolation:
isolate` came off `.hero-stage`. It was left over from a background wash that
did not survive, and it was scoping the opened document's `z-index: 40` inside
the hero — which would have let the top bar paint over an open document.

**The search chrome is glass, the documents are not.** The redesign's search
box was a flat paper card at a 6px radius, which read as a form field rather
than as a search surface. It is now a pane held above the paper: an 18px
radius, a translucent fill, a specular white line along the top edge, an ink
hairline around it, and a shadow far enough below to say how high it sits. The
result panel and the top bar's dormant box are the same material. An opened
document stays opaque paper — the rule is that chrome is glass and content is
not, so the two never read as the same object.

The tint inside each pane — cyan entering top-left, magenta leaving
bottom-right — is `--glass-tint`, and it is the misregistration gesture from
the price scene at a whisper. It sits *inside* the pane, clipped by its own
radius, rather than as a wash on the page behind it: the first attempt put the
bloom on the page and it showed as a stain across the hero the moment the
result panel closed. `backdrop-filter` still does real work wherever a pane
actually overlaps content — the result panel over the sections below, the top
bar over everything.

The focus ring moved from the input to the pane (`:focus-within`), because a
rectangle drawn around the text inside a rounded card was itself part of what
looked like a form. The input's own outline is suppressed, so the pane's ring
is the only focus indicator and its inner edge is a solid accent hairline
rather than a tint — #0088b0 against the page clears 3:1.

One lever was deliberately not pulled: the interface is still set in the serif.
Broadsheet is explicit that the serif *is* the chrome, and a sans in the search
field would modernise it further at the cost of the system's central rule.

Two things were changed rather than copied, both because the design's own
version breaks outside Chrome:

- **The scroll-driven reveals are behind `@supports (animation-timeline:
  view())`.** Unguarded, the same declarations settle on their END frame in
  Safari and Firefox — which for the price's `drift` means a permanent 40px
  offset rather than a parallax. Guarded, those browsers simply show the
  content in place.
- **`prefers-reduced-motion` cuts them at the root.** Scroll-driven animations
  take their progress from the scroller, so the blanket `animation-duration`
  override does not reach them. Smooth scrolling and scroll snapping are
  switched off there too.

Two responsive decisions the design does not specify: the top bar's nav links
are hidden below 44rem (the search shortcut earns the space, two anchors do
not), and the result panel is capped shorter on narrow screens so the whole of
it stays above the fold.

## What the design port did and did not keep

Source: the `Spotlight Search Animation.dc.html` project — a looping 9:16
composition in four scenes (Summon, TypeFile, TypeMeaning, Open) rendered as a
pure function of one authored time axis.

Kept:
- The Broadsheet tokens verbatim (`app/globals.css`) — paper, ink, the two
  process accents, the spacing and radius scales, the shadow set.
- The four-scene structure and its cue timings (`lib/useDemo.ts`).
- The two-part search idea the animation exists to show: names first in cyan,
  then "Found inside documents" in magenta, with the highlighter sweeping
  across each matched word.
- The masthead's thick-thin rule pair, and rules nowhere else.

Changed on purpose:
- **The timeline drives the real search box.** In the source it animated a
  mock. Here `T` is typed into the actual input, so the demo and the product
  are one code path — the results on screen are genuinely computed.
- **The demo yields permanently on first contact.** Focus, a keystroke or a
  click and the loop stops for the session. It never takes focus back.
- **The "Enter opens it" beat renders over the search box, not over the page.**
  A full-screen dim every seventeen seconds is fine in a video and hostile on
  a home page.
- **No drawn caret.** The source drew one because it had no real input; a
  blinking caret in an unfocused field misreports focus.
- **`prefers-reduced-motion` stops the loop** and shows the second query's
  result state statically.
