<script setup lang="ts">
useHead({
  title: 'Портфолио',
})
</script>

<template>
  <div class="grid lg:grid-cols-3 gap-8 w-full items-start">
    <div class="order-2 lg:order-1 flex flex-col lg:flex-row w-full lg:col-span-3 gap-6 justify-between">
      <TimeCard class="w-full" />
      <DateCard class="w-full" />
      <WeatherCard class="w-full" />
    </div>
    <AboutCard class="order-1 lg:order-2" />
  </div>
</template>
