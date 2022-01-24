<template>
  <div class="post-author">
    <h2 class="post-author__title">Sobre o autor</h2>
    <div class="post-author__content">
      <img class="post-author__image" :src="author.image" />
      <div class="post-author__text">
        <strong itemprop="author">{{ author.name }}</strong>
        <p>
          {{ author.description }}
        </p>
        <nav>
          <a
            :href="author.github"
            title="Veja meu perfil no Github"
            target="_blank"
            ><v-icon scale="2" name="brands/github" style="margin-right: 10px"
          /></a>
          <a
            :href="author.instagram"
            title="Veja meu perfil no Instagram"
            target="_blank"
            ><v-icon
              scale="2"
              name="brands/instagram"
              style="margin-right: 10px"
          /></a>
          <a
            :href="author.linkedin"
            title="Veja meu perfil no Linkedin"
            target="_blank"
            ><v-icon
              scale="2"
              name="brands/linkedin"
              style="margin-right: 10px"
          /></a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PostAuthor",
  props: {
    author: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-author {
  margin-top: 1.5rem;
}

.post-author__title {
  font-size: 1.75rem;
}

.post-author__content {
  display: flex;
  margin-top: 1rem;
}

.post-author__image {
  height: 120px;
  border-radius: 100px;
  margin-right: 1rem;
}

.post-author__text {
  strong {
    text-transform: uppercase;
    font-size: 1.25rem;
  }

  p {
    font-size: 1.15rem;
  }

  nav {
    display: flex;
    margin-top: 1rem;

    a {
      margin-right: 1rem;
      color: #222;
      transition: all 0.25s ease-in-out;

      &:hover {
        color: rgb(0, 233, 197);
      }
    }
  }
}
</style>
