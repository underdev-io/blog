<template>
  <div>
    <blog-header />

    <blog-posts :posts="posts" />

    <blog-pagination :total="total" :per-page="perPage" />

    <blog-footer />
  </div>
</template>

<script lang="ts">
export default {
  name: "IndexPage",
  async asyncData({ $content, query, error }: any) {
    const currentPage = parseInt(query.page);
    const perPage = 10;
    const posts = await $content("posts").sortBy("date", "desc").fetch();
    const totalPosts = posts.length;
    const lastPage = Math.ceil(totalPosts / perPage);
    const lastPageCount =
      totalPosts % perPage === 0 ? perPage : totalPosts % perPage;

    const skipNumber = () => {
      if (currentPage === 1) {
        return 0;
      }
      if (currentPage === lastPage) {
        return totalPosts - lastPageCount;
      }
      return (currentPage - 1) * perPage;
    };
    const paginatedPosts = await $content("posts")
      .only(["title", "description", "slug", "date"])
      .sortBy("date", "desc")
      .limit(perPage)
      .skip(skipNumber())
      .fetch();

    if (currentPage === 0 || !paginatedPosts.length) {
      return error({ statusCode: 404, message: "No posts found!" });
    }

    return {
      posts: paginatedPosts,
      total: totalPosts,
      perPage,
    };
  },
  data() {
    return {
      posts: [],
      total: 0,
      perPage: 0,
    };
  },
  head() {
    return {
      title: "Home | Underdev Blog",
    };
  },
  watchQuery: ["page"],
  mounted() {},
};
</script>
