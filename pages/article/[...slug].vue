<script setup lang="ts">
const {
  page,
  toc,
} = useContent()

const { width } = useWindowSize()

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
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full text-left lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <div class="flex flex-col text-left">
        <Transition name="fade">
          <img
            v-if="page.navigation.cover" :src="page.navigation.cover" alt="cover"
            class="z-10 aspect-[16/9] w-full rounded-lg object-cover"
          >
        </Transition>
        <div class="my-6 text-4xl font-bold">
          {{ page.navigation.title }}
        </div>
        <div class="mb-1">
          {{ page.navigation.description }}
        </div>
        <div class="mt-4 flex flex-row items-center justify-start text-violet">
          <div>{{ getReadableDate(page.navigation.date) }}</div>
        </div>
        <UDivider class="my-6" />
      </div>
      <div :class="{ Container: toc.links.length > 0 && width > 767 }" class="prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 w-full flex flex-row prose light:prose-zinc dark:prose-invert" style="max-width: unset;">
        <article class="w-80%">
          <ContentRenderer :key="page._id" :value="page" />
        </article>
        <Slidebar v-if="toc.links.length > 0 && width > 767" class="ml-5 w-20%" />
      </div>
      <Comment />
    </div>
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Article Layout]
    </div>
  </main>
</template>

<style scoped>
html {
  scroll-behavior: smooth !important;
  font-family: sans-serif !important;
}

.Container {
}

.heti {
  max-width: unset !important;
}

:deep(img) {
  z-index: 10;
  @apply rounded-lg mb-4;
}

.github-light,
.github-dark {
  background-color: black !important;
}
</style>
