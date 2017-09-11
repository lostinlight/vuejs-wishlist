
<template>
  <section>
    <ul class="wishlist">
      <li v-for="(wish, index) in filteredWishes" :key="wish.id" class="wl-item-wrapper">
        <button v-if="wish._id === updateWish._id" class="wl-item-save" @click="onUpdate(wish)">Save</button>
        <div class="wl-item-menu dropdown">
          <a class="dropdown-toggle" :id="'dropdownMenu-' + index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="toggleDropdown(index)">
            <i class="icon-item-menu"></i>
          </a>
          <nav class="dropdown-menu dropdown-menu-animated" :class="{open : index === updateIndex && updating}" aria-labelledby="'dropdownMenu-' + index">
            <button class="dropdown-item wl-btn" @click="onEdit(wish)">Edit</button>
            <button class="dropdown-item wl-btn" @click="onRemove(wish)">Delete</button>
            <button class="dropdown-item wl-btn" @click="onUnlock(wish)">Unlock</button>
            <button class="dropdown-item wl-btn" @click="onMakeAlpha(wish)">Make Alpha</button>
          </nav>
        </div>
        <div class="wl-item">
          <span v-if="wish._id === updateWish._id">
            <select class="form-control" required v-model="newWish.category" style="display: inline; width: 70px; padding: .3em;">
              <option v-for="category in categories" :value="category">{{category}}</option>
            </select>
          </span>
          <span v-else>{{wish.date | timeFormat}}</span>

          <span v-if="wish._id === updateWish._id"><input required v-model="newWish.name" style="display: inline; width: 100px; padding: .3em;"/></span>
          <span v-else>{{wish.name | capitalize}}</span>

          <i v-if="wish._id === updateWish._id" :class="'icon-' + newWish.category"></i>
          <i v-else :class="'icon-' + wish.category"></i>
        </div>
      </li>
    </ul>
    <div class="info__modal" :class="{'info-visible': openModal}">
      <p>Currently you already have <strong>4 Alpha wishes</strong>. This is the maximum ammount.</p>
      <br>
      <p>Please, achieve one of them, mark it as <strong>unlocked</strong>. Then add new Alpha wish.</p>
      <button class="info__close font-sec" @click.stop="modalClose">close</button>
    </div>
    <div class="info__overlay"></div>
  </section>
</template>

<script>

import moment from 'moment';
import objectAssign from 'object-assign'; // IE ponyfill

const fWishes = (wishes) => wishes.filter((wish) => wish.isAlpha === false && wish.isUnlocked === false);

const filters = (filter, wishes) => (filter === 'all') ? wishes : wishes.filter((wish) => wish.category === filter);

export default {
  data() {
    return {
      updateWish: {},
      newWish: {}, // clone wish to update it without Veux errors
      updating: false,
      updateIndex: null,
      categories: ['goods', 'trips', 'mates', 'bonus']
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.category;
    },
    filteredWishes() {
      return filters(this.filterBy, fWishes(this.$store.getters.wishes));
    },
    openModal() {
      return this.$store.getters.openModal;
    }
  },
  methods: {
    toggleDropdown(i) {
      if (i !== this.updateIndex) { // reset if another item clicked when dropdown is open
        this.updating = false;
      }
      this.updateIndex = i;
      this.updating = !this.updating;
    },
    onEdit(wish) {
      this.updateWish = wish;
      this.updating = false;
      this.newWish = objectAssign({}, wish); // Object.assign ponyfill github.com/sindresorhus/object-assign
    },
    onUpdate(wish) {
      this.newWish.date = moment().format('YYYY-MM-DD');
      this.$store.dispatch('updateWish', this.newWish);
      this.updateWish = {};
    },
    onRemove(wish) {
      this.$store.dispatch('removeWish', wish);
      this.updating = false;
    },
    onUnlock(wish) {
      this.$store.dispatch('unlockWish', wish);
      this.updating = false;
    },
    onMakeAlpha(wish) {
      const wishes = this.$store.getters.wishes;
      const alphas = wishes.filter((wish) => wish.isAlpha === true);
      const checkAlphas = alphas.length;

      if (checkAlphas >= 4) {
        this.$store.dispatch('openModal'); // alert about max ammount of alphas
      } else {
        this.$store.dispatch('makeAlphaWish', wish);
      }

      this.updating = false;
    },
    modalClose() {
      this.$store.dispatch('closeModal');
    }
  }
}
</script>
