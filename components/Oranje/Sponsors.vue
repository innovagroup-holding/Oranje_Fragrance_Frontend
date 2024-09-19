<template>
  <div class="container">
    <h2><span>Our Sponsors</span></h2>
    <vue-marquee-slider
      id="marquee-slider-loop"
      :speed="4000"
      :width="150"
      :space="100"
    >
      <img
        v-for="(sponsor, index) in sponsors"
        :key="index"
        :src="sponsor.image"
      />
    </vue-marquee-slider>
  </div>
</template>

<script>
export default {
  props: ["sponsors"],
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
  margin-bottom: 60px;
  h2 {
    margin-bottom: 40px;
  }
}
</style>
