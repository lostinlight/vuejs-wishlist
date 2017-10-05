
module.exports = {
  'Wishlist app': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .assert.elementPresent('.wl-quote')
      .assert.containsText('.wl-quote', 'Impossible becomes possible when you want it bad enough')
      .assert.containsText('.wl-activity li:last-child .wl-activity__wish', 'added Trip to S.Korea')
      .assert.containsText('.top-wish-0 .wl-top-title', 'BACKEND FOSS DEV')
      .assert.notVisible('.dropdown-menu')
      .assert.notVisible('.info__modal')
      .assert.notVisible('#wl-new-wish__menu')
      .assert.count('.wl-item', 7)
      .assert.count('.wl-archive-list > li', 3)
      .assert.evaluate(function() {
        return document.querySelector('.wl-sidebar__item.active span').textContent === 'all'
      })

    browser
      .click('.wl-new-wish__toggle')
      .setValue('#new-wishName', 'test')
      .click('select[id="new-wishType"] option[value="trips"]')
      .click('#wl-new-wish__menu button')
      .assert.count('.wl-item', 8)
      .assert.containsText('.wl-activity li:last-child .wl-activity__wish', 'added Test')

    browser
      .click('.wl-archive-list__clear')
      .assert.count('wl-archive-list > li', 0)

    clickWishButton(1)
    browser
      .click('.wish-0 select option[value="trips"]')
      .clearValue('.wish-0 input')
      .setValue('.wish-0 input', 'Edit works!')
      .click('.wish-0 .wl-item-save')
      .assert.containsText('.wish-0 .wl-item > span:nth-child(2)', 'Edit works!')

    clickWishButton(2)
    browser
      .assert.count('.wl-item', 7)

    clickWishButton(3)
    browser
      .assert.count('.wl-item', 6)
      .assert.count('.wl-archive-list > li', 1)

    clickWishButton(4)
    browser
      .assert.visible('.info__modal')
      .click('.info__close')
      .waitFor(100)

    browser
      .click('.top-wish-0 .icon-check')
      .assert.count('.wl-archive-list > li', 2)

    clickWishButton(4)
    browser
      .assert.count('.wl-item', 5)
      .assert.containsText('.top-wish-0 .wl-top-title', 'PENTEST TRAINING')

    browser
      .click('.wl-sidebar__nav li:nth-child(4)')
      .assert.evaluate(() => document.querySelector('.wl-sidebar__item.active span').textContent === 'mates')
      .assert.count('.wl-item', 1)
      .end()

    function clickWishButton(num) {
      return browser
        .click('#dropdownMenu-0')
        .click(`.wish-0 button:nth-child(${num})`)
    }
  }
}
