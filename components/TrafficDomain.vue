<script setup lang="ts">
import { computed } from 'vue'
import TrafficCity from './TrafficCity.vue'

const props = defineProps<{ click?: number }>()
const step = computed(() => Math.min(props.click ?? 0, 3))
</script>

<template>
  <TrafficCity mode="reference" :step="step" />
</template>
