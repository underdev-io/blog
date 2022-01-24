<template>
  <h2 itemprop="name" class="post-title">{{ title }}</h2>
</template>

<script lang="ts">
export default {
  name: "PostTitle",
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-title {
  font-size: 1.75rem;
  margin-top: 0.25rem;
}
</style>
