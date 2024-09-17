<template>
  <div class="home-page-wrapper">
    <TheHeader />
    <HeroSlider />
    <GenderTags />
    <Categories />
    <ProductWrapper title="Featured Products" tag="featured" />
    <!-- <Banner :banner="featuredProducts[0]" /> -->

    <ProductWrapper
      title="Oranje Original Products"
      :category="
        $store.getters.categoryData.find((type) => type.name === 'oranje')?.id
      "
    />
    <!-- <Banner :banner="recommendedProducts[0]" /> -->
    <ServicePolicy />
    <TheFooter />
  </div>
</template>

<script>
export default {
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
      title: "Home",
    };
  },
};
</script>
