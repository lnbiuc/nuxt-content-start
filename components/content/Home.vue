<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div>
        <Suspense>
          <ClientOnly>
            <div v-if="!online" text-gray:80>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div italic op50>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        <WelcomeCard />
      </div>
    </NuxtLayout>
  </div>
</template>
