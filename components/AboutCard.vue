<script setup lang="ts">
const colorMode = useColorMode()
const dateOfBirth = new Date(2003, 0, 7)
const age = Math.floor((Date.now() - dateOfBirth.getTime()) / (365 * 24 * 60 * 60 * 1000))
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
            Привет! Я <span
              class="text-primary-400"
            >@bysawec</span> 👋
          </h1>
          <div class="grid grid-cols-2 md:flex gap-2 items-center flex-wrap text-[14px]">
            <UBadge
              class="rounded-full px-4 py-1.5 ring-2" icon="i-lineicons:typescript" variant="outline"
              color="neutral" size="lg" label="TypeScript"
            />
            <UBadge
              class="rounded-full px-4 py-1.5 ring-2" icon="i-lineicons:vuejs" variant="outline" color="neutral"
              size="lg" label="Vue"
            />
            <UBadge
              class="rounded-full px-4 py-1.5 ring-2" icon="i-lineicons:nuxt" variant="outline" color="neutral"
              size="lg" label="Nuxt"
            />
            <UBadge
              class="rounded-full px-4 py-1.5 ring-2" icon="i-lineicons:tailwindcss" variant="outline"
              color="neutral" size="lg" label="Tailwind"
            />
          </div>
        </div>
      </div>

      <p class="font-[Raleway] text-neutral-500 dark:text-neutral-300/80 font-medium py-2">
        Frontend разработчик из России, мне <span class="text-primary-400">{{ age }}</span>. Я люблю создавать вещи, которые
        могут
        принести пользу людям.
      </p>

      <div class="grid lg:flex gap-4 md:gap-4 w-full">
        <UButton
          icon="i-lineicons:telegram" label="Telegram" size="lg" variant="outline" color="neutral"
          target="_blank" href="https://t.me/bysawec"
        />
        <UButton
          icon="i-lineicons:github" label="GitHub" size="lg" variant="outline" color="neutral" target="_blank"
          href="https://github.com/bysawec"
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
