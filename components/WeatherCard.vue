<script setup lang="ts">
const { locale } = useI18n()
let interval: string | number | NodeJS.Timeout | undefined
const { data, status, refresh } = await useLazyFetch<string>(`https://wttr.in/?format=%C_%t_%l&lang=${locale.value}`, {
  server: false,
})
onMounted(() => {
  interval = setInterval(() => {
    refresh()
  }, 30000)
})

onUnmounted(() => {
  interval ? clearInterval(interval) : null
})
</script>

<template>
  <UCard
    class="grid items-start rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90 active:opacity-80 lg:col-span-3"
  >
    <template #header>
      <div class="flex gap-4 items-center">
        <span class="text-neutral-500 dark:text-neutral-400 h-5">
          <Icon size="20" name="mynaui:database" />
        </span>
        <span class="text-neutral-500 dark:text-neutral-400 text-[14px]">weather.json</span>
        <span class="text-neutral-500 dark:text-neutral-400 ml-auto truncate text-xs lg:text-[14px]">{{ data?.split('_')[2] }}</span>
      </div>
    </template>
    <p
      v-if="data"
      style="font-family: IBM Plex Mono;" class="grid gap-2 text-neutral-500 dark:text-neutral-300 text-[14px] sm:text-base font-medium"
    >
      {{ data.split('_')[0] }}

      <span class="text-[12px] sm:text-[14px] opacity-60">{{ data.split('_')[1] }}</span>
    </p>
    <USkeleton v-if="!data && status === 'pending'" class="h-[50px] w-[100px]" />
    <p v-if="!data && status === 'error'" class="grid gap-2 text-neutral-500 dark:text-neutral-300 text-[14px] sm:text-base font-medium">
      Ошибка получения погоды
    </p>
  </UCard>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
