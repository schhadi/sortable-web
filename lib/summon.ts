// The redesign has one search box, in the hero. ⌘K and the top bar's dormant
// box do not open a second one — they send you back to the first. Focus is the
// whole mechanism: the input's own onFocus takes the timeline off the box.

export const HERO_SEARCH_ID = "hero-search";

export function summonSearch() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const input = document.getElementById(HERO_SEARCH_ID);
  if (input instanceof HTMLInputElement) input.focus({ preventScroll: true });
}
