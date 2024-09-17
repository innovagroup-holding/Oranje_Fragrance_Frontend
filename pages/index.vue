<template>
  <div class="home-page-wrapper">
    <TheHeader />
    <HeroSlider />
    <GenderTags />
    <Categories />
    <ProductWrapper
      title="Featured Products"
      :products="featuredProducts"
      tag="featured"
    />
    <!-- <Banner :banner="featuredProducts[0]" /> -->
    <ProductWrapper
      title="Oranje Original Products"
      :products="oranjeProducts"
      category="oranje"
    />
    <!-- <Banner :banner="recommendedProducts[0]" /> -->
    <ServicePolicy />
    <TheFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      featuredProducts: [],
      oranjeProducts: [],
    };
  },
  components: {
    TheHeader: () => import("@/components/TheHeader"),
    HeroSlider: () => import("@/components/hero/HeroSlider"),
    ServicePolicy: () => import("@/components/policy/ServicePolicy"),
    ProductWrapper: () => import("@/components/Oranje/ProductWrapper"),
    GenderTags: () => import("@/components/Oranje/GenderTags"),
    Categories: () => import("@/components/Oranje/Categories"),
    TheFooter: () => import("@/components/TheFooter"),
    Banner: () => import("@/components/Oranje/Banner"),
  },
  head() {
    return {
      title: "Home Fashion One",
    };
  },
  async mounted() {
    const { result: featured } = await this.$axios.$get(
      "/products?tag=featured&limit=4"
    );
    this.featuredProducts = featured;
    const { result: oranje } = await this.$axios.$get(
      "/products?category=oranje&limit=4"
    );
    this.oranjeProducts = oranje;
  },
  computed: {},
};
</script>
