"use client";

import type { ReactNode } from "react";
import { summonSearch } from "@/lib/summon";

/**
 * An inline link in the running copy that sends the reader back to the one
 * search box — optionally with a query already typed, so the note's printed
 * example runs through the same input as everything else.
 */
export function SummonLink({ query, children }: { query?: string; children: ReactNode }) {
  return (
    <button type="button" className="copy-try" onClick={() => summonSearch(query)}>
      {children}
    </button>
  );
}
