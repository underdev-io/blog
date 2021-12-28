<template>
  <time class="blog-post-date">{{ friendlyDate(date) }}</time>
</template>

<script lang="ts">
import { format } from "date-fns";

export default {
  name: "PostDate",
  props: {
    date: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    friendlyDate(value: string) {
      const parsedValue = new Date(value);

      return format(parsedValue, "dd/MM/yyyy");
    },
  },
};
</script>

<style lang="postcss" scoped>
.blog-post-date {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  color: #222;
  padding: 0px 5px;
}
</style>
