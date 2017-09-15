
<template>
  <aside class="wl-activity-bar">
    <div class="wl-username">
      <a class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click.prevent="toggleDropdown">
        <span>Alice</span> <i class="icon-unfold"></i>
      </a>
      <nav class="dropdown-menu dropdown-menu-animated" :class="{open : decentralize}" aria-labelledby="'dropdownMenu-' + index">
        <a href="https://diasporafoundation.org" rel="external noopener" class="dropdown-item wl-btn" target="_blank">Join diaspora*</a>
        <a href="https://joinmastodon.org" rel="external noopener" class="dropdown-item wl-btn" target="_blank">Join Mastodon</a>
      </nav>
    </div>
    <div class="wl-avatar"><img src="../assets/images/avatar.png"></div>
      <div class="wl-activity">
        <p class="wl-activity__title">Latest Activity</p>
        <ul>
        <li v-for="wish in lWishes" :key="wish.id">
          <time>{{wish.date | timeFormat}}</time>
          <p class="wl-activity__wish">added {{wish.name | capitalize}}</p>
        </li>
        </ul>
      </div>
    </aside>
</template>

<script>
export default {
  data() {
    return {
      decentralize: false
    }
  },
  computed: {
    lWishes() { // latest wishes
      const allWishes = this.$store.getters.wishes;
      const lEnd = allWishes.length;
      const lStart = lEnd - 4;
      return allWishes.slice(lStart, lEnd);
    }
  },
  methods: {
    toggleDropdown() {
      this.decentralize = !this.decentralize;
    }
  }
}
</script>
