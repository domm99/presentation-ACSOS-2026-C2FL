<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src: string
}>()

// Prefix with import.meta.env.BASE_URL so images from public/ keep working
// when the deck is deployed under a sub-path (GitHub Pages builds with
// --base /<repo-name>/). Plain src attributes in slides.md either break the
// build (root-absolute) or miss the base prefix at runtime (./public/...).
const resolved = computed(() => import.meta.env.BASE_URL + props.src.replace(/^\//, ''))
</script>

<template>
  <img :src="resolved">
</template>
