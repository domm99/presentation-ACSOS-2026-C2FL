<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  click?: number
  mode?: 'heterogeneity' | 'clustered'
}>(), {
  mode: 'heterogeneity',
})

const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), 2))
const subregionsUrl = new URL('../images/paper/subregions.png', import.meta.url).href

const nodes = [
  { x: '27%', y: '21%', region: 'r0' },
  { x: '39%', y: '31%', region: 'r0' },
  { x: '70%', y: '24%', region: 'r1' },
  { x: '81%', y: '39%', region: 'r1' },
  { x: '30%', y: '71%', region: 'r2' },
  { x: '44%', y: '82%', region: 'r2' },
  { x: '70%', y: '68%', region: 'r3' },
  { x: '82%', y: '80%', region: 'r3' },
]
</script>

<template>
  <div class="spatial-map-root" :data-step="step" :data-mode="mode">
    <div class="spatial-canvas">
      <img :src="subregionsUrl" alt="Proximity-based heterogeneous regions from the C2FL paper" class="subregion-img">
      <div class="spatial-dimmer" aria-hidden="true" />

      <svg class="spatial-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="link local" d="M 27 21 L 39 31 M 70 24 L 81 39 M 30 71 L 44 82 M 70 68 L 82 80" />
        <path class="link cross" d="M 39 31 L 70 24 M 44 82 L 70 68 M 39 31 L 44 82" />
      </svg>

      <span
        v-for="(node, i) in nodes"
        :key="i"
        class="map-node"
        :class="node.region"
        :style="{ left: node.x, top: node.y }"
      >d{{ i + 1 }}</span>

      <template v-if="mode === 'heterogeneity'">
        <div class="map-callout callout-local" :class="{ active: step >= 1 }">
          <strong>IID within region</strong>
          <span>nearby updates are aligned</span>
        </div>
        <div class="map-callout callout-cross" :class="{ active: step >= 2 }">
          <strong>Non-IID across regions</strong>
          <span>distant objectives diverge</span>
        </div>
      </template>

      <template v-else>
        <div class="cluster-shell cluster-r0" :class="{ active: step >= 0 }">
          <span>model A</span>
        </div>
        <div class="cluster-shell cluster-r1" :class="{ active: step >= 1 }">
          <span>model B</span>
        </div>
        <div class="cluster-shell cluster-r2" :class="{ active: step >= 1 }">
          <span>model C</span>
        </div>
        <div class="cluster-shell cluster-r3" :class="{ active: step >= 2 }">
          <span>model D</span>
        </div>
      </template>
    </div>

    <div class="spatial-stepper" aria-hidden="true">
      <span :class="{ active: step === 0, done: step > 0 }">{{ mode === 'clustered' ? 'regions' : 'map' }}</span>
      <span :class="{ active: step === 1, done: step > 1 }">{{ mode === 'clustered' ? 'local groups' : 'local similarity' }}</span>
      <span :class="{ active: step === 2 }">{{ mode === 'clustered' ? 'regional models' : 'cross-region drift' }}</span>
    </div>
  </div>
</template>

<style scoped>
.spatial-map-root {
  display: grid;
  gap: 0.55rem;
  width: 100%;
}

.spatial-canvas {
  position: relative;
  width: min(100%, 24rem);
  height: 18rem;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
}

.subregion-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.45rem;
}

.spatial-dimmer {
  position: absolute;
  inset: 0;
  background: rgba(16, 32, 43, 0.24);
  opacity: 0;
  transition: opacity 320ms ease;
}

.spatial-map-root[data-mode='heterogeneity'][data-step='1'] .spatial-dimmer,
.spatial-map-root[data-mode='heterogeneity'][data-step='2'] .spatial-dimmer {
  opacity: 1;
}

.spatial-links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.link {
  fill: none;
  stroke-linecap: round;
  stroke-width: 1.9;
  opacity: 0.35;
  vector-effect: non-scaling-stroke;
}

.link.local {
  stroke: var(--deck-green);
}

.link.cross {
  stroke: var(--deck-orange);
  stroke-dasharray: 5 4;
  opacity: 0.22;
}

.spatial-map-root[data-mode='heterogeneity'][data-step='1'] .link.local,
.spatial-map-root[data-mode='clustered'] .link.local {
  opacity: 0.9;
}

.spatial-map-root[data-mode='heterogeneity'][data-step='2'] .link.cross {
  opacity: 0.92;
}

.map-node {
  position: absolute;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.5rem !important;
  font-weight: 800;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 10px rgba(16, 32, 43, 0.18);
}

.map-node.r0 { background: var(--deck-teal); }
.map-node.r1 { background: var(--deck-green); }
.map-node.r2 { background: var(--deck-orange); }
.map-node.r3 { background: #7b5fa9; }

.map-callout {
  position: absolute;
  z-index: 4;
  width: 12rem;
  padding: 0.5rem 0.62rem;
  background: #ffffff;
  box-shadow: 0 5px 16px rgba(16, 32, 43, 0.16);
  opacity: 0;
  transform: translateY(6px);
  transition: 320ms ease;
}

.map-callout.active {
  opacity: 1;
  transform: translateY(0);
}

.map-callout strong,
.map-callout span {
  display: block;
}

.map-callout strong {
  font-size: 0.68rem !important;
}

.map-callout span {
  margin-top: 0.12rem;
  color: var(--deck-muted);
  font-size: 0.56rem !important;
  line-height: 1.25;
}

.callout-local {
  left: 0.65rem;
  top: 0.65rem;
  border-left: 3px solid var(--deck-green);
}

.callout-cross {
  right: 0.65rem;
  bottom: 0.65rem;
  border-left: 3px solid var(--deck-orange);
}

.cluster-shell {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: end center;
  border: 2px solid transparent;
  border-radius: 0.4rem;
  opacity: 0;
  transform: scale(0.96);
  transition: 320ms ease;
  pointer-events: none;
}

.cluster-shell.active {
  opacity: 1;
  transform: scale(1);
}

.cluster-shell span {
  margin-bottom: 0.35rem;
  padding: 0.18rem 0.45rem;
  border: 1px solid currentColor;
  background: rgba(255, 255, 255, 0.88);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.54rem !important;
  font-weight: 800;
}

.cluster-r0 {
  left: 9%;
  top: 7%;
  width: 41%;
  height: 39%;
  border-color: var(--deck-teal);
  color: var(--deck-teal);
}

.cluster-r1 {
  right: 7%;
  top: 8%;
  width: 39%;
  height: 42%;
  border-color: var(--deck-green);
  color: var(--deck-green);
}

.cluster-r2 {
  left: 8%;
  bottom: 6%;
  width: 43%;
  height: 43%;
  border-color: var(--deck-orange);
  color: #9a5302;
}

.cluster-r3 {
  right: 6%;
  bottom: 6%;
  width: 39%;
  height: 39%;
  border-color: #7b5fa9;
  color: #5a4088;
}

.spatial-stepper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.35rem;
  width: min(100%, 24rem);
  margin: 0 auto;
}

.spatial-stepper span {
  padding-top: 0.32rem;
  border-top: 2px solid #cbd7dc;
  color: var(--deck-muted);
  font-size: 0.56rem !important;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
}

.spatial-stepper span.active {
  border-color: var(--deck-orange);
  color: #9a5302;
}

.spatial-stepper span.done {
  border-color: var(--deck-teal);
  color: var(--deck-teal);
}
</style>
