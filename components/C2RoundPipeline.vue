<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), 4))

const stages = [
  {
    number: '01',
    title: 'Cluster & train',
    body: 'Self-organize, then train on current data plus replay.',
    tone: 'teal',
  },
  {
    number: '02',
    title: 'Build consensus',
    body: 'Aggregate local models and disseminate the regional model.',
    tone: 'green',
  },
  {
    number: '03',
    title: 'Preserve the past',
    body: 'Replay samples from previously visited regions.',
    tone: 'green',
  },
  {
    number: '04',
    title: 'Integrate gradually',
    body: "Increase the regional model's weight with time spent in the area.",
    tone: 'orange',
  },
]
</script>

<template>
  <div class="round-pipeline-root" role="img" aria-label="C2FL round combining clustering, regional consensus, replay, and adaptive averaging">
    <div class="round-track">
      <template v-for="(stage, i) in stages" :key="stage.number">
        <div class="round-card" :class="[stage.tone, { active: step === i, done: step > i, future: step < i }]">
          <span class="round-number">{{ stage.number }}</span>
          <strong>{{ stage.title }}</strong>
          <p>{{ stage.body }}</p>
        </div>
        <svg v-if="i < stages.length - 1" class="round-arrow" viewBox="0 0 34 18" aria-hidden="true" :class="{ visible: step > i }">
          <path d="M 2 9 H 26 M 20 3 L 28 9 L 20 15" />
        </svg>
      </template>
    </div>

    <div class="model-mix" :class="{ active: step >= 4 }">
      <div class="mix-card local">
        <span>device state</span>
        <strong>local model + replay</strong>
      </div>
      <div class="mix-operator">+</div>
      <div class="mix-card regional">
        <span>collective state</span>
        <strong>regional consensus</strong>
      </div>
      <div class="mix-operator">=</div>
      <div class="mix-card result">
        <span>dwell-time aware</span>
        <strong>adaptive average</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.round-pipeline-root {
  display: grid;
  gap: 1rem;
  width: 100%;
}

.round-track {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  gap: 0.45rem;
  align-items: stretch;
}

.round-card {
  min-height: 9.8rem;
  padding: 0.85rem 0.95rem;
  border-top: 4px solid var(--deck-teal);
  background: rgba(255, 255, 255, 0.78);
  color: var(--deck-muted);
  box-shadow: 0 4px 14px rgba(16, 32, 43, 0.04);
  transition: opacity 260ms ease, transform 260ms ease, background 260ms ease;
}

.round-card.green {
  border-top-color: var(--deck-green);
}

.round-card.orange {
  border-top-color: var(--deck-orange);
}

.round-card.future {
  opacity: 0.34;
}

.round-card.done {
  opacity: 0.82;
}

.round-card.active {
  background: #ffffff;
  color: var(--deck-ink);
  transform: translateY(-0.2rem);
}

.round-number {
  display: block;
  color: rgba(15, 76, 92, 0.46);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.68rem !important;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.round-card.green .round-number {
  color: rgba(47, 107, 91, 0.58);
}

.round-card.orange .round-number {
  color: rgba(217, 119, 6, 0.72);
}

.round-card strong {
  display: block;
  margin-top: 0.28rem;
  color: var(--deck-ink);
  font-size: 0.96rem !important;
}

.round-card p {
  margin: 0.38rem 0 0;
  color: var(--deck-muted);
  font-size: 0.72rem !important;
  line-height: 1.35;
}

.round-arrow {
  align-self: center;
  width: 1.6rem;
  color: rgba(16, 32, 43, 0.22);
  opacity: 0.2;
  transition: 260ms ease;
}

.round-arrow.visible {
  color: var(--deck-orange);
  opacity: 1;
}

.round-arrow path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.model-mix {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1.1fr;
  gap: 0.45rem;
  align-items: center;
  padding: 0.55rem;
  border: 1px solid rgba(16, 32, 43, 0.1);
  background: rgba(255, 255, 255, 0.64);
  opacity: 0.38;
  transition: 260ms ease;
}

.model-mix.active {
  opacity: 1;
  box-shadow: 0 6px 18px rgba(15, 76, 92, 0.08);
}

.mix-card {
  min-height: 4.2rem;
  padding: 0.58rem 0.7rem;
  border-left: 3px solid var(--deck-teal);
  background: #ffffff;
}

.mix-card.regional {
  border-left-color: var(--deck-green);
}

.mix-card.result {
  border-left-color: var(--deck-orange);
  background: var(--deck-orange-soft);
}

.mix-card span,
.mix-card strong {
  display: block;
}

.mix-card span {
  color: var(--deck-muted);
  font-size: 0.58rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mix-card strong {
  margin-top: 0.12rem;
  color: var(--deck-ink);
  font-size: 0.82rem !important;
}

.mix-operator {
  color: var(--deck-muted);
  font-size: 1.35rem !important;
  font-weight: 700;
}
</style>
