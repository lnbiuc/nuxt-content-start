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
    class="card-bg-filter card-border card overflow-hidden"
    @click="$router.push(props.path)"
  >
    <div class="relative overflow-hidden p-[3px]">
      <img :src="props.cover" alt="cover" class="z-0 h-48 w-full transform rounded-tl-sm rounded-tr-sm object-cover">
      <div class="absolute bottom-0 right-0 p-1 text-right">
        <UBadge v-for="t in props.tags" :key="t" color="gray" variant="solid" class="m-1 opacity-90" :tag="t">
          {{ t }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-xl font-bold">
        {{ props.title }}
      </div>
      <div class="my-2 flex flex-row items-center">
        <div class="i-carbon-view text-violet" />
        <div class="ml-2 text-violet">
          {{ props.views }} views
        </div>
      </div>
      <div class="mt-1 font-bold">
        {{ props.date }}
      </div>
      <div class="mt-2">
        {{ props.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-bg-filter img {
  transition: transform 500ms;
}
</style>
