
import Vue from 'vue';

Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require .js and .vue src files except main.js for coverage.
const srcContext = require.context('../../src', true, /^\.\/(?!main\.js$).+\.(js|vue)$/i);
srcContext.keys().forEach(srcContext);
