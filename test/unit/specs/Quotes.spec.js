
import Vue from 'vue';
import { expect } from 'chai';
import Quotes from '@/components/Quotes';

describe('Quotes.vue', () => {
  const Constructor = Vue.extend(Quotes);
  let vm;

  beforeEach(() => {
    vm = new Constructor().$mount();
  });

  afterEach(() => {
    vm.$destroy();
    vm = null;
  });

  it('renders correct quote', () => {
    expect(vm.$el.textContent).to.contain('Impossible becomes possible when you want it bad enough')
  })

  it('changes quote on click', () => {
    vm.$el.click();
    vm.$el.click();
    expect(vm.quoteNum).to.equal(2);

    vm.$nextTick(function() {
      expect(vm.$el.textContent).to.equal('Never stop believing that your dreams are eternal');
    })
  })

  it('adds animation class on click and removes it later', () => {
    vm.$el.click();
    expect(vm.quoteAnim).to.equal(true);

    vm.$nextTick(function() {
      expect(vm.$el.className).to.contain('quoteAnim');
      setTimeout(() => {
        expect(vm.quoteAnim).to.equal(false);
        expect(vm.$el.className).to.not.contain('quoteAnim');
      }, 600);
    })
  })
})
