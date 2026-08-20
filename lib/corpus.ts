// ─────────────────────────────────────────────────────────────────────────────
// The sample library the demo searches. Ten documents in the shape a working
// historian's folders actually take: reading notes, a scanned monograph, a
// chapter draft, field notes, teaching material, admin.
//
// ⚠ BEFORE SENDING (see NOTES.md): the E. P. Thompson material below is a
// register-setting placeholder. Swap the whole corpus for documents from the
// RECIPIENT'S own field. A historian of the English working class recognises
// this library; a Byzantinist or a Kantian does not, and the entire point of
// the demo is that they picture their OWN shelves while using it.
// ─────────────────────────────────────────────────────────────────────────────

export type Kind = "DOC" | "PDF" | "SHEET" | "PPT" | "NOTE" | "BIB";

export interface Doc {
  id: string;
  name: string;
  kind: Kind;
  folder: string;
  pages: number;
  body: string;
}

export const CORPUS: Doc[] = [
  {
    id: "reading-notes",
    name: "thompson-reading-notes.docx",
    kind: "DOC",
    folder: "Reading · Notes",
    pages: 6,
    body:
      "Entry twelve. Back to the preface again, because the whole argument for writing history from below is packed into one line: the aim is to rescue the stockinger and the artisan from what Thompson called “the enormous condescension of posterity”. " +
      "I keep returning to it because it is a methodological instruction dressed up as a rhetorical flourish. It tells you where to look — at the losers, at the movements that failed, at the people whose account of themselves was never written down. " +
      "Seminar wants a paragraph on this by Thursday. Note the tension with the structural account: condescension cuts both ways, and posterity includes us.",
  },
  {
    id: "monograph",
    name: "thompson-making-of-the-english-working-class.pdf",
    kind: "PDF",
    folder: "Sources · Social history",
    pages: 958,
    body:
      "Scanned copy, text layer machine-read. Preface; the field labourers; the artisans and the weavers; Luddism and the machine breakers; the moral economy; the closing chapters on class consciousness. " +
      "Marginalia from the 2018 reading group throughout, mostly in the Luddism chapters. Pages 340 to 356 are photographed at an angle and the text layer there is unreliable.",
  },
  {
    id: "preface",
    name: "thompson-preface-transcription.md",
    kind: "NOTE",
    folder: "Reading · Transcriptions",
    pages: 3,
    body:
      "Working transcription of the 1963 preface with my own gloss in square brackets. The core of it is an instruction about condescension: that hindsight flatters whoever holds it, and that posterity is not a neutral vantage point but an interested party. " +
      "[Ask whether this holds for the movements that failed as well as for the ones that were defeated. I think it does, and I think the distinction matters.] Three pages, typed, checked twice against the printed text.",
  },
  {
    id: "luddism",
    name: "luddism-chapter-draft-v4.docx",
    kind: "DOC",
    folder: "Writing · Chapters",
    pages: 31,
    body:
      "Draft four. The machine breaking of 1811 and 1812 across Nottingham, Yorkshire and Lancashire has to be read as a negotiation carried on by other means, not as blind resistance to machinery. " +
      "The croppers knew precisely which frames to break and left the rest standing, which is the whole argument in one detail. " +
      "Opening is still wrong — it starts with the legislation instead of with the workshops. Cut the first four paragraphs and begin at the frame.",
  },
  {
    id: "berlin",
    name: "berlin-archive-2014.md",
    kind: "NOTE",
    folder: "Archives · Field notes",
    pages: 11,
    body:
      "Autumn 2014. Three weeks of field research in Germany: the Staatsbibliothek in Berlin, working through the correspondence archive and cross-referencing it against the notes gathered that summer. " +
      "Photographs of roughly four hundred sheets, filed by box rather than by date, which was a mistake I am still paying for. " +
      "The trip was funded to the end of October and I ran out of days before I ran out of boxes.",
  },
  {
    id: "moral-economy",
    name: "moral-economy-seminar.pptx",
    kind: "PPT",
    folder: "Teaching · Talks",
    pages: 24,
    body:
      "Slides for the third-year seminar. The moral economy of the English crowd: the bread riot as an assertion of customary right rather than a spasm of hunger. " +
      "Includes the Germany comparison the students asked for after the 2014 material came up in the reading. Slide 19 needs replacing, the chart is unreadable at the back of the room.",
  },
  {
    id: "correspondence",
    name: "correspondence-index.xlsx",
    kind: "SHEET",
    folder: "Archives · Data",
    pages: 1,
    body:
      "Index of the Berlin correspondence. Box number, sheet number, sender, recipient, date, condition, whether photographed. " +
      "Four hundred and six rows. Column H flags the sheets where the hand is illegible; column J is the provisional dating and should not be cited.",
  },
  {
    id: "supervision",
    name: "supervision-notes-2021-11.md",
    kind: "NOTE",
    folder: "Teaching · Supervision",
    pages: 2,
    body:
      "Meeting with R. The chapter is over-evidenced and under-argued: she has done the work and will not let the reader see the conclusion. " +
      "Told her to cut the second archive section entirely and trust them. She asked for the preface reference again, which is the third time, so send it.",
  },
  {
    id: "parish",
    name: "parish-registers-1798-scan.pdf",
    kind: "PDF",
    folder: "Sources · Primary",
    pages: 84,
    body:
      "Photographed at the county record office. Baptisms, marriages and burials for the parish, 1798 to 1806. " +
      "The text layer is machine-read from the scan and is unreliable wherever the ink has faded, particularly down the burial columns. Do not quote a date from this without checking the image.",
  },
  {
    id: "bibliography",
    name: "thesis-bibliography.bib",
    kind: "BIB",
    folder: "Admin",
    pages: 1,
    body:
      "Thompson. Hobsbawm. Rudé. Hill. Davis. Two hundred and eleven entries, of which perhaps sixty have been read to the end and four have been read twice.",
  },
];
