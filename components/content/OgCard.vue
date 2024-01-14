<script setup lang="ts">
let slot: string | undefined
const content = ref()
async function fetchWithDelay() {
  if (content.value)
    return

  const doc = document.querySelector('.slotFather a') as HTMLAnchorElement
  slot = doc.href
  const result = await useFetch(`https://blog-api.vio.vin/api/v1/links/meta?url=${slot}`).data.value
  // @ts-expect-error fuck ts
  content.value = JSON.parse(result)

  if (content.value === null)
    setTimeout(fetchWithDelay, 1000)
}
onMounted(() => {
  fetchWithDelay()
})

function openNewTab(slot: string | undefined) {
  window.open(slot)
}
</script>

<template>
  <div class="slotFather hidden">
    <slot />
  </div>

  <div v-if="content" class="my-6 w-full flex flex-row justify-center overflow-hidden" @click="openNewTab(slot)">
    <div class="card-bg-filter card overflow-hidden rounded p-2 card-border lg:w-[500px] md:w-full sm:w-full xl:w-[500px]">
      <img
        v-if="content?.hybridGraph.image" :src="content?.hybridGraph.image" alt="cover"
        class="z-10 aspect-[16/9] w-full rounded-md object-cover"
      >
      <div class="flex flex-col px-4 pb-2">
        <div class="my-2 text-2xl font-bold">
          {{ content.hybridGraph.title }}
        </div>
        <div class="text-sm opacity-80">
          {{ content.hybridGraph.description }}
        </div>
        <div class="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {{ content.hybridGraph.url }}
        </div>
      </div>
    </div>
  </div>
</template>
