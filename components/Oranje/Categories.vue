<template>
  <section class="container">
    <n-link
      data-aos="fade-up"
      class="category"
      v-for="category in categoryNames"
      :key="category"
      :to="`/shop?category=${
        categoryData.find((cat) => cat.name === category).id
      }`"
    >
      <div class="bottles">
        <img
          v-for="product in products[category]"
          :src="serverURL + product.images[0].image_path"
          :alt="product.title"
        />
      </div>
      <b>{{ category }}</b>
    </n-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      products: {
        oranje: [],
        partners: [],
        dupes: [],
      },
    };
  },
  computed: {
    serverURL() {
      return this.$store.getters.serverURL;
    },
    categoryNames() {
      return this.$store.getters.categoryList.splice(1);
    },
    categoryData() {
      return this.$store.getters.categoryData;
    },
  },
  async mounted() {
    for (const type in this.products) {
      this.products[type] = await this.$store.dispatch("fetchProducts", {
        category: this.categoryData.find((a) => a.name === type).id,
        limit: 3,
      });
      if (this.products && this.products[type].length < 3) {
        this.products[type].push(
          ...(await this.$store.dispatch("fetchProducts", {
            category: 6,
            limit: 3,
          }))
        );
      }
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 4rem 5rem;
  margin: 6rem auto 4rem;
  a.category {
    &:nth-of-type(2) {
      transition-delay: 200ms;
    }
    &:last-of-type {
      transition-delay: 400ms;
    }
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    align-items: center;
    flex-grow: 1;
    &:hover {
      .bottles img {
        &:first-of-type:not(:only-of-type) {
          transform: rotate(-5deg) translate(-16%, -4%);
        }
        &:nth-of-type(2),
        &:only-of-type {
          transform: scale(1.1);
        }
        &:last-of-type:not(:only-of-type) {
          transform: rotate(5deg) translate(16%, -4%);
        }
      }
    }
    b {
      font-size: 2em;
      text-transform: capitalize;
      font-weight: 500;
    }
    .bottles {
      display: flex;
      position: relative;
      left: 10px;
      &:before {
        content: "";
        position: absolute;
        width: 120%;
        left: -20%;
        margin: 0 auto;
        border-radius: 50%;
        background-color: #d4d4d4;
        aspect-ratio: 1/1;
      }
      img {
        position: absolute;
        top: 0;
        width: min(150px, 40vw);
        transition: transform 0.2s ease;
        &:first-of-type {
          left: -33%;
        }
        &:last-of-type {
          right: -33%;
        }
        &:nth-of-type(2),
        &:only-of-type {
          z-index: 2;
          transform: scale(1.05);
          position: relative;
          right: auto;
          left: auto;
        }
      }
    }
  }
}
</style>
