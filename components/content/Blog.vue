<template>
  <NuxtLayout name="home">
    <nav>
      <ContentNavigation v-slot="{ navigation }">
        <div v-for="link of navigation" :key="link._path">
          <div v-if="link._path === '/article' && link.children">
            <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
              <TransitionGroup name="fade">
                <BlogCard
                  v-for="article of link.children" :key="article._path"
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
  </NuxtLayout>
</template>
