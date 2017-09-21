
import moment from 'moment';

// reusable functions that can be imported separately
// https://forum.vuejs.org/t/vuex-application-structure-where-to-filter-the-data-in-vuex-or-in-a-component/5405/5

export function capitalize(x) { // used as filter
  return x.charAt(0).toUpperCase() + x.slice(1);
}

export function timeFormat(x, y) { // used as filter
  const date = moment(x);
  const year = Number(moment(x).format('YYYY'));
  const currentYear = y || Number(moment().format('YYYY'));

  if (year >= currentYear) {
    return date.format('MMM D');
  } else {
    let gap = currentYear - year;
    return (gap > 1) ? `${gap} years ago` : `Last year`;
  }
}

export function fWishes(wishes, argsObj) { // function to filter wishes
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
