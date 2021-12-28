<template>
  <ul class="blog-posts">
    <li v-for="post in posts" :key="post.slug" class="blog-posts__item">
      <NuxtLink :to="post.path">
        <time class="blog-posts__item__date">{{
          friendlyDate(post.date)
        }}</time>
        <h2 class="blog-posts__item__title">{{ post.title }}</h2>
        <p class="blog-posts__item__text">{{ post.description }}</p></NuxtLink
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { format } from "date-fns";

export default {
  name: "BlogPosts",
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    friendlyDate(value: string) {
      const parsedValue = new Date(value);

      return format(parsedValue, "dd/MM/yyyy");
    },
  },
};
</script>

<style lang="postcss" scoped>
.blog-posts {
  list-style: none;
}

.blog-posts__item a {
  display: block;
  padding: 15px;
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

.blog-posts__item__title {
  font-size: 1.75rem;
  margin-top: 0.25rem;
}

.blog-posts__item__date {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  color: #222;
  padding: 0px 5px;
}

.blog-posts__item__text {
  font-size: 1rem;
  letter-spacing: 0.05rem;
  margin-top: 0.25rem;
}
</style>
