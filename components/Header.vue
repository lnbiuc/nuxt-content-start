<script lang="ts" setup>
import { useFixedHeader } from 'vue-use-fixed-header'

const { width } = useWindowSize()

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)
</script>

<template>
  <div class="flex flex-col items-center justify-center px-5">
    <header ref="headerRef" class="Header w-full overflow-hidden xl:m-2 lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%] xl:rounded-md" :style="styles">
      <div class="wave-animation h-[10px] w-full" />
      <div class="w-full flex flex-row items-center justify-center">
        <div class="w-[70%] flex justify-center">
          <ul class="flex flex-row py-2">
            <span class="header-link" @click="$router.push('/')">
              Home
            </span>
            <span class="header-link" @click="$router.push('/blog')">
              Blog
            </span>
            <span class="header-link" @click="$router.push('/shorts')">
              Shorts
            </span>
            <span class="header-link" @click="$router.push('/project')">
              Project
            </span>
            <span class="header-link" @click="$router.push('/about')">
              About
            </span>
          </ul>
        </div>
        <div v-if="width > 767" class="w-[30%] flex justify-center">
          <DarkToggle />
        </div>
      </div>
    </header>
  </div>

  <div class="h-60px w-full" />
</template>

<style scoped>
.wave-animation {
  background: linear-gradient(
    to right,
    #8a2be2,
    rgb(106, 103, 206),
    #aa00ff,
    #7a2df3
  );
  background-size: 200% 200%;
  box-shadow: 0 0 150px 2px rgb(106, 103, 206);
}

.Header {
  position: fixed; /* or sticky */
  top: 0;
  width: 100%;
  z-index: 1000;
  align-items: center;
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
