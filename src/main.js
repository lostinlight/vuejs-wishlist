// Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import Vue from 'vue';
import store from './store/store';
import App from './App.vue';
import moment from 'moment';

/* eslint-disable no-unused-vars */
import './assets/styles/main.scss'; // import styles

Vue.config.productionTip = false;

Vue.filter('capitalize', function(x) {
  return x.charAt(0).toUpperCase() + x.slice(1);
});

Vue.filter('timeFormat', function(x) {
  const date = moment(x);
  const year = Number(moment(x).format('YYYY'));
  const currentYear = Number(moment().format('YYYY'));

  if (year >= currentYear) {
    return date.format('MMM D');
  } else {
    let gap = currentYear - year;
    return (gap > 1) ? `${gap} years ago` : `Last year`;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
