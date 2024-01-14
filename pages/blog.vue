<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles', () =>
  queryContent('/article').sort({ published: -1 }).find())

definePageMeta({
  title: 'Blogs',
})

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '薇尔薇｜Blog',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/og.png',
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
  title: 'Blogs',
  titleTemplate: '%s %separator %separator %siteName',
})
</script>

<template>
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
        <TransitionGroup name="fade">
          <BlogCard
            v-for="article of articles" :key="article._path"
            :title="article.navigation.title"
            :cover="article.navigation.cover"
            :description="article.navigation.description"
            :tags="article.navigation.tags"
            :path="article._path"
            :date="article.navigation.date"
          />
        </TransitionGroup>
      </div>
    </div>
    <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Home Layout]
    </div> -->
  </main>
</template>
