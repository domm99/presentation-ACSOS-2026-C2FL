<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'

const props = withDefaults(defineProps<{
  title: string
  url: string
  short?: string
  /** QR image side in rem */
  size?: number
}>(), {
  size: 4.4,
})

const qrDataUrl = ref('')

onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL(props.url, {
    margin: 1,
    width: 360,
    color: {
      dark: '#10202b',
      light: '#00000000',
    },
  })
})
</script>

<template>
  <a :href="url" target="_blank" rel="noreferrer" class="qr-card-link-wrapper" :style="{ '--qr-size': `${props.size}rem` }">
    <div class="qr-card-shell">
      <div class="qr-card-image-wrap">
        <img v-if="qrDataUrl" :src="qrDataUrl" :alt="`QR code for ${title}`" class="qr-card-image">
        <div v-else class="qr-card-placeholder"></div>
      </div>
      <div class="qr-card-title">{{ title }}</div>
    </div>
  </a>
</template>

<style scoped>
.qr-card-link-wrapper {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease;
}

.qr-card-link-wrapper:hover {
  transform: translateY(-2px);
}

.qr-card-shell {
  display: grid;
  place-items: center;
  padding: 0.45rem;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(16, 32, 43, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.qr-card-image-wrap {
  width: calc(var(--qr-size, 4.4rem) + 0.8rem);
  height: calc(var(--qr-size, 4.4rem) + 0.8rem);
  display: grid;
  place-items: center;
  border-radius: 0;
  background: rgba(15, 76, 92, 0.04);
}

.qr-card-image,
.qr-card-placeholder {
  width: var(--qr-size, 4.4rem);
  height: var(--qr-size, 4.4rem);
}

.qr-card-placeholder {
  background: repeating-linear-gradient(
    -45deg,
    rgba(16, 32, 43, 0.08),
    rgba(16, 32, 43, 0.08) 6px,
    rgba(255, 255, 255, 0.4) 6px,
    rgba(255, 255, 255, 0.4) 12px
  );
}

.qr-card-title {
  font-weight: 600;
  color: #10202b;
  text-align: center;
  font-size: 0.76rem;
}
</style>