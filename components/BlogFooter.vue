<template>
  <footer class="blog-footer">
    <div class="blog-footer__container">
      <p>
        <strong>Underdev HQ</strong> Rua Portugal, 753, Higienópolis | Porto
        Alegre, Brazil
      </p>
      <nav>
        <a href="https://github.com/underdev-io" target="_blank"
          ><v-icon scale="2" name="brands/github" style="margin-right: 10px"
        /></a>
        <a href="https://instagram.com/lhas_dev" target="_blank"
          ><v-icon scale="2" name="brands/instagram" style="margin-right: 10px"
        /></a>
        <a href="https://www.linkedin.com/company/underdev-io/" target="_blank"
          ><v-icon scale="2" name="brands/linkedin" style="margin-right: 10px"
        /></a>
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
    margin-top: 1rem;
    display: inline-block;
    margin-right: 0.5rem;
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
