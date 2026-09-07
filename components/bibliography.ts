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
    short: 'McMahan et al. — Communication-Efficient Learning. AISTATS, 2017',
    full: 'B. McMahan et al. <em>Communication-Efficient Learning of Deep Networks from Decentralized Data</em>. AISTATS, 2017.',
  },
  2: {
    short: 'Kairouz et al. — Advances and Open Problems in FL. FnT ML, 2021',
    full: 'P. Kairouz et al. <em>Advances and Open Problems in Federated Learning</em>. Foundations and Trends in Machine Learning, 2021.',
  },
  3: {
    short: 'Ghosh et al. — An Efficient Framework for CFL. IEEE TIT, 2022',
    full: 'A. Ghosh et al. <em>An Efficient Framework for Clustered Federated Learning</em>. IEEE Transactions on Information Theory, 2022.',
  },
  4: {
    short: 'Domini et al. — Proximity-aware self-federated learning. IoT, 2026',
    full: 'D. Domini et al. <em>Decentralized proximity-aware clustering for collective self-federated learning</em>. Internet of Things, 2026.',
  },
  5: {
    short: 'Burda et al. — Exploration by Random Network Distillation. ICLR, 2019',
    full: 'Y. Burda et al. <em>Exploration by Random Network Distillation</em>. ICLR, 2019.',
  },
  6: {
    short: 'Krizhevsky & Hinton — Learning Multiple Layers from Tiny Images, 2009',
    full: 'A. Krizhevsky and G. Hinton. <em>Learning Multiple Layers of Features from Tiny Images</em>, 2009.',
  },
  7: {
    short: 'Domini et al. — ProFed benchmark. JORS, 2026',
    full: 'D. Domini et al. <em>ProFed: a Benchmark for Proximity-based non-IID Federated Learning</em>. Journal of Open Research Software, 2026.',
  },
  8: {
    short: 'He et al. — Deep Residual Learning. CVPR, 2016',
    full: 'K. He et al. <em>Deep Residual Learning for Image Recognition</em>. CVPR, 2016.',
  },
}
