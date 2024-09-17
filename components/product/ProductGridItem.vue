<template>
  <div :to="`/product/${slugify(product.name)}`" class="product-wrap mb-30">
    <div class="product-img">
      <n-link :to="`/product/${slugify(product.name)}`">
        <img
          class="default-img"
          :src="product.image_path"
          :alt="product.title"
        />
        <img class="hover-img" :src="product.image_path" :alt="product.name" />
      </n-link>
      <div class="product-badges">
        <span class="product-label pink" v-if="product.new">New</span>
        <span class="product-label purple" v-if="product.discount"
          >-{{ product.discount }}%</span
        >
      </div>
    </div>
    <div class="product-content">
      <n-link :to="`/product/${slugify(product.name)}`">
        <h3>
          {{ product.name }}
        </h3>

        <p>{{ product.description }}</p>
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
        <p>{{ product.description }}</p>
        <div class="pro-action d-flex align-items-center">
          <div class="pro-cart btn-hover">
            <n-link
              :to="`/product/${slugify(product.name)}`"
              class="btn"
              v-if="product.variation"
            >
              select option
            </n-link>
            <button
              class="btn"
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
          <div class="pro-compare">
            <button @click="addToCompare(product)">
              <i class="pe-7s-shuffle"></i>
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

    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
  },
};
</script>

<style>
div:has(> .product-wrap):not(.list div) {
  padding-top: 100px;
}
</style>

<style scoped>
p {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-line-clamp: 2;
}

h3 {
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

.add-to-cart {
  font-size: 1em;
}

.product-price {
  margin-bottom: 1rem;
}

.product-action {
  display: flex;
}
.add-to-cart {
  border: 1px solid #d4d4d4;
  border-radius: 5px;
}
</style>
