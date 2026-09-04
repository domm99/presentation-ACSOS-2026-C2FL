<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), 3))

const regions = [
  { id: 'Area 0', dist: 'distribution A' },
  { id: 'Area 1', dist: 'distribution B' },
  { id: 'Area 2', dist: 'distribution C' },
  { id: 'Area 3', dist: 'distribution D' },
]
const nodeLeft = computed(() => ['10%', '36.5%', '63.5%', '90%'][step.value])
</script>

<template>
  <div class="mobility-root" :data-step="step" role="img" aria-label="A mobile device crossing four regions and turning spatial drift into temporal drift">
    <div class="mobility-map">
      <div
        v-for="(region, i) in regions"
        :key="region.id"
        class="mobility-region"
        :class="[`region-${i}`, { active: step === i, visited: step > i }]"
      >
        <strong>{{ region.id }}</strong>
        <span>{{ region.dist }}</span>
      </div>

      <svg class="mobility-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 10 52 C 24 25, 34 76, 48 48 S 72 30, 90 52" />
      </svg>

      <div class="mobile-node" :style="{ left: nodeLeft }">
        <span>dM</span>
        <small>current model</small>
      </div>
    </div>

    <div class="stream-row">
      <div
        v-for="(region, i) in regions"
        :key="`stream-${region.id}`"
        class="stream-card"
        :class="{ active: step === i, visited: step > i }"
      >
        <strong>{{ i === step ? 'Now training on' : step > i ? 'Past region' : 'Next region' }}</strong>
        <span>{{ region.id }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobility-root {
  display: grid;
  gap: 0.85rem;
  width: 100%;
}

.mobility-map {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 14.8rem;
  overflow: hidden;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background: #ffffff;
}

.mobility-region {
  position: relative;
  display: grid;
  align-content: end;
  gap: 0.1rem;
  padding: 0.8rem;
  border-right: 1px solid rgba(16, 32, 43, 0.1);
  color: rgba(16, 32, 43, 0.6);
  transition: 260ms ease;
}

.mobility-region:last-child {
  border-right: none;
}

.region-0 { background: rgba(15, 76, 92, 0.13); }
.region-1 { background: rgba(47, 107, 91, 0.13); }
.region-2 { background: rgba(217, 119, 6, 0.13); }
.region-3 { background: rgba(123, 95, 169, 0.13); }

.mobility-region.active {
  color: var(--deck-ink);
  box-shadow: inset 0 0 0 3px var(--deck-orange);
}

.mobility-region.visited {
  color: var(--deck-teal);
}

.mobility-region strong {
  font-size: 0.82rem !important;
}

.mobility-region span {
  color: var(--deck-muted);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.55rem !important;
}

.mobility-route {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mobility-route path {
  fill: none;
  stroke: rgba(16, 32, 43, 0.32);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 5 5;
  vector-effect: non-scaling-stroke;
}

.mobile-node {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: grid;
  justify-items: center;
  gap: 0.12rem;
  transform: translate(-50%, -50%);
  transition: left 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-node span {
  display: grid;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: var(--deck-orange);
  color: #ffffff;
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.72rem !important;
  font-weight: 800;
  box-shadow: 0 9px 24px rgba(16, 32, 43, 0.18);
}

.mobile-node small {
  padding: 0.1rem 0.4rem;
  background: rgba(255, 255, 255, 0.86);
  color: var(--deck-muted);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.52rem !important;
  white-space: nowrap;
}

.stream-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.stream-card {
  padding: 0.48rem 0.58rem;
  border-top: 3px solid #cbd7dc;
  background: rgba(255, 255, 255, 0.74);
  color: var(--deck-muted);
  opacity: 0.58;
}

.stream-card.visited {
  border-top-color: var(--deck-teal);
  color: var(--deck-teal);
  opacity: 0.86;
}

.stream-card.active {
  border-top-color: var(--deck-orange);
  background: var(--deck-orange-soft);
  color: #9a5302;
  opacity: 1;
}

.stream-card strong,
.stream-card span {
  display: block;
}

.stream-card strong {
  font-size: 0.58rem !important;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stream-card span {
  margin-top: 0.12rem;
  font-size: 0.72rem !important;
  font-weight: 700;
}
</style>
