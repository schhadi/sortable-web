// The redesign has one search box, in the hero. ⌘K and the top bar's dormant
// box do not open a second one — they send you back to the first. Focus is the
// whole mechanism: the input's own onFocus takes the timeline off the box.

export const HERO_SEARCH_ID = "hero-search";

/** HeroSearch listens for this; the detail is a query to adopt as the user's. */
export const SUMMON_QUERY_EVENT = "findable:summon-query";

export function summonSearch(query?: string) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const input = document.getElementById(HERO_SEARCH_ID);
  if (input instanceof HTMLInputElement) input.focus({ preventScroll: true });
  // Guarded by type, not by presence: callers passing this straight to onClick
  // hand it a MouseEvent, which must not end up typed into the box.
  if (typeof query === "string") {
    document.dispatchEvent(new CustomEvent(SUMMON_QUERY_EVENT, { detail: query }));
  }
}
