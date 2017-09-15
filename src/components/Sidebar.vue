
<template>
  <nav class="wl-sidebar">
    <div class="wl-sidebar__logo">W</div>
    <ul class="wl-sidebar__nav">
      <li v-for="category in categories" key="category.id" class="wl-sidebar__item" :class="{active : category === chosen}">
        <button class="wl-sidebar__btn wl-btn" @click="filterByCategory(category)">
          <i :class="'icon-' + category"></i><span>{{category}}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      categories: ['all', 'goods', 'trips', 'mates', 'bonus'],
      chosen: 'all'
    }
  },
  methods: {
    filterByCategory(category) {
      this.chosen = category;
      this.$store.commit('CHOOSE_CATEGORY', category);
    }
  }
}
</script>
