<template>
  <div class="blog-pagination">
    <nuxt-link
      :class="{ disabled: prevPage === currentPage }"
      :to="`/posts/page/${prevPage}`"
    >
      <v-icon scale="1.5" name="chevron-left" style="margin-right: 10px" />
      Anterior
    </nuxt-link>

    <nuxt-link
      :class="{ disabled: nextPage === currentPage }"
      :to="`/posts/page/${nextPage}`"
    >
      Próximo
      <v-icon scale="1.5" name="chevron-right" style="margin-left: 10px" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BlogPagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.total / this.perPage);
    },
    currentPage(): number {
      const page = this.$route.params.page
        ? this.$route.params.page.toString()
        : "";
      return parseInt(page) || 1;
    },
    prevPage(): number {
      return this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    nextPage(): number {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages;
    },
  },
});
</script>

<style lang="postcss" scoped>
.blog-pagination {
  display: flex;
  @media (min-width: 992px) {
    max-width: 1200px;
    margin: 0 auto;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    font-family: "Hind";
    text-decoration: none;
    font-weight: 300;
    font-size: 16px;
    color: #222;
    transition: all 0.15s ease-in;

    &:hover {
      font-weight: bold;
    }

    &.disabled {
      background: rgba(0, 0, 0, 0.02);
      color: rgba(0, 0, 0, 0.7);
      cursor: not-allowed;
      &:hover {
        font-weight: 300;
      }
    }
  }
}
</style>
