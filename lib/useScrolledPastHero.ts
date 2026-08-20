"use client";

import { useEffect, useState } from "react";

/**
 * True once the hero is mostly behind you. Two things hang off it: the top bar
 * arrives, and the demo loop stops — a page performing to itself under the fold
 * is just a running animation frame.
 */
export function useScrolledPastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return past;
}
