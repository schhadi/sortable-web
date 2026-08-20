"use client";

import { useState } from "react";
import { PRICE, RECIPIENT_EMAIL } from "@/lib/config";

const QUESTIONS = [
  {
    n: "Question one",
    q: `Would you spend ${PRICE} of your own money on this?`,
    follow: "If not, what is it worth? A number is more useful to me than a compliment.",
    placeholder: "Yes, because… / No, and here is what I would actually pay…",
  },
  {
    n: "Question two",
    q: "What is the one thing that would stop you using it?",
    follow: "Not a list. The one thing.",
    placeholder: "The thing that would stop me is…",
  },
  {
    n: "Question three",
    q: "What have I misunderstood about how you actually work?",
    follow:
      "Assume I have got something wrong about your day, your files, or your habits. What is it?",
    placeholder: "What you have got wrong is…",
  },
];

export function ResponseForm() {
  const [answers, setAnswers] = useState(["", "", ""]);
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
      <p className="kicker">Three questions</p>
      <h2 id="questions-title" className="sr-only">
        Three questions
      </h2>

      <ol className="q-list">
        {QUESTIONS.map((q, i) => (
          <li className="q-item" key={q.n}>
            <p className="q-num">{q.n}</p>
            <p className="q-text">{q.q}</p>
            <p className="q-follow">{q.follow}</p>
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
                "Three questions",
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
