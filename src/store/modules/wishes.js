
import uuid from 'uuid';
import wishes from '../../data/wishes';

const state = {
  wishes: [],
  category: 'all'
};

const getters = {
  wishes: state => {
    return state.wishes;
  },
  category: state => {
    return state.category;
  }
};

const whichIndex = (w) => state.wishes.indexOf(w);

const mutations = {
  'CHOOSE_CATEGORY' (state, category) {
    state.category = category;
  },
  'FETCH_WISHES' (state, wishes) {
    state.wishes = wishes;
  },
  'ADD_WISH' (state, wish) {
    wish._id = uuid.v4();
    state.wishes.push(wish);
  },
  'UPDATE_WISH' (state, wish) {
    const wIndex = state.wishes.findIndex((x) => x._id === wish._id);
    if (wIndex !== -1) {
      state.wishes.splice(wIndex, 1, wish);
    }
  },
  'REMOVE_WISH' (state, wish) {
    state.wishes = [...state.wishes.slice(0, whichIndex(wish)), ...state.wishes.slice(whichIndex(wish) + 1)];
  },
  'UNLOCK_WISH' (state, wish) {
    const achievement = state.wishes[whichIndex(wish)];
    achievement.isUnlocked = true;
    achievement.isAlpha = false; // reset alpha mode on achieved wishes
    state.wishes.splice(whichIndex(wish), 1, achievement);
  },
  'MAKE_ALPHA' (state, wish) {
    const alphas = state.wishes.filter((wish) => wish.isAlpha === true);
    const checkAlphas = alphas.length;

    if (checkAlphas >= 4) {
      window.alert( // TODO: see README
        `Currently you already have 4 Alpha wishes. This is the maximum ammount.

        Please, achieve one of them, mark it as unlocked. Then add new Alpha wish`);
    } else {
      const alphaWish = state.wishes[whichIndex(wish)];
      alphaWish.isAlpha = true;
      state.wishes.splice(whichIndex(wish), 1, alphaWish);
    }
  }
};

const actions = {
  chooseCategory: ({commit, state}, category) => {
    commit('CHOOSE_CATEGORY', category);
  },
  fetchWishes: ({commit}) => {
    commit('FETCH_WISHES', wishes);
  },
  addWish: ({commit, state}, wish) => {
    commit('ADD_WISH', wish);
  },
  removeWish: ({commit, state}, wish) => {
    commit('REMOVE_WISH', wish);
  },
  updateWish: ({commit, state}, wish) => {
    commit('UPDATE_WISH', wish);
  },
  unlockWish: ({commit, state}, wish) => {
    commit('UNLOCK_WISH', wish);
  },
  makeAlphaWish: ({commit, state}, wish) => {
    commit('MAKE_ALPHA', wish);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
