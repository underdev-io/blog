<template>
  <header class="blog-header">
    <div class="blog-header__container">
      <NuxtLink to="/" class="blog-header__link">
        <img class="blog-header__logo" src="/logo.svg" alt="Underdev" />
        <div class="blog-header__text">
          <h1>Underdev</h1>
          <p>crafting ideas</p>
        </div>
      </NuxtLink>
    </div>
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
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.blog-header__logo {
  height: 40px;
}

.blog-header__link {
  display: flex;
  text-decoration: none;
}

.blog-header__text {
  padding-left: 15px;
  color: #222;
  font-family: "Hind";
  h1 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  p {
    font-weight: 300;
    font-size: 1rem;
    line-height: 1;
  }
}

.blog-header__container {
  @media (min-width: 992px) {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
