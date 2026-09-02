<script setup lang="ts">
import { computed } from 'vue'

// Reusable progressive-reveal pipeline diagram. Pass a list of stages and,
// optionally, Slidev's $clicks so stages light up one by one as the
// presenter clicks through:
//
//   <FlowDiagram
//     :click="$clicks"
//     :stages="[
//       { label: 'Input', sub: 'raw data' },
//       { label: 'Process', sub: 'transform' },
//       { label: 'Output', sub: 'result' },
//     ]"
//   />
//
// Without a `click` prop, every stage is shown immediately.
interface Stage {
  label: string
  sub?: string
}

const props = defineProps<{
  stages: Stage[]
  click?: number
}>()

const c = computed(() => props.click ?? 99)
const shown = (index: number) => c.value >= index
</script>

<template>
  <div class="flow-diagram">
    <template v-for="(stage, i) in stages" :key="i">
      <div
        class="flow-stage is-active"
        :class="{ 'flow-hidden': !shown(i) }"
      >
        <div class="flow-dot" />
        <span class="flow-label">{{ stage.label }}</span>
        <span v-if="stage.sub" class="flow-sub">{{ stage.sub }}</span>
      </div>
      <div
        v-if="i < stages.length - 1"
        class="flow-arrow is-active"
        :class="{ 'flow-hidden': !shown(i + 1) }"
      >
        →
      </div>
    </template>
  </div>
</template>

<style scoped>
.flow-diagram {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
}

.flow-stage {
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  padding: 0.7rem 0.9rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 32, 43, 0.12);
  flex: 1 1 0;
  min-width: 0;
  transition: all 0.45s ease;
}

.flow-stage.is-active {
  border-color: var(--deck-teal);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 4px rgba(15, 76, 92, 0.1);
  transform: translateY(-2px);
}

.flow-hidden {
  opacity: 0;
  pointer-events: none;
}

.flow-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--deck-teal);
}

.flow-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--deck-muted, #52616d);
  text-align: center;
  line-height: 1.15;
}

.flow-stage.is-active .flow-label {
  color: var(--deck-teal);
}

.flow-sub {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(82, 97, 109, 0.78);
  text-align: center;
  line-height: 1.1;
}

.flow-arrow {
  display: grid;
  place-items: center;
  font-size: 1.3rem;
  color: rgba(16, 32, 43, 0.28);
  transition: color 0.45s ease, transform 0.45s ease;
}

.flow-arrow.is-active {
  color: var(--deck-orange);
  transform: scale(1.25);
}
</style>
