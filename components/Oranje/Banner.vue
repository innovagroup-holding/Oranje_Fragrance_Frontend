<template>
  <n-link class="container" :to="link" data-aos="fade-up">
    <img :src="banner.image" :alt="banner.title" />
  </n-link>
</template>

<script>
export default {
  props: ["banner"],
  methods: {},
  computed: {
    link() {
      const pageName = this.banner.type === "product" ? "product/" : "shop?";
      const params =
        this.banner.type === "product"
          ? this.banner.target
          : `${this.banner.type}=${this.banner.target}`;

      return pageName + params;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  display: block;
  img {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>
