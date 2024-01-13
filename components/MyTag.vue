<template>
  <div class="tag block flex flex-row items-center justify-center rounded-md px-3 py-1 text-sm text-gray-800 dark:text-gray-200">
    <slot />
  </div>
</template>

<style scoped>
.tag {
  backdrop-filter: saturate(180%) blur(20px);
  background-blend-mode: darken;
  text-shadow: 0 0 1px rgba(0, 0, 0, 1);
}
</style>
