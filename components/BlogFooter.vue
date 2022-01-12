<template>
  <footer class="blog-footer">
    <div class="blog-footer__container">
      <p>
        <strong>Underdev HQ</strong> Rua Portugal, 753, Higienópolis | Porto
        Alegre, Brazil
      </p>
      <nav>
        <a href="#">Github</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BlogFooter",
};
</script>

<style lang="postcss" scoped>
.blog-footer {
  margin-top: 20px;
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Hind";

  p {
    font-weight: 300;
    letter-spacing: 0.05rem;
  }

  a {
    color: #222;
    font-weight: 400;
    margin-right: 10px;
    transition: all 0.15s ease-in;

    &:hover {
      color: rgb(0, 233, 197);
    }
  }
}

.blog-footer__container {
  padding: 20px;
  @media (min-width: 992px) {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
