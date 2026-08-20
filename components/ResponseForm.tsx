"use client";

import { useState } from "react";
import { RECIPIENT_EMAIL } from "@/lib/config";

// The note's five questions, verbatim from Findable_Concept_Note_1.md. Only
// question one carries a follow-up there; the others stand on their own.
const QUESTIONS = [
  {
    n: "Question one",
    q: "Is this a real problem for you, or does your current arrangement work well enough?",
    follow: "An honest “I’m fine” is the most useful answer you can give me.",
    placeholder: "Honestly, I’m fine, because… / Yes — the last time it bit me was…",
  },
  {
    n: "Question two",
    q: "Roughly how many documents are on your computer right now that you could not locate within a minute?",
    follow: "",
    placeholder: "At a guess…",
  },
  {
    n: "Question three",
    q: "Of the features described above, which would actually change how you work — and which would you never use?",
    follow: "",
    placeholder: "Would change how I work:… / Would never use:…",
  },
  {
    n: "Question four",
    q: "What is the one thing that would stop you using it?",
    follow: "",
    placeholder: "The thing that would stop me is…",
  },
  {
    n: "Question five",
    q: "What have I misunderstood about how you actually work?",
    follow: "",
    placeholder: "What you have got wrong is…",
  },
];

export function ResponseForm() {
  const [answers, setAnswers] = useState(() => QUESTIONS.map(() => ""));
  const [status, setStatus] = useState("");

  const filled = answers.some((a) => a.trim().length > 0);

  const compose = () =>
    QUESTIONS.map((q, i) => `${i + 1}. ${q.q}\n\n${answers[i].trim() || "(no answer)"}`).join(
      "\n\n———\n\n",
    );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(compose());
      setStatus("Copied. Paste it into a reply however you normally would.");
    } catch {
      setStatus("Could not reach the clipboard — select the text and copy it by hand.");
    }
  };

  return (
    <section className="questions" id="questions" aria-labelledby="questions-title">
      <p className="kicker">What I’d genuinely like to know from you</p>
      <h2 id="questions-title" className="sr-only">
        What I’d genuinely like to know from you
      </h2>

      <ol className="q-list">
        {QUESTIONS.map((q, i) => (
          <li className="q-item" key={q.n}>
            <p className="q-num">{q.n}</p>
            <p className="q-text">{q.q}</p>
            {q.follow ? <p className="q-follow">{q.follow}</p> : null}
            <label className="sr-only" htmlFor={`answer-${i}`}>
              {q.q}
            </label>
            <textarea
              id={`answer-${i}`}
              className="answer"
              placeholder={q.placeholder}
              value={answers[i]}
              onChange={(e) =>
                setAnswers((prev) => prev.map((a, j) => (j === i ? e.target.value : a)))
              }
            />
          </li>
        ))}
      </ol>

      <div className="reply">
        <div className="reply-actions">
          <button type="button" className="btn btn-primary" onClick={copy} disabled={!filled}>
            Copy my answers
          </button>
          {RECIPIENT_EMAIL ? (
            <a
              className="btn btn-secondary"
              href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
                "Five questions",
              )}&body=${encodeURIComponent(compose())}`}
            >
              Open in email
            </a>
          ) : null}
        </div>
        <p className="reply-status" role="status">
          {status}
        </p>
        <p className="reply-privacy">
          Nothing is sent from this page and nothing is stored. There is no server
          behind it. Copy your answers and reply however you normally would.
        </p>
      </div>
    </section>
  );
}
