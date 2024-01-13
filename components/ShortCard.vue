<script setup lang="ts">
const props = defineProps({
  cover: {
    type: String,
    required: false,
    default: '',
  },
  title: {
    type: String,
    required: false,
    default: 'untitled',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  tags: {
    type: Array,
    required: false,
  },
  path: {
    type: String,
    required: true,
    default: '/',
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<template>
  <div
    class="card-bg-filter short-card card-border"
    @click="$router.push(props.path)"
  >
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.title }}
      </div>
      <div class="mt-2">
        <span
          v-for="(t, index) in props.tags" :key="index" color="gray" variant="solid" class="my-1 mr-1 opacity-90"
        >
          {{ t }}
        </span>
      </div>
      <div class="mt-3 text-sm">
        {{ props.date }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.short-card {
  position: relative;
  transition: all 0.1s;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.dark .short-card {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
}

.short-card:hover {
  --active: 1;
  box-shadow: inset 0 0 0 2px rgb(167, 139, 250, 0.85);
  z-index: 100;
}

.short-card:after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
    hsl(0 0% 100% / 0.15),
    transparent 25vmin
  );
  background-attachment: fixed;
  opacity: var(--active, 0);
  transition: opacity 0.2s;
  pointer-events: none;
  border-radius: 0.25rem;
}

.short-card:before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
      rgb(167, 139, 250, 1),
      transparent 25vmin
    ),
    transparent;
  background-attachment: fixed;
  pointer-events: none;
  mask:
    linear-gradient(white, white) 50% 0 / 100% 2px no-repeat,
    linear-gradient(white, white) 50% 100% / 100% 2px no-repeat,
    linear-gradient(white, white) 0 50% / 2px 100% no-repeat,
    linear-gradient(white, white) 100% 50% / 2px 100% no-repeat;
  z-index: 100;
  border-radius: 0.25rem;
}
</style>
