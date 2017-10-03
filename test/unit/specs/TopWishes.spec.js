
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';
import TopWishes from '@/components/TopWishes';

Vue.use(Vuex);

describe('TopWishes.vue', () => {
  const state = {
    wishes: [
      {_id: 0, name: 'a', category: 'trips', isUnlocked: false, isAlpha: true, image: 'wish-1'},
      {_id: 1, name: 'b', category: 'bonus', isUnlocked: false, isAlpha: true, image: 'wish-default'}
    ]
  };

  const getters = {
    wishes: state => {
      return state.wishes;
    }
  };

  const mutations = {
    'UNLOCK_WISH' (state, wish) {
      const achievement = state.wishes[state.wishes.indexOf(wish)];
      achievement.isUnlocked = true;
      achievement.isAlpha = false;
      state.wishes.splice(state.wishes.indexOf(wish), 1, achievement);
    }
  };

  const store = new Vuex.Store({
    state,
    getters,
    mutations
  });

  const Constructor = Vue.extend(TopWishes);
  const vm = new Constructor({store}).$mount();

  describe('TopWishes computed properties', () => {
    it('aWishes() returns all wishes where isAlpha === true', () => {
      expect(vm.aWishes.length).to.equal(2);
      expect(vm.aWishes[0].isAlpha).to.equal(true);
      expect(vm.aWishes[1].isAlpha).to.equal(true);
    })
  })

  describe('TopWishes methods', () => {
    it('onUnlock() changes unlocked status to true', (done) => {
      const trigger = vm.$el.querySelectorAll('span')[1];
      const wish = vm.$store.state.wishes.filter((x) => x._id === 0);

      expect(wish[0].isUnlocked).to.equal(false);

      trigger.click();

      vm.$nextTick(() => {
        expect(wish[0].isUnlocked).to.equal(true);
        done();
      })
    })
  })

  describe('TopWishes filters', () => {
    it('uppercase() makes word uppercase', () => {
      const filter = vm.$options.filters.uppercase;
      const word = 'test';
      const result = filter(word);
      expect(result).to.equal('TEST');
    })
  })
})
