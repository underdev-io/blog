<template>
  <ul class="blog-posts">
    <li v-for="post in posts" :key="post.slug" class="blog-posts__item">
      <NuxtLink :to="`/posts/${post.slug}/`">
        <post-date :date="post.date" />
        <post-title :title="post.title" />
        <p class="blog-posts__item__text">{{ post.description }}</p></NuxtLink
      >
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "BlogPosts",
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss" scoped>
.blog-posts {
  list-style: none;

  @media (min-width: 992px) {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.blog-posts__item a {
  display: block;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #222;
  text-decoration: none;
  font-family: "Hind";
  transition: all 0.15s ease-in;

  &:hover {
    color: rgb(0, 233, 197);
    opacity: 1;
  }
}

.blog-posts__item:last-child a {
  border-bottom: none;
}

.blog-posts__item__text {
  font-size: 1rem;
  letter-spacing: 0.05rem;
  margin-top: 0.25rem;
}
</style>
