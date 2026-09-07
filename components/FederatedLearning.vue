<script setup lang="ts">
import { computed } from 'vue'
import MathTex from './MathTex.vue'

const props = defineProps<{ click?: number }>()
const phase = computed(() => Math.min(Math.max(props.click ?? 0, 0) + 1, 4))

/* Scene geometry, in viewBox user units. Everything — nodes, edges, labels —
   lives in one SVG so the arrows can never drift away from the boxes. */
const VB = { w: 620, h: 384 }
const server = { x: 310, y: 192, w: 156, h: 62 }
const R = 27
const clients = [
  { id: 'd1', x: 92, y: 66 },
  { id: 'd2', x: 528, y: 66 },
  { id: 'd3', x: 92, y: 318 },
  { id: 'd4', x: 528, y: 318 },
]

/* Trim each edge to the server's rectangle and the client's circle so the
   arrowhead lands on the border instead of under the node. */
const edges = computed(() =>
  clients.map((c) => {
    const dx = c.x - server.x
    const dy = c.y - server.y
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const tRect = Math.min((server.w / 2 + 6) / Math.abs(ux), (server.h / 2 + 6) / Math.abs(uy))
    const gap = R + 9
    return {
      id: c.id,
      x1: server.x + ux * tRect,
      y1: server.y + uy * tRect,
      x2: c.x - ux * gap,
      y2: c.y - uy * gap,
      mx: server.x + ux * (tRect + (len - tRect - gap) * 0.5),
      my: server.y + uy * (tRect + (len - tRect - gap) * 0.5),
    }
  }),
)

/* What travels on the link, per step. */
const payload = computed(() => {
  if (phase.value === 1) return { label: '\\omega_G', tone: 'teal', dir: 'down' }
  if (phase.value === 3) return { label: '\\Delta_i', tone: 'orange', dir: 'up' }
  if (phase.value === 4) return { label: "\\omega_G'", tone: 'green', dir: 'down' }
  return null
})

</script>

<template>
  <div class="fl-explainer">
    <svg class="fl-scene" :class="`is-phase-${phase}`" :viewBox="`0 0 ${VB.w} ${VB.h}`" role="img"
    aria-label="Four devices exchange model parameters with a central server">
    <defs>
      <marker v-for="tone in ['teal', 'orange', 'green']" :key="tone" :id="`fl-head-${tone}`"
        viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.4" markerHeight="5.4"
        orient="auto-start-reverse" markerUnits="strokeWidth">
        <path d="M0 0 L10 5 L0 10 Z" :class="`fill-${tone}`" />
      </marker>
    </defs>

    <!-- links -->
    <g class="fl-edges">
      <line v-for="e in edges" :key="`rail-${e.id}`" class="edge-rail"
        :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" />
      <line v-for="e in edges" :key="`live-${e.id}`" class="edge-live"
        :class="[payload ? `tone-${payload.tone}` : '', payload ? `dir-${payload.dir}` : '']"
        :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
        :marker-end="payload && payload.dir === 'down' ? `url(#fl-head-${payload.tone})` : undefined"
        :marker-start="payload && payload.dir === 'up' ? `url(#fl-head-${payload.tone})` : undefined" />
    </g>

    <!-- what is on the wire right now -->
    <g v-if="payload" class="fl-payloads" :class="`tone-${payload.tone}`">
      <g v-for="e in edges" :key="`pay-${e.id}`" :transform="`translate(${e.mx}, ${e.my})`">
        <rect x="-25" y="-13" width="50" height="26" rx="4" />
        <foreignObject x="-25" y="-13" width="50" height="26">
          <div class="chip-label"><MathTex :math="payload.label" /></div>
        </foreignObject>
      </g>
    </g>

    <!-- clients -->
    <g v-for="c in clients" :key="c.id" class="fl-client">
      <circle class="client-halo" :cx="c.x" :cy="c.y" :r="R + 7" />
      <circle class="client-ring" :cx="c.x" :cy="c.y" :r="R" />
      <text class="client-id" :x="c.x" :y="c.y + 0.5" dominant-baseline="middle" text-anchor="middle">
        {{ c.id }}
      </text>
      <text class="client-sub" :x="c.x" :y="c.y + R + 17" text-anchor="middle">private data</text>
      <g class="client-badge" :transform="`translate(${c.x}, ${c.y - R - 15})`">
        <rect x="-36" y="-9.5" width="72" height="19" rx="3" />
        <text x="0" y="0.5" dominant-baseline="middle" text-anchor="middle">training…</text>
      </g>
    </g>

    <!-- server -->
    <g class="fl-server">
      <rect class="server-box" :x="server.x - server.w / 2" :y="server.y - server.h / 2"
        :width="server.w" :height="server.h" rx="3" />
      <text class="server-label" :x="server.x" :y="server.y - 8" dominant-baseline="middle" text-anchor="middle">
        SERVER
      </text>
      <foreignObject :x="server.x - server.w / 2" :y="server.y + 3" :width="server.w" height="20">
        <div class="server-sub">
          <template v-if="phase === 4">new <MathTex math="\omega_G" /> ready</template>
          <template v-else>global model <MathTex math="\omega_G" /></template>
        </div>
      </foreignObject>
      <g class="server-badge" :transform="`translate(${server.x}, ${server.y - server.h / 2 - 16})`">
        <rect x="-62" y="-11" width="124" height="22" rx="3" />
        <foreignObject x="-62" y="-11" width="124" height="22">
          <div class="badge-label">FedAvg → new <MathTex math="\omega_G" /></div>
        </foreignObject>
      </g>
    </g>
    </svg>

    <ol class="fl-steps">
      <li class="fl-step" :class="{ active: phase === 1, done: phase > 1 }">
        <span class="num">1</span>
        <span class="txt"><strong>Broadcast</strong><small><MathTex math="\omega_G" /> to every device</small></span>
      </li>
      <li class="fl-step" :class="{ active: phase === 2, done: phase > 2 }">
        <span class="num">2</span>
        <span class="txt"><strong>Train locally</strong><small>a few epochs on private frames</small></span>
      </li>
      <li class="fl-step" :class="{ active: phase === 3, done: phase > 3 }">
        <span class="num">3</span>
        <span class="txt"><strong>Upload updates</strong><small>weight delta <MathTex math="\Delta_i" /> only</small></span>
      </li>
      <li class="fl-step" :class="{ active: phase === 4, done: phase > 4 }">
        <span class="num">4</span>
        <span class="txt"><strong>Aggregate &amp; repeat</strong><small>FedAvg averages the <MathTex math="\Delta_i" /></small></span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.fl-explainer {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.35rem;
  align-items: stretch;
  margin-top: 0.5rem;
}

.fl-scene {
  width: 100%;
  min-width: 0;
  height: auto;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background: linear-gradient(135deg, #f3f8f9, #ffffff);
}

/* ---- links ---------------------------------------------------------- */
.edge-rail {
  stroke: rgba(15, 76, 92, 0.16);
  stroke-width: 1.5;
  stroke-dasharray: 3 5;
}

.edge-live {
  stroke: transparent;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 11 8;
}

.edge-live.tone-teal { stroke: var(--deck-teal); }
.edge-live.tone-orange { stroke: var(--deck-orange); }
.edge-live.tone-green { stroke: var(--deck-green); }
.edge-live.dir-down { animation: fl-flow-down 1.1s linear infinite; }
.edge-live.dir-up { animation: fl-flow-up 1.1s linear infinite; }

@keyframes fl-flow-down { to { stroke-dashoffset: -19; } }
@keyframes fl-flow-up { to { stroke-dashoffset: 19; } }

.fill-teal { fill: var(--deck-teal); }
.fill-orange { fill: var(--deck-orange); }
.fill-green { fill: var(--deck-green); }

/* ---- payload chips -------------------------------------------------- */
.fl-payloads rect { stroke: #f6fafb; stroke-width: 3; paint-order: stroke; }
.chip-label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

/* foreignObject content is laid out in CSS px that equal SVG user units, and
   the deck's global `.slidev-layout span` rule would otherwise resize it. */
.fl-payloads :deep(.math-tex) {
  font-size: 15px !important;
}
.fl-payloads.tone-teal rect { fill: var(--deck-teal); }
.fl-payloads.tone-orange rect { fill: var(--deck-orange); }
.fl-payloads.tone-green rect { fill: var(--deck-green); }

/* ---- clients -------------------------------------------------------- */
.client-halo { fill: none; stroke: none; }
.client-ring {
  fill: #fff;
  stroke: var(--deck-teal);
  stroke-width: 2.2;
  transition: stroke 300ms ease;
}
.client-id {
  fill: var(--deck-teal);
  font-family: var(--deck-font-mono);
  font-size: 15px;
  font-weight: 700;
  transition: fill 300ms ease;
}
.client-sub {
  fill: var(--deck-muted);
  font-family: var(--deck-font-mono);
  font-size: 10.5px;
}
.client-badge { opacity: 0; }
.client-badge rect { fill: var(--deck-orange); stroke: #f6fafb; stroke-width: 3; paint-order: stroke; }
.client-badge text {
  fill: #fff;
  font-family: var(--deck-font-mono);
  font-size: 10.5px;
  font-weight: 600;
}

.is-phase-2 .client-ring { stroke: var(--deck-orange); }
.is-phase-2 .client-id { fill: #9a5302; }
.is-phase-2 .client-halo {
  fill: none;
  stroke: var(--deck-orange);
  stroke-width: 1.4;
  stroke-dasharray: 3 4;
  animation: fl-spin 9s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
}
.is-phase-2 .client-badge { opacity: 1; }

.is-phase-4 .client-ring { stroke: var(--deck-green); }
.is-phase-4 .client-id { fill: var(--deck-green); }

@keyframes fl-spin { to { transform: rotate(360deg); } }

/* ---- server --------------------------------------------------------- */
.server-box { fill: var(--deck-teal); transition: fill 300ms ease; }
.server-label {
  fill: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.server-sub {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  height: 100%;
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--deck-font-mono);
  font-size: 11px;
}

.server-sub :deep(.math-tex) {
  font-size: 12px !important;
}
.server-badge { opacity: 0; }
.server-badge rect { fill: var(--deck-green); stroke: #f6fafb; stroke-width: 3.5; paint-order: stroke; }
.badge-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  height: 100%;
  color: #fff;
  font-family: var(--deck-font-mono);
  font-size: 11px;
  font-weight: 600;
}

.badge-label :deep(.math-tex) {
  font-size: 12px !important;
}
.is-phase-4 .server-box { fill: var(--deck-green); }
.is-phase-4 .server-badge { opacity: 1; }

/* ---- steps ---------------------------------------------------------- */
.fl-steps {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fl-step {
  display: grid;
  grid-template-columns: 1.65rem 1fr;
  gap: 0.65rem;
  align-items: center;
  padding: 0.55rem 0.7rem;
  border-left: 4px solid #cbd7dc;
  background: rgba(255, 255, 255, 0.72);
  color: var(--deck-muted);
  opacity: 0.6;
  transition: 300ms ease;
}

.fl-step .num {
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: #dbe4e8;
  font-family: var(--deck-font-mono);
  font-size: 0.74rem !important;
  font-weight: 700;
}

.fl-step .txt { min-width: 0; }
.fl-step strong {
  display: block;
  color: inherit;
  font-size: 0.92rem !important;
  line-height: 1.2;
}
.fl-step small {
  display: block;
  margin-top: 0.12rem;
  font-size: 0.7rem !important;
  line-height: 1.3;
}

.fl-step small :deep(.math-tex) {
  font-size: inherit !important;
}

.fl-step.active {
  opacity: 1;
  border-left-color: var(--deck-orange);
  background: var(--deck-orange-soft);
  color: #9a5302;
}
.fl-step.active .num { background: var(--deck-orange); color: #fff; }
.fl-step.done { opacity: 0.9; border-left-color: var(--deck-teal); color: var(--deck-teal); }
.fl-step.done .num { background: var(--deck-teal); color: #fff; }
</style>
