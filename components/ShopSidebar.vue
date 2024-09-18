<template>
  <div class="sidebar-style" :class="classes">
    <div class="sidebar-widget">
      <h4 class="pro-sidebar-title">Search</h4>
      <div class="pro-sidebar-search mb-50 mt-25">
        <form class="pro-sidebar-search-form">
          <input type="text" placeholder="Search here..." />
          <button>
            <i class="pe-7s-search"></i>
          </button>
        </form>
      </div>
    </div>

    <!-- category widget  -->
    <div class="sidebar-widget">
      <h4 class="pro-sidebar-title">Categories</h4>
      <ul class="sidebar-widget-list mt-20">
        <li
          class="sidebar-widget-list-left"
          v-for="(category, index) in [
            { name: 'all categories', id: 0 },
            ...categoryData,
          ]"
          :key="index"
        >
          <n-link :to="`?category=${category.id}`">
            <span class="check-mark"></span>
            {{ category.name }}
          </n-link>
        </li>
      </ul>
    </div>

    <!-- tag widget  -->
    <div class="sidebar-widget sidebar-widget__tag mt-60">
      <h4 class="pro-sidebar-title">Tags</h4>
      <div class="sidebar-widget-tag mt-30">
        <ul>
          <li v-for="(tag, index) in tagData" :key="index">
            <n-link :to="`?tag=${tag.id}`">
              {{ tag.name }}
            </n-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["classes"],
  computed: {
    categoryData() {
      return this.$store.getters.categoryData;
    },
    sizeList() {
      return this.$store.getters.sizeList;
    },
    colorList() {
      return this.$store.getters.colorList;
    },
    tagData() {
      return this.$store.getters.tagData;
    },
  },

  methods: {},
};
</script>
