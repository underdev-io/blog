<template>
  <div>
    <time itemprop="datePublished" class="blog-post-item">{{
      friendlyDate(date)
    }}</time>
    <p v-if="author && author.name" class="blog-post-item">
      {{ author.name }}
    </p>
  </div>
</template>

<script lang="ts">
import { format, isValid } from "date-fns";

export default {
  name: "PostDate",
  props: {
    date: {
      type: String,
      default: () => "",
    },
    author: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    friendlyDate(value: string) {
      const parsedValue = new Date(value);

      return isValid(parsedValue) ? format(parsedValue, "dd/MM/yyyy") : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.blog-post-item {
  display: inline-block;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  color: #222;
  padding: 0px 5px;
  margin-right: 0.5rem;
}
</style>
