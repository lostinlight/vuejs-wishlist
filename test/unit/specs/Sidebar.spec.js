
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import Sidebar from '@/components/Sidebar';

Vue.use(Vuex);

describe('Sidebar.vue', () => {
  const state = {
    category: 'all'
  };

  const actions = {
    filterByCategory: sinon.stub()
  };

  const mutations = {
    'CHOOSE_CATEGORY' (state, category) {
      state.category = category;
    }
  };

  const store = new Vuex.Store({
    state,
    actions,
    mutations
  });

  const Constructor = Vue.extend(Sidebar);
  const vm = new Constructor({
    store
  }).$mount();

  it('renders five categories', () => {
    const defaultData = vm.categories;
    expect(defaultData).to.have.lengthOf(5);
  })

  it('changes category on click', () => {
    const button = vm.$el.querySelectorAll('button')[4];
    button.click();

    expect(vm.chosen).to.equal('bonus');
    expect(vm.$store.state.category).to.equal('bonus');
  })
})
