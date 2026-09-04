<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), 2))
</script>

<template>
  <div class="cl-balance-root" :data-step="step" role="img" aria-label="Continual learning balances adaptation to current data with replay from previous regions">
    <div class="cl-source current">
      <span>current region</span>
      <strong>new observations</strong>
    </div>
    <div class="cl-source memory" :class="{ active: step >= 1 }">
      <span>local memory</span>
      <strong>replay samples</strong>
    </div>

    <div class="cl-model">
      <div class="model-core">device model</div>
      <div class="model-axis">
        <span>plasticity</span>
        <i />
        <span>stability</span>
      </div>
    </div>

    <div class="cl-outcome" :class="{ active: step >= 2 }">
      <span>target behavior</span>
      <strong>adapt without forgetting</strong>
    </div>

    <svg class="cl-arrows" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="arrow current-arrow" d="M 22 28 C 38 24, 43 36, 50 44" />
      <path class="arrow memory-arrow" d="M 22 72 C 38 76, 43 64, 50 56" />
      <path class="arrow output-arrow" d="M 62 50 C 71 50, 76 50, 84 50" />
    </svg>
  </div>
</template>

<style scoped>
.cl-balance-root {
  position: relative;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr 0.9fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.85rem 1.3rem;
  min-height: 14rem;
  margin: 1rem auto 0;
  width: min(100%, 48rem);
}

.cl-source,
.cl-model,
.cl-outcome {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: center;
  gap: 0.22rem;
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(16, 32, 43, 0.12);
  box-shadow: 0 4px 14px rgba(16, 32, 43, 0.04);
}

.cl-source span,
.cl-outcome span {
  color: var(--deck-muted);
  font-size: 0.64rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cl-source strong,
.cl-outcome strong {
  color: var(--deck-ink);
  font-size: 1rem !important;
}

.cl-source.current {
  grid-column: 1;
  grid-row: 1;
  border-top: 3px solid var(--deck-orange);
}

.cl-source.memory {
  grid-column: 1;
  grid-row: 2;
  border-top: 3px solid var(--deck-teal);
  opacity: 0.35;
}

.cl-source.memory.active {
  opacity: 1;
}

.cl-model {
  grid-column: 2;
  grid-row: 1 / span 2;
  justify-items: center;
  align-content: center;
  border-top: 3px solid var(--deck-green);
}

.model-core {
  display: grid;
  place-items: center;
  width: 8.3rem;
  height: 8.3rem;
  border: 0.5rem solid rgba(47, 107, 91, 0.16);
  border-radius: 50%;
  background: #ffffff;
  color: var(--deck-green);
  font-size: 1.04rem !important;
  font-weight: 800;
  text-align: center;
}

.model-axis {
  display: grid;
  grid-template-columns: 1fr 5rem 1fr;
  gap: 0.42rem;
  align-items: center;
  width: 100%;
  margin-top: 0.85rem;
}

.model-axis span {
  color: var(--deck-muted);
  font-size: 0.58rem !important;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.model-axis i {
  display: block;
  height: 0.18rem;
  background: linear-gradient(90deg, var(--deck-orange), var(--deck-teal));
}

.cl-outcome {
  grid-column: 3;
  grid-row: 1 / span 2;
  border-top: 3px solid var(--deck-orange);
  opacity: 0.35;
}

.cl-outcome.active {
  opacity: 1;
}

.cl-arrows {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.arrow {
  fill: none;
  stroke: rgba(16, 32, 43, 0.3);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 5 4;
  vector-effect: non-scaling-stroke;
}

.current-arrow {
  stroke: var(--deck-orange);
}

.memory-arrow {
  stroke: var(--deck-teal);
  opacity: 0;
}

.output-arrow {
  stroke: var(--deck-green);
  opacity: 0;
}

.cl-balance-root[data-step='1'] .memory-arrow,
.cl-balance-root[data-step='2'] .memory-arrow,
.cl-balance-root[data-step='2'] .output-arrow {
  opacity: 1;
}
</style>
