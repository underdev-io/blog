<template>
  <div class="post-toc">
    <ol class="post-toc__list">
      <li v-for="title in toc" :key="title.id">
        <a :href="`#${title.id}`" @click="(event) => scroll(title, event)">
          {{ title.text }}
        </a>
      </li>
    </ol>
  </div>
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
      const blogHeader = document.querySelector(".blog-header");

      if (el && blogHeader) {
        const yAxis =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          blogHeader.scrollHeight;
        window.scrollTo({ top: yAxis, behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-toc {
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.25rem;
  }

  a {
    color: #222;
    margin-bottom: 0.15rem;
    display: block;

    &:hover {
      color: rgb(0, 233, 197);
    }
  }
}

.post-toc__list {
  padding-left: 1rem;
}
</style>
