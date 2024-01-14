<script setup lang="ts">
import { useActiveScroll } from 'vue-use-active-scroll'

const { toc } = useContent()

const targets = computed(() =>
  toc.value.links.flatMap(({ id = '', children = [] }) => [
    id as string,
    ...children.map(({ id }) => id as string),
  ]),
)

const { setActive, activeId } = useActiveScroll(targets)

const isSSR = ref(true)
onMounted(() => (isSSR.value = false))
</script>

<template>
  <aside class="max-w-[300px] min-w-[150px] text-sm">
    <nav>
      <ul>
        <li v-for="(link, idx) in toc.links" :key="link.id">
          <NuxtLink
            :to="{ hash: `#${link.id}` }"
            :class="{
              ActiveLink: (isSSR && idx === 0) || activeId === link.id,
              //@ts-expect-error fixed
              ParentActive: link.children?.some(({ id }) => id === activeId),
            }"
            @click="setActive(link.id)"
          >
            {{ link.text }}
          </NuxtLink>
          <!-- Nested List - Start -->
          <ul v-if="link.children">
            <li v-for="child in link.children" :key="child.id">
              <NuxtLink
                :to="{ hash: `#${child.id}` }"
                :class="{ ActiveLink: activeId === child.id }"
                @click="setActive(child.id)"
              >
                {{ child.text }}
              </NuxtLink>
            </li>
          </ul>
          <!-- Nested List - End -->
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  position: sticky;
  top: 60px;
  align-self: start;
  max-height: calc(100vh - 60px);
  overflow: scroll;
}

ul {
  list-style: none;
  display: grid;
  gap: 5px;
}

a {
  text-decoration: none;
  white-space: nowrap;
}

.ActiveLink,
.Child {
  color: rgb(106, 103, 206);
}

.ParentActive {
  color: #a78bfa;
}
</style>
