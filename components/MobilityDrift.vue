<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const MAX = 6
const step = computed(() => Math.min(Math.max(props.click ?? 0, 0), MAX))

const RC = [
  { fill: '#cdb4f0', stroke: '#7b2cbf' },  // 0 purple  (top-left)
  { fill: '#a8d0f0', stroke: '#1e6fa8' },  // 1 blue    (top-right)
  { fill: '#b0e0a0', stroke: '#3a7d30' },  // 2 green   (bottom-left)
  { fill: '#f8d090', stroke: '#c97a06' },  // 3 orange  (bottom-right)
]

// Static nodes — none placed within 8 units of the mobile path points
// Mobile path: (43,20) → (57,20) → (57,62) → (43,62)
const staticNodes = [
  // r0 purple (top-left)
  {x:10,y:8, r:0},{x:22,y:7, r:0},{x:33,y:10,r:0},
  {x:14,y:19,r:0},{x:26,y:17,r:0},{x:36,y:15,r:0},
  {x:9, y:30,r:0},{x:20,y:28,r:0},{x:32,y:26,r:0},{x:46,y:30,r:0},
  {x:12,y:40,r:0},{x:24,y:38,r:0},{x:36,y:38,r:0},{x:48,y:42,r:0},
  // r1 blue (top-right)
  {x:64,y:8, r:1},{x:75,y:7, r:1},{x:86,y:10,r:1},
  {x:68,y:18,r:1},{x:80,y:16,r:1},{x:92,y:18,r:1},
  {x:62,y:28,r:1},{x:74,y:27,r:1},{x:86,y:28,r:1},
  {x:65,y:38,r:1},{x:76,y:36,r:1},{x:88,y:38,r:1},{x:94,y:28,r:1},
  // r2 green (bottom-left)
  {x:9, y:55,r:2},{x:20,y:54,r:2},{x:32,y:55,r:2},
  {x:11,y:65,r:2},{x:23,y:64,r:2},{x:35,y:65,r:2},
  {x:9, y:76,r:2},{x:22,y:74,r:2},{x:34,y:74,r:2},{x:48,y:70,r:2},
  {x:14,y:86,r:2},{x:28,y:85,r:2},{x:40,y:84,r:2},
  // r3 orange (bottom-right)
  {x:65,y:55,r:3},{x:76,y:54,r:3},{x:88,y:55,r:3},
  {x:63,y:66,r:3},{x:74,y:65,r:3},{x:86,y:64,r:3},{x:94,y:58,r:3},
  {x:66,y:76,r:3},{x:78,y:76,r:3},{x:90,y:75,r:3},
  {x:70,y:87,r:3},{x:82,y:86,r:3},
]

// One mobile node, clockwise: r0 → r1 → r3 → r2
// odd steps = move, even steps = adapt color
const path = [
  {x:43,y:20,c:0}, // step 0: r0, purple
  {x:57,y:20,c:0}, // step 1: moved into r1, still purple
  {x:57,y:20,c:1}, // step 2: adapted blue
  {x:57,y:62,c:1}, // step 3: moved into r3, still blue
  {x:57,y:62,c:3}, // step 4: adapted orange
  {x:43,y:62,c:3}, // step 5: moved into r2, still orange
  {x:43,y:62,c:2}, // step 6: adapted green
]

const mobile = computed(() => path[step.value])

const timeline = ['t=0','t=15','t=30','t=45','t=60','t=75','t=90']
</script>

<template>
  <div class="md-root">
    <svg viewBox="0 0 100 100" class="md-svg">
      <defs>
        <radialGradient id="g0" cx="27%" cy="27%" r="54%">
          <stop offset="0%"   stop-color="#cdb4f0" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#cdb4f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g1" cx="73%" cy="27%" r="54%">
          <stop offset="0%"   stop-color="#a8d0f0" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#a8d0f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="27%" cy="73%" r="54%">
          <stop offset="0%"   stop-color="#b0e0a0" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#b0e0a0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g3" cx="73%" cy="73%" r="54%">
          <stop offset="0%"   stop-color="#f8d090" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#f8d090" stop-opacity="0"/>
        </radialGradient>




      </defs>

      <rect x="0" y="0" width="100" height="100" fill="#f2f4f8"/>
      <rect x="0" y="0" width="100" height="100" fill="url(#g0)"/>
      <rect x="0" y="0" width="100" height="100" fill="url(#g1)"/>
      <rect x="0" y="0" width="100" height="100" fill="url(#g2)"/>
      <rect x="0" y="0" width="100" height="100" fill="url(#g3)"/>

      <!-- static nodes -->
      <circle v-for="(n,i) in staticNodes" :key="i"
        :cx="n.x" :cy="n.y" r="2.8"
        :fill="RC[n.r].fill" :stroke="RC[n.r].stroke" stroke-width="0.85"
      />

      <!-- single mobile node -->
      <circle
        :cx="mobile.x" :cy="mobile.y" r="2.8"
        :fill="RC[mobile.c].fill" :stroke="RC[mobile.c].stroke" stroke-width="1.8"

        style="transition: cx 0.45s cubic-bezier(.4,0,.2,1),
                           cy 0.45s cubic-bezier(.4,0,.2,1),
                           fill 0.35s ease, stroke 0.35s ease"
      />
    </svg>

    <div class="md-timeline">
      <div class="md-track">
        <div class="md-fill" :style="{ width:`${(step/MAX)*100}%` }"/>
        <div v-for="i in 7" :key="i"
          class="md-tick"
          :style="{ left:`${((i-1)/MAX)*100}%` }"
          :class="{ past: step>=(i-1), active: step===(i-1) && (i-1)>0 }"
        />
      </div>
      <div class="md-labels">
        <span v-for="(l,i) in timeline" :key="i" :class="{on: step>=i}">{{l}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.md-root { display:flex; flex-direction:column; gap:0.5rem; width:100% }
.md-svg  { width:100%; height:auto; border-radius:8px; border:1px solid var(--deck-line,#d6e0e6) }
.md-timeline { display:flex; flex-direction:column; gap:0.28rem }
.md-track  { position:relative; height:5px; background:var(--deck-line,#d6e0e6); border-radius:3px; overflow:visible }
.md-fill   { position:absolute; inset-block:0; left:0; background:var(--deck-teal,#0f4c5c); border-radius:3px;
             transition:width .45s cubic-bezier(.4,0,.2,1) }
.md-tick   { position:absolute; top:-4px; width:13px; height:13px; border-radius:50%; transform:translateX(-50%);
             background:#fff; border:2px solid var(--deck-line,#d6e0e6); transition:border-color .35s,background .35s }
.md-tick.past   { background:var(--deck-teal,#0f4c5c); border-color:var(--deck-teal,#0f4c5c) }
.md-tick.active { background:var(--deck-orange,#d97706); border-color:var(--deck-orange,#d97706);
                  box-shadow:0 0 0 3px rgba(217,119,6,.22) }
.md-labels { display:flex; justify-content:space-between;
             font-family:var(--deck-font-mono,monospace); font-size:0.55rem; color:var(--deck-muted,#888) }
.md-labels span.on { color:var(--deck-ink,#1a1a1a); font-weight:700 }
</style>
