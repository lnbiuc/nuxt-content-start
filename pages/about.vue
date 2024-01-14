<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/about').findOne())
const page = data.value as unknown as Record<string, any>

definePageMeta({
  title: 'About',
})

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '薇尔薇｜About',
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
  title: 'About',
  titleTemplate: '%s %separator %separator %siteName',
})
</script>

<template>
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <div class="prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 Container w-full text-left prose light:prose-zinc dark:prose-invert" style="max-width: unset;">
        <article>
          <ContentRenderer :value="page" />
        </article>
      </div>
      <Comment />
    </div>
    <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Home Layout]
    </div> -->
  </main>
</template>
