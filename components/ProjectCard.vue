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
  link: {
    type: String,
    required: false,
    default: '',
  },
})

function openNewTab(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div
    class="card-bg-filter card flex flex-col justify-between overflow-hidden card-border"
    @click="openNewTab(props.link)"
  >
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.title }}
      </div>
      <div class="mt-2">
        {{ props.description }}
      </div>
      <div>
        <span v-for="(s, index) in props.tags" :key="index" color="gray" variant="solid" class="my-2 mr-2">
          {{ s }}
        </span>
      </div>
    </div>
    <div class="relative px-4 pb-4">
      <img :src="props.cover" alt="cover" class="h-48 w-full rounded-md object-cover">
    </div>
  </div>
</template>

<style scoped>
.card-bg-filter img {
  transition: transform 500ms;
}

.card-bg-filter:hover img {
  transform: scale(1.05);
}
</style>
