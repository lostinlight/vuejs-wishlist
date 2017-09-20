
export default {
  methods: {
    fWishes(wishes, argsObj) { // filter wishes
      return wishes.filter((wish) => {
        let w;
        for (let key in argsObj) {
          if (wish[key] !== argsObj[key]) {
            w = false;
            break;
          } else {
            w = wish;
          }
        }
        return w;
      });
    }
  }
}
