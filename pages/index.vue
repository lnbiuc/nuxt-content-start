<script setup lang="ts">
const online = useOnline()

definePageMeta({
  title: '',
})

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '薇尔薇',
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
  titleTemplate: '%siteName',
})
</script>

<template>
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
    <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
      <div class="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
        <div id="featured" class="title-font">
          Featured Article
        </div>
        <nav>
          <ContentNavigation v-slot="{ navigation }">
            <div v-for="link of navigation" :key="link._path">
              <div v-if="link._path === '/article' && link.children">
                <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
                  <TransitionGroup name="fade">
                    <BlogCard
                      v-for="article of link.children.slice(0, 6)" :key="article._path"
                      :title="article.title"
                      :cover="article.cover"
                      :description="article.description"
                      :tags="article.tags"
                      :path="article._path"
                      :views="article.views"
                      :date="article.date"
                    />
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </ContentNavigation>
        </nav>
        <div class="title-btn">
          <MyButton @click="$router.push('/blog')">
            See More
            <div class="i-carbon:arrow-right ml-2 mt-[2px] text-violet" />
          </MyButton>
        </div>
        <div class="title-font">
          Featured Shorts
        </div>
        <nav>
          <ContentNavigation v-slot="{ navigation }">
            <div v-for="link of navigation" :key="link._path">
              <div v-if="link._path === '/short' && link.children">
                <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
                  <TransitionGroup name="fade">
                    <ShortCard
                      v-for="article of link.children.slice(0, 6)" :key="article._path"
                      :title="article.title"
                      :cover="article.cover"
                      :description="article.description"
                      :tags="article.tags"
                      :path="article._path"
                      :views="article.views"
                      :date="article.date"
                    />
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </ContentNavigation>
        </nav>
        <div class="title-btn">
          <MyButton @click="$router.push('/shorts')">
            See More
            <div class="i-carbon:arrow-right ml-2 mt-[2px] text-violet" />
          </MyButton>
        </div>
        <div class="title-font">
          Featured Project
        </div>
        <nav>
          <ContentNavigation v-slot="{ navigation }">
            <div v-for="link of navigation" :key="link._path">
              <div v-if="link._path === '/project' && link.children">
                <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
                  <TransitionGroup name="fade">
                    <ProjectCard
                      v-for="article of link.children.slice(0, 3)" :key="article._path"
                      :title="article.title"
                      :cover="article.cover"
                      :description="article.description"
                      :tags="article.tags"
                      :path="article._path"
                      :views="article.views"
                      :date="article.date"
                      :link="article.link"
                    />
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </ContentNavigation>
        </nav>
        <div class="title-btn">
          <MyButton @click="$router.push('/project')">
            See More
            <div class="i-carbon:arrow-right ml-2 mt-[2px] text-violet" />
          </MyButton>
        </div>
      </div>
    <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Home Layout]
    </div> -->
    </main>
  </div>
</template>
