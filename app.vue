<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

// @ts-expect-error right
function updateCursor({ x, y }) {
  document.documentElement.style.setProperty('--x', x)
  document.documentElement.style.setProperty('--y', y)
}

onMounted(() => {
  document.body.addEventListener('pointermove', updateCursor)
})
</script>

<template>
  <Header />
  <main class="w-full px-5">
    <NuxtPage />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Default Layout]
    </div>
  </main>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.card {
  position: relative;
  transition: all 0.1s;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.dark .card {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
}

.card:hover {
  --active: 1;
  box-shadow: inset 0 0 0 2px rgb(167, 139, 250, 0.85);
  z-index: 100;
}

.card:after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
    hsl(0 0% 100% / 0.15),
    transparent 40vmin
  );
  background-attachment: fixed;
  opacity: var(--active, 0);
  transition: opacity 0.2s;
  pointer-events: none;
  border-radius: 0.25rem;
}

.card:before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
      rgb(167, 139, 250, 1),
      transparent 40vmin
    ),
    transparent;
  background-attachment: fixed;
  pointer-events: none;
  mask:
    linear-gradient(white, white) 50% 0 / 100% 2px no-repeat,
    linear-gradient(white, white) 50% 100% / 100% 2px no-repeat,
    linear-gradient(white, white) 0 50% / 2px 100% no-repeat,
    linear-gradient(white, white) 100% 50% / 2px 100% no-repeat;
  z-index: 100;
  border-radius: 0.25rem;
}

.light .github-light {
  background-color: #ddd !important;
}
.dark .github-dark {
  background-color: #111 !important;
}
</style>
