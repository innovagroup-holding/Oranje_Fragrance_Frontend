<template>
  <n-link class="container" :to="`/product/${banner.id}`">
    <img :src="banner.images[2]" :alt="banner.title" />
  </n-link>
</template>

<script>
export default {
  props: ["banner"],
  methods: {},
};
</script>

<style lang="scss" scoped>
a {
  display: block;
  img {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>
