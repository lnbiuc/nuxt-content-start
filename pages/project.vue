<template>
  <main class="flex flex-col items-center pt-4 text-center lg:pt-5 md:pt-6 sm:pt-6 xl:pt-10">
    <div class="w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%]">
      <nav>
        <ContentNavigation v-slot="{ navigation }">
          <div v-for="link of navigation" :key="link._path">
            <div v-if="link._path === '/project' && link.children">
              <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
                <TransitionGroup name="fade">
                  <ProjectCard
                    v-for="article of link.children" :key="article._path"
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
    </div>
  </main>
</template>
