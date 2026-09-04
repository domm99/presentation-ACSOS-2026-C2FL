<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), 3))

const devices = [
  { x: '16%', y: '24%', label: 'v1', kind: 'vehicle', activeAt: 0 },
  { x: '35%', y: '36%', label: 'v2', kind: 'vehicle', activeAt: 0 },
  { x: '73%', y: '23%', label: 'u1', kind: 'drone', activeAt: 1 },
  { x: '84%', y: '42%', label: 'u2', kind: 'drone', activeAt: 1 },
  { x: '24%', y: '76%', label: 'p1', kind: 'phone', activeAt: 2 },
  { x: '57%', y: '72%', label: 'p2', kind: 'phone', activeAt: 2 },
]
</script>

<template>
  <div class="edge-scenario" :data-step="step" role="img" aria-label="Mobile edge devices learning from local observations across different environments">
    <div class="edge-map">
      <div class="edge-region region-traffic">
        <span>traffic</span>
      </div>
      <div class="edge-region region-air">
        <span>aerial</span>
      </div>
      <div class="edge-region region-crowd">
        <span>crowd</span>
      </div>

      <svg class="edge-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="edge-route route-a" d="M 12 28 C 32 12, 48 30, 72 20" />
        <path class="edge-route route-b" d="M 22 80 C 40 58, 60 88, 86 42" />
        <path class="edge-route route-c" d="M 16 24 C 34 42, 56 52, 84 42" />
      </svg>

      <div
        v-for="device in devices"
        :key="device.label"
        class="edge-device"
        :class="[device.kind, { visible: step >= device.activeAt }]"
        :style="{ left: device.x, top: device.y }"
      >
        <span class="device-core">{{ device.label }}</span>
        <span class="device-model">local model</span>
      </div>

      <div class="edge-privacy-boundary">
        <span>raw observations stay local</span>
      </div>
    </div>

    <div class="edge-readout">
      <div class="readout-item" :class="{ active: step >= 0 }">
        <strong>Connected vehicles</strong>
        <span>traffic state changes by neighborhood</span>
      </div>
      <div class="readout-item" :class="{ active: step >= 1 }">
        <strong>Drone swarms</strong>
        <span>sensing conditions shift by monitored area</span>
      </div>
      <div class="readout-item" :class="{ active: step >= 2 }">
        <strong>Participatory sensing</strong>
        <span>personal devices sample different contexts</span>
      </div>
      <div class="readout-item accent" :class="{ active: step >= 3 }">
        <strong>Collective learning</strong>
        <span>knowledge must move without centralizing data</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edge-scenario {
  display: grid;
  gap: 0.75rem;
  width: 100%;
}

.edge-map {
  position: relative;
  height: 17.4rem;
  overflow: hidden;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}

.edge-region {
  position: absolute;
  display: grid;
  place-items: center;
  color: rgba(16, 32, 43, 0.42);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.6rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.edge-region span {
  padding: 0.16rem 0.4rem;
  background: rgba(255, 255, 255, 0.76);
}

.region-traffic {
  inset: 0 52% 45% 0;
  background: rgba(15, 76, 92, 0.13);
}

.region-air {
  inset: 0 0 36% 48%;
  background: rgba(47, 107, 91, 0.13);
}

.region-crowd {
  inset: 48% 0 0 0;
  background: rgba(217, 119, 6, 0.13);
}

.edge-links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.edge-route {
  fill: none;
  stroke: rgba(16, 32, 43, 0.18);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-dasharray: 5 5;
  vector-effect: non-scaling-stroke;
}

.edge-route.route-b {
  stroke: rgba(217, 119, 6, 0.4);
}

.edge-route.route-c {
  stroke: rgba(15, 76, 92, 0.32);
}

.edge-device {
  position: absolute;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 0.18rem;
  min-width: 4.2rem;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.86);
  transition: opacity 320ms ease, transform 320ms ease;
}

.edge-device.visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.device-core {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 2px solid var(--deck-teal);
  border-radius: 50%;
  background: #ffffff;
  color: var(--deck-teal);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.62rem !important;
  font-weight: 800;
  box-shadow: 0 6px 18px rgba(16, 32, 43, 0.08);
}

.drone .device-core {
  border-color: var(--deck-green);
  color: var(--deck-green);
}

.phone .device-core {
  border-color: var(--deck-orange);
  color: #9a5302;
}

.device-model {
  padding: 0.08rem 0.32rem;
  background: rgba(255, 255, 255, 0.86);
  color: var(--deck-muted);
  font-family: var(--deck-font-mono, 'IBM Plex Mono', monospace);
  font-size: 0.5rem !important;
  white-space: nowrap;
}

.edge-privacy-boundary {
  position: absolute;
  right: 0.75rem;
  bottom: 0.65rem;
  padding: 0.36rem 0.55rem;
  border-left: 3px solid var(--deck-orange);
  background: rgba(255, 255, 255, 0.86);
  color: var(--deck-muted);
  font-size: 0.62rem !important;
}

.edge-readout {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.readout-item {
  min-height: 4.6rem;
  padding: 0.58rem 0.65rem;
  border-top: 3px solid #cbd7dc;
  background: rgba(255, 255, 255, 0.72);
  color: var(--deck-muted);
  opacity: 0.5;
  transition: 240ms ease;
}

.readout-item.active {
  border-top-color: var(--deck-teal);
  opacity: 1;
}

.readout-item.accent.active {
  border-top-color: var(--deck-orange);
  background: var(--deck-orange-soft);
}

.readout-item strong {
  display: block;
  color: var(--deck-ink);
  font-size: 0.74rem !important;
}

.readout-item span {
  display: block;
  margin-top: 0.16rem;
  font-size: 0.62rem !important;
  line-height: 1.25;
}
</style>
