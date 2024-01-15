<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: false,
    default: 'https://vio.vin/',
  },
})

const requested = ref(false)

const content = ref()
async function fetchWithDelay() {
  const result = await useLazyFetch(`https://blog-api.vio.vin/api/v1/links/meta?url=${props.url}`).data.value
  // @ts-expect-error fuck ts
  content.value = JSON.parse(result)
  setTimeout(() => {
    if (content.value)
      requested.value = true
  }, 100)
}

fetchWithDelay()

function openNewTab() {
  window.open(props.url)
}
</script>

<template>
  <div>
    <slot />
    <div v-if="requested" class="my-6 w-full flex flex-row justify-center overflow-hidden" @click="openNewTab()">
      <div class="card-bg-filter card overflow-hidden rounded p-2 card-border lg:w-[500px] md:w-full sm:w-full xl:w-[500px]">
        <img
          v-if="content?.hybridGraph?.image" :src="content?.hybridGraph?.image" alt="cover"
          class="z-10 aspect-[16/9] w-full rounded-md object-cover"
        >
        <div class="flex flex-col px-4 pb-2">
          <div class="my-2 text-2xl font-bold">
            {{ content?.hybridGraph.title }}
          </div>
          <div class="text-sm opacity-80">
            {{ content?.hybridGraph.description }}
          </div>
          <div class="mt-2 text-xs text-gray-500 dark:text-gray-500">
            {{ content?.hybridGraph.url }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <a :href="props.url" target="_blank" rel="noopener noreferrer" class="text-violet">
        {{ props.url }}
      </a>
    </div>
  </div>
</template>
