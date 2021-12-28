<template>
  <div>
    <blog-header />

    <article class="blog-post">
      <post-date :date="post.date" />
      <post-title :title="post.title" />
      <nuxt-content :document="post" />
    </article>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  async asyncData({ $content, params }: any) {
    const post = await $content("posts", params.post).fetch();

    return {
      post,
    };
  },
});
</script>

<style lang="postcss">
.blog-post {
  padding: 20px;
}

.nuxt-content-container {
  margin-top: 0.5rem;

  h2 {
    margin-top: 0.5rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  a {
    color: rgb(2, 192, 163);
  }

  .nuxt-content-highlight {
    margin-top: 0.5rem;
  }

  .token.function {
    color: rgb(2, 192, 163);
  }
}
</style>
