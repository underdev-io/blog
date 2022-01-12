<template>
  <div class="post-author">
    <h2 class="post-author__title">Sobre o autor</h2>
    <div class="post-author__content">
      <img class="post-author__image" :src="image" />
      <div class="post-author__text">
        <p>Lorem ipsum</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PostAuthor",
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    image() {
      return `https://avatars.githubusercontent.com/u/41020086`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-author {
  margin-top: 1rem;
}

.post-author__title {
  font-size: 1.5rem;
}

.post-author__content {
  display: flex;
}

.post-author__image {
  height: 120px;
  border-radius: 55px;
}
</style>
