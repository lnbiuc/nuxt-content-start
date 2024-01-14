<script setup lang="ts">
const { data: shorts } = await useAsyncData('all-shorts', () =>
  queryContent('/short').sort({ published: -1 }).find())

definePageMeta({
  title: 'Shorts',
})

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '薇尔薇｜Shorts',
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
  title: 'Shorts',
  titleTemplate: '%s %separator %separator %siteName',
})
</script>

<template>
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <nav>
        <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
          <TransitionGroup name="fade">
            <ShortCard
              v-for="article of shorts" :key="article._path"
              :title="article.navigation.title"
              :cover="article.navigation.cover"
              :description="article.navigation.description"
              :tags="article.navigation.tags"
              :path="article._path"
              :date="article.navigation.date"
            />
          </TransitionGroup>
        </div>
      </nav>
    </div>
  </main>
</template>
