<template>
  <header class="blog-header">
    <NuxtLink to="/">
      <img
        class="blog-header__logo"
        src="https://underdev.io/_next/static/image/components/Header/logo.8e2d2b891f7910ddec968e53255c0924.svg"
        alt="Underdev"
      />
    </NuxtLink>
  </header>
</template>

<script>
export default {
  name: "BlogHeader",
};
</script>

<style lang="postcss" scoped>
.blog-header {
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.09);
  padding: 15px;
  text-align: center;
  margin-bottom: 10px;
}

.blog-header__logo {
  height: 40px;
}
</style>
