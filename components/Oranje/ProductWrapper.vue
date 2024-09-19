<template>
  <div class="product-area pb-90 pt-80">
    <div class="container">
      <h2 data-aos="fade">
        <span>{{ title }}</span>
      </h2>
      <div class="tab-content">
        <div>
          <div class="row">
            <div
              class="col-xl-3 col-lg-4 col-sm-6"
              style="padding-top: 100px"
              v-for="(product, index) in products"
              :key="index"
            >
              <ProductGridItem
                data-aos="fade-up"
                :data-aos-delay="200 * index"
                :product="product"
                :layout="layout"
              />
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
    const products = await this.$store.dispatch("fetchProducts", {
      category: this.category,
      tag: this.tag,
      limit: 4,
    });
    console.log(products);

    if (products.length && products.length < 4) {
      products.push(
        ...(await this.$store.dispatch("fetchProducts", {
          category: 6,
          limit: 3,
        }))
      );
    }
    this.products = products.slice(0, 4);
  },
};
</script>

<style lang="scss">
.home-page-wrapper h2:not(.vm--modal h2) {
  font-weight: 600;
  text-align: center;
  position: relative;
  color: #acacac;
  display: flex;
  justify-content: center;
  font-size: min(2em, 7vw);
  span {
    background: white;
    padding: 0 20px;
    z-index: 1;
    position: relative;
    line-height: 1.5em;
    max-width: 80%;
  }
  &::before {
    content: "";
    position: absolute;
    border: 1px solid #d4d4d4;
    width: 100%;
    top: 50%;
    left: 0;
  }
}

@media (min-width: 992px) {
  .home-page-wrapper .tab-content .row {
    flex-flow: row nowrap;
    overflow: hidden;
  }
}
</style>
