
import uuid from 'uuid';
import wishes from '../../data/wishes';

const state = {
  wishes: [],
  category: 'all',
  openModal: false
};

export const getters = {
  wishes: state => {
    return state.wishes;
  },
  category: state => {
    return state.category;
  },
  openModal: state => {
    return state.openModal;
  }
};

const whichIndex = (w) => state.wishes.indexOf(w);

export const mutations = {
  'CHOOSE_CATEGORY' (state, category) {
    state.category = category;
  },
  'FETCH_WISHES' (state) {
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
    const alphaWish = state.wishes[whichIndex(wish)];
    alphaWish.isAlpha = true;
    state.wishes.splice(whichIndex(wish), 1, alphaWish);
  },
  'OPEN_MODAL' (state) {
    state.openModal = true;
  },
  'CLOSE_MODAL' (state) {
    state.openModal = false;
  }
};

// we don't need actions - in this simple demo data is static and no async operations are made

export default {
  state,
  getters,
  mutations
}
