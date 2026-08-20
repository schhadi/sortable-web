import type { ReactNode } from "react";
import { HeroSearch } from "@/components/HeroSearch";
import { ResponseForm } from "@/components/ResponseForm";
import { SummonLink } from "@/components/SummonLink";
import { TopBar } from "@/components/TopBar";
import { BRAND, PRICE } from "@/lib/config";

// The note's feature list, verbatim from Findable_Concept_Note_1.md.
const FEATURES: Array<{ title: string; body: ReactNode }> = [
  {
    title: "Reads everything, moves nothing",
    body: (
      <>
        It looks at what’s already on your disk — PDFs, Word documents, PowerPoint
        decks, notes — without relocating, renaming, or restructuring a single
        file. Your folders stay exactly as they are; it just gets to know them.
      </>
    ),
  },
  {
    title: "Restores the identity your files have lost",
    body: (
      <>
        For every document, it works out the real title, author, year, and
        publisher — even when the file itself carries no useful clues. It checks
        a DOI or ISBN if one is hiding anywhere in the text, reads the embedded
        document metadata, looks at the title and copyright pages, and —
        critically — pays attention to where you filed it. A PDF sitting in a
        folder called “Habilitation/Chapter3/sources” is treated as evidence,
        not ignored.
      </>
    ),
  },
  {
    title: "Handles books, not just articles",
    body: (
      <>
        Most tools in this space were built for journal articles with a DOI.
        This one is built to also handle monographs, edited volumes, chapters,
        and old scans — the material humanities and social-science shelves are
        actually made of — by checking library catalogues, not just publisher
        databases.
      </>
    ),
  },
  {
    title: "Understands your own work too",
    body: (
      <>
        Drafts, slide decks, grant applications, lecture notes — it reads their
        embedded metadata and clusters the different versions of the same
        document (<em>_v3</em>, <em>_final</em>, <em>_JS_comments</em>) into one
        coherent history, so you can see how something evolved instead of
        hunting through a pile of near-duplicates.
      </>
    ),
  },
  {
    title: "Connects your work to your library",
    body: (
      <>
        Because it reads both your own documents and the literature you’ve
        collected, it can answer things no single reference manager can: which
        of your lectures cite this paper, what you cited the last time you
        revised this grant, or every slide deck where you used a particular
        figure.
      </>
    ),
  },
  {
    title: "Reads the scans, too",
    body: (
      <>
        Image-only PDFs — the photocopied chapter, the book scan with no text
        layer — get processed so their titles, authors, and eventually their
        full text become searchable, instead of sitting invisible to every
        search you run.
      </>
    ),
  },
  {
    title: "Finds a half-remembered sentence",
    body: (
      <>
        Search works the way memory does: type a fragment of a quote, a phrase
        you remember roughly, or a name, and it finds the document — with the
        exact page and paragraph attached, not just a file in a list.
      </>
    ),
  },
  {
    title: "Shows you why each result matched",
    body: (
      <>
        Every result is labelled — quote match, title match, cited in your
        draft, related by topic — so the list never feels arbitrary. You can
        tell at a glance whether it found the exact words or just something
        related.
      </>
    ),
  },
  {
    title: "Surfaces duplicates you didn’t know you had",
    body: (
      <>
        Because it’s already looking closely at every file, it notices when you
        have the same paper saved four times under four different names — and
        tells you, without deleting anything itself.
      </>
    ),
  },
  {
    title: "Gets smarter with every correction",
    body: (
      <>
        When you correct a match — this chapter, not that one — it remembers,
        and that correction improves how it reads the rest of that folder. The
        more you use it, the better it understands your particular library.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <TopBar />

      <main>
        {/* Scene one: the note's title page, with the one search box under it. */}
        <section id="top" className="hero">
          <div className="hero-stage">
            <p className="kicker enter">Concept note — feedback copy</p>
            <h1 className="enter enter-2">{BRAND}</h1>
            <p className="hero-sub enter enter-3">
              Every document you own, searchable by a half-remembered sentence.
            </p>

            <HeroSearch />
          </div>

          <div className="hero-cue-wrap">
            <a className="hero-cue enter enter-6" href="#problem">
              <span>The problem</span>
              <span className="hero-cue-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </section>

        <div className="column">
          <section id="problem" className="scene copy" aria-labelledby="problem-title">
            <p className="kicker reveal reveal-a">The problem</p>
            <h2 id="problem-title" className="reveal reveal-b">
              Open your Downloads folder.
            </h2>
            <p className="copy-lede reveal reveal-c">
              How many files are called <em>sdarticle_2.pdf</em>,{" "}
              <em>Full&nbsp;text&nbsp;(3).pdf</em>, or <em>1-s2.0-S030438.pdf</em>?
            </p>
            <div className="copy-body reveal reveal-d">
              <p>
                How many book scans have no title on them? How many of your own
                drafts are called <em>chapter3_v7_FINAL.docx</em>?
              </p>
              <p>
                <strong>
                  You know these documents. You read them, annotated them, taught
                  from them. You simply cannot find them again.
                </strong>
              </p>
              <p>
                Reference managers help — but only with what you remembered to
                file, and mostly only with journal articles. They don’t know about
                the book chapter a colleague emailed you, the scan without a cover
                page, the seminar slides you made four years ago, or the grant
                application you’d like to reuse.
              </p>
            </div>
          </section>

          <section id="what" className="scene copy" aria-labelledby="what-title">
            <p className="kicker kicker--cyan reveal reveal-a">What it is</p>
            <h2 id="what-title" className="reveal reveal-b">
              A small application that sits on your own computer.
            </h2>
            <div className="copy-body reveal reveal-c">
              <p>
                It reads everything you already have — articles, books, chapters,
                Word documents, slides — and works out what each one actually is:
                real title, real author, real year, real publisher. Then it lets
                you find any of it by typing a fragment you half-remember.
              </p>
              <p>
                The way you find a song on Spotify by typing a scrap of the lyric.{" "}
                <strong>You don’t need the title. You need the bit you remember.</strong>
              </p>
              <p>
                The box at the top of this page is that search, running for real
                on ten invented documents. Try{" "}
                <SummonLink query="moral economy of the crowd">
                  “moral economy of the crowd”
                </SummonLink>
                .
              </p>
            </div>
          </section>

          <section id="does" className="scene scene--flow" aria-labelledby="does-title">
            <p className="kicker reveal reveal-a">What it actually does</p>
            <h2 id="does-title" className="sr-only">
              What it actually does
            </h2>
            <div className="features reveal reveal-b">
              {FEATURES.map((f) => (
                <div className="feature" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="promises"
            className="scene scene--flow"
            aria-labelledby="promises-title"
          >
            <p className="kicker kicker--cyan reveal reveal-a">Two promises</p>
            <h2 id="promises-title" className="sr-only">
              Two promises
            </h2>
            <div className="promises reveal reveal-b">
              <div className="promise promise--cyan">
                <h3>It never moves or renames anything</h3>
                <p>
                  Your folders stay exactly as they are. It reads them for clues —
                  where you filed something already tells it a great deal — but it
                  does not reorganise your life. Any renaming it ever suggests is
                  opt-in, previewed, and undoable.
                </p>
              </div>
              <div className="promise promise--magenta">
                <h3>Nothing leaves your computer</h3>
                <p>
                  Not your unpublished manuscripts, not the peer reviews you’re
                  writing, not your grant applications. No cloud, no upload, no
                  company reading your files. It runs entirely on your own
                  machine.
                </p>
              </div>
            </div>
          </section>

          <section id="who" className="scene copy" aria-labelledby="who-title">
            <p className="kicker reveal reveal-a">Who it’s for</p>
            <h2 id="who-title" className="reveal reveal-b">
              People who work with books.
            </h2>
            <div className="copy-body reveal reveal-c">
              <p>
                Researchers whose material is <em>not</em> mostly journal
                articles: historians, legal scholars, philosophers, theologians,
                literary scholars, classicists, and social scientists.
              </p>
              <p>
                Nearly every tool in this area was built for lab scientists
                reading articles that carry a DOI. If your shelf is monographs,
                edited volumes, chapters, and scans of things published before
                1990, those tools quietly fail you — and everyone has simply
                learned to live with it.
              </p>
            </div>
          </section>

          <section id="price" className="scene price" aria-labelledby="price-kicker">
            <p id="price-kicker" className="kicker kicker--cyan reveal reveal-a">
              The price
            </p>
            {/* Set large enough to be argued with. */}
            <p className="price-figure">
              <span aria-hidden="true">{PRICE}.</span>
              <span className="sr-only">It costs {PRICE}.</span>
            </p>
            <p className="price-lede reveal reveal-c">A statement, not an opening bid.</p>
            <p className="price-note reveal reveal-d">
              Argue with the number. A well-reasoned “too much” is worth more to me
              than a polite yes.
            </p>
          </section>

          <ResponseForm />

          <div className="coda">
            <p className="reveal reveal-b">
              Early concept — nothing has been built yet. Which is precisely why
              your reaction is worth more now than it will be later.
            </p>
          </div>
        </div>
      </main>

      <footer className="column">
        <div className="colophon">
          <p>“{BRAND}” is a working title, not a decision.</p>
          <p>
            This page is a concept note. Nothing described on it exists yet, and the
            sample library it searches is invented for the purpose.
          </p>
        </div>
      </footer>
    </>
  );
}
