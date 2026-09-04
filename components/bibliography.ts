// Single source of truth for the deck's bibliography.
//
// Every citation in the deck flows from here:
//   - <Cites refs="1,3" />  renders the per-slide footnotes from `short`
//   - <References />        renders the final References slide from `full`
//
// Add or edit an entry once; numbering and both renderings stay in sync.
export interface Reference {
  /** Compact form used in the per-slide footnotes. */
  short: string
  /** Full citation (HTML allowed, e.g. <em>) used on the References slide. */
  full: string
}

export const REFERENCES: Record<number, Reference> = {
  1: {
    short: 'McMahan et al. - Communication-Efficient Learning from Decentralized Data. AISTATS, 2017',
    full: 'B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas. <em>Communication-efficient learning of deep networks from decentralized data</em>. AISTATS, 2017.',
  },
  2: {
    short: 'Parisi et al. - Continual lifelong learning with neural networks. Neural Networks, 2019',
    full: 'G. I. Parisi, R. Kemker, J. L. Part, C. Kanan, and S. Wermter. <em>Continual lifelong learning with neural networks: A review</em>. Neural Networks, 2019.',
  },
  3: {
    short: 'Ghosh et al. - An Efficient Framework for Clustered Federated Learning. IEEE TIT, 2022',
    full: 'A. Ghosh, J. Chung, D. Yin, and K. Ramchandran. <em>An efficient framework for clustered federated learning</em>. IEEE Transactions on Information Theory, 2022.',
  },
  4: {
    short: 'Domini et al. - Decentralized proximity-aware clustering for collective self-federated learning. Internet of Things, 2026',
    full: 'D. Domini, N. Farabegoli, G. Aguzzi, M. Viroli, and L. Esterle. <em>Decentralized proximity-aware clustering for collective self-federated learning</em>. Internet of Things, 2026.',
  },
  5: {
    short: 'Domini et al. - FBFL: A field-based coordination approach for data heterogeneity in federated learning. LMCS, 2026',
    full: 'D. Domini, G. Aguzzi, L. Esterle, and M. Viroli. <em>FBFL: A field-based coordination approach for data heterogeneity in federated learning</em>. Logical Methods in Computer Science, 2026.',
  },
}
