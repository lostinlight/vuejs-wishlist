
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';

Vue.use(Vuex);

describe('App.vue', () => {
  const state = {
    wishes: []
  };

  const mutations = {
    'FETCH_WISHES' (state) {
      state.wishes = wishes;
    }
  };

  const wishes = [{name: 1}];

  const store = new Vuex.Store({
    state,
    mutations
  });

  const vm = new Vue({
    template: '<div id="app"></div>',
    created() {
      this.$store.commit('FETCH_WISHES');
    },
    store
  }).$mount();

  it('fetches wishes on creation', (done) => {
    Vue.nextTick(() => {
      expect(vm.$store.state.wishes).not.to.be.equal([]);
      expect(vm.$store.state.wishes).to.have.lengthOf(1);
      done();
    })
  })
})
