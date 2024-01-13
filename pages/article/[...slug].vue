<script setup lang="ts">
const {
  page,
} = useContent()

const { width } = useWindowSize()
</script>

<template>
  <NuxtLayout name="article">
    <div class="flex flex-col text-left">
      <Transition name="fade">
        <img
          v-if="page.navigation.cover" :src="page.navigation.cover" alt="cover"
          class="z-10 aspect-[2.5/1] w-full rounded-lg object-cover"
        >
      </Transition>
      <div class="my-6 text-4xl font-bold">
        {{ page.navigation.title }}
      </div>
      <div class="mb-1">
        {{ page.navigation.description }}
      </div>
      <div class="mt-4 flex flex-row items-center justify-start text-violet">
        <div class="i-carbon-view mr-2" />
        <div>{{ page.navigation.views }} views</div>
        <div class="i-carbon-alarm mx-2 scale-110" />
        <div>{{ page.navigation.date }}</div>
      </div>
      <UDivider class="my-6" />
    </div>
    <div :class="{ Container: width > 767 && page.toc && page.toc.links }" class="prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 w-full prose light:prose-zinc dark:prose-invert" style="max-width: unset;">
      <article>
        <ContentRenderer :key="page._id" :value="page" />
      </article>
      <Slidebar v-if="width > 767 && page.toc && page.toc.links" />
    </div>
    <Comment />
  </NuxtLayout>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
  font-family: sans-serif;
}

.Container {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr auto;
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
