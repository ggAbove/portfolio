<script lang="ts" setup>
const colorMode = useColorMode()
const color = computed(() =>
  colorMode.value === 'dark' ? 'oklch(0.712 0.194 13.428)' : 'white',
)
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' },
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - @bysawec` : '@bysawec'
  },
  htmlAttrs: {
    lang: 'ru',
  },
})
</script>

<template>
  <UApp>
    <div class="hidden lg:block gradient min-h-page" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%,
      rgb(var(--color-primary-500) / 0.25) 0,
      #fff 100%);
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%,
        rgb(var(--color-primary-400) / 0.1) 0,
        rgb(var(--color-gray-950)) 100%);
  }
}

.overlay {
  background-size: 100px 100px;
  background-image: linear-gradient(to right,
      rgb(var(--color-gray-200)) 0.5px,
      transparent 0.5px),
    linear-gradient(to bottom,
      rgb(var(--color-gray-200)) 0.5px,
      transparent 0.5px);
}

.dark {
  .overlay {
    background-image: linear-gradient(to right,
        rgb(var(--color-gray-900)) 0.5px,
        transparent 0.5px),
      linear-gradient(to bottom,
        rgb(var(--color-gray-900)) 0.5px,
        transparent 0.5px);
  }
}
</style>
