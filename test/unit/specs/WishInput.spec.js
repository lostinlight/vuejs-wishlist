
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';
import uuid from 'uuid';
import WishInput from '@/components/WishInput';

Vue.use(Vuex);

describe('WishInput.vue', () => {
  const state = {
    wishes: [
      {_id: 0, name: 'a', category: 'trips', isUnlocked: false, isAlpha: false, date: '2017-12-12'},
      {_id: 1, name: 'b', category: 'bonus', isUnlocked: false, isAlpha: false, date: '2002-05-07'}
    ]
  };

  const mutations = {
    'ADD_WISH' (state, wish) {
      wish._id = uuid.v4();
      state.wishes.push(wish);
    }
  };

  const store = new Vuex.Store({
    state,
    mutations
  });

  const Constructor = Vue.extend(WishInput);
  const vm = new Constructor({store}).$mount();

  describe('WishInput methods', () => {
    it('toggleDropdown() toggles form', (done) => {
      const form = vm.$el.getElementsByClassName('dropdown-menu')[0];
      const button = vm.$el.querySelectorAll('button')[0];

      expect(vm.adding).to.equal(false);

      button.click();
      expect(vm.adding).to.equal(true);

      vm.$nextTick(() => {
        expect(form.className).to.contain('open');
        done();
      })
    })

    it('validateForm() validates wish\'s name and category on submit', () => {
      expect(Object.keys(vm.formErrors).length).to.equal(0);

      const newWish1 = {_id: 1, name: '', category: 'bonus'};
      const newWish2 = {_id: 2, name: 'test', category: ''};
      const newWish3 = {_id: 3, name: 'pass', category: 'trips'};

      vm.newWish = newWish1;
      vm.validateForm();
      expect(Object.keys(vm.formErrors).length).to.equal(1);

      vm.newWish = newWish2;
      vm.validateForm();
      expect(Object.keys(vm.formErrors).length).to.equal(1);

      vm.newWish = newWish3;
      vm.validateForm();
      expect(Object.keys(vm.formErrors).length).to.equal(0);
    })

    it('onSubmit() adds new wish and clears form', (done) => {
      expect(vm.$store.state.wishes.length).to.equal(2);

      const wish = {_id: 111, name: 'test', category: 'goods'};

      vm.newWish = wish;

      const button = vm.$el.querySelectorAll('button')[1];
      button.click();

      vm.$nextTick(() => {
        expect(vm.$store.state.wishes.length).to.equal(3);
        expect(vm.newWish.name).to.equal('');
        expect(vm.adding).to.equal(false);
        done();
      })
    })
  })
})
