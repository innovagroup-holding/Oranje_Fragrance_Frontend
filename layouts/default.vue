<template>
  <div>
    <Nuxt />

    <client-only>
      <notifications
        position="bottom left"
        classes="vue-notification success"
      />
    </client-only>

    <button
      class="scroll-top"
      @click="scrollToTop"
      :class="{ show: isVisible }"
    >
      <i class="fa fa-angle-double-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      if (scroll >= 500) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
    // API:
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchTags");
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style lang="scss">
.scroll-top i {
  transform: translateY(-2px);
}

.swiper-slide > div:not(.container) {
  background: white;
  text-align: center;
}
</style>
