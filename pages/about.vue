<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/about').findOne())
</script>

<template>
  <NuxtLayout name="home">
    <div class="Container prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 w-full text-left prose light:prose-zinc dark:prose-invert" style="max-width: unset;">
      <article>
        <ContentRenderer :value="data" />
      </article>
    </div>
    <Comment />
  </NuxtLayout>
</template>
