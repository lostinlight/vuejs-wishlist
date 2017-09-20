
import { expect } from 'chai';
import wHelpers from '@/mixins/wHelpers';

describe('wHelpers', () => {
  const methods = wHelpers.methods;

  it('fWishes() filters wishes by given args', () => {
    const wishes = [
      { name: 0, isAlpha: false, isUnlocked: false },
      { name: 1, isAlpha: true, isUnlocked: true },
      { name: 2, isAlpha: true, isUnlocked: false }
    ];

    const argsObj = {isAlpha: true, isUnlocked: false};

    const result = methods.fWishes(wishes, argsObj);

    expect(result).to.deep.equal([
      { name: 2, isAlpha: true, isUnlocked: false }
    ])
  })
})
