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
  date: {
    type: String,
    required: false,
    default: '',
  },
})

function getReadableDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div
    class="card-bg-filter card overflow-hidden card-border"
    @click="$router.push(props.path)"
  >
    <div class="relative overflow-hidden p-[3px]">
      <img :src="props.cover" alt="cover" class="z-0 h-48 w-full transform rounded-tl-sm rounded-tr-sm object-cover">
      <div class="absolute bottom-0 right-0 flex flex-row p-1 text-right">
        <MyTag v-for="(t, index) in props.tags" :key="index" color="gray" variant="solid" class="m-1 opacity-90">
          {{ t }}
        </MyTag>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-xl font-bold">
        {{ props.title }}
      </div>
      <div class="mt-1 text-violet font-bold">
        {{ getReadableDate(props.date) }}
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
