<template>
  <div>
    <div class="product-details-page-wrapper" v-if="product">
      <HeaderWithTopbar containerClass="container" />
      <Breadcrumb :pageTitle="product.name" />
      <ProductDetailsWrapper :product="product" />
      <ProductDetailsDescriptionReview />
      <TheFooter />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: null,
    };
  },

  computed: {},

  head() {
    return {
      // title: this.product.name,
    };
  },

  async created() {
    const product = await this.$store.dispatch("fetchProduct", { id: this.id });
    console.log("product page", product);

    this.product = product;
  },

  methods: {},
};
</script>
