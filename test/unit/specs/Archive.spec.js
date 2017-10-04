
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';
import Archive from '@/components/Archive';

Vue.use(Vuex);

describe('Archive.vue', () => {
  const state = {
    wishes: [
      {_id: 0, name: 'a', category: 'trips', isUnlocked: true, isAlpha: false, date: '2017-12-12'},
      {_id: 1, name: 'b', category: 'bonus', isUnlocked: false, isAlpha: false, date: '2002-05-07'}
    ]
  };

  const getters = {
    wishes: state => {
      return state.wishes;
    }
  };

  const mutations = {
    'REMOVE_WISH' (state, wish) {
      state.wishes.splice(state.wishes.indexOf(wish), 1);
    }
  };

  const store = new Vuex.Store({
    state,
    getters,
    mutations
  });

  const Constructor = Vue.extend(Archive);
  const vm = new Constructor({store}).$mount();

  describe('Archive computed properties', () => {
    it('uWishes() returns all wishes where isUnlocked === true', () => {
      expect(vm.uWishes.length).to.equal(1);
      expect(vm.uWishes[0].isUnlocked).to.equal(true);
    })
  })

  describe('Archive methods', () => {
    it('clearWishes() deletes archived wishes', (done) => {
      const button = vm.$el.querySelectorAll('button')[0];
      button.click();

      vm.$nextTick(() => {
        expect(vm.uWishes.length).to.equal(0);
        done();
      })
    })
  })
})
