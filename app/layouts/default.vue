<script setup lang="ts">

</script>

<template>
  <div class="opacity-100 -translate-y-2 scale-[100%] flex flex-col pt-12 sm:pt-24 xl:py-24 gap-20 lg:h-screen xl:justify-center px-8 smooth">
    <main class="w-full max-w-[85rem] mx-auto">
      <slot />
    </main>

    <footer class="text-black dark:text-white text-center py-2">
      <p class="text-sm">
        Copyright © 2024 bySawec.
      </p>
    </footer>
  </div>
</template>

<style>
.smooth {
  transition: all .8s cubic-bezier(.215,.61,.355,1);
}
</style>
