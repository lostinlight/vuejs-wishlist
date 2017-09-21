
import Vue from 'vue';
import store from './store/store';
import App from './App.vue';

/* eslint-disable no-unused-vars */
import './assets/styles/main.scss'; // import styles

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
