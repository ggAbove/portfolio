<script setup lang="ts">
const { locale } = useI18n()
useHead({
  title: () => locale.value === 'ru' ? 'Блог' : 'Blog',
})
</script>

<template>
  <div class="grid gap-6 w-full">
    <div class="flex items-center gap-3">
      <Icon size="28" name="mynaui:book" class="text-primary-400" />
      <h1 class="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
        {{ locale === 'ru' ? 'Блог' : 'Blog' }}
      </h1>
    </div>
    <BlogList />
  </div>
</template>
