<script setup lang="ts">
import { computed } from 'vue'
import { REFERENCES } from './references'

// Renders the References slide from the shared bibliography, split into two
// balanced columns. Editing ./references.ts updates this list automatically.
const entries = computed(() =>
  Object.keys(REFERENCES)
    .map(Number)
    .sort((a, b) => a - b)
    .map((n) => ({ n, full: REFERENCES[n].full })),
)

const half = computed(() => Math.ceil(entries.value.length / 2))
const left = computed(() => entries.value.slice(0, half.value))
const right = computed(() => entries.value.slice(half.value))
const rightStart = computed(() => (left.value.length ? left.value[left.value.length - 1].n + 1 : 1))
</script>

<template>
  <div class="ref-grid">
    <ol class="ref-list">
      <li v-for="r in left" :key="r.n" v-html="r.full" />
    </ol>
    <ol class="ref-list" :start="rightStart">
      <li v-for="r in right" :key="r.n" v-html="r.full" />
    </ol>
  </div>
</template>
