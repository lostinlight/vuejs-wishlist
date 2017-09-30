
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';
import ActivityBar from '@/components/ActivityBar';

Vue.use(Vuex);

describe('ActivityBar.vue', () => {
  const state = {
    wishes: [
      {_id: 1, name: 'a', date: '2017-12-12'},
      {_id: 2, name: 'b', date: '2017-12-12'},
      {_id: 3, name: 'c', date: '2017-12-12'},
      {_id: 4, name: 'd', date: '2017-12-12'},
      {_id: 5, name: 'e', date: '2017-12-12'}
    ]
  };

  const getters = {
    wishes: state => {
      return state.wishes;
    }
  };

  const store = new Vuex.Store({
    state,
    getters
  });

  const Constructor = Vue.extend(ActivityBar);
  const vm = new Constructor({store}).$mount();

  describe('ActivityBar computed properties', () => {
    it('lWishes() returns latest 4 wishes', () => {
      expect(vm.lWishes.length).to.equal(4);
      expect(vm.lWishes[3]).to.deep.equal(
        {_id: 5, name: 'e', date: '2017-12-12'}
      );
    })
  })

  describe('ActivityBar methods', () => {
    it('toggleDropown() toggles menu', (done) => {
      const nav = vm.$el.querySelectorAll('nav')[0];
      const trigger = vm.$el.querySelectorAll('a')[0];

      expect(nav.className).not.to.contain('open');
      expect(vm.decentralize).to.equal(false);

      trigger.click();

      expect(vm.decentralize).to.equal(true);

      vm.$nextTick(() => {
        expect(nav.className).to.contain('open');
        done();
      })
    })
  })
})
