<script setup lang="ts">
// Simple text/wordmark placeholder logo. Swap this for a real logo by
// either editing the markup below or replacing usages of <Logo /> in
// slides.md with a <BaseImg src="logo.png" /> pointing at /public/logo.png.
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Your Project',
})
</script>

<template>
  <div class="deck-logo">
    <svg viewBox="0 0 64 64" class="deck-logo-mark" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--deck-teal)" stroke-width="4" />
      <circle cx="32" cy="32" r="10" fill="var(--deck-orange)" />
    </svg>
    <span class="deck-logo-text">{{ text }}</span>
  </div>
</template>

<style scoped>
.deck-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.deck-logo-mark {
  width: 4.5rem;
  height: 4.5rem;
}

.deck-logo-text {
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  color: var(--deck-ink, #10202b);
}
</style>
