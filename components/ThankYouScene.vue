<script setup lang="ts">
import BaseImg from './BaseImg.vue'

// Decorative backdrop for the closing slide: the same traffic vocabulary used
// throughout the deck (roads, cars, roadside cameras) tilted off-axis, plus a
// scatter of the deck's own figures pinned like photographs on a board.
// Purely ornamental, hence aria-hidden; the slide text carries the meaning.
const photos = [
  { src: 'figures/subregions.png', caption: 'Non-IID city regions', className: 'photo-a' },
  { src: 'figures/uncertainty_difference_heatmap.png', caption: 'Novelty matrix', className: 'photo-b' },
  { src: 'figures/cumulative_time.png', caption: 'Clustering cost', className: 'photo-c' },
  { src: 'figures/diagonal_vs_offdiagonal_barplot.png', caption: 'Within vs. across groups', className: 'photo-d' },
]

const vehicles = [
  { lane: 'road-lower', dir: 'east', tone: 'teal', kind: 'car', top: '1.15rem', duration: 13, delay: 0 },
  { lane: 'road-lower', dir: 'east', tone: 'orange', kind: 'van', top: '1.15rem', duration: 16, delay: 4.5 },
  { lane: 'road-lower', dir: 'west', tone: 'green', kind: 'car', top: '2.3rem', duration: 15, delay: 2 },
  { lane: 'road-lower', dir: 'west', tone: 'plum', kind: 'car', top: '2.3rem', duration: 18, delay: 8.5 },
  { lane: 'road-upper', dir: 'east', tone: 'plum', kind: 'car', top: '0.75rem', duration: 17, delay: 1.5 },
  { lane: 'road-upper', dir: 'west', tone: 'teal', kind: 'van', top: '1.85rem', duration: 19, delay: 6 },
  { lane: 'road-upper', dir: 'east', tone: 'green', kind: 'car', top: '0.75rem', duration: 14, delay: 9 },
  { lane: 'road-lower', dir: 'east', tone: 'plum', kind: 'car', top: '1.15rem', duration: 12, delay: 11 },
]
</script>

<template>
  <div class="ty-scene" aria-hidden="true">
    <div
      v-for="(lane, laneIndex) in ['road-upper', 'road-lower']"
      :key="lane"
      class="ty-road"
      :class="lane"
    >
      <span class="road-line" />
      <i
        v-for="(vehicle, vehicleIndex) in vehicles.filter((candidate) => candidate.lane === lane)"
        :key="`${lane}-${vehicleIndex}`"
        class="ty-vehicle"
        :class="[vehicle.dir, `tone-${vehicle.tone}`, `kind-${vehicle.kind}`]"
        :style="{
          top: vehicle.top,
          '--ty-duration': `${vehicle.duration}s`,
          '--ty-delay': `${vehicle.delay}s`,
        }"
      />
      <span v-if="laneIndex === 1" class="ty-camera">
        <span class="camera-body"><i /></span>
        <span class="camera-pole" />
      </span>
    </div>

    <figure
      v-for="photo in photos"
      :key="photo.src"
      class="ty-photo"
      :class="photo.className"
    >
      <BaseImg :src="photo.src" :alt="photo.caption" />
      <figcaption>{{ photo.caption }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.ty-scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Roads --------------------------------------------------------------- */

.ty-road {
  position: absolute;
  left: -25%;
  width: 150%;
  height: 3.6rem;
  background: color-mix(in oklch, var(--deck-traffic-road) 62%, transparent);
  border-block: 1px solid color-mix(in oklch, var(--deck-line) 80%, transparent);
  overflow: hidden;
}

.ty-road.road-upper {
  top: 3.1rem;
  transform: rotate(6.5deg);
  opacity: 0.5;
}

.ty-road.road-lower {
  bottom: 2.2rem;
  transform: rotate(-7.5deg);
  opacity: 0.72;
}

.road-line {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(50% - 1px);
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--deck-traffic-road-line) 0 1.1rem,
    transparent 1.1rem 2.4rem
  );
}

.ty-vehicle {
  position: absolute;
  display: block;
  width: 0.8rem;
  height: 0.4rem;
  border: 1px solid color-mix(in oklch, currentColor 76%, var(--deck-ink));
  background: currentColor;
  border-radius: 0.1rem;
  animation-duration: var(--ty-duration);
  animation-delay: var(--ty-delay);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.ty-vehicle::after {
  content: '';
  position: absolute;
  inset: 0.09rem 0.17rem;
  background: color-mix(in oklch, var(--deck-traffic-road-line) 75%, transparent);
}

.ty-vehicle.kind-van { width: 1rem; }
.ty-vehicle.tone-teal { color: var(--deck-car-teal); }
.ty-vehicle.tone-orange { color: var(--deck-car-orange); }
.ty-vehicle.tone-green { color: var(--deck-car-green); }
.ty-vehicle.tone-plum { color: var(--deck-car-plum); }

.ty-vehicle.east {
  left: -2rem;
  animation-name: ty-drive-east;
}

.ty-vehicle.west {
  right: -2rem;
  animation-name: ty-drive-west;
}

@keyframes ty-drive-east {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(96rem, 0, 0); }
}

@keyframes ty-drive-west {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-96rem, 0, 0); }
}

/* One roadside camera keeps watching, tilted with its road. */
.ty-camera {
  position: absolute;
  left: 22%;
  top: -1.15rem;
  width: 1.05rem;
  height: 1.35rem;
  color: var(--deck-teal);
}

.camera-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.05rem;
  height: 0.58rem;
  border: 2px solid currentColor;
  background: var(--deck-traffic-land);
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
  background: var(--deck-orange);
}

.camera-pole {
  position: absolute;
  left: 0.5rem;
  top: 0.62rem;
  width: 2px;
  height: 0.72rem;
  background: currentColor;
}

/* Figure scatter ------------------------------------------------------- */

.ty-photo {
  position: absolute;
  margin: 0;
  width: 11.5rem;
  padding: 0.4rem 0.4rem 0.15rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(16, 32, 43, 0.1);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.09);
}

.ty-photo img {
  display: block;
  width: 100%;
  height: 5rem;
  object-fit: contain;
  object-position: center;
  background: #ffffff;
}

.ty-photo figcaption {
  padding-top: 0.24rem;
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--deck-muted);
}

.ty-photo.photo-a {
  left: 1.5rem;
  top: 1.5rem;
  transform: rotate(-6deg);
}

.ty-photo.photo-b {
  right: 1.4rem;
  top: 2.2rem;
  transform: rotate(5.5deg);
}

.ty-photo.photo-c {
  left: 2.2rem;
  bottom: 1.4rem;
  transform: rotate(4.5deg);
}

.ty-photo.photo-d {
  right: 2rem;
  bottom: 1.6rem;
  transform: rotate(-5deg);
}

@media (max-width: 900px) {
  .ty-photo { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ty-vehicle {
    animation: none;
  }
}
</style>
