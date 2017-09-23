
import Vue from 'vue';
import {expect} from 'chai';
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
    expect(vm.$el.textContent).to.contain(vm.quotes[vm.quoteNum]);
  })

  it('changes quote on click', (done) => {
    vm.$el.click();
    vm.$el.click();

    vm.$nextTick(() => {
      expect(vm.quoteNum).to.equal(2);
      expect(vm.$el.textContent).to.equal(`\n  ${vm.quotes[vm.quoteNum]}\n`);
      done();
    })
  })

  it('adds animation class on click and removes it onTimeOut', (done) => {
    vm.$el.click();
    expect(vm.quoteAnim).to.equal(true);

    vm.$nextTick(() => {
      expect(vm.$el.className).to.contain('wl-quote-animated');
      setTimeout(() => {
        expect(vm.quoteAnim).to.equal(false);
        expect(vm.$el.className).not.to.contain('wl-quote-animated');
      }, 600);
      done();
    })
  })
})
