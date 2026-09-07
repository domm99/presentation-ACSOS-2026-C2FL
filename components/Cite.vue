<script setup lang="ts">
import { computed } from 'vue'
import { REFERENCES } from './bibliography'

// Inline citation marker: `<Cite n="3" />` renders a superscript [3] right at
// the claim it supports, so the reader sees *what* is being cited. The matching
// footnote text is emitted once per slide by <Cites refs="..." />, and both are
// numbered from ./bibliography.ts.
const props = defineProps<{ n: number | string }>()

const nums = computed(() =>
  String(props.n)
    .split(',')
    .map((v) => Number(v.trim()))
    .filter((v) => REFERENCES[v]),
)

const label = computed(() => `[${nums.value.join(', ')}]`)
const title = computed(() => nums.value.map((v) => `[${v}] ${REFERENCES[v].short}`).join(' · '))
</script>

<template>
  <span v-if="nums.length" class="cite" :title="title">{{ label }}</span>
</template>
