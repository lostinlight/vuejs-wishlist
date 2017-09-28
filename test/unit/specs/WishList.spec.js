
import Vue from 'vue';
import Vuex from 'vuex';
import {expect} from 'chai';
import {getters, mutations} from '@/store/modules/wishes';
import WishList from '@/components/WishList';

Vue.use(Vuex);

describe('WishList.vue', () => {
  const Constructor = Vue.extend(WishList);
  /* eslint-disable indent */
  let vm,
      state,
      store,
      nav,
      button;
  /* eslint-enable indent */

  beforeEach(() => {
    state = {
      wishes: [
        {_id: 0, name: 'a', category: 'trips', isUnlocked: false, isAlpha: false, date: '2017-12-12'},
        {_id: 1, name: 'b', category: 'bonus', isUnlocked: false, isAlpha: false, date: '2002-05-07'}
      ],
      category: 'all',
      openModal: false
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations
    });

    vm = new Constructor({
      store
    }).$mount();

    nav = vm.$el.querySelectorAll('nav')[0];
    button = nav.querySelectorAll('button')[0];
  });

  afterEach(() => {
    vm.$destroy();
    vm = null;
  });

  describe('WishList computed properties', () => {
    it('category() returns current wish category', () => {
      expect(vm.category).to.equal('all');
    })

    it('filteredWishes() returns wishes where isAlpha && isUnlocked === false', () => {
      expect(vm.filteredWishes.length).to.equal(2);
    })

    it('openModal() returns current modal state', () => {
      expect(vm.openModal).to.equal(false);
    })
  })

  describe('WishList methods', () => {
    it('toggleDropdown() toggles menus of wish items', (done) => {
      const nav = vm.$el.querySelectorAll('nav')[1];
      const button = vm.$el.querySelectorAll('a')[1];

      expect(nav.className).not.to.contain('open');
      button.click();

      vm.$nextTick(() => {
        expect(vm.updateIndex).to.equal(1);
        expect(nav.className).to.contain('open');
        done();
      })
    })

    it('onEdit() shows update interface', (done) => {
      const interface1 = vm.$el.querySelectorAll('span')[0];
      const interface2 = vm.$el.querySelectorAll('span')[1];
      const save = vm.$el.getElementsByClassName('wl-item-save');

      expect(vm.updateWish.name).to.be.equal(undefined);
      expect(save.hasOwnProperty('0')).to.be.equal(false);
      button.click();

      vm.$nextTick(() => {
        expect(interface1.innerHTML).to.contain('select');
        expect(interface2.innerHTML).to.contain('input');
        expect(vm.updateWish.name).to.be.a('string');
        expect(save.hasOwnProperty('0')).to.be.equal(true);
        done();
      })
    })

    it('onEdit() also makes a copy of edited wish', () => {
      expect(vm.newWish._id).to.be.equal(undefined);
      button.click();
      expect(vm.newWish._id).to.be.equal(0);
    })

    it('onUpdate() updates wish and changes its date to current date', (done) => {
      const today = new Date().getDate().toString();

      vm.newWish = {_id: 0, name: 'New', category: 'trips', isUnlocked: false, isAlpha: false}
      vm.updateWish['_id'] = 0;
      vm.$forceUpdate();

      vm.$nextTick(() => {
        const save = vm.$el.getElementsByClassName('wl-item-save')['0'];
        save.click();

        vm.$nextTick().then(() => {
          expect(vm.newWish.date).not.to.be.equal(undefined);
          expect(vm.$el.querySelectorAll('span')[0].textContent).to.contain(today);
          expect(vm.$el.querySelectorAll('span')[1].textContent).to.contain('New');
        }).then(done, done);
      })
    })

    it('onRemove() deletes wish', (done) => {
      const wishDate = vm.$el.querySelectorAll('span')[0];
      const button = nav.querySelectorAll('button')[1];

      expect(Array.from(vm.$el.querySelectorAll('li')).length).to.equal(2);
      expect(wishDate.textContent).to.equal('Dec 12');

      button.click();

      vm.$nextTick(() => {
        expect(Array.from(vm.$el.querySelectorAll('li')).length).to.equal(1);
        expect(wishDate.textContent).to.not.equal('Dec 12');
        done();
      })
    })

    it('onUnlock() changes unlocked status to true', (done) => {
      const button = nav.querySelectorAll('button')[2];
      const wish = vm.$store.state.wishes.filter((x) => x._id === 0);

      expect(wish[0].isUnlocked).to.equal(false);

      button.click();

      vm.$nextTick(() => {
        expect(wish[0].isUnlocked).to.equal(true);
        done();
      })
    })

    it('onMakeAlpha() changes alpha status to true if alphas <= 4', (done) => {
      const button = nav.querySelectorAll('button')[3];
      const wish = vm.$store.state.wishes.filter((x) => x._id === 0);

      expect(wish[0].isAlpha).to.equal(false);

      button.click();

      vm.$nextTick(() => {
        expect(wish[0].isAlpha).to.equal(true);
        done();
      })
    })

    it('onMakeAlpha() opens help modal if alphas = 4', (done) => {
      const button = nav.querySelectorAll('button')[3];
      const modal = vm.$el.getElementsByClassName('info__modal')[0];
      const testWishes = [{isAlpha: true}, {isAlpha: true}, {isAlpha: true}, {isAlpha: true}];
      vm.$store.state.wishes = vm.$store.state.wishes.concat(testWishes);

      expect(vm.$store.state.openModal).to.equal(false);
      expect(modal.className).not.to.contain('info-visible');

      button.click();
      expect(vm.$store.state.openModal).to.equal(true);

      vm.$nextTick(() => {
        expect(modal.className).to.contain('info-visible');
        done();
      })
    })

    it('modalClose() closes help modal', () => {
      const button = vm.$el.getElementsByClassName('info__close')[0];
      vm.$store.state.openModal = true;

      button.click();
      expect(vm.$store.state.openModal).to.equal(false);
    })

    it('filterW() filters wishes by category', () => {
      const wishes = [
        {name: 0, category: 'trips'},
        {name: 1, category: 'bonus'},
        {name: 2, category: 'mates'}
      ];
      const filter = 'all';
      const result = vm.filterW(filter, wishes);

      expect(result).to.deep.equal([
        {name: 0, category: 'trips'}, {name: 1, category: 'bonus'}, {name: 2, category: 'mates'}
      ])
    })
  })
})
