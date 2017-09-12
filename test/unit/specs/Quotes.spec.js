
import Vue from 'vue';
import Quotes from '@/components/Quotes';

describe('Quotes.vue', () => {
  it('renders correct data', () => {
    const Constructor = Vue.extend(Quotes);
    const QuotesComponent = new Constructor().$mount();
    expect(QuotesComponent.$el.textContent)
      .to.contain('Impossible becomes possible when you want it bad enough')
  })
})
