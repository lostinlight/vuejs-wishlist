![open source for the win](https://kodeguild.com/shared/OpenSource4theWin.svg)

## Vue.js Wishlist

> Vue.js client-side implementation of a simple [demo](https://github.com/lostinlight/angular2-wishlist) I did a while ago

### Stack
- Vue.js 2
- Vuex
- Webpack [starter](https://vuejs-templates.github.io/webpack)

### Preview
Live Demo → [deployed to Surge](https://curved-wilderness.surge.sh)

![preview screen](preview.jpg?raw=true)

__Please, let me know in issues if there's something to improve.__

### TODO
- [ ] tests
- [x] replace window alert with html modal
- [x] polyfill Object.assign() for IE

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:1336
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### Tests

On Linux, you might need to set $CHROME_BIN variable in your system

`echo 'export CHROME_BIN="/usr/bin/chromium-browser"' >> ~/.bashrc && source ~/.bashrc`
