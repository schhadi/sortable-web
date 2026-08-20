"use client";

import { useEffect, useRef } from "react";
import { bodyRanges, pieces, type Hit } from "@/lib/search";

/**
 * The payoff beat from the source animation's "Open" scene: the sheet lifts off
 * the page, the matched sentence stays lit, and the page number says where you
 * landed. Read-only — closing is the only thing it does.
 */
export function DocumentSheet({
  hit,
  query,
  onClose,
  variant,
}: {
  hit: Hit;
  query: string;
  onClose: () => void;
  /**
   * "modal" is a visitor opening a document. "inline" is the demo's own open
   * beat: the sheet lifts over the search box only — a looping hero has no
   * business dimming the whole page every seventeen seconds.
   */
  variant: "modal" | "inline";
}) {
  const interactive = variant === "modal";
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!interactive) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [interactive, onClose]);

  const ranges = bodyRanges(hit.doc.body, query);

  const sheet = (
      <article
        className={interactive ? "doc" : "doc doc--inline"}
        role={interactive ? "dialog" : undefined}
        aria-modal={interactive ? true : undefined}
        aria-label={interactive ? hit.doc.name : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="doc-head">
          <h3 className="doc-title">{hit.doc.name}</h3>
          <span className="doc-pages">
            {hit.doc.pages === 1 ? "1 page" : `${hit.doc.pages} pages`}
          </span>
          {interactive ? (
            <button ref={closeRef} type="button" className="doc-close" onClick={onClose}>
              close esc
            </button>
          ) : null}
        </header>

        <div className="doc-body">
          {pieces(hit.doc.body, ranges).map((p, i) =>
            p.mark ? (
              <mark key={i} className="mark-magenta" style={{ animationDelay: `${i * 40}ms` }}>
                {p.text}
              </mark>
            ) : (
              <span key={i}>{p.text}</span>
            ),
          )}
        </div>

        <p className="doc-jump">
          {hit.where === "content"
            ? `Jumped to the matching page — page ${hit.page} of ${hit.doc.pages}.`
            : `Opened from the file name — ${hit.doc.folder}.`}
        </p>
      </article>
  );

  if (!interactive) return <div aria-hidden="true">{sheet}</div>;
  return (
    <div className="doc-backdrop" onClick={onClose}>
      {sheet}
    </div>
  );
}
