import Vue from "vue";
import Vuex from "vuex";

// import products from "../data/product.json";

Vue.use(Vuex);

export const state = () => ({
  serverURL: "https://phplaravel-1239567-4860975.cloudwaysapps.com/",
  products: [],
  cart: [],
  wishlist: [],
  compare: [],
  categories: { categories: [], categoryNames: [] },
  tags: [],
});

// your root getters
export const getters = {
  serverURL(state) {
    return state.serverURL;
  },

  getProducts(state) {
    return state.products;
  },

  getCart: (state) => {
    return state.cart;
  },

  cartItemCount: (state) => {
    return state.cart.length;
  },

  getWishlist: (state) => {
    return state.wishlist;
  },

  getCompare: (state) => {
    return state.compare;
  },

  wishlistItemCount: (state) => {
    return state.wishlist.length;
  },

  compareItemCount: (state) => {
    return state.compare.length;
  },

  getTotal: (state) => {
    let total = 0;
    state.cart.forEach((item) => {
      let price = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      total += price * item.cartQuantity;
    });

    return total;
  },

  getNewProducts: (state) => {
    return state.products.filter((item) => {
      return item.new;
    });
  },
  getBestProducts: (state) => {
    return state.products.filter((item) => {
      return item.best;
    });
  },
  getSaleProducts: (state) => {
    return state.products.filter((item) => {
      return item.discount;
    });
  },
  categoryData: (state) => {
    return state.categories.categories;
  },
  categoryList: (state) => {
    return ["all categories", ...state.categories.categoryNames];
  },
  tagList: (state) => {
    return state.tags;
  },
  sizeList: (state) => {
    return [
      "all sizes",
      ...new Set(state.products.map((list) => list.variation?.sizes).flat()),
    ].filter(Boolean);
  },
  colorList: (state) => {
    return [
      "all colors",
      ...new Set(state.products.map((list) => list.variation?.color).flat()),
    ].filter(Boolean);
  },
};

// contains your mutations
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  UPDATE_CART(state, payload) {
    const item = state.cart.find((el) => payload.id === el.id);
    if (item) {
      const price = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      item.cartQuantity = item.cartQuantity + payload.cartQuantity;
      item.total = item.cartQuantity * price;
    } else {
      const price = payload.discount
        ? payload.price - (payload.price * payload.discount) / 100
        : payload.price;
      state.cart.push({
        ...payload,
        cartQuantity: payload.cartQuantity,
        total: price,
      });
    }
  },

  REMOVE_PRODUCT_FROM_CART(state, product) {
    state.cart = state.cart.filter((item) => {
      return product.id !== item.id;
    });
  },

  DECREASE_PRODUCT(state, payload) {
    const found = state.cart.find((el) => payload.id === el.id);
    const price = found.discount
      ? found.price - (found.price * found.discount) / 100
      : found.price;
    found.cartQuantity = found.cartQuantity - payload.cartQuantity;
    found.total = found.cartQuantity * price;
  },

  CLEAR_CART(state) {
    state.cart = [];
  },

  ADD_TO_WISHLIST(state, product) {
    const item = state.wishlist.find((el) => product.id === el.id);
    if (item) {
      return;
    }
    {
      state.wishlist.push(product);
    }
  },

  REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
    state.wishlist = state.wishlist.filter((item) => {
      return product.id !== item.id;
    });
  },

  ADD_TO_COMPARE(state, product) {
    const item = state.compare.find((el) => product.id === el.id);
    if (item) {
      return;
    }
    {
      state.compare.push(product);
    }
  },

  REMOVE_FROM_COMPARE(state, product) {
    state.compare = state.compare.filter((item) => {
      return product.id !== item.id;
    });
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_TAGS(state, tags) {
    state.tags = tags;
  },
};

// contains your actions
export const actions = {
  addToCartItem({ commit }, payload) {
    commit("UPDATE_CART", payload);
  },

  removeProductFromCart({ commit }, product) {
    commit("REMOVE_PRODUCT_FROM_CART", product);
  },

  decreaseProduct({ commit }, product) {
    commit("DECREASE_PRODUCT", product);
  },

  addToWishlist({ commit }, payload) {
    commit("ADD_TO_WISHLIST", payload);
  },

  addToCompare({ commit }, payload) {
    commit("ADD_TO_COMPARE", payload);
  },

  removeProductFromWishlist({ commit }, product) {
    commit("REMOVE_PRODUCT_FROM_WISHLIST", product);
  },

  removeFromCompare({ commit }, product) {
    commit("REMOVE_FROM_COMPARE", product);
  },

  async fetchCategories({ commit }) {
    const { result: categories } = await this.$axios.$get("/get_categories");
    const categoryNames = categories.map((cat) => cat.name);

    commit("SET_CATEGORIES", { categories, categoryNames });
  },

  async fetchTags({ commit }) {
    const { result: tags } = await this.$axios.$get("/get_tags");
    const tagNames = tags.map((tag) => tag.name);

    commit("SET_TAGS", tagNames);
  },

  async fetchProducts({ commit }, params) {
    const { result: products } = await this.$axios.$get("/products", {
      params,
    });
    console.log(params, products.data);
    return products.data;

    // products.data.forEach((product) => {
    //   product.price = parseFloat(product.price);
    //   product.category = product.category?.name;
    // });
    // commit("SET_PRODUCTS", products.data);
  },
};
