
import { mount } from 'avoriaz' // ? vue-test-utils
import Quotes from '@/components/Quotes';

describe('Quotes.vue', () => {
  it('renders correct data', () => {
    const QuotesComponent = mount(Quotes);
    expect(QuotesComponent.text())
      .to.contain('Impossible becomes possible when you want it bad enough')
  })
})
