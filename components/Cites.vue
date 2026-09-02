<script setup lang="ts">
import { computed } from 'vue'
import { REFERENCES } from './references'

// References live in ./references.ts (single source of truth). Each slide lists
// only the numbers it cites; the footnote text is generated from the shared
// `short` form, so numbering can never drift from the References slide.
const props = defineProps<{ refs: number[] | string }>()

const list = computed(() => {
  const arr = Array.isArray(props.refs)
    ? props.refs
    : String(props.refs).split(',')
  return arr
    .map((n) => Number(String(n).trim()))
    .filter((n) => REFERENCES[n])
    .map((n) => ({ n, text: REFERENCES[n].short }))
})
</script>

<template>
  <div class="cite-footnote">
    <span v-for="r in list" :key="r.n" class="cite-foot-item">
      <span class="cite-foot-num">[{{ r.n }}]</span> {{ r.text }}
    </span>
  </div>
</template>

<style scoped>
.cite-footnote {
  position: absolute;
  left: 2.6rem;
  right: 2.6rem;
  bottom: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 1.1rem;
  padding-top: 0.3rem;
  border-top: 1px solid rgba(16, 32, 43, 0.1);
  font-size: 0.6rem;
  line-height: 1.25;
  color: var(--deck-muted, #52616d);
}

.cite-foot-num {
  font-weight: 700;
  color: var(--deck-orange);
  margin-right: 0.15rem;
}
</style>
