<template>
  <div class="product-area pb-90 pt-80">
    <div class="container">
      <h2 style="font-weight: 600">{{ title }}</h2>
      <div class="tab-content pt-50">
        <div>
          <div class="row">
            <div
              class="col-xl-3 col-lg-4 col-sm-6"
              style="padding-top: 100px"
              v-for="(product, index) in products"
              :key="index"
            >
              <ProductGridItem :product="product" :layout="layout" />
            </div>
          </div>
        </div>
        <div class="view-more text-center mt-20 toggle-btn2">
          <n-link
            :to="`/shop${
              category ? '?category=' + category : tag ? '?tag=' + tag : ''
            }`"
            class="loadMore2"
            >VIEW MORE PRODUCTS</n-link
          >
        </div>
      </div>
    </div>
    <QuickView />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      layout: "twoColumn",
    };
  },

  props: ["isSectionTitle", "title", "tag", "category"],

  components: {
    ProductGridItem: () => import("@/components/product/ProductGridItem"),
    QuickView: () => import("@/components/QuickView"),
  },

  async mounted() {
    const { result: products } = await this.$axios.$get("/products", {
      params: { category: this.category, tag: this.tag, limit: 4 },
    });

    this.products = products;
  },
};
</script>
