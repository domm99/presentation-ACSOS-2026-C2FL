// Single source of truth for the deck's bibliography.
//
// Every citation in the deck flows from here:
//   - <Cites refs="1,3" />  renders the per-slide footnotes from `short`
//   - <References />        renders the final References slide from `full`
//
// Add or edit an entry once; numbering and both renderings stay in sync.
// Replace the placeholder entries below with your own references.
export interface Reference {
  /** Compact form used in the per-slide footnotes. */
  short: string
  /** Full citation (HTML allowed, e.g. <em>) used on the References slide. */
  full: string
}

export const REFERENCES: Record<number, Reference> = {
  1: {
    short: 'Author et al. — Short Paper Title. Venue, Year',
    full: 'A. Author, B. Author. <em>Full Paper Title</em>. Venue, Year.',
  },
  2: {
    short: 'Another Author — Another Short Title. Venue, Year',
    full: 'C. Another Author. <em>Another Full Title</em>. Venue, Year.',
  },
}
