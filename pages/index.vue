<template>
  <div class="home-page-wrapper">
    <TheHeader />
    <HeroSlider />
    <GenderTags />
    <Categories />
    <ProductWrapper
      title="Featured Products"
      :tag="$store.getters.tagData.find((type) => type.name === 'VIP')?.id"
    />
    <Banner :banner="banners[0]" />
    <ProductWrapper
      title="Oranje Original Products"
      :category="
        $store.getters.categoryData.find((type) => type.name === 'oranje')?.id
      "
    />
    <Banner :banner="banners[1]" />
    <Sponsors :sponsors="sponsors" />
    <ServicePolicy />

    <TheFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        {
          title: "Good banner",
          image: "/img/Oranje/banner.webp",
          type: "product",
          target: "3",
          position: "body",
        },
        {
          title: "Good banner",
          image: "/img/Oranje/banner.webp",
          type: "category",
          target: "6",
          position: "body",
        },
      ],
      sponsors: [{ image: "/img/Oranje/sponsor.png" }],
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
    Sponsors: () => import("@/components/Oranje/Sponsors"),
  },
  head() {
    return {
      title: "Home",
    };
  },
};
</script>
