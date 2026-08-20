"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { search, type Hit } from "@/lib/search";
import { CYCLES, useDemo } from "@/lib/useDemo";
import { HERO_SEARCH_ID, SUMMON_QUERY_EVENT, summonSearch } from "@/lib/summon";
import { useModKey } from "@/lib/useModKey";
import { useScrolledPastHero } from "@/lib/useScrolledPastHero";
import { SearchSurface } from "./SearchSurface";
import { DocumentSheet } from "./DocumentSheet";

const PLACEHOLDER = "Search the library — a phrase, a place, a year…";

/** How long the overture runs before the demo takes the box over. */
const OVERTURE_MS = 2150;

// The lift is measured before the first paint; on the server there is nothing
// to measure and nothing has painted, so the layout variant is skipped there.
const useMeasure = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The one search box on the page. ⌘K does not open a second one — it scrolls
 * back to this and focuses it, which is also what the top bar's dormant box
 * does. The timeline drives this input until a visitor touches it, and then
 * never again for the rest of the session.
 */
export function HeroSearch() {
  // The overture: a keycap alone on the paper, pressed, and the box bursting
  // out of it. True until it has played — the demo waits for it, and nothing
  // types into a box that is still arriving.
  const [overture, setOverture] = useState(true);
  // null while the timeline owns the box; a string the moment the visitor does.
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [opened, setOpened] = useState<Hit | null>(null);
  const [openedFrom, setOpenedFrom] = useState("");

  const heroRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const liveDemoQuery = useRef("");

  const modKey = useModKey();
  const scrolledPast = useScrolledPastHero();

  const demoActive = !overture && userQuery === null && opened === null && !scrolledPast;
  const demo = useDemo(demoActive);
  liveDemoQuery.current = demo.query;

  const heroQuery = userQuery ?? demo.query;
  const heroResults = useMemo(() => search(heroQuery), [heroQuery]);

  /** Adopt whatever the timeline has typed, so highlights and results survive. */
  const takeOver = useCallback(() => {
    setUserQuery((q) => (q === null ? liveDemoQuery.current : q));
  }, []);

  // The demo's own "Enter opens it" beat.
  const demoOpened: Hit | null = useMemo(() => {
    if (!demo.openId || userQuery !== null) return null;
    return heroResults.byContent[0] ?? heroResults.byName[0] ?? null;
  }, [demo.openId, userQuery, heroResults]);

  // How far the box has to travel from the middle of the screen down to its
  // place in the layout. Measured rather than guessed: it depends on how the
  // headline above it wraps, which depends on the viewport.
  useMeasure(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const lift = Math.round(window.innerHeight / 2 - (rect.top + rect.height / 2));
    wrap.style.setProperty("--summon-lift", `${lift}px`);
  }, []);

  // The overture ends on its own, or the moment a visitor does anything at all —
  // an animation is not a reason to make someone wait for the box they came for.
  useEffect(() => {
    const end = () => {
      document.documentElement.classList.add("intro-skipped");
      setOverture(false);
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      end();
      return;
    }
    const timer = window.setTimeout(() => setOverture(false), OVERTURE_MS);
    document.addEventListener("pointerdown", end, { once: true });
    document.addEventListener("keydown", end, { once: true });
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", end);
      document.removeEventListener("keydown", end);
    };
  }, []);

  // A link in the copy below can summon the box with a query already typed —
  // the note's printed example runs through the same input as everything else.
  // Adopting it as the user's query also takes the timeline off the box.
  useEffect(() => {
    const onQuery = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      if (typeof q === "string") setUserQuery(q);
    };
    document.addEventListener(SUMMON_QUERY_EVENT, onQuery);
    return () => document.removeEventListener(SUMMON_QUERY_EVENT, onQuery);
  }, []);

  // ⌘K / Ctrl-K from anywhere on the page, and Escape to put a document down.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        summonSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock the page behind a real overlay (never behind the demo's inline sheet).
  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const openHit = useCallback(
    (hit: Hit, from: string) => {
      takeOver();
      setOpenedFrom(from);
      setOpened(hit);
    },
    [takeOver],
  );

  const tryExample = () => {
    setUserQuery(CYCLES[0].meaningQuery);
    heroRef.current?.focus({ preventScroll: true });
  };

  const resultsOpen = heroQuery.trim().length > 0;

  return (
    <>
      <div ref={wrapRef} className="surface-wrap summon-box">
        {overture ? (
          <span className="summon-key-slot" aria-hidden="true">
            <kbd className="summon-key">{modKey}</kbd>
          </span>
        ) : null}

        <SearchSurface
          ref={heroRef}
          inputId={HERO_SEARCH_ID}
          value={heroQuery}
          results={heroResults}
          demoDriven={userQuery === null}
          placeholder={PLACEHOLDER}
          suppressResults={demoOpened !== null}
          onChange={(v) => setUserQuery(v)}
          onTakeOver={takeOver}
          onOpen={(hit) => openHit(hit, heroQuery)}
        />

        {demoOpened ? (
          <DocumentSheet
            hit={demoOpened}
            query={heroQuery}
            variant="inline"
            onClose={() => undefined}
          />
        ) : null}
      </div>

      {/* Out of the way while the panel is open — but not while the demo's own
          sheet is up, or the line would blink out once a loop. */}
      <p
        className="hint enter enter-5"
        style={resultsOpen && !demoOpened ? { visibility: "hidden" } : undefined}
      >
        Ten sample documents, searched for real.{" "}
        <span className="hint-keyboard">
          Press <kbd className={demo.cmdPressed ? "kbd kbd--down" : "kbd"}>{modKey}</kbd> from
          anywhere.{" "}
        </span>
        Try{" "}
        <button type="button" className="hint-try" onClick={tryExample}>
          “{CYCLES[0].meaningQuery}”
        </button>
        .
      </p>

      {opened ? (
        <DocumentSheet
          hit={opened}
          query={openedFrom}
          variant="modal"
          onClose={() => setOpened(null)}
        />
      ) : null}
    </>
  );
}
