<script setup lang="ts">
const props = defineProps({
  prevTitle: {
    type: String,
    required: false,
    default: '',
  },
  prevPath: {
    type: String,
    required: false,
    default: '/',
  },
  prevDesc: {
    type: String,
    required: false,
    default: '',
  },
  nextTitle: {
    type: String,
    required: false,
    default: '',
  },
  nextPath: {
    type: String,
    required: false,
    default: '/',
  },
  nextDesc: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<template>
  <div class="mb-20 mt-6 w-full flex flex-row justify-between">
    <div v-if="props.prevTitle !== ''" class="card mr-4 h-150px w-1/2 flex flex-col items-start justify-end rounded-md px-4 py-2 pb-6 pl-6" @click="$router.push(props.prevPath)">
      <div class="i-ri:arrow-left-circle-line mb-4 scale-130 text-violet" />
      <div class="text-left">
        {{ props.prevTitle }}
      </div>
      <div class="mt-2 text-left text-xs text-gray-500">
        {{ props.prevDesc }}
      </div>
    </div>
    <div v-else />
    <div v-if="props.nextTitle !== ''" class="card ml-4 h-150px w-1/2 flex flex-col items-end justify-end rounded-md px-4 py-2 pb-6 pr-6" @click="$router.push(props.nextPath)">
      <div class="i-ri:arrow-right-circle-line mb-4 scale-130 text-violet" />
      <div class="text-right">
        {{ props.nextTitle }}
      </div>
      <div class="mt-2 text-left text-xs text-gray-500">
        {{ props.nextDesc }}
      </div>
    </div>
    <div v-else />
  </div>
</template>
