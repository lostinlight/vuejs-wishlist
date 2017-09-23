
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import {expect} from 'chai';
import Sidebar from '@/components/Sidebar';

Vue.use(Vuex);

describe('Sidebar.vue', () => {
  const Constructor = Vue.extend(Sidebar);
  let vm;

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

  beforeEach(() => {
    vm = new Constructor({store}).$mount();
  });

  afterEach(() => {
    vm.$destroy();
    vm = null;
  });

  it('renders five categories', () => {
    const defaultData = vm.categories;
    expect(defaultData).to.be.an('array');
    expect(defaultData).to.have.lengthOf(5);
  })

  it('changes category on click', () => {
    const button = vm.$el.querySelectorAll('button')[4];
    button.click();

    expect(vm.chosen).not.to.equal('all');
    expect(vm.$store.state.category).not.to.equal('all');
  })

  it('adds active class on correct element', (done) => {
    const li = vm.$el.querySelectorAll('li')[1];
    const button = vm.$el.querySelectorAll('button')[1];
    button.click();

    vm.$nextTick(() => {
      expect(li.className).to.contain('active');
      done();
    })
  })
})
