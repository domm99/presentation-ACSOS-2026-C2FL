<script setup lang="ts">
import { computed } from 'vue'

// Staged reading of the novelty heatmap (figures/uncertainty_difference_heatmap.png,
// 2015 x 1812). The SVG overlay is drawn in the image's own pixel space, so the
// spotlights land exactly on the axis labels and on the 3x3 group blocks.
//
//   step 0  full figure, label decoder on the side
//   step 1  what a label and a cell mean (axis strips + one cross-evaluation)
//   step 2  the four diagonal blocks: same group
//   step 3  everything but the diagonal: across groups, plus the mean-novelty bars
const props = defineProps<{ click?: number }>()

const step = computed(() => Math.min(Math.max(0, props.click ?? 0), 3))

const IMG = { w: 2015, h: 1812 }
/* Bounds of the matrix itself, measured on the rendered PNG. */
const P = { x0: 313, y0: 32, x1: 1786, y1: 1504 }
const cw = (P.x1 - P.x0) / 12
const ch = (P.y1 - P.y0) / 12
const pad = 8

const plot = { x: P.x0, y: P.y0, width: P.x1 - P.x0, height: P.y1 - P.y0 }
/* The two label gutters: they carry the G<group>-D<device> naming. They must
   not overlap each other — the veil below is an even-odd path, so a region
   covered twice would be painted back in. */
const rowLabels = { x: 0, y: P.y0 - pad, width: P.x0, height: plot.height + pad }
const colLabels = { x: 0, y: P.y1, width: IMG.w, height: IMG.h - P.y1 }
/* The colour scale stays readable at every step. */
const colorBar = { x: P.x1 + 6, y: 0, width: IMG.w - P.x1 - 6, height: P.y1 }
/* One cell to read out loud: row G1-D1, column G3-D2 — a cross-group pair, so
   the cell carries visible colour while the row and column labels are named. */
const cell = { x: P.x0 + 7 * cw, y: P.y0, width: cw, height: ch }
/* Same-group 3x3 blocks along the diagonal. */
const blocks = [0, 1, 2, 3].map((g) => ({
  id: `b${g}`,
  x: P.x0 + g * 3 * cw,
  y: P.y0 + g * 3 * ch,
  width: 3 * cw,
  height: 3 * ch,
}))

const rowGuide = { x1: P.x0, y1: P.y0 + ch / 2, x2: cell.x, y2: P.y0 + ch / 2 }
const colGuide = { x1: cell.x + cw / 2, y1: cell.y + ch, x2: cell.x + cw / 2, y2: P.y1 }

type Rect = { x: number; y: number; width: number; height: number }

const rectPath = (r: Rect) =>
  `M${r.x} ${r.y}H${r.x + r.width}V${r.y + r.height}H${r.x}Z`

/* Regions that keep their colour at the current step. */
const holes = computed<Rect[]>(() => {
  const s = step.value
  if (s === 1) return [rowLabels, colLabels, colorBar, cell]
  if (s === 2) return [rowLabels, colLabels, colorBar, ...blocks]
  if (s === 3) return [rowLabels, colLabels, colorBar, plot]
  return []
})

/* Regions veiled back in on top of a hole (step 3 dims the diagonal again). */
const covers = computed<Rect[]>(() => (step.value === 3 ? blocks : []))

// The veil is one even-odd path — full frame, minus holes, plus covers — rather
// than an SVG <mask>. Fragment references such as url(#id) do not resolve in
// the hash-routed exports, which would silently drop the whole effect.
const veilPath = computed(() =>
  [
    rectPath({ x: 0, y: 0, width: IMG.w, height: IMG.h }),
    ...holes.value.map(rectPath),
    ...covers.value.map(rectPath),
  ].join(' '),
)
</script>

<template>
  <div class="nm-root">
    <!-- ── The heatmap, with its spotlight overlay ── -->
    <div class="nm-figure">
      <div class="nm-canvas">
        <BaseImg
          src="figures/uncertainty_difference_heatmap.png"
          alt="Cross-novelty heatmap over twelve devices, grouped in four blocks of three"
          class="nm-img"
        />

        <svg
          class="nm-overlay"
          :class="{ 'is-on': step > 0 }"
          :viewBox="`0 0 ${IMG.w} ${IMG.h}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path class="nm-veil" :d="veilPath" fill-rule="evenodd" />

          <!-- step 1: the row label and the column label meet in one cell -->
          <g class="nm-marks" :class="{ 'is-on': step === 1 }">
            <rect class="frame frame-teal" v-bind="rowLabels" />
            <rect class="frame frame-teal" v-bind="colLabels" />
            <line class="guide" v-bind="rowGuide" />
            <line class="guide" v-bind="colGuide" />
            <rect class="frame frame-orange" v-bind="cell" />
          </g>

          <!-- step 2: the same-group blocks -->
          <g class="nm-marks" :class="{ 'is-on': step === 2 }">
            <rect
              v-for="b in blocks"
              :key="`f-${b.id}`"
              class="frame frame-green"
              :x="b.x" :y="b.y" :width="b.width" :height="b.height"
            />
          </g>

          <!-- step 3: the same blocks, now as the region being excluded -->
          <g class="nm-marks" :class="{ 'is-on': step === 3 }">
            <rect
              v-for="b in blocks"
              :key="`o-${b.id}`"
              class="frame frame-muted"
              :x="b.x" :y="b.y" :width="b.width" :height="b.height"
            />
          </g>
        </svg>
      </div>
    </div>

    <!-- ── Side column: what the labels mean, then the reading, then the bars ── -->
    <div class="nm-side">
      <ol class="nm-steps">
        <li class="nm-step" :class="{ 'is-shown': step >= 1, 'is-current': step === 1 }">
          <span class="nm-dot dot-orange" />
          <span>
            <strong class="nm-token"><span class="tok-g">G1</span>-<span class="tok-d">D1</span></strong>
            = latent <strong>group 1</strong>, <strong>device 1</strong> of its three. The <strong>row</strong> names the
            device whose RND predictor is used, the <strong>column</strong> the device whose data it is scored on —
            their cell is <MathTex math="s_{ij} - s_{ii}" />.
          </span>
        </li>
        <li class="nm-step" :class="{ 'is-shown': step >= 2, 'is-current': step === 2 }">
          <span class="nm-dot dot-green" />
          <span><strong>Diagonal blocks stay near zero</strong> — inside a group, a peer's predictor is as good as your own.</span>
        </li>
        <li class="nm-step" :class="{ 'is-shown': step >= 3, 'is-current': step === 3 }">
          <span class="nm-dot dot-plum" />
          <span><strong>Everything off the diagonal jumps</strong> — the <MathTex math="k = 4" /> partition falls out of the gap.</span>
        </li>
      </ol>

      <p class="nm-truth" :class="{ 'is-shown': step >= 1 }">Label colours are the benchmark's <strong>ground truth</strong>: clustering never sees them.</p>

      <div class="nm-bars" :class="{ 'is-shown': step >= 3 }">
        <BaseImg
          src="figures/diagonal_vs_offdiagonal_barplot.png"
          alt="Mean novelty for own device, same-group device, and different-group device"
          class="nm-bar-img"
        />
        <p class="nm-bar-caption">
          Same mean novelty on own data and on a <strong>same-group</strong> peer <span class="nm-val">(≈ 3.0)</span>;
          <strong>roughly twice</strong> that across groups <span class="nm-val">(≈ 6.3)</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nm-root {
  display: grid;
  grid-template-columns: 24.2rem minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 1rem;
  height: 22rem;
}

/* ── figure ── */
.nm-figure {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0.35rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(16, 32, 43, 0.1);
}

/* Height-driven: the matrix takes all the vertical room the slide has, and the
   width follows from the figure's aspect ratio. */
.nm-canvas {
  position: relative;
  height: 100%;
  width: auto;
  aspect-ratio: 2015 / 1812;
  max-width: 100%;
}

.nm-img {
  display: block;
  width: 100%;
  height: 100%;
}

.nm-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.nm-overlay.is-on {
  opacity: 1;
}

/* A light wash: veiled cells recede but keep their hue. */
.nm-veil {
  fill: #f7fafb;
  fill-opacity: 0.88;
}

.nm-marks {
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.nm-marks.is-on {
  opacity: 1;
}

.frame {
  fill: none;
  stroke-width: 7;
}

.frame-teal {
  stroke: var(--deck-teal);
  stroke-dasharray: 26 18;
}

.frame-orange {
  stroke: var(--deck-orange);
  stroke-width: 10;
}

.frame-green {
  stroke: var(--deck-green);
  stroke-width: 9;
}

.frame-muted {
  stroke: rgba(16, 32, 43, 0.35);
  stroke-width: 6;
  stroke-dasharray: 18 16;
}

.guide {
  stroke: var(--deck-orange);
  stroke-width: 6;
  stroke-dasharray: 20 16;
}

/* ── side column ── */
.nm-side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  min-height: 0;
}

/* The G<group>-D<device> token, shown inline in the first reading step. */
.nm-token {
  font-family: var(--deck-font-mono);
  font-weight: 600;
  color: var(--deck-ink);
  white-space: nowrap;
}

.tok-g {
  color: #4c72b0;
}

.tok-d {
  color: #8172b3;
}

.nm-truth {
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
  font-size: 0.66rem !important;
  line-height: 1.3;
  color: var(--deck-muted);
  padding-left: 0.55rem;
}

.nm-truth.is-shown {
  opacity: 1;
}

.nm-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.nm-step {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  padding: 0.3rem 0.55rem;
  font-size: 0.72rem;
  line-height: 1.35;
  color: var(--deck-muted);
  background: rgba(255, 255, 255, 0.6);
  border-left: 2px solid transparent;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out),
    transform var(--deck-dur-long) var(--deck-ease-out),
    background-color var(--deck-dur-long) var(--deck-ease-out);
}

.nm-step + .nm-step {
  margin-top: 0;
}

.nm-step.is-shown {
  opacity: 1;
  transform: translateY(0);
}

.nm-step.is-current {
  color: var(--deck-ink);
  background: #ffffff;
  border-left-color: var(--deck-orange);
}

.nm-step span {
  font-size: inherit;
}

.nm-dot {
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.3rem;
  border-radius: 50%;
}

.dot-orange {
  background: var(--deck-orange);
}

.dot-green {
  background: var(--deck-green);
}

.dot-plum {
  background: #8172b3;
}

.nm-bars {
  margin-top: auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem 0.7rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(16, 32, 43, 0.1);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out),
    transform var(--deck-dur-long) var(--deck-ease-out);
}

.nm-bars.is-shown {
  opacity: 1;
  transform: translateY(0);
}

.nm-bar-img {
  display: block;
  width: 100%;
  max-height: 11.5rem;
  object-fit: contain;
}

/* The deck sets a base size on every span; keep these inline. */
.nm-val {
  white-space: nowrap;
  font-size: inherit;
}

.nm-bar-caption {
  font-size: 0.7rem !important;
  line-height: 1.35;
  color: var(--deck-muted);
}
</style>
