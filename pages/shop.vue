<template>
  <div class="shop-page-wrapper">
    <HeaderWithTopbar containerClass="container" />
    <Breadcrumb pageTitle="shop grid standard" />

    <!-- product items wrapper -->
    <div class="shop-area pt-100 pb-100">
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-lg-9">
            <!-- shop top bar -->
            <div class="shop-top-bar">
              <div class="select-showing-wrap">
                <div class="shop-select">
                  <select v-model="selectedPrice">
                    <option value="default">Default</option>
                    <option value="low2high">Price - Low to High</option>
                    <option value="high2low">Price - High to Low</option>
                  </select>
                </div>
                <!-- <p>
                  Showing {{ perPage * currentPage - perPage + 1 }} to
                  {{
                    perPage * currentPage > filterItems.length
                      ? filterItems.length
                      : perPage * currentPage
                  }}
                  of {{ filterItems.length }} result
                </p> -->
              </div>
              <div class="shop-tab">
                <button
                  @click="layout = 'twoColumn'"
                  :class="{ active: layout === 'twoColumn' }"
                >
                  <i class="fa fa-th-large"></i>
                </button>
                <button
                  @click="layout = 'threeColumn'"
                  :class="{ active: layout === 'threeColumn' }"
                >
                  <i class="fa fa-th"></i>
                </button>
                <button
                  @click="layout = 'list'"
                  :class="{ active: layout === 'list' }"
                >
                  <i class="fa fa-list-ul"></i>
                </button>
              </div>
            </div>
            <!-- end shop top bar -->

            <!-- shop product -->
            <div class="shop-bottom-area mt-35">
              <div
                class="row product-layout"
                :class="{
                  list: layout === 'list',
                  'grid three-column': layout === 'threeColumn',
                  'grid two-column': layout === 'twoColumn',
                }"
              >
                <div
                  class="col-xl-4 col-sm-6"
                  v-for="(product, index) in products"
                  :key="index"
                >
                  <ProductGridItem :product="product" :layout="layout" />
                </div>
              </div>
            </div>
            <!-- end shop product -->

            <div v-if="getPaginateCount > 1">
              <pagination
                class="pro-pagination-style shop-pagination mt-30"
                v-model="currentPage"
                :per-page="perPage"
                :records="filterItems.length"
                @paginate="paginateClickCallback"
                :page-count="getPaginateCount"
              />
            </div>
          </div>

          <div class="col-lg-3">
            <ShopSidebar classes="mr-30" />
          </div>
        </div>
      </div>
    </div>
    <!-- end product items wrapper -->

    <QuickView />
    <TheFooter />
  </div>
</template>

<script>
export default {
  components: {
    HeaderWithTopbar: () => import("@/components/HeaderWithTopbar"),
    Breadcrumb: () => import("@/components/Breadcrumb"),
    ProductGridItem: () => import("@/components/product/ProductGridItem"),
    QuickView: () => import("@/components/QuickView"),
    TheFooter: () => import("@/components/TheFooter"),
  },

  data() {
    return {
      layout: "threeColumn",
      filterItems: [],
      prevSelectedCategoryId: "",
      prevSelectedTagId: "",
      prevSelectedSizeName: "",
      prevSelectedColorName: "",
      currentPage: 1,
      perPage: 9,
      selectedPrice: "default",
      products: [],
    };
  },

  computed: {
    // getItems() {
    //   let start = (this.currentPage - 1) * this.perPage;
    //   let end = this.currentPage * this.perPage;
    //   return this.filterItems.slice(start, end);
    // },
    // getPaginateCount() {
    //   return Math.ceil(this.filterItems.length / this.perPage);
    // },
  },

  mounted() {
    // this.updateProductData();
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      this.products = (
        await this.$store.dispatch("fetchProducts", {
          category: this.$route.query.category,
          tag: this.$route.query.tag,
        })
      ).data;
    },
    paginateClickCallback(page) {
      this.currentPage = Number(page);
    },

    // updateProductData() {
    //   this.paginateClickCallback(1);

    //   const categoryId = this.$route.query.category;
    //   const tagId = this.$route.query.tag;

    //   if (Object.keys(this.$route.query).length === 0) {
    //     this.filterItems = [...this.products];
    //   }

    //   if (categoryId && this.prevSelectedCategoryId !== categoryId) {
    //     if (Boolean(categoryId) === false || categoryId === 0) {
    //       this.filterItems = [...this.products];
    //     } else {
    //       const resultData = this.products.filter(
    //         (item) => item.category.id === categoryId
    //       );
    //       this.filterItems = [];
    //       this.filterItems.push(...resultData);
    //     }
    //   }

    //   if (tagId && this.prevSelectedTagId !== tagId) {
    //     if (tagId) {
    //       const resultData = this.products.filter((item) =>
    //         item.tags.map((tag) => tag.id).includes(tagId)
    //       );
    //       this.filterItems = [];
    //       this.filterItems.push(...resultData);
    //     } else {
    //       this.filterItems = [...this.products];
    //     }
    //   }

    //   this.prevSelectedCategoryId = categoryId;
    //   this.prevSelectedTagId = tagId;
    // },

    discountedPrice(product) {
      return product.price - (product.price * product.discount) / 100;
    },

    // slugify(text) {
    //   return text
    //     .toString()
    //     .toLowerCase()
    //     .replace(/\s+/g, "-") // Replace spaces with -
    //     .replace(/[^\w-]+/g, "") // Remove all non-word chars
    //     .replace(/--+/g, "-") // Replace multiple - with single -
    //     .replace(/^-+/, "") // Trim - from start of text
    //     .replace(/-+$/, ""); // Trim - from end of text
    // },
  },

  watch: {
    $route() {
      // this.updateProductData();
      this.fetchProducts();
    },

    // selectedPrice() {
    //   switch (this.selectedPrice) {
    //     case "low2high":
    //       this.filterItems = this.filterItems.sort(
    //         (a, b) => this.discountedPrice(a) - this.discountedPrice(b)
    //       );
    //       break;
    //     case "high2low":
    //       this.filterItems = this.filterItems.sort(
    //         (a, b) => this.discountedPrice(b) - this.discountedPrice(a)
    //       );
    //       break;
    //     default:
    //       this.filterItems = [...this.products];
    //   }
    // },
  },

  head() {
    return {
      title: "Shop grid standard",
    };
  },
};
</script>
