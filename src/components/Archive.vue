
<template>
  <ul class="wl-archive-list">
    <button class="wl-archive-list__clear wl-btn" type="button" @click="clearWishes(uWishes)">
      CLEAR ARCHIVE <span class="wl-clear-icon"><i class="icon-clear"></i></span>
    </button>
    <li v-for="wish in uWishes" :key="wish.id">
      {{wish.name | capitalize}}
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    uWishes() { // unlocked wishes
      const allWishes = this.$store.getters.wishes;
      return allWishes.filter((wish) => wish.isUnlocked === true);
    }
  },
  methods: {
    clearWishes(wishes) {
      wishes.forEach((wish) => this.$store.commit('REMOVE_WISH', wish));
    }
  }
}
</script>
