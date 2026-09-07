<script setup lang="ts">
import { computed } from 'vue'
import { clusterModels, clusterPairs, trafficSites } from './trafficCityConfig'

const props = defineProps<{
  mode: 'reference' | 'federated' | 'clustered'
  step?: number
}>()

const currentStep = computed(() => Math.max(0, props.step ?? 0))
const accessibleLabel = computed(() => {
  if (props.mode === 'reference') {
    if (currentStep.value === 0) return 'One traffic junction with a roadside camera forecasting local traffic.'
    if (currentStep.value === 1) return 'Two contrasting traffic junctions: dense rush hour versus fast sparse ring road flow.'
    return 'Six heterogeneous traffic junctions across the city with distinct traffic patterns.'
  }
  return props.mode === 'federated'
    ? 'Six traffic junctions with different flows train locally, merge model updates, and receive one shared model.'
    : 'The same six traffic junctions are grouped by compatible traffic patterns and receive one specialized model per group.'
})

function getSitePos(site: (typeof trafficSites)[number]) {
  if (props.mode === 'reference') {
    if (currentStep.value === 0) {
      if (site.id === 'centre') return { x: 50, y: 50 }
    }
    return { x: site.x, y: site.y }
  }
  if (props.mode === 'clustered' && currentStep.value >= 1) {
    if (site.id === 'stadium') return { x: 17, y: 78 }
    if (site.id === 'residential') return { x: 50, y: 78 }
    if (site.id === 'arterial') return { x: 83, y: 78 }
  }
  return { x: site.x, y: site.y }
}

function isSiteHidden(site: (typeof trafficSites)[number]) {
  if (props.mode === 'reference') {
    if (currentStep.value === 0) {
      return site.id !== 'centre'
    }
    if (currentStep.value === 1) {
      return site.id !== 'centre' && site.id !== 'ring'
    }
    return false
  }
  return false
}

// Draw arrowheads in the same SVG coordinate system as the routes. SVG
// markers are scaled inconsistently by some Slidev/PDF renderers, especially
// when the map is stretched with preserveAspectRatio="none".
function arrowHeadPath(x1: number, y1: number, x2: number, y2: number, size = 3.8) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const baseX = x2 - Math.cos(angle) * size
  const baseY = y2 - Math.sin(angle) * size
  const wing = size * 0.58
  const perpX = -Math.sin(angle) * wing
  const perpY = Math.cos(angle) * wing
  return `M ${x2} ${y2} L ${baseX + perpX} ${baseY + perpY} L ${baseX - perpX} ${baseY - perpY} Z`
}
</script>

<template>
  <div
    class="traffic-city"
    :class="`mode-${mode}`"
    :data-step="currentStep"
    role="img"
    :aria-label="accessibleLabel"
  >
    <div class="map-texture" aria-hidden="true" />

    <div
      v-if="mode === 'clustered'"
      v-for="cKey in (['a', 'b', 'c'] as const)"
      :key="`card-${cKey}`"
      class="cluster-card"
      :class="`cluster-${cKey}`"
      aria-hidden="true"
    />

    <svg v-if="mode !== 'reference'" class="model-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g class="federated-uplinks">
        <template v-for="site in trafficSites" :key="`up-${site.id}`">
          <line :x1="site.x" :y1="site.y" x2="50" y2="50" />
          <path class="marker-update" :d="arrowHeadPath(site.x, site.y, 50, 50)" />
        </template>
      </g>

      <g class="shared-downlinks">
        <template v-for="site in trafficSites" :key="`down-${site.id}`">
          <line x1="50" y1="50" :x2="site.x" :y2="site.y" />
          <path class="marker-shared" :d="arrowHeadPath(50, 50, site.x, site.y)" />
        </template>
      </g>

      <g class="global-links">
        <line
          v-for="site in trafficSites"
          :key="`global-${site.id}`"
          x1="50" y1="50" :x2="getSitePos(site).x" :y2="getSitePos(site).y"
        />
      </g>

      <g class="compatibility-links">
        <line
          v-for="pair in clusterPairs"
          :key="`pair-${pair.cluster}`"
          :class="`cluster-${pair.cluster}`"
          :x1="pair.sites[0].x" :y1="pair.sites[0].y"
          :x2="pair.sites[1].x" :y2="pair.sites[1].y"
        />
      </g>

      <g class="cluster-links">
        <template v-for="model in clusterModels" :key="`model-links-${model.cluster}`">
          <line
            v-for="site in trafficSites.filter((candidate) => candidate.cluster === model.cluster)"
            :key="`${model.cluster}-${site.id}`"
            :class="`cluster-${model.cluster}`"
            :x1="model.x" :y1="model.y"
            :x2="getSitePos(site).x" :y2="getSitePos(site).y"
          />
        </template>
      </g>
    </svg>

    <section
      v-for="site in trafficSites"
      :key="site.id"
      class="traffic-site"
      :class="[
        `cluster-${site.cluster}`,
        `flow-${site.id}`,
        {
          'site-hero': mode === 'reference' && currentStep === 0 && site.id === 'centre',
          'is-hidden': isSiteHidden(site),
        }
      ]"
      :style="{ left: `${getSitePos(site).x}%`, top: `${getSitePos(site).y}%` }"
      :aria-label="`${site.camera}, ${site.name}: ${site.flow}`"
    >
      <div class="site-label">
        <span>{{ site.camera }}</span>
        <strong>{{ site.name }}</strong>
        <small>{{ site.flow }}</small>
      </div>

      <div class="road road-horizontal"><span /></div>
      <div class="road road-vertical"><span /></div>
      <div class="intersection" />

      <i
        v-for="(vehicle, vehicleIndex) in site.vehicles"
        :key="`${site.id}-vehicle-${vehicleIndex}`"
        class="vehicle"
        :class="[vehicle.direction, `tone-${vehicle.tone}`, `kind-${vehicle.kind}`]"
        :style="{
          '--vehicle-duration': `${vehicle.duration}s`,
          '--vehicle-delay': `${vehicle.delay}s`,
          '--vehicle-track': `${vehicle.track}rem`,
        }"
      />

      <div class="camera-icon" aria-hidden="true">
        <span class="camera-body"><i /></span>
        <span class="camera-pole" />
        <span v-if="mode === 'reference' && currentStep === 0 && site.id === 'centre'" class="camera-cone" />
      </div>

      <div v-if="mode !== 'reference'" class="site-model" :class="`cluster-${site.cluster}`">
        <template v-if="mode === 'clustered' && currentStep >= 2">ω{{ site.cluster.toUpperCase() }}</template>
        <template v-else-if="mode === 'federated' && currentStep >= 3">ωG</template>
        <template v-else>θ{{ site.camera.slice(-2) }}</template>
      </div>

      <div v-if="mode !== 'reference'" class="group-badge" :class="`cluster-${site.cluster}`">GROUP {{ site.cluster.toUpperCase() }}</div>
    </section>

    <div v-if="mode === 'reference' && currentStep === 0" class="hero-forecast-badge">
      <span class="pulse-dot" />
      <strong>TASK: TRAFFIC FORECASTING</strong>
    </div>

    <template v-if="mode !== 'reference'">
      <div class="global-model">
        <strong v-if="mode === 'federated' && currentStep === 2">MERGE</strong>
        <strong v-else>ωG</strong>
        <small v-if="mode === 'federated' && currentStep === 2">model updates</small>
        <small v-else-if="mode === 'federated'">shared model</small>
        <small v-else>one global model</small>
      </div>

      <div
        v-if="mode === 'clustered'"
        v-for="model in clusterModels"
        :key="model.cluster"
        class="cluster-model"
        :class="`cluster-${model.cluster}`"
        :style="{ left: `${model.x}%`, top: `${model.y}%` }"
      >
        <strong>{{ model.label }}</strong>
        <small>group {{ model.cluster.toUpperCase() }}</small>
      </div>

      <div class="map-status status-local">six local models</div>
      <div class="map-status status-merge">updates meet here</div>
      <div class="map-status status-shared">one model reaches all six junctions</div>
      <div class="map-status status-specialized">three merged models, each reused at compatible junctions</div>
    </template>
  </div>
</template>

<style scoped>
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R4 V5
 * genre: editorial/technical · macrostructure: Map / Diagram · theme: existing paper + teal · enrichment: Tier-A CSS city map
 * audience: academic/technical · use: live explanation · tone: concrete and legible
 * contrast: pass (40–41) · honest: pass (46) · chrome: pass (47) · tokens: pass (48) · slop: pass
 */
.traffic-city {
  --map-road: var(--deck-traffic-road);
  --map-road-line: var(--deck-traffic-road-line);
  --map-land: var(--deck-traffic-land);
  --map-ink: var(--deck-ink);
  --map-muted: var(--deck-muted);
  --map-update: var(--deck-orange);
  --map-shared: var(--deck-teal);
  --cluster-a: var(--deck-cluster-a);
  --cluster-b: var(--deck-cluster-b);
  --cluster-c: var(--deck-cluster-c);
  position: relative;
  width: min(100%, 54rem);
  height: 18rem;
  margin: 0 auto;
  overflow: hidden;
  border-block: 1px solid var(--deck-line);
  background: var(--map-land);
  isolation: isolate;
}

.traffic-city.mode-clustered { height: 16.5rem; }

.map-texture {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.55;
  background:
    linear-gradient(90deg, transparent 49.7%, color-mix(in oklch, var(--deck-line) 42%, transparent) 49.7% 50.3%, transparent 50.3%),
    linear-gradient(0deg, transparent 49.7%, color-mix(in oklch, var(--deck-line) 42%, transparent) 49.7% 50.3%, transparent 50.3%);
}

.cluster-card {
  position: absolute;
  top: 1.2%;
  bottom: 1.2%;
  width: 31%;
  border-radius: 6px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.97);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
}

.cluster-card.cluster-a {
  left: 1.5%;
  background: color-mix(in oklch, var(--cluster-a) 5%, transparent);
}

.cluster-card.cluster-b {
  left: 34.5%;
  background: color-mix(in oklch, var(--cluster-b) 5%, transparent);
}

.cluster-card.cluster-c {
  left: 67.5%;
  background: color-mix(in oklch, var(--cluster-c) 5%, transparent);
}

.model-routes {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.model-routes line {
  vector-effect: non-scaling-stroke;
  fill: none;
  stroke-width: 1.6;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.federated-uplinks,
.shared-downlinks,
.global-links,
.compatibility-links,
.cluster-links {
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.federated-uplinks line {
  stroke: var(--map-update);
  stroke-width: 2.2;
  stroke-dasharray: 4 5;
}

.marker-update { fill: var(--map-update); }

.shared-downlinks line {
  stroke: var(--map-shared);
  stroke-width: 2.1;
  stroke-dasharray: 3 4;
}

.marker-shared { fill: var(--map-shared); }

.global-links line {
  stroke: color-mix(in oklch, var(--map-shared) 38%, transparent);
  stroke-dasharray: 3 5;
}

.compatibility-links line,
.cluster-links line {
  stroke-width: 2.3;
  stroke-dasharray: 4 4;
}

.model-routes .cluster-a { stroke: var(--cluster-a); }
.model-routes .cluster-b { stroke: var(--cluster-b); }
.model-routes .cluster-c { stroke: var(--cluster-c); }

.traffic-site {
  position: absolute;
  width: 29.5%;
  height: 38%;
  transform: translate(-50%, -50%) scale(1);
  overflow: hidden;
  z-index: 1;
  background:
    linear-gradient(90deg, transparent 0 9%, color-mix(in oklch, var(--deck-teal-soft) 34%, transparent) 9% 25%, transparent 25% 77%, color-mix(in oklch, var(--deck-orange-soft) 35%, transparent) 77% 92%, transparent 92%),
    var(--map-land);
  outline: 0 solid transparent;
  outline-offset: -2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  transition:
    left 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    top 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    opacity var(--deck-dur-long) var(--deck-ease-out),
    outline-color var(--deck-dur-long) var(--deck-ease-out),
    box-shadow var(--deck-dur-long) var(--deck-ease-out),
    border-color var(--deck-dur-long) var(--deck-ease-out);
}

.traffic-site.is-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translate(-50%, -50%) scale(0.72) !important;
}

.traffic-site.site-hero {
  transform: translate(-50%, -50%) scale(1.42) !important;
  z-index: 10;
  box-shadow: 0 12px 32px rgba(15, 76, 92, 0.22);
  border-color: var(--deck-teal);
}

.road {
  position: absolute;
  z-index: 1;
  background: var(--map-road);
  box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--map-road) 82%, var(--deck-ink));
}

.road-horizontal {
  left: -3%;
  right: -3%;
  top: 57%;
  height: 2.45rem;
  transform: translateY(-50%);
}

.road-vertical {
  top: -5%;
  bottom: -5%;
  left: 54%;
  width: 2.45rem;
  transform: translateX(-50%);
}

.road span {
  position: absolute;
  inset: 0;
}

.road-horizontal span {
  background: linear-gradient(90deg, var(--map-road-line) 0 38%, transparent 38% 62%, var(--map-road-line) 62% 100%) center / 1.2rem 2px repeat-x;
}

.road-vertical span {
  background: linear-gradient(0deg, var(--map-road-line) 0 38%, transparent 38% 62%, var(--map-road-line) 62% 100%) center / 2px 1.2rem repeat-y;
}

.intersection {
  position: absolute;
  z-index: 2;
  left: 54%;
  top: 57%;
  width: 2.45rem;
  height: 2.45rem;
  transform: translate(-50%, -50%);
  border: 1px solid color-mix(in oklch, var(--map-road-line) 70%, transparent);
  background: color-mix(in oklch, var(--map-road) 92%, var(--deck-ink));
}

.site-label {
  position: absolute;
  left: 0.42rem;
  top: 0.34rem;
  z-index: 6;
  max-width: calc(100% - 3.2rem);
  padding: var(--deck-space-3xs) var(--deck-space-2xs);
  background: color-mix(in oklch, var(--map-land) 92%, transparent);
  line-height: 1.06;
}

.site-label span,
.site-label small,
.group-badge,
.privacy-note,
.map-status,
.global-model small,
.cluster-model small {
  font-family: var(--deck-font-mono);
}

.site-label span {
  display: block;
  color: var(--map-muted);
  font-size: 0.6rem !important;
  letter-spacing: 0.06em;
}

.site-label strong {
  display: block;
  color: var(--map-ink);
  font-size: 0.62rem !important;
  letter-spacing: 0.015em;
}

.site-label small {
  display: block;
  color: var(--map-muted);
  font-size: 0.6rem !important;
}

.hero-forecast-badge {
  position: absolute;
  top: 0.72rem;
  right: 0.9rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.58rem;
  background: color-mix(in oklch, var(--deck-teal) 11%, var(--map-land));
  border: 1px solid var(--deck-teal);
  border-radius: 5px;
  font-family: var(--deck-font-mono);
  color: var(--deck-teal);
  font-size: 0.6rem !important;
  letter-spacing: 0.04em;
  box-shadow: 0 2px 8px rgba(15, 76, 92, 0.14);
  white-space: nowrap;
  pointer-events: none;
}

.pulse-dot {
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 50%;
  background: var(--deck-orange);
  animation: ping-pulse 1.6s infinite ease-in-out;
}

@keyframes ping-pulse {
  0%, 100% { transform: scale(0.85); opacity: 0.7; }
  50% { transform: scale(1.35); opacity: 1; }
}

.vehicle {
  --vehicle-track: 0rem;
  position: absolute;
  z-index: 4;
  display: block;
  width: 0.76rem;
  height: 0.38rem;
  border: 1px solid color-mix(in oklch, currentColor 76%, var(--map-ink));
  background: currentColor;
  border-radius: 0.1rem;
  animation-duration: var(--vehicle-duration);
  animation-delay: var(--vehicle-delay);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.vehicle::after {
  content: '';
  position: absolute;
  inset: 0.08rem 0.16rem;
  background: color-mix(in oklch, var(--map-road-line) 75%, transparent);
}

.vehicle.kind-van { width: 0.92rem; }
.vehicle.tone-teal { color: var(--deck-car-teal); }
.vehicle.tone-orange { color: var(--deck-car-orange); }
.vehicle.tone-green { color: var(--deck-car-green); }
.vehicle.tone-plum { color: var(--deck-car-plum); }

.vehicle.east {
  left: -1.2rem;
  top: calc(57% - 0.76rem);
  animation-name: drive-east;
}

.vehicle.west {
  right: -1.2rem;
  top: calc(57% + 0.38rem);
  animation-name: drive-west;
}

.vehicle.north,
.vehicle.south {
  width: 0.38rem;
  height: 0.76rem;
}

.vehicle.north.kind-van,
.vehicle.south.kind-van { height: 0.92rem; }

.vehicle.north {
  bottom: -1.2rem;
  left: calc(54% - 0.76rem);
  animation-name: drive-north;
}

.vehicle.south {
  top: -1.2rem;
  left: calc(54% + 0.38rem);
  animation-name: drive-south;
}

/* Collision-free schedules: conflicting directions never enter together. */
.flow-centre .vehicle.east,
.flow-school .vehicle.east,
.flow-residential .vehicle.east,
.flow-stadium .vehicle.east {
  --flow-x-end: 20rem;
  --centre-stop-1: 4.8rem;
  --centre-stop-2: 10rem;
  --centre-back-stop-1: 3.4rem;
  --centre-back-stop-2: 8.4rem;
  --school-front-stop: 7.2rem;
  --school-back-stop: 5.7rem;
}

.flow-centre .vehicle.west,
.flow-school .vehicle.west,
.flow-residential .vehicle.west,
.flow-stadium .vehicle.west {
  --flow-x-end: -20rem;
  --centre-stop-1: -4.8rem;
  --centre-stop-2: -10rem;
  --centre-back-stop-1: -3.4rem;
  --centre-back-stop-2: -8.4rem;
  --school-front-stop: -7.2rem;
  --school-back-stop: -5.7rem;
}

.flow-centre .vehicle.north,
.flow-residential .vehicle.north,
.flow-stadium .vehicle.north {
  --flow-y-end: -9.5rem;
  --centre-y-stop-1: -2.35rem;
  --centre-y-stop-2: -5.1rem;
}

.flow-centre .vehicle.south,
.flow-school .vehicle.south,
.flow-residential .vehicle.south,
.flow-stadium .vehicle.south {
  --flow-y-end: 9.5rem;
  --centre-y-stop-1: 2.35rem;
  --centre-y-stop-2: 5.1rem;
}

.flow-centre .vehicle:nth-of-type(1),
.flow-centre .vehicle:nth-of-type(3) { animation-name: centre-horizontal-front; }
.flow-centre .vehicle:nth-of-type(2),
.flow-centre .vehicle:nth-of-type(4) { animation-name: centre-horizontal-back; }
.flow-centre .vehicle:nth-of-type(5),
.flow-centre .vehicle:nth-of-type(6) { animation-name: centre-vertical; }

.flow-school .vehicle:nth-of-type(1),
.flow-school .vehicle:nth-of-type(3) { animation-name: school-horizontal-front; }
.flow-school .vehicle:nth-of-type(2),
.flow-school .vehicle:nth-of-type(4) { animation-name: school-horizontal-back; }
.flow-school .vehicle:nth-of-type(5) { animation-name: school-vertical; }

.flow-residential .vehicle.east,
.flow-residential .vehicle.west { animation-name: signal-horizontal; }
.flow-residential .vehicle.north,
.flow-residential .vehicle.south { animation-name: signal-vertical; }

.flow-stadium .vehicle.north,
.flow-stadium .vehicle.south { animation-name: surge-vertical; }
.flow-stadium .vehicle.east,
.flow-stadium .vehicle.west { animation-name: surge-horizontal; }

.camera-cone {
  position: absolute;
  left: 0.21rem;
  top: 0.035rem;
  z-index: 0;
  width: 2.8rem;
  height: 1.35rem;
  background: linear-gradient(90deg, color-mix(in oklch, var(--deck-teal) 38%, transparent), color-mix(in oklch, var(--deck-teal) 12%, transparent));
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  transform: rotate(127deg);
  transform-origin: 0 50%;
  pointer-events: none;
  animation: radar-pulse 3s infinite ease-in-out;
}

@keyframes radar-pulse {
  0%, 100% { opacity: 0.58; }
  50% { opacity: 0.9; }
}

.camera-icon {
  position: absolute;
  z-index: 6;
  left: calc(54% + 1.15rem);
  top: calc(57% - 1.55rem);
  width: 1.05rem;
  height: 1.35rem;
  color: var(--map-shared);
}

.camera-body {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 1.05rem;
  height: 0.58rem;
  border: 2px solid currentColor;
  background: var(--map-land);
  transform: rotate(127deg);
  transform-origin: center;
}

.camera-body::after {
  content: '';
  position: absolute;
  right: -0.24rem;
  top: 0.08rem;
  border-block: 0.12rem solid transparent;
  border-left: 0.22rem solid currentColor;
}

.camera-body i {
  position: absolute;
  right: 0.12rem;
  top: 0.11rem;
  width: 0.19rem;
  height: 0.19rem;
  border-radius: 50%;
  background: var(--map-update);
}

.camera-pole {
  position: absolute;
  z-index: 2;
  left: 0.5rem;
  top: 0.62rem;
  width: 2px;
  height: 0.66rem;
  background: currentColor;
}

.site-model {
  position: absolute;
  z-index: 7;
  right: 0.38rem;
  top: 0.34rem;
  width: 1.72rem;
  height: 1.72rem;
  display: grid;
  place-items: center;
  border: 2px solid var(--map-shared);
  border-radius: 50%;
  background: var(--map-land);
  color: var(--map-shared);
  font-family: var(--deck-font-mono);
  font-size: 0.6rem !important;
  font-weight: 600;
  opacity: 0;
  transform: scale(0.72);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
}

.group-badge {
  position: absolute;
  z-index: 7;
  right: 0.3rem;
  bottom: 0.28rem;
  padding: var(--deck-space-3xs) var(--deck-space-2xs);
  border: 1px solid currentColor;
  background: var(--map-land);
  font-size: 0.6rem !important;
  font-weight: 600;
  letter-spacing: 0.05em;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
}

.traffic-site.cluster-a .group-badge,
.traffic-site.cluster-a .site-model { color: var(--cluster-a); border-color: var(--cluster-a); }
.traffic-site.cluster-b .group-badge,
.traffic-site.cluster-b .site-model { color: var(--cluster-b); border-color: var(--cluster-b); }
.traffic-site.cluster-c .group-badge,
.traffic-site.cluster-c .site-model { color: var(--cluster-c); border-color: var(--cluster-c); }

.privacy-note,
.map-status {
  position: absolute;
  z-index: 8;
  top: 50%;
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
}

.privacy-note {
  left: 1.2%;
  transform: translateY(-50%);
  padding: var(--deck-space-2xs) var(--deck-space-xs);
  border: 1px solid color-mix(in oklch, var(--map-update) 65%, var(--map-land));
  background: var(--map-land);
  color: color-mix(in oklch, var(--map-update) 76%, var(--map-ink));
  font-size: 0.6rem !important;
  letter-spacing: 0.035em;
  white-space: nowrap;
}

.privacy-note span { color: var(--map-update); font-size: 0.6rem !important; }

.global-model,
.cluster-model {
  position: absolute;
  z-index: 7;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.72);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
}

.global-model {
  left: 50%;
  top: 50%;
  width: 4.25rem;
  height: 4.25rem;
  border: 3px solid var(--map-land);
  background: var(--map-shared);
  color: var(--map-land);
  box-shadow: 0 0 0 1px var(--map-shared);
}

.global-model strong,
.cluster-model strong { color: inherit; }
.global-model strong { font-size: 0.76rem !important; line-height: 1; }
.global-model small { max-width: 3.5rem; font-size: 0.6rem !important; line-height: 1.12; }

.cluster-model {
  width: 3.45rem;
  height: 3.45rem;
  border: 3px solid var(--map-land);
  color: var(--map-land);
  box-shadow: 0 0 0 1px currentColor;
}

.cluster-model.cluster-a { background: var(--cluster-a); }
.cluster-model.cluster-b { background: var(--cluster-b); }
.cluster-model.cluster-c { background: var(--cluster-c); }
.cluster-model strong { font-size: 0.68rem !important; line-height: 1; }
.cluster-model small { max-width: 2.8rem; font-size: 0.6rem !important; line-height: 1.05; }

.map-status {
  right: 1.2%;
  transform: translateY(calc(-50% + 4px));
  width: 13.2rem;
  padding: var(--deck-space-2xs) var(--deck-space-xs);
  border-top: 2px solid var(--map-shared);
  background: var(--map-land);
  color: var(--map-ink);
  font-size: 0.6rem !important;
  line-height: 1.25;
  text-align: right;
}

.mode-federated[data-step="1"] .site-model,
.mode-federated[data-step="2"] .site-model,
.mode-federated[data-step="3"] .site-model,
.mode-federated[data-step="2"] .federated-uplinks,
.mode-federated[data-step="2"] .global-model,
.mode-federated[data-step="2"] .privacy-note,
.mode-federated[data-step="3"] .shared-downlinks,
.mode-federated[data-step="3"] .global-model,
.mode-federated[data-step="3"] .privacy-note,
.mode-federated[data-step="1"] .status-local,
.mode-federated[data-step="2"] .status-merge,
.mode-federated[data-step="3"] .status-shared {
  opacity: 1;
}

.mode-federated[data-step="1"] .site-model,
.mode-federated[data-step="2"] .site-model,
.mode-federated[data-step="3"] .site-model,
.mode-federated[data-step="2"] .global-model,
.mode-federated[data-step="3"] .global-model {
  transform: translate(-50%, -50%) scale(1);
}

.mode-federated[data-step="1"] .site-model,
.mode-federated[data-step="2"] .site-model,
.mode-federated[data-step="3"] .site-model { transform: scale(1); }

.mode-federated[data-step="3"] .site-model {
  color: var(--map-shared);
  border-color: var(--map-shared);
}

.mode-federated[data-step="1"] .status-local,
.mode-federated[data-step="2"] .status-merge,
.mode-federated[data-step="3"] .status-shared,
.mode-clustered[data-step="1"] .status-groups,
.mode-clustered[data-step="2"] .status-specialized {
  transform: translateY(-50%);
}

.mode-clustered[data-step="0"] .global-links,
.mode-clustered[data-step="0"] .global-model,
.mode-clustered[data-step="1"] .cluster-card,
.mode-clustered[data-step="1"] .group-badge,
.mode-clustered[data-step="1"] .status-groups,
.mode-clustered[data-step="2"] .cluster-card,
.mode-clustered[data-step="2"] .cluster-links,
.mode-clustered[data-step="2"] .cluster-model,
.mode-clustered[data-step="2"] .group-badge,
.mode-clustered[data-step="2"] .site-model {
  opacity: 1;
}

.mode-clustered[data-step="0"] .global-model,
.mode-clustered[data-step="2"] .cluster-model,
.mode-clustered[data-step="2"] .site-model {
  transform: translate(-50%, -50%) scale(1);
}

.mode-clustered[data-step="2"] .site-model { transform: scale(1); }

.mode-clustered[data-step="1"] .group-badge,
.mode-clustered[data-step="2"] .group-badge { transform: translateY(0); }

.mode-clustered[data-step="1"] .traffic-site.cluster-a,
.mode-clustered[data-step="2"] .traffic-site.cluster-a { outline: 2px solid var(--cluster-a); }
.mode-clustered[data-step="1"] .traffic-site.cluster-b,
.mode-clustered[data-step="2"] .traffic-site.cluster-b { outline: 2px dashed var(--cluster-b); }
.mode-clustered[data-step="1"] .traffic-site.cluster-c,
.mode-clustered[data-step="2"] .traffic-site.cluster-c { outline: 3px double var(--cluster-c); }

@keyframes drive-east {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(20rem, 0, 0); }
}
@keyframes drive-west {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-20rem, 0, 0); }
}
@keyframes drive-north {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -9.5rem, 0); }
}
@keyframes drive-south {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, 9.5rem, 0); }
}

/* Dense centre: two staggered queues clear before cross traffic enters. */
@keyframes centre-horizontal-front {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  2% { opacity: 1; }
  12%, 18% { transform: translate3d(var(--centre-stop-1), 0, 0); }
  27%, 33% { transform: translate3d(var(--centre-stop-2), 0, 0); }
  44% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  46%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}
@keyframes centre-horizontal-back {
  0%, 4% { transform: translate3d(0, 0, 0); opacity: 0; }
  6% { opacity: 1; }
  16%, 22% { transform: translate3d(var(--centre-back-stop-1), 0, 0); }
  31%, 37% { transform: translate3d(var(--centre-back-stop-2), 0, 0); }
  48% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  50%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}
@keyframes centre-vertical {
  0%, 54% { transform: translate3d(0, 0, 0); opacity: 0; }
  56% { opacity: 1; }
  65%, 70% { transform: translate3d(0, var(--centre-y-stop-1), 0); }
  79%, 84% { transform: translate3d(0, var(--centre-y-stop-2), 0); }
  98% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 1; }
  100% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 0; }
}

/* School gate: a real two-car queue stops, then departs in order. */
@keyframes school-horizontal-front {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  2% { opacity: 1; }
  18%, 42% { transform: translate3d(var(--school-front-stop), 0, 0); }
  52% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  54%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}
@keyframes school-horizontal-back {
  0%, 4% { transform: translate3d(0, 0, 0); opacity: 0; }
  6% { opacity: 1; }
  22%, 46% { transform: translate3d(var(--school-back-stop), 0, 0); }
  58% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  60%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}
@keyframes school-vertical {
  0%, 67% { transform: translate3d(0, 0, 0); opacity: 0; }
  69% { opacity: 1; }
  96% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 1; }
  98%, 100% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 0; }
}

/* Steady local flow obeys alternating horizontal/vertical right of way. */
@keyframes signal-horizontal {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  2% { opacity: 1; }
  38% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  40%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}
@keyframes signal-vertical {
  0%, 54% { transform: translate3d(0, 0, 0); opacity: 0; }
  56% { opacity: 1; }
  94% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 1; }
  96%, 100% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 0; }
}

/* Stadium: vertical event traffic clears before the transverse wave starts. */
@keyframes surge-vertical {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  2% { opacity: 1; }
  38% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 1; }
  40%, 100% { transform: translate3d(0, var(--flow-y-end), 0); opacity: 0; }
}
@keyframes surge-horizontal {
  0%, 51% { transform: translate3d(0, 0, 0); opacity: 0; }
  53% { opacity: 1; }
  88% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 1; }
  90%, 100% { transform: translate3d(var(--flow-x-end), 0, 0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .vehicle { animation: none; }
  .model-routes *,
  .global-model,
  .cluster-model,
  .site-model,
  .group-badge,
  .privacy-note,
  .map-status { transition-duration: 150ms !important; }
}
</style>
