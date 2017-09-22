
import Vue from 'vue';
import { expect } from 'chai';
import Quotes from '@/components/Quotes';

describe('Quotes.vue', () => {
  const Constructor = Vue.extend(Quotes);
  let vm;
  let index;

  beforeEach(() => {
    vm = new Constructor().$mount();
    index = vm.quoteNum;
  });

  afterEach(() => {
    vm.$destroy();
    vm = null;
  });

  it('renders correct quote', () => {
    expect(vm.$el.textContent).to.contain(vm.quotes[index]);
  })

  it('changes quote on click', () => {
    vm.$el.click();
    vm.$el.click();

    vm.$nextTick(function() {
      expect(index).to.equal(2);
      expect(vm.$el.textContent).to.equal(vm.quotes[index]);
    })
  })

  it('adds animation class on click and removes it later', () => {
    vm.$el.click();
    expect(vm.quoteAnim).to.equal(true);

    vm.$nextTick(() => {
      expect(vm.$el.className).to.contain('quoteAnim');
      setTimeout(() => {
        expect(vm.quoteAnim).to.equal(false);
        expect(vm.$el.className).not.to.contain('quoteAnim');
      }, 600);
    })
  })
})
