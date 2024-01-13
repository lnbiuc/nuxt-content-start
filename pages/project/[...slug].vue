<template>
  <main>
    <h1>project</h1>
    <ContentDoc v-slot="{ doc }">
      <article>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>
