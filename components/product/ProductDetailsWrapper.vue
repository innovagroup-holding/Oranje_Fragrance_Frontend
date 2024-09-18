<template>
  <div class="shop-area pt-100 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="product-details-slider">
            <div class="product-details-img">
              <div class="product-badges">
                <span class="product-label pink" v-if="product.new">New</span>
                <span class="product-label purple" v-if="product.discount"
                  >-{{ product.discount }}%</span
                >
              </div>
              <swiper :options="swiperOptionTop" ref="swiperTop">
                <div
                  class="large-img swiper-slide"
                  v-for="(image, index) in product.images"
                  :key="index"
                >
                  <div style="background: white; text-align: center">
                    <img
                      class="img-fluid"
                      :src="$store.getters.serverURL + image.image_path"
                      :alt="product.title"
                    />
                  </div>
                </div>
                <div class="quickview-nav swiper-button-prev">
                  <i class="pe-7s-angle-left"></i>
                </div>
                <div class="quickview-nav swiper-button-next">
                  <i class="pe-7s-angle-right"></i>
                </div>
              </swiper>
              <swiper
                class="mt-2"
                :options="swiperOptionThumbs"
                ref="swiperThumbs"
              >
                <div
                  class="thumb-img swiper-slide"
                  v-for="(image, index) in product.images"
                  :key="index"
                >
                  <img
                    class="img-fluid"
                    :src="$store.getters.serverURL + image.image_path"
                    :alt="product.title"
                  />
                </div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product-details-content ml-70">
            <h2>{{ product.name }}</h2>
            <div class="product-details-price">
              <span>${{ discountedPrice(product).toFixed(2) }}</span>
              <span class="old" v-if="product.discount > 0"
                >${{ product.price.toFixed(2) }}</span
              >
            </div>
            <!-- <div class="pro-details-rating-wrap">
              <div class="pro-details-rating" v-if="product.rating == 5">
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
              </div>
              <div class="pro-details-rating" v-if="product.rating == 4">
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="pro-details-rating" v-if="product.rating == 3">
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="pro-details-rating" v-if="product.rating == 2">
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <div class="pro-details-rating" v-if="product.rating == 1">
                <i class="fa fa-star-o yellow"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
              </div>
              <span
                ><a href="#">{{ product.rating }} Reviews</a></span
              >
            </div> -->
            <p>{{ product.description }}</p>

            <div class="pro-details-quality">
              <div class="cart-plus-minus">
                <button @click="decreaseQuantity()" class="dec qtybutton">
                  -
                </button>
                <input
                  class="cart-plus-minus-box"
                  type="text"
                  :value="singleQuantity"
                  readonly
                />
                <button @click="increaseQuantity()" class="inc qtybutton">
                  +
                </button>
              </div>
              <div class="pro-details-cart btn-hover">
                <button class="add-to-cart" @click="addToCart(product)">
                  Add To Cart
                </button>
              </div>
              <div class="pro-details-cart btn-hover">
                <button class="add-to-cart" @click="buyNow(product)">
                  Buy Now
                </button>
              </div>
              <div class="pro-details-wishlist">
                <button @click="addToWishlist(product)" title="wishlist">
                  <i class="fa fa-heart-o"></i>
                </button>
              </div>
            </div>
            <div class="pro-details-meta">
              <span class="label">Category:</span>
              <ul>
                <li>
                  <n-link :to="`/shop?category=${product.category.id}`">
                    {{ product.category.name }}
                  </n-link>
                </li>
              </ul>
            </div>
            <div class="pro-details-meta">
              <span class="label">Tag:</span>
              <ul>
                <li v-for="(tag, index) in product.tags" :key="index">
                  <n-link :to="`/shop?tag=${tag.id}`">{{ tag.name }}</n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],

  data() {
    return {
      singleQuantity: 1,

      swiperOptionTop: {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        effect: "fade",
        loopedSlides: 5, // looped slides should be the same
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },

      swiperOptionThumbs: {
        loop: true,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        loopedSlides: 5, // looped slides should be the same
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },

  methods: {
    addToCart(product) {
      const prod = { ...product, cartQuantity: this.singleQuantity };
      // for notification
      if (this.$store.state.cart.find((el) => product.id === el.id)) {
        this.$notify({ title: "Already added to cart update with one" });
      } else {
        this.$notify({ title: "Add to cart successfully!" });
      }
      this.$store.dispatch("addToCartItem", prod);
    },

    discountedPrice(product) {
      return product.price - (product.price * product.discount) / 100;
    },

    increaseQuantity() {
      if (this.product.quantity > this.singleQuantity) this.singleQuantity++;
    },

    decreaseQuantity() {
      if (this.singleQuantity > 1) this.singleQuantity--;
    },

    addToWishlist(product) {
      // for notification
      if (this.$store.state.wishlist.find((el) => product.id === el.id)) {
        this.$notify({ title: "Already added to wishlist!" });
      } else {
        this.$notify({ title: "Add to wishlist successfully!" });
      }
      this.$store.dispatch("addToWishlist", product);
    },

    addToCompare(product) {
      // for notification
      if (this.$store.state.compare.find((el) => product.id === el.id)) {
        this.$notify({ title: "Already added to compare!" });
      } else {
        this.$notify({ title: "Add to compare successfully!" });
      }
      this.$store.dispatch("addToCompare", product);
    },
  },
};
</script>

<style lang="scss" scoped>
.pro-details-quality {
  align-items: stretch;
  gap: 1rem;
  .pro-details-cart {
    margin: 0 !important;
  }
  button {
    height: 100%;
    padding: 0 1rem;
  }
}

.qtybutton {
  text-align: center;
}

.cart-plus-minus {
  border-radius: 8px;
}
</style>
