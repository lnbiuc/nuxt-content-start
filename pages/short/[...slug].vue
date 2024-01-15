<script setup lang="ts">
// const {
//   page,
//   toc,
//   next,
//   prev,
// } = useContent()

// const { width } = useWindowSize()

function getReadableDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () => queryContent(route.path).findOne())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

// const { data: surround } = await useAsyncData(`docs-${route.path}-surround`, () => queryContent()
//   .only(['_path', 'title', 'navigation', 'description'])
//   .where({ _extension: 'md', navigation: { $ne: false } })
//   .findSurround(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path))

useSeoMeta({
  title: () => page.value?.navigation.title,
  description: () => page.value?.navigation.description,
})

defineOgImageComponent('Wave', {
  title: page.value?.navigation.title,
  //   description: page.value?.navigation?.description,
  theme: '#a78bfa',
  colorMode: 'dark',
})

// const toc = ref(page.value?.body?.toc as any)
const pageContent = ref(page as any)

useSeoMeta({
  ogImage: page.value?.navigation.cover ? page.value?.navigation.cover : '/og.png',
  twitterTitle: page.value?.navigation.title,
  twitterDescription: page.value?.navigation.description,
  twitterImage: page.value?.navigation.cover ? page.value?.navigation.cover : '/og.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full text-left lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <div class="flex flex-col text-left">
        <Transition name="fade">
          <img
            v-if="page?.navigation.cover" :src="page.navigation.cover" alt="cover"
            class="z-10 aspect-[16/9] w-full rounded-lg object-cover"
          >
        </Transition>
        <div class="my-6 text-4xl font-bold">
          {{ page?.navigation.title }}
        </div>
        <div class="mb-1">
          {{ page?.navigation.description }}
        </div>
        <div class="mt-4 flex flex-row items-center justify-start text-violet">
          <div>{{ getReadableDate(page?.navigation.date) }}</div>
        </div>
        <UDivider class="my-6" />
      </div>
      <!-- <div :class="{ Container: toc.links.length > 0 && width > 767 }" class="prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 w-full flex flex-row prose light:prose-zinc dark:prose-invert" style="max-width: unset;"> -->
      <div class="max-w-screen w-full prose dark:prose-invert">
        <ContentRenderer :key="page?._id" :value="pageContent" />
      </div>
      <!-- <Slidebar v-if="toc.links.length > 0 && width > 767" class="ml-5 w-20%" /> -->
      <!-- </div> -->
      <!-- <PrevAndNext
        :prev-title="prev.navigation ? prev.navigation.title : ''"
        :prev-path="prev._path ? prev._path : ''"
        :prev-desc="prev.navigation ? prev.navigation.description : ''"
        :next-title="next.navigation ? next.navigation.title : ''"
        :next-path="next._path ? next._path : ''"
        :next-desc="next.navigation ? next.navigation.description : ''"
      /> -->
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

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  font-family: 'Source Han Serif SC', 'Source Han Serif CN', 'Noto Serif CJK SC',
    'Noto Serif SC', serif !important;
  font-weight: 600 !important;
}
</style>
