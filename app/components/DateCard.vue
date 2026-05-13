<script setup lang="ts">
const { locale } = useI18n()

const now = useNow()
</script>

<template>
  <UCard
    class="grid items-start rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90 active:opacity-80 lg:col-span-3"
  >
    <template #header>
      <div class="flex gap-4 items-center">
        <span class="text-neutral-500 dark:text-neutral-400 h-5">
          <Icon size="20" name="mynaui:code" />
        </span>
        <span class="text-neutral-500 dark:text-neutral-400 text-[14px]">date.ts</span>
      </div>
    </template>
    <ClientOnly>
      <p style="font-family: IBM Plex Mono;" class="grid gap-2 text-neutral-500 dark:text-neutral-300 text-[14px] sm:text-base font-medium">
        {{ now.toLocaleDateString(locale, { month: 'long', day: 'numeric' }) }}
        <span class="text-[12px] sm:text-[14px] opacity-60">{{ now.getFullYear() }}</span>
      </p>
    </ClientOnly>
  </UCard>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
