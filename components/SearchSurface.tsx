"use client";

import { forwardRef } from "react";
import { pieces, type Hit, type Range, type Results } from "@/lib/search";

/** Highlighted text — the `hl` helper from the source scene, generalised. */
function Marked({
  text,
  ranges,
  tone,
}: {
  text: string;
  ranges: Range[];
  tone: "cyan" | "magenta";
}) {
  if (!ranges.length) return <>{text}</>;
  return (
    <>
      {pieces(text, ranges).map((p, i) =>
        p.mark ? (
          <mark
            key={i}
            className={tone === "cyan" ? "mark-cyan" : "mark-magenta"}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

function Row({
  hit,
  first,
  onOpen,
  index,
}: {
  hit: Hit;
  first: boolean;
  onOpen: (hit: Hit) => void;
  index: number;
}) {
  const tone = hit.where === "name" ? "cyan" : "magenta";
  return (
    <button
      type="button"
      className="row"
      aria-selected={first}
      style={{ animationDelay: `${index * 55}ms` }}
      onClick={() => onOpen(hit)}
    >
      <span className="row-head">
        <span className="row-name">
          <Marked text={hit.doc.name} ranges={hit.nameRanges} tone={tone} />
        </span>
        <span className="row-tag">{hit.doc.kind}</span>
        <span className="row-meta">{hit.doc.folder}</span>
        {first ? <span className="row-open">open ↵</span> : null}
      </span>
      {hit.snippet ? (
        <span className="row-snippet">
          <Marked text={hit.snippet} ranges={hit.snippetRanges} tone={tone} />
        </span>
      ) : null}
    </button>
  );
}

export interface SurfaceProps {
  /** Stable id so ⌘K and the top bar can find the box without a shared ref. */
  inputId: string;
  value: string;
  results: Results;
  /** True while the timeline still owns the box. */
  demoDriven: boolean;
  placeholder: string;
  /** The demo's opened sheet stands in for the list; do not show both. */
  suppressResults?: boolean;
  onChange: (next: string) => void;
  onTakeOver: () => void;
  onOpen: (hit: Hit) => void;
}

/**
 * The card and its results. In the redesign the results are not an extension of
 * the box — they are a second sheet floating clear of it, so the box keeps its
 * shape whether or not anything matched.
 */
export const SearchSurface = forwardRef<HTMLInputElement, SurfaceProps>(
  function SearchSurface(
    {
      inputId,
      value,
      results,
      demoDriven,
      placeholder,
      suppressResults,
      onChange,
      onTakeOver,
      onOpen,
    },
    ref,
  ) {
    const open = value.trim().length > 0;
    const all = [...results.byName, ...results.byContent];
    const top = all[0];

    return (
      <>
        <div className="surface">
          <div className="surface-bar">
            <svg
              className="surface-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.2"
              />
              <line
                x1="15.4"
                y1="15.4"
                x2="21"
                y2="21"
                stroke="var(--color-accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            <span className="surface-input-wrap">
              <input
                id={inputId}
                ref={ref}
                className={demoDriven ? "surface-input surface-input--demo" : "surface-input"}
                type="text"
                value={value}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                aria-label="Search the sample library"
                onChange={(e) => {
                  onTakeOver();
                  onChange(e.target.value);
                }}
                onFocus={onTakeOver}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && top) {
                    e.preventDefault();
                    onOpen(top);
                  }
                  if (e.key === "Escape" && !demoDriven) onChange("");
                }}
              />
            </span>

            {open && !demoDriven ? (
              <button type="button" className="surface-clear" onClick={() => onChange("")}>
                clear
              </button>
            ) : null}
          </div>
        </div>

        {open ? (
          // Hidden, not unmounted: collapsing the panel would bounce the page
          // twice per loop as the demo's sheet opens and closes.
          <div
            className="results"
            style={suppressResults ? { visibility: "hidden" } : undefined}
          >
            <p className="sr-only" role="status">
              {results.total === 0
                ? "No matches"
                : `${results.total} match${results.total === 1 ? "" : "es"}`}
            </p>

            {results.total === 0 ? (
              <p className="results-empty">
                Nothing in the sample library matches that. Try something you would
                actually half-remember — a place, a year, a turn of phrase.
              </p>
            ) : null}

            {results.byName.length ? (
              <>
                <div className="results-head results-head--name">By file name</div>
                {results.byName.map((hit, i) => (
                  <Row
                    key={hit.doc.id}
                    hit={hit}
                    index={i}
                    first={top?.doc.id === hit.doc.id}
                    onOpen={onOpen}
                  />
                ))}
              </>
            ) : null}

            {results.byContent.length ? (
              <>
                <div className="results-head">Found inside documents</div>
                {results.byContent.map((hit, i) => (
                  <Row
                    key={hit.doc.id}
                    hit={hit}
                    index={results.byName.length + i}
                    first={top?.doc.id === hit.doc.id}
                    onOpen={onOpen}
                  />
                ))}
              </>
            ) : null}
          </div>
        ) : null}
      </>
    );
  },
);
