<template>
  <div id="app">
    <activity-bar></activity-bar>
    <sidebar></sidebar>
    <div class="wl-container">
      <section class="wl-hero-header wl-clearfix">
        <quotes></quotes>
        <top-wishes></top-wishes>
      </section>
      <section class="wl-main-panel wl-clearfix">
        <section class="wl-archive">
          <archive></archive>
        </section>
        <section class="wl-wishes">
          <wish-input></wish-input>
          <wish-list></wish-list>
        </section>
    </section>
    </div>
  </div>
</template>

<style src="./assets/styles/main.scss" lang="scss"></style>

<script>
import Quotes from './components/Quotes';
import WishList from './components/WishList';
import WishInput from './components/WishInput';
import TopWishes from './components/TopWishes';
import Archive from './components/Archive';
import Sidebar from './components/Sidebar';
import ActivityBar from './components/ActivityBar';

export default {
  components: {
    Quotes,
    WishList,
    WishInput,
    TopWishes,
    Archive,
    Sidebar,
    ActivityBar
  },
  created() {
    this.$store.commit('FETCH_WISHES');
  }
}
</script>
