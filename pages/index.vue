<template>
  <div>
    <BlogHeader />

    <main class="blog-container">
      <ul class="blog-posts">
        <li v-for="post in posts" :key="post.slug" class="blog-posts__item">
          <NuxtLink :to="post.path">
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p></NuxtLink
          >
        </li>
      </ul>
    </main>

    <BlogFooter />
  </div>
</template>

<script lang="ts">
import BlogHeader from "~/components/BlogHeader.vue";
import BlogFooter from "~/components/BlogFooter.vue";

export default {
  name: "IndexPage",
  components: { BlogHeader, BlogFooter },
  async asyncData({ $content }) {
    const posts = await $content("posts").fetch();

    return {
      posts,
    };
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    console.log(this.posts);
  },
};
</script>

<style scoped>
.blog-container {
  padding: 0px 20px;
}

.blog-posts {
  list-style: none;
}
</style>
