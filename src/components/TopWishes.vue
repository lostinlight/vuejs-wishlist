
<template>
  <section class="wl-top-wishes" id="wl-top-wishes">
    <div v-for="(n, index) in 4" class="wl-wish-wrapper">
      <div class="wl-top-wish" :class="'top-wish-' + index" :style="{ 'background': '#7775ea url(' + imagePath(aWishes, index) + ') top left no-repeat' }">
        <span class="wl-top-title">{{aWishes[index] != undefined ? aWishes[index].name : 'empty Alpha wish' | uppercase}}</span>
        <span v-if="aWishes[index] != undefined" class="wl-btn" @click="onUnlock(aWishes[index])" title="Unlock wish"><i class="icon-check"></i></span>
      </div>
    </div>
  </section>
</template>

<script>
import {fWishes} from '@/utils/utils';

export default {
  computed: {
    aWishes() { // alpha wishes
      const allWishes = this.$store.getters.wishes;
      return fWishes(allWishes, {isAlpha: true});
    }
  },
  methods: {
    onUnlock(wish) {
      this.$store.commit('UNLOCK_WISH', wish);
    },
    imagePath(w, i) {
      if (w[i] !== undefined) {
        return require('../assets/images/' + w[i].image + '.jpg'); // webpack :(
      } else {
        return require('../assets/images/wish-default.jpg');
      }
    }
  },
  filters: {
    uppercase: function(n) {
      return n.toUpperCase();
    }
  }
}
</script>
