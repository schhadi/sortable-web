"use client";

import { useEffect, useState } from "react";
import { BRAND, PRICE } from "@/lib/config";
import { summonSearch } from "@/lib/summon";
import { useModKey } from "@/lib/useModKey";

/**
 * Absent for the whole of the hero, then it slides in — so the first screen is
 * the search box and nothing else, and the rules of the old masthead only print
 * once there is a page above you to go back to.
 */
export function TopBar() {
  const [shown, setShown] = useState(false);
  const modKey = useModKey();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={shown ? "topbar topbar--shown" : "topbar"}>
      <div className="topbar-row">
        <a className="topbar-brand" href="#top">
          {BRAND}
        </a>

        <button type="button" className="topbar-search" onClick={summonSearch}>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.4"
            />
            <line
              x1="15.4"
              y1="15.4"
              x2="21"
              y2="21"
              stroke="var(--color-accent)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="topbar-search-label">Search the library…</span>
          <kbd className="kbd">{modKey}</kbd>
        </button>

        <nav className="topbar-nav" aria-label="Sections">
          <a href="#idea">The idea</a>
          <a href="#price">{PRICE}</a>
        </nav>
      </div>
    </div>
  );
}
