<template>
  <div :to="`/product/${product.id}`" class="product-wrap">
    <div class="product-img">
      <n-link :to="`/product/${product.id}`">
        <img
          class="default-img"
          v-if="product.images.length > 1"
          :src="$store.getters.serverURL + product.images[0].image_path"
          :alt="product.title"
        />
        <img
          class="hover-img"
          v-if="product.images.length >= 2"
          :src="$store.getters.serverURL + product.images[1].image_path"
          :alt="product.name"
        />
      </n-link>
      <div class="product-badges">
        <span class="product-label pink" v-if="product.new">New</span>
        <span class="product-label purple" v-if="product.discount"
          >-{{ product.discount }}%</span
        >
      </div>
    </div>
    <div class="product-content">
      <n-link :to="`/product/${product.id}`">
        <h3>
          {{ product.name }}
        </h3>

        <p>
          {{
            product.description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dicta eum, error voluptas blanditiis impedit natus sunt omnis quae dolorum facere nobis commodi laboriosam vero aliquam pariatur quasi in! Quos?"
          }}
        </p>
      </n-link>
      <div class="product-price">
        <span>
          ${{ discountedPrice(parseFloat(product.price)).toFixed(2) }}
        </span>
        <span class="old" v-if="product.discount > 0">
          ${{ parseFloat(product.price).toFixed(2) }}
        </span>
      </div>

      <div
        class="product-action"
        v-if="layout === 'twoColumn' || layout === 'threeColumn'"
      >
        <div class="pro-same-action pro-quickview">
          <button class="btn" title="Quick View" @click="onClick(product)">
            <i class="pe-7s-look"></i>
          </button>
        </div>
        <div class="pro-same-action pro-wishlist">
          <button class="btn" title="Wishlist" @click="addToWishlist(product)">
            <i :class="`pe-7s-like${isInWishlist ? ' liked' : ''}`"></i>
          </button>
        </div>
        <div class="pro-same-action pro-cart">
          <button
            class="btn add-to-cart"
            title="Add To Cart"
            @click="addToCart(product)"
          >
            <i class="pe-7s-cart"></i>

            Add to cart
          </button>
        </div>
      </div>

      <div class="product-content__list-view" v-if="layout === 'list'">
        <!-- <p>{{ product.description }}</p> -->
        <div class="pro-action d-flex align-items-center">
          <div class="pro-cart btn-hover">
            <n-link
              :to="`/product/${product.id}`"
              class="btn"
              v-if="product.variation"
            >
              select option
            </n-link>
            <button
              class="btn add-to-cart"
              title="Add To Cart"
              @click="addToCart(product)"
              v-else
            >
              <i class="pe-7s-cart"></i>
              Add to cart
            </button>
          </div>
          <div class="pro-wishlist">
            <button @click="addToWishlist(product)">
              <i class="fa fa-heart-o"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "layout"],

  computed: {
    isInWishlist() {
      return Boolean(
        this.$store.getters.getWishlist.filter(
          (product) => product.id === this.product.id
        ).length
      );
    },
  },

  methods: {
    addToCart(product) {
      const prod = { ...product, cartQuantity: 1 };
      // for notification
      if (this.$store.state.cart.find((el) => product.id === el.id)) {
        this.$notify({ title: "Already added to cart update with one" });
      } else {
        this.$notify({ title: "Add to cart successfully!" });
      }

      this.$store.dispatch("addToCartItem", prod);
    },

    discountedPrice(price, discount = 0) {
      return price - (price * discount) / 100;
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

    onClick(product) {
      this.$modal.show("quickview", product);
    },
  },
};
</script>

<style>
div:has(> .product-wrap):not(.list div) {
  padding-top: 100px;
}

.add-to-cart {
  border: 1px solid #d4d4d4 !important;
  background-color: transparent !important;
  color: inherit !important;
  border-radius: 5px !important;
  width: 100%;
  font-size: 1em;
  flex-grow: 1;
  &::after {
    content: none !important;
  }
}
</style>

<style lang="scss" scoped>
p {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-line-clamp: 2;
}

h3 {
  font-weight: bold;
  margin-bottom: 0.5rem !important;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-line-clamp: 1;
}

i.liked {
  color: #e54653;
  -webkit-text-stroke: 1px #e54653;
}

.product-content {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  a {
    flex-grow: 1;
  }
}

.product-price {
  margin-bottom: 1rem;
  font-weight: light;
}

.product-wrap:not(.list .product-wrap) {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  }
  .product-img {
    height: 100px;
    img {
      width: 50%;
      transform: translateY(-40%);
      max-width: 156px;
    }
  }
}

.list .product-wrap {
  margin: 1rem 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  p {
    margin: 0;
  }
  .product-img {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      position: relative;
    }
    img {
      width: 70%;
    }
    img.default-img {
      margin: 0 15%;
    }
    img.hover-img {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  }
}

.product-action {
  display: flex;
  align-items: center;
  i {
    font-weight: 600;
    font-size: 1.2em;
  }
}

.pro-cart {
  flex-grow: 1;
}
</style>
