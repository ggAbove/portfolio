<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()
const localePath = useLocalePath()
const dateOfBirth = new Date(2003, 0, 7)
const age = Math.floor((Date.now() - dateOfBirth.getTime()) / (365 * 24 * 60 * 60 * 1000))

interface Tech {
  label: string
  icon: string
}

const techs: Tech[] = [
  { label: 'TypeScript', icon: 'logos:typescript-icon' },
  { label: 'Vue', icon: 'logos:vue' },
  { label: 'Nuxt', icon: 'logos:nuxt-icon' },
  { label: 'Tailwind', icon: 'logos:tailwindcss-icon' },
  { label: 'Pinia', icon: 'logos:pinia' },
  { label: 'Vite', icon: 'logos:vitejs' },
  { label: 'Bun', icon: 'logos:bun' },
  { label: 'Node.js', icon: 'logos:nodejs-icon' },
  { label: 'Capacitor', icon: 'simple-icons:capacitor' },
  { label: 'LiveKit', icon: 'simple-icons:livekit' },
  { label: 'Docker', icon: 'logos:docker-icon' },
  { label: 'Coolify', icon: 'simple-icons:coolify' },
  { label: 'Traefik', icon: 'logos:traefik' },
  { label: 'PostgreSQL', icon: 'logos:postgresql' },
  { label: 'Redis', icon: 'logos:redis' },
  { label: 'Convex', icon: 'simple-icons:convex' },
  { label: 'n8n', icon: 'simple-icons:n8n' },
]
</script>

<template>
  <UCard
    class="grid items-start rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90 active:opacity-80 lg:col-span-3"
  >
    <template #header>
      <div class="flex gap-4 items-center">
        <span class="text-neutral-500 dark:text-neutral-400 h-5">
          <Icon size="20" name="mynaui:book" />
        </span>
        <span class="text-neutral-500 dark:text-neutral-400 text-[14px]">about.md</span>
      </div>
    </template>
    <div class="grid gap-6">
      <div class="grid md:flex gap-6 items-center">
        <img
          class="rounded-full hover:shadow-2xl smooth hover:scale-[103%] active:scale-[107%] cursor-grab active:cursor-grabbing w-20 h-20"
          src="/img/photo.jpeg" alt="avatar"
        >
        <div class="grid gap-5 relative">
          <h1 class=" text-neutral-700 dark:text-neutral-200 font-semibold text-xl sm:text-2xl">
            {{ locale === 'ru' ? 'Привет! Я' : 'Hi! I am' }} <span
              class="text-primary-400"
            >@bysawec</span> 👋
          </h1>
          <div class="flex flex-wrap gap-2 items-center text-[14px]">
            <UBadge
              v-for="t in techs"
              :key="t.label"
              class="rounded-full px-3 py-1 ring-2"
              :icon="t.icon"
              variant="outline"
              color="neutral"
              size="md"
              :label="t.label"
            />
          </div>
        </div>
      </div>

      <p class="font-[Raleway] text-neutral-500 dark:text-neutral-300/80 font-medium py-2">
        <template v-if="locale === 'ru'">
          Frontend разработчик из России, мне <span class="text-primary-400">{{ age }}</span>. Делаю продукты,
          которые помогают людям. Сейчас веду <a href="https://dashka.live" target="_blank" class="text-primary-400 underline">dashka.live</a>
          (голосовые комнаты с AI), OpenBomber (Telegram WebApp), Bomber VPN и небольшие SaaS-проекты.
        </template>
        <template v-else>
          Frontend developer from Russia, <span class="text-primary-400">{{ age }}</span> years old. I build products
          that help people. Currently working on <a href="https://dashka.live" target="_blank" class="text-primary-400 underline">dashka.live</a>
          (AI voice rooms), OpenBomber (Telegram WebApp), Bomber VPN and small SaaS projects.
        </template>
      </p>

      <div class="flex flex-wrap gap-3">
        <UButton
          icon="i-lineicons:telegram" label="Telegram" size="lg" variant="outline" color="neutral"
          target="_blank" href="https://t.me/bysawec"
        />
        <UButton
          icon="i-lineicons:github" label="GitHub" size="lg" variant="outline" color="neutral" target="_blank"
          href="https://github.com/bysawec"
        />
        <UButton
          :to="localePath('/projects')"
          icon="mynaui:layers" label="Projects" size="lg" variant="outline" color="neutral"
        />
        <UButton
          :to="localePath('/blog')"
          icon="mynaui:book" label="Blog" size="lg" variant="outline" color="neutral"
        />
        <UButton
          v-if="colorMode.value === 'light'" icon="i-lineicons:night" label="Dark" size="lg" variant="outline"
          color="neutral" @click="colorMode.preference = 'dark'"
        />
        <UButton
          v-else icon="i-lineicons:sun" label="Light" size="lg" variant="outline"
          color="neutral" @click="colorMode.preference = 'light'"
        />
      </div>
    </div>
  </UCard>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
