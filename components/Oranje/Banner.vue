<template>
  <n-link class="container" :to="`/product/${slugify(banner.title)}`">
    <img :src="banner.images[2]" :alt="banner.title" />
  </n-link>
</template>

<script>
export default {
  props: ["banner"],
  methods: {
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

<style lang="scss" scoped>
a {
  display: block;
  img {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>
