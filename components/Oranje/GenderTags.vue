<template>
  <section class="container">
    <n-link :to="`/shop?tag=${menTag?.id}`" class="men" data-aos="fade-right">
      <div>
        <span>
          <b v-for="i in 40"> Men </b>
        </span>
        <h3>For Men</h3>
      </div>
      <img src="/img/Oranje/men.png" alt="perfume for men" />
    </n-link>
    <n-link
      :to="`/shop?tag=${womenTag?.id}`"
      class="women"
      data-aos="fade-left"
    >
      <div>
        <span>
          <b v-for="i in 30"> Women </b>
        </span>
        <h3>For Women</h3>
      </div>
      <img src="/img/Oranje/women.png" alt="perfume for women" />
    </n-link>
  </section>
</template>

<script lang="ts">
export default {
  computed: {
    womenTag() {
      return this.$store.getters.tagData.find((tag) => tag.name === "women");
    },
    menTag() {
      return this.$store.getters.tagData.find((tag) => tag.name === "men");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  margin-top: 6rem;
  a {
    display: block;
    height: 200px;
    min-width: 300px;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    color: white;
    h3 {
      font-weight: bold;
      font-size: 2em;
      color: inherit;
      transition: all 0.2s ease;
    }
    img {
      height: 100%;
      position: absolute;
      top: 0;
      transition: transform 0.2s ease;
      transform-origin: bottom right;
    }
    div {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70%;
      border-radius: 6px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 2rem;
      span {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        gap: 0.8rem;
        position: absolute;
        inset: 0;
      }
      b {
        font-weight: 800;
        font-size: 2em;
        line-height: 1.1em;
        opacity: 0.1;
        transition: opacity 0.2s ease;
        &:nth-of-type(even) {
          color: transparent;
          -webkit-text-stroke: 1px white;
        }
      }
    }
    &:hover {
      img {
        transform: scale(1.2) translateX(-50px);
      }
      img:is(.women img) {
        transform: scale(1.1) translateX(70px);
      }
      h3 {
        font-size: 3em;
      }
      b:nth-of-type(even) {
        opacity: 0;
      }
      b:nth-of-type(odd) {
        opacity: 0;
      }
    }
  }
  .men {
    div {
      justify-content: flex-end;
      background: radial-gradient(
        circle at 80% 40%,
        rgba(40, 121, 243, 1) 0%,
        rgba(20, 67, 122, 1) 100%
      );
    }
    img {
      left: 0;
    }
  }
  .women {
    div {
      background: radial-gradient(circle at 80% 40%, #f32895 0%, #ad2131 100%);
    }
    img {
      right: 0;
    }
  }
}
</style>
