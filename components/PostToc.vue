<template>
  <ul class="post-toc">
    <li v-for="title in toc" :key="title.id">
      <a :href="`#{title.id}`" @click="(event) => scroll(title, event)">
        {{ title.text }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "PostToc",
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    scroll(title: any, event: any) {
      event.preventDefault();
      const el = document.querySelector(`#${title.id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-toc {
  margin-left: 1rem;
  font-weight: bold;
  font-size: 1rem;
  list-style-type: circle;
  text-align: left;
}
</style>
