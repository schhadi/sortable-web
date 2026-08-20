"use client";

import { useEffect, useRef, useState } from "react";
import { typed } from "./easing";

// ─────────────────────────────────────────────────────────────────────────────
// The source design is a looping four-scene composition — Summon (⌘K), TypeFile,
// TypeMeaning, Open — rendered as a pure function of one authored time axis.
// That model is kept here exactly: T advances, and every visible thing is
// derived from it. What changed is the destination — instead of driving a mock
// search, T drives the REAL search box, so the demo and the product are the
// same code path. The moment a visitor types, T is abandoned for good.
// ─────────────────────────────────────────────────────────────────────────────

interface Cycle {
  /** Scene "TypeFile": a name you half-remember. */
  fileQuery: string;
  /** Scene "TypeMeaning": a phrase from inside a document. */
  meaningQuery: string;
}

export const CYCLES: Cycle[] = [
  { fileQuery: "thompson", meaningQuery: "condescension of posterity" },
  { fileQuery: "berlin archive", meaningQuery: "field research in Germany, 2014" },
];

const CUES = {
  summon: 0,
  typeFile: 1.35,
  clear: 6.4,
  typeMeaning: 7.1,
  open: 12.1,
  close: 16.4,
  end: 17.6,
};

export interface DemoState {
  /** Live, so it can be handed straight to the input's value. */
  query: string;
  /**
   * The Summon beat. The source animation floated a ⌘/K keycap in empty space;
   * a web page already prints the shortcut in its hint line, so the beat presses
   * that instead — no floating overlay to collide with the copy.
   */
  cmdPressed: boolean;
  /** Id of the document the demo "opened" with Enter. */
  openId: string | null;
}

const IDLE: DemoState = {
  query: "",
  cmdPressed: false,
  openId: null,
};

function frame(T: number, cycle: Cycle): DemoState {
  const kbdAt = CUES.summon + 0.35;

  let query: string;
  if (T < CUES.typeFile) query = "";
  else if (T < CUES.clear) query = typed(T, CUES.typeFile, cycle.fileQuery);
  else if (T < CUES.typeMeaning) {
    // Backspaced out rather than flashed-and-cleared: an unfocused field cannot
    // honestly show a selection, and deletion reads as clearing just as well.
    const gone = Math.floor((T - CUES.clear) * 26);
    query = cycle.fileQuery.slice(0, Math.max(0, cycle.fileQuery.length - gone));
  } else if (T < CUES.close) query = typed(T, CUES.typeMeaning, cycle.meaningQuery);
  else query = "";

  return {
    query,
    cmdPressed: T >= kbdAt + 0.3 && T < kbdAt + 0.75,
    openId: T >= CUES.open + 0.75 && T < CUES.close ? "__top__" : null,
  };
}

/**
 * @param active false once the visitor takes the box over — the loop stops for
 *               the rest of the session and never steals focus back.
 */
export function useDemo(active: boolean) {
  const [state, setState] = useState<DemoState>(IDLE);
  const raf = useRef<number | null>(null);
  const started = useRef<number | null>(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setState(IDLE);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // No loop: show the end state of the interesting scene, statically.
      setState({
        ...IDLE,
        query: CYCLES[0].meaningQuery,
      });
      return;
    }

    const tick = (now: number) => {
      if (started.current === null) started.current = now;
      let T = (now - started.current) / 1000;
      if (T >= CUES.end) {
        started.current = now;
        T = 0;
        cycleRef.current = (cycleRef.current + 1) % CYCLES.length;
      }
      setState(frame(T, CYCLES[cycleRef.current]));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      started.current = null;
    };
  }, [active]);

  return state;
}
