<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const phase = computed(() => Math.min((props.click ?? 0) + 1, 4))

const clients = [
  { x: 16, y: 20 },
  { x: 84, y: 20 },
  { x: 16, y: 78 },
  { x: 84, y: 78 },
]
const server = { x: 50, y: 47 }
</script>

<template>
  <div class="fl-explainer" role="img" aria-label="Federated learning loop with local training, model updates, aggregation, and broadcast">
    <div class="fl-scene" :data-phase="phase">
      <svg class="fl-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          v-for="(client, i) in clients"
          :key="i"
          :x1="server.x"
          :y1="server.y"
          :x2="client.x"
          :y2="client.y"
        />
      </svg>

      <span
        v-for="(client, i) in clients"
        :key="`out-${i}`"
        v-show="phase === 1 || phase === 4"
        class="packet out"
        :class="{ repeat: phase === 4 }"
        :style="{
          '--cx': `${client.x}%`,
          '--cy': `${client.y}%`,
          animationDelay: `${(phase === 4 ? 0.75 : 0) + i * 0.16}s`,
        }"
      >wG</span>
      <span
        v-for="(client, i) in clients"
        :key="`in-${i}`"
        v-show="phase === 3"
        class="packet inn"
        :style="{ '--cx': `${client.x}%`, '--cy': `${client.y}%`, animationDelay: `${i * 0.16}s` }"
      >u{{ i + 1 }}</span>

      <div
        v-for="(client, i) in clients"
        :key="`client-${i}`"
        class="fl-client"
        :style="{ left: `${client.x}%`, top: `${client.y}%`, '--receive-delay': `${2.3 + i * 0.16}s` }"
      >
        <span class="client-dot">d{{ i + 1 }}</span>
        <span class="client-sub">private data</span>
        <span class="train-badge">training</span>
      </div>

      <div class="fl-server" :style="{ left: `${server.x}%`, top: `${server.y}%` }">
        <span class="server-box">SERVER</span>
        <span class="server-sub">{{ phase === 4 ? 'new model ready' : 'only sees updates' }}</span>
        <span class="agg-badge">FedAvg -> wG</span>
      </div>
    </div>

    <div class="fl-steps">
      <div v-for="n in 4" :key="n" class="fl-step" :class="{ active: phase === n, done: phase > n }">
        <span class="num">{{ n }}</span>
        <span v-if="n === 1"><strong>Broadcast</strong><small>shared model reaches every device</small></span>
        <span v-else-if="n === 2"><strong>Train locally</strong><small>observations remain on the device</small></span>
        <span v-else-if="n === 3"><strong>Upload updates</strong><small>only model deltas cross the boundary</small></span>
        <span v-else><strong>Aggregate & repeat</strong><small>updates become the next shared model</small></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fl-explainer {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  gap: 1.25rem;
  align-items: center;
}

.fl-scene {
  position: relative;
  height: 17rem;
  overflow: hidden;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background:
    linear-gradient(135deg, rgba(15, 76, 92, 0.06), rgba(255, 255, 255, 0.94)),
    radial-gradient(circle at 18% 20%, rgba(47, 107, 91, 0.13), transparent 24%),
    radial-gradient(circle at 84% 74%, rgba(217, 119, 6, 0.13), transparent 24%);
}

.fl-links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.fl-links line {
  stroke: rgba(15, 76, 92, 0.25);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
  vector-effect: non-scaling-stroke;
}

.fl-client,
.fl-server {
  position: absolute;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 0.18rem;
  transform: translate(-50%, -50%);
}

.client-dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--deck-teal);
  border-radius: 50%;
  background: #ffffff;
  color: var(--deck-teal);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.72rem !important;
  font-weight: 700;
  transition: 0.3s ease;
}

.client-dot::after {
  content: 'wG';
  position: absolute;
  right: -0.42rem;
  bottom: -0.18rem;
  display: grid;
  place-items: center;
  width: 1.18rem;
  height: 0.82rem;
  border: 2px solid #ffffff;
  border-radius: 0.22rem;
  background: var(--deck-green);
  color: #ffffff;
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.48rem !important;
  opacity: 0;
}

.client-sub,
.server-sub {
  color: var(--deck-muted);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.58rem !important;
  text-align: center;
}

.train-badge,
.agg-badge {
  position: absolute;
  top: -1.15rem;
  padding: 0.1rem 0.4rem;
  background: var(--deck-orange);
  color: #ffffff;
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.55rem !important;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(4px);
  transition: 0.3s ease;
}

.server-box {
  padding: 0.6rem 1.05rem;
  background: var(--deck-teal);
  color: #ffffff;
  font-size: 0.82rem !important;
  font-weight: 700;
  letter-spacing: 0.06em;
  transition: 0.3s ease;
}

.agg-badge {
  top: -1.3rem;
  background: var(--deck-green);
  font-size: 0.6rem !important;
}

.packet {
  position: absolute;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 1.34rem;
  height: 0.86rem;
  border: 2px solid #ffffff;
  border-radius: 0.22rem;
  box-shadow: 0 1px 5px rgba(16, 32, 43, 0.18);
  color: #ffffff;
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.46rem !important;
  font-weight: 700;
  transform: translate(-50%, -50%);
}

.packet.out {
  background: var(--deck-teal);
  animation: fly-out 1.55s ease-in-out 1 both;
}

.packet.out.repeat {
  background: var(--deck-green);
  animation-name: fly-out-repeat;
}

.packet.inn {
  background: var(--deck-orange);
  animation: fly-in 1.55s ease-in-out 1 both;
}

@keyframes fly-out {
  0% { left: 50%; top: 47%; opacity: 0; }
  12%, 85% { opacity: 1; }
  100% { left: var(--cx); top: var(--cy); opacity: 0; }
}

@keyframes fly-out-repeat {
  0% { left: 50%; top: 47%; opacity: 0; transform: translate(-50%, -50%) scale(0.72); }
  14% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  84% { opacity: 1; }
  100% { left: var(--cx); top: var(--cy); opacity: 0; transform: translate(-50%, -50%) scale(0.86); }
}

@keyframes fly-in {
  0% { left: var(--cx); top: var(--cy); opacity: 0; }
  12%, 85% { opacity: 1; }
  100% { left: 50%; top: 47%; opacity: 0; }
}

.fl-scene[data-phase='2'] .client-dot {
  border-color: var(--deck-orange);
  color: #9a5302;
  animation: client-pulse 1.4s ease-in-out infinite;
}

.fl-scene[data-phase='2'] .train-badge {
  opacity: 1;
  transform: translateY(0);
}

@keyframes client-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
  55% { box-shadow: 0 0 0 0.6rem rgba(217, 119, 6, 0); }
}

.fl-scene[data-phase='4'] .server-box {
  background: var(--deck-green);
  animation: server-glow 0.9s ease-out 1 both;
}

.fl-scene[data-phase='4'] .agg-badge {
  opacity: 1;
  transform: translateY(0);
}

.fl-scene[data-phase='4'] .client-dot {
  border-color: var(--deck-green);
  animation: client-receives 0.36s var(--receive-delay) ease-out 1 both;
}

.fl-scene[data-phase='4'] .client-dot::after {
  animation: model-received 0.36s var(--receive-delay) ease-out 1 both;
}

@keyframes server-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(47, 107, 91, 0.4); }
  55% { box-shadow: 0 0 0 0.75rem rgba(47, 107, 91, 0); }
}

@keyframes client-receives {
  from { box-shadow: 0 0 0 0 rgba(47, 107, 91, 0.32); }
  to { box-shadow: 0 0 0 0.28rem rgba(47, 107, 91, 0.16); }
}

@keyframes model-received {
  from { opacity: 0; transform: translateY(3px) scale(0.75); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.fl-steps {
  display: grid;
  gap: 0.48rem;
}

.fl-step {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.55rem;
  align-items: center;
  padding: 0.52rem 0.65rem;
  border-left: 4px solid #cbd7dc;
  background: rgba(255, 255, 255, 0.72);
  color: var(--deck-muted);
  opacity: 0.62;
  transition: 0.3s ease;
}

.fl-step .num {
  display: grid;
  place-items: center;
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 50%;
  background: #dbe4e8;
  font-size: 0.72rem !important;
  font-weight: 700;
}

.fl-step strong {
  display: block;
  color: inherit;
}

.fl-step small {
  display: block;
  margin-top: 0.05rem;
  font-size: 0.66rem;
  line-height: 1.25;
}

.fl-step.active {
  border-left-color: var(--deck-orange);
  background: var(--deck-orange-soft);
  color: #9a5302;
  opacity: 1;
  transform: translateX(-0.25rem);
}

.fl-step.active .num {
  background: var(--deck-orange);
  color: #ffffff;
}

.fl-step.done {
  border-left-color: var(--deck-teal);
  color: var(--deck-teal);
  opacity: 0.9;
}

.fl-step.done .num {
  background: var(--deck-teal);
  color: #ffffff;
}
</style>
