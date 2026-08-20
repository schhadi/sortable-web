import { HeroSearch } from "@/components/HeroSearch";
import { TopBar } from "@/components/TopBar";
import { BRAND, PRICE } from "@/lib/config";

export default function Home() {
  return (
    <>
      <TopBar />

      <main>
        {/* Scene one. Nothing above the box, nothing beside it. */}
        <section id="top" className="hero">
          <div className="hero-stage">
            <p className="kicker enter">An early concept — nothing built yet</p>
            <h1 className="enter enter-2">Search what you remember.</h1>
            <p className="hero-sub enter enter-3">
              A phrase, a place, a year — not the filename. Your whole library,
              searched by what is inside it.
            </p>

            <HeroSearch />
          </div>

          <div className="hero-cue-wrap">
            <a className="hero-cue enter enter-6" href="#idea">
              <span>The idea</span>
              <span className="hero-cue-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </section>

        <div className="column">
          <section id="idea" className="scene idea" aria-labelledby="idea-title">
            <p className="kicker reveal reveal-a">The idea</p>
            <h2 id="idea-title" className="reveal reveal-b">
              Nothing is built yet. That is the point.
            </h2>
            <p className="idea-lede reveal reveal-c">
              Your reaction is worth more now than it will be later.
            </p>
            <div className="idea-body reveal reveal-d">
              <p>
                What you just used is a mock-up — ten invented documents, searched
                for real. The product it stands for takes one sentence: point it at
                the folders where your work already lives, and everything in them
                becomes searchable by what is inside — not by what the files happen
                to be called.
              </p>
              <p>
                <strong>Type the sentence you half-remember. Get the page.</strong>
              </p>
              <p>
                That is the whole of it. No waiting list, no sign-up, no product
                behind this page — yet.
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

          <div className="coda">
            <p className="reveal reveal-b">
              A well-argued “I don’t need this” is the most useful thing you can send
              me. It is worth more than a yes, and it costs you less to write.
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
