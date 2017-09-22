
import {expect} from 'chai';
import {capitalize, timeFormat, fWishes} from '@/utils/utils';

describe('Utility functions', () => {
  it('capitalize() makes first letter uppercase', () => {
    const input = 'hello world';
    const result = capitalize(input);

    expect(result).to.be.equal('Hello world');
  })

  it('timeFormat() shows date in expected format', () => {
    const date1 = '1985-01-31';
    const result1 = timeFormat(date1, 2017);
    const date2 = '2016-10-22';
    const result2 = timeFormat(date2, 2017);
    const date3 = '2017-10-22';
    const result3 = timeFormat(date3, 2017);

    expect(result1).to.be.equal('32 years ago');
    expect(result2).to.be.equal('Last year');
    expect(result3).to.be.equal('Oct 22');
  })

  it('fWishes() filters wishes by given args', () => {
    const wishes = [
      { name: 0, isAlpha: false, isUnlocked: false },
      { name: 1, isAlpha: true, isUnlocked: true },
      { name: 2, isAlpha: true, isUnlocked: false }
    ];

    const argsObj = {isAlpha: true, isUnlocked: false};

    const result = fWishes(wishes, argsObj);

    expect(result).to.deep.equal([
      { name: 2, isAlpha: true, isUnlocked: false }
    ])
  })
})
