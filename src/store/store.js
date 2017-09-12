
import 'es6-promise/auto'; // ponyfill maybe ? https://github.com/floatdrop/pinkie-promise
import Vue from 'vue';
import Vuex from 'vuex';

import wishes from './modules/wishes';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    wishes
  },
  strict: debug
});
