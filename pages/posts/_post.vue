<template>
  <div>
    <blog-header />

    <article itemscope itemtype="https://schema.org/Article" class="blog-post">
      <post-date :date="post.date" :author="author" />
      <post-title :title="post.title" />
      <post-toc :toc="post.toc" />
      <nuxt-content :document="post" />
      <post-author :author="author" />

      <div
        class="fb-comments"
        :data-href="`https://blog.underdev.io/${$nuxt.$route.path}`"
        data-width="100%"
        data-numposts="5"
      ></div>
    </article>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const authors = [
  {
    username: "lhas",
    name: "Luiz Almeida",
    description:
      "Desenvolvedor de software há 11 anos, especializado em construir soluções criativas para problemas do mundo real.",
    image: "https://avatars.githubusercontent.com/u/41020086",
    github: "https://www.github.com/lhas-dev/",
    instagram: "https://www.instagram.com/lhas_dev/",
    linkedin: "https://www.linkedin.com/in/luizhrqas/",
  },
  {
    username: "pvinig",
    name: "Vinicius Pretto",
    description:
      "Desenvolvedor back-end, trabalha com Node.js e as vezes com C++ por diversão no Arduino.",
    image: "https://avatars.githubusercontent.com/u/83087064",
    github: "https://github.com/pvinig",
    instagram: "https://www.instagram.com/lhas_dev/",
    linkedin: "https://www.linkedin.com/in/luizhrqas/",
  },
];
export default Vue.extend({
  async asyncData({ $content, params }: any) {
    const post = await $content("posts", params.post).fetch();

    return {
      post,
    };
  },
  data() {
    return {
      post: { title: "", author: "", description: "" },
    };
  },
  head(): any {
    return {
      title: `${this.post.title} | Underdev Blog`,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          content: `${this.post.title} | Underdev Blog`,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.post.description,
        },
        {
          hid: "description",
          name: "description",
          content: this.post.description,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://blog.underdev.io/og_image.png",
        },
      ],
    };
  },
  computed: {
    author(): any {
      const value = this.post.author || "lhas";
      const author = authors.find((item) => item.username === value);

      return author;
    },
  },
  mounted() {
    (window as any).FB.XFBML.parse();
  },
});
</script>

<style lang="postcss">
.blog-post {
  padding: 20px;

  img {
    margin: 0 auto;
    max-height: 300px;
    display: block;
    border-radius: 4px;
  }

  @media (min-width: 992px) {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.nuxt-content-container {
  margin-top: 0.5rem;

  h2,
  h3 {
    padding-top: 1rem;
  }

  p {
    margin-top: 0.75rem;
    font-size: 1rem;
  }

  a {
    color: rgb(2, 192, 163);
  }

  ul {
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  .nuxt-content-highlight {
    margin-top: 1rem;
  }

  .token.function {
    color: rgb(2, 192, 163);
  }
}
</style>
