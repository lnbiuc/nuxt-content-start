<script setup lang="ts">
import MyGiscus from '~/components/Giscus'

const color = useColorMode()

const theme = computed(() => {
  return color.value === 'dark' ? 'dark' : 'light'
})
</script>

<template>
  <MyGiscus
    :theme="theme" category="Announcements" category-id="DIC_kwDOKsLYcc4CbAW9" class=""
    crossorigin="anonymous" emit-metadata="0" input-position="top" lang="en"
    mapping="pathname" reactions-enabled="1" repo="lnbiuc/blog-next-view" repo-id="R_kgDOKsLYcQ" strict="1"
    term="Welcome to @giscus/vue component!"
  />
</template>
