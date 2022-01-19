<template>
  <ul class="post-toc">
    <li v-for="title in toc" :key="title.id">
      <a id="title" @click="scroll(title)">
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
    scroll(title: any) {
      if (title)
        document
          .querySelector(`#${title.id}`)!
          .scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-toc {
  margin-left: 30px;
  font-weight: bold;
  font-size: 1rem;
  list-style-type: circle;
  text-align: left;
}
</style>
