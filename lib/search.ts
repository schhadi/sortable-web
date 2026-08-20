import { CORPUS, type Doc } from "./corpus";

export type Range = [number, number];

export interface Hit {
  doc: Doc;
  where: "name" | "content";
  nameRanges: Range[];
  snippet: string;
  snippetRanges: Range[];
  /** The page the match falls on, derived from its offset through the body. */
  page: number;
  score: number;
}

export interface Results {
  byName: Hit[];
  byContent: Hit[];
  total: number;
}

const STOP = new Set([
  "a","an","the","and","or","but","of","in","on","at","to","for","from","with",
  "by","as","is","was","were","be","been","it","its","that","this","these",
  "those","i","my","me","we","our","you","your","he","she","they","them",
  "about","something","some","any","thing","things","where","when","what",
  "which","who","how","there","here","did","do","does","had","has","have",
]);

/** Filenames read as words: hyphens, underscores and the extension dot. */
const nameToWords = (name: string) => name.replace(/[-_.]+/g, " ").toLowerCase();

export function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9’']+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function findRanges(haystack: string, tokens: string[]): Range[] {
  const lower = haystack.toLowerCase();
  const ranges: Range[] = [];
  for (const t of tokens) {
    let i = lower.indexOf(t);
    while (i !== -1) {
      ranges.push([i, i + t.length]);
      i = lower.indexOf(t, i + t.length);
    }
  }
  return mergeRanges(ranges);
}

function mergeRanges(ranges: Range[]): Range[] {
  if (!ranges.length) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const out: Range[] = [sorted[0]];
  for (const r of sorted.slice(1)) {
    const last = out[out.length - 1];
    if (r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else out.push([...r] as Range);
  }
  return out;
}

/**
 * The tightest window of the body containing the most distinct query tokens —
 * so a snippet shows the words together rather than the first one in isolation.
 */
function bestWindow(body: string, tokens: string[]) {
  const lower = body.toLowerCase();
  const marks: Array<{ at: number; end: number; token: string }> = [];
  for (const t of tokens) {
    let i = lower.indexOf(t);
    while (i !== -1) {
      marks.push({ at: i, end: i + t.length, token: t });
      i = lower.indexOf(t, i + t.length);
    }
  }
  if (!marks.length) return null;
  marks.sort((a, b) => a.at - b.at);

  let best = { start: marks[0].at, end: marks[0].end, distinct: 1, span: 1 };
  for (let i = 0; i < marks.length; i++) {
    const seen = new Set<string>();
    for (let j = i; j < marks.length; j++) {
      seen.add(marks[j].token);
      const span = marks[j].end - marks[i].at;
      const better =
        seen.size > best.distinct ||
        (seen.size === best.distinct && span < best.span);
      if (better) best = { start: marks[i].at, end: marks[j].end, distinct: seen.size, span };
      if (seen.size === tokens.length) break;
    }
  }
  return best;
}

/** Grow a window out to whole words, with a little room either side. */
function carveSnippet(body: string, start: number, end: number) {
  const LEAD = 62, TRAIL = 92;
  let a = Math.max(0, start - LEAD);
  let b = Math.min(body.length, end + TRAIL);
  if (a > 0) {
    const sp = body.indexOf(" ", a);
    a = sp === -1 || sp > start ? a : sp + 1;
  }
  if (b < body.length) {
    const sp = body.lastIndexOf(" ", b);
    b = sp === -1 || sp < end ? b : sp;
  }
  return {
    text: body.slice(a, b).trim(),
    offset: a,
    leading: a > 0,
    trailing: b < body.length,
  };
}

type Carved = ReturnType<typeof carveSnippet>;

/** Snippet text with the leading ellipsis folded into the highlight offsets. */
function snippetFields(carved: Carved | null, tokens: string[]) {
  if (!carved) return { snippet: "", snippetRanges: [] as Range[] };
  const lead = carved.leading ? "… " : "";
  const snippet = lead + carved.text + (carved.trailing ? " …" : "");
  const shift = lead.length;
  return {
    snippet,
    snippetRanges: findRanges(carved.text, tokens).map(
      ([a, b]) => [a + shift, b + shift] as Range,
    ),
  };
}

const pageOf = (doc: Doc, offset: number) =>
  Math.max(1, Math.min(doc.pages, Math.round((offset / doc.body.length) * doc.pages) || 1));

export function search(query: string): Results {
  const tokens = tokenize(query);
  if (!tokens.length) return { byName: [], byContent: [], total: 0 };

  const byName: Hit[] = [];
  const byContent: Hit[] = [];

  for (const doc of CORPUS) {
    const words = nameToWords(doc.name);
    const inName = tokens.filter((t) => words.includes(t));
    const inBody = tokens.filter((t) => doc.body.toLowerCase().includes(t));

    if (inName.length) {
      // A filename match outranks anything found inside — but if the body also
      // matches on several words, carry the passage too: for "field research in
      // Germany, 2014" the filename is the weaker half of what the reader wants.
      const strongBody = inBody.length >= 2;
      const win = strongBody ? bestWindow(doc.body, inBody) : null;
      const carved = win ? carveSnippet(doc.body, win.start, win.end) : null;

      byName.push({
        doc,
        where: "name",
        nameRanges: findRanges(doc.name, tokens),
        ...snippetFields(carved, inBody),
        page: win ? pageOf(doc, win.start) : 1,
        score: inName.length * 10 + (inName.length === tokens.length ? 5 : 0),
      });
      continue;
    }

    // One common word is noise; one long, distinctive word is a real match.
    const worthShowing =
      inBody.length >= 2 || (inBody.length === 1 && inBody[0].length >= 7);
    if (!worthShowing) continue;

    const win = bestWindow(doc.body, inBody);
    if (!win) continue;
    const carved = carveSnippet(doc.body, win.start, win.end);

    byContent.push({
      doc,
      where: "content",
      nameRanges: findRanges(doc.name, tokens),
      ...snippetFields(carved, inBody),
      page: pageOf(doc, win.start),
      score: inBody.length * 4 + win.distinct * 2 - Math.min(3, win.span / 40),
    });
  }

  byName.sort((a, b) => b.score - a.score || a.doc.name.localeCompare(b.doc.name));
  byContent.sort((a, b) => b.score - a.score || a.doc.name.localeCompare(b.doc.name));

  const nameTop = byName.slice(0, 3);
  const contentTop = byContent.slice(0, 3);
  return { byName: nameTop, byContent: contentTop, total: nameTop.length + contentTop.length };
}

/** Split text into marked / unmarked pieces for rendering highlights. */
export function pieces(text: string, ranges: Range[]) {
  const out: Array<{ text: string; mark: boolean }> = [];
  let pos = 0;
  for (const [a, b] of ranges) {
    if (a < pos) continue;
    if (a > pos) out.push({ text: text.slice(pos, a), mark: false });
    out.push({ text: text.slice(a, b), mark: true });
    pos = b;
  }
  if (pos < text.length) out.push({ text: text.slice(pos), mark: false });
  return out;
}

/** Ranges of the query's tokens across a document's full body. */
export function bodyRanges(body: string, query: string): Range[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  return findRanges(body, tokens);
}
