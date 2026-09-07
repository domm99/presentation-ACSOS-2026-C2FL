<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  click?: number
}>()

const currentStep = computed(() => Math.min(Math.max(0, props.click ?? 0), 3))

// Exporting with clicks renders every click step of a slide into the SAME
// document, so a fixed SVG id would be duplicated and url(#...) would always
// resolve to the first copy — the one with no lit region. Per-instance ids keep
// each step's spotlight pointing at its own mask.
let seq = 0
const uid = `het-${(seq += 1, seq)}-${Math.random().toString(36).slice(2, 8)}`
const holeId = `${uid}-hole`
const maskId = `${uid}-veil`

/* Ellipses tracing the four coloured blobs of figures/heterogeneity.png
   (1620 x 971), plus a patch over the figure's own Non-IID arrow. */
const zones = [
  { id: 'purple', cx: 560, cy: 182, rx: 320, ry: 168 },
  { id: 'blue', cx: 1145, cy: 370, rx: 278, ry: 280 },
  { id: 'green', cx: 510, cy: 530, rx: 288, ry: 208 },
  { id: 'orange', cx: 875, cy: 685, rx: 440, ry: 238 },
  { id: 'arrow', cx: 1290, cy: 782, rx: 195, ry: 162 },
]

/* Step 2 lights one region (updates agree inside it); step 3 lights the two
   regions the figure's own Non-IID arrow connects, so the contrast is drawn
   between two visible zones instead of inside one box. */
const litZones = computed(() => {
  if (currentStep.value === 1) return ['orange']
  if (currentStep.value === 2) return ['orange', 'blue', 'arrow']
  return []
})
</script>

<template>
  <div
    class="het-wrapper"
    :data-step="currentStep"
    role="img"
    aria-label="Incremental diagram of a heterogeneous device network showing IID within clusters and Non-IID across clusters"
  >
    <div class="het-canvas">
      <img
        src="/figures/heterogeneity.png"
        alt="Network of devices grouped into 4 latent clusters"
        class="het-base-img"
      />

      <!-- Spotlight: everything outside the lit regions is veiled, so the
           highlight follows the real cluster shapes instead of a rectangle. -->
      <svg
        class="het-spotlight"
        :class="{ 'is-on': litZones.length > 0 }"
        viewBox="0 0 1620 971"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient :id="holeId">
            <stop offset="0%" stop-color="#000" stop-opacity="1" />
            <stop offset="64%" stop-color="#000" stop-opacity="1" />
            <stop offset="100%" stop-color="#000" stop-opacity="0" />
          </radialGradient>
          <mask :id="maskId">
            <rect x="0" y="0" width="1620" height="971" fill="#fff" />
            <ellipse
              v-for="z in zones"
              :key="z.id"
              class="spot-hole"
              :class="{ 'is-lit': litZones.includes(z.id) }"
              :cx="z.cx" :cy="z.cy" :rx="z.rx" :ry="z.ry"
              :fill="`url(#${holeId})`"
            />
          </mask>
        </defs>
        <rect class="het-veil" x="0" y="0" width="1620" height="971" :mask="`url(#${maskId})`" />
      </svg>
      <div class="callout-card card-iid" :class="{ 'is-active': currentStep === 1 }">
        <div class="card-tag tag-green">
          <span class="tag-icon">✔</span>
          <strong>IID within region</strong>
        </div>
        <p>Devices share data distributions — local updates align and reinforce each other.</p>
      </div>

      <div class="callout-card card-non-iid" :class="{ 'is-active': currentStep === 2 }">
        <div class="card-tag tag-orange">
          <span class="tag-icon">✖</span>
          <strong>Non-IID across regions</strong>
        </div>
        <p>Distributions diverge — averaging conflicting updates degrades standard FedAvg.</p>
      </div>

      <!-- Step 3: Four latent clusters revealed -->
      <div class="cluster-badge badge-purple" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 1</span>
      </div>
      <div class="cluster-badge badge-green" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 2</span>
      </div>
      <div class="cluster-badge badge-orange" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 3</span>
      </div>
      <div class="cluster-badge badge-blue" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 4</span>
      </div>

      <div class="takeaway-pill" :class="{ 'is-active': currentStep === 3 }">
        <span class="takeaway-spark">★</span>
        <span>Goal: discover the 4 latent clusters unsupervised</span>
      </div>
    </div>

    <!-- Stepper bar below the visual -->
    <div class="het-stepper" aria-hidden="true">
      <div class="step-indicator" :class="{ current: currentStep === 0, past: currentStep > 0 }">
        <span class="step-num">1</span>
        <span class="step-txt">Network</span>
      </div>
      <svg viewBox="0 0 16 12" class="step-sep-svg" aria-hidden="true">
        <path d="M 2 6 L 12 6 M 8 2 L 12 6 L 8 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="step-indicator" :class="{ current: currentStep === 1, past: currentStep > 1 }">
        <span class="step-num">2</span>
        <span class="step-txt">IID (local)</span>
      </div>
      <svg viewBox="0 0 16 12" class="step-sep-svg" aria-hidden="true">
        <path d="M 2 6 L 12 6 M 8 2 L 12 6 L 8 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="step-indicator" :class="{ current: currentStep === 2, past: currentStep > 2 }">
        <span class="step-num">3</span>
        <span class="step-txt">Non-IID (cross)</span>
      </div>
      <svg viewBox="0 0 16 12" class="step-sep-svg" aria-hidden="true">
        <path d="M 2 6 L 12 6 M 8 2 L 12 6 L 8 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="step-indicator" :class="{ current: currentStep === 3 }">
        <span class="step-num">4</span>
        <span class="step-txt">Clusters</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.het-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
}

.het-canvas {
  position: relative;
  width: 100%;
  border: 1px solid var(--deck-line);
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.05);
}

.het-base-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: filter var(--deck-dur-long) var(--deck-ease-out);
}

/* Spotlight veil. A light wash rather than a dark one, so the lit clusters
   keep their colour and the veiled ones simply recede. */
.het-spotlight {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.het-spotlight.is-on {
  opacity: 1;
}

.het-veil {
  fill: #fbfdfd;
  fill-opacity: 0.88;
}

.spot-hole {
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.spot-hole.is-lit {
  opacity: 1;
}

/* Callout Cards */
.callout-card {
  position: absolute;
  z-index: 3;
  width: 12.5rem;
  padding: 0.45rem 0.6rem;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(16, 32, 43, 0.16);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
}

.card-iid {
  left: 0.6rem;
  top: 0.6rem;
  border-left: 3px solid var(--deck-green);
}

.card-non-iid {
  left: 0.6rem;
  top: 0.6rem;
  border-left: 3px solid var(--deck-orange);
}

.callout-card.is-active {
  opacity: 1;
  transform: translateY(0);
}

.card-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.18rem;
  font-size: 0.62rem !important;
  letter-spacing: 0.02em;
}

.tag-green strong { color: var(--deck-green); }
.tag-orange strong { color: var(--deck-orange); }

.tag-icon {
  display: grid;
  place-items: center;
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 50%;
  color: #fff;
  font-size: 0.6rem !important;
  font-weight: 700;
}

.tag-green .tag-icon { background: var(--deck-green); }
.tag-orange .tag-icon { background: var(--deck-orange); }

.callout-card p {
  margin: 0;
  color: var(--deck-muted);
  font-size: 0.6rem !important;
  line-height: 1.3;
}

/* Step 3: Cluster Badges */
.cluster-badge {
  position: absolute;
  z-index: 3;
  padding: 0.18rem 0.45rem;
  border-radius: 14px;
  font-family: var(--deck-font-mono);
  font-size: 0.6rem !important;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.14);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
}

.cluster-badge.is-active {
  opacity: 1;
  transform: scale(1);
}

.badge-purple {
  left: 28%;
  top: 14%;
  color: #5a189a;
  background: #f5edfd;
  border: 1.5px solid #7b2cbf;
}

.badge-green {
  left: 17%;
  top: 50%;
  color: #1d4e41;
  background: #edf7f4;
  border: 1.5px solid #2f6b5b;
}

.badge-orange {
  left: 48%;
  top: 68%;
  color: #9a5302;
  background: #fef6eb;
  border: 1.5px solid #d97706;
}

.badge-blue {
  left: 70%;
  top: 24%;
  color: #0a343f;
  background: #edf5f7;
  border: 1.5px solid #0f4c5c;
}

/* Step 3: Takeaway pill */
.takeaway-pill {
  position: absolute;
  bottom: 0.45rem;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.65rem;
  background: color-mix(in oklch, var(--deck-teal) 95%, #ffffff);
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.6rem !important;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(15, 76, 92, 0.28);
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
  z-index: 4;
}

.takeaway-pill.is-active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.takeaway-spark {
  color: var(--deck-orange);
  font-size: 0.72rem !important;
}

/* Stepper bar */
.het-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.28rem 0.55rem;
  background: rgba(16, 32, 43, 0.04);
  border: 1px solid var(--deck-line);
  border-radius: 4px;
}

.step-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  opacity: 0.45;
  transition: opacity 0.25s ease, color 0.25s ease;
}

.step-indicator.past {
  opacity: 0.75;
}

.step-indicator.current {
  opacity: 1;
}

.step-num {
  display: grid;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--deck-line);
  color: var(--deck-ink);
  font-family: var(--deck-font-mono);
  font-size: 0.6rem !important;
  font-weight: 700;
  transition: background 0.25s ease, color 0.25s ease;
}

.step-indicator.current .step-num {
  background: var(--deck-teal);
  color: #ffffff;
}

.step-indicator.past .step-num {
  background: color-mix(in oklch, var(--deck-teal) 30%, var(--deck-line));
  color: var(--deck-teal);
}

.step-txt {
  font-family: var(--deck-font-mono);
  font-size: 0.6rem !important;
  color: var(--deck-muted);
}

.step-indicator.current .step-txt {
  color: var(--deck-ink);
  font-weight: 600;
}

.step-sep-svg {
  width: 1.15rem;
  height: 0.85rem;
  color: var(--deck-muted);
  opacity: 0.75;
  flex-shrink: 0;
}
</style>
