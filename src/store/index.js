import Vue from 'vue';
import Vuex from 'vuex';

const ADD_USER = 'ADD_USER';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    [ADD_USER](state, payload) {
      state.user = payload;
    },
  },
  actions: {
    addUser({ commit }, payload) {
      commit(ADD_USER, payload);
    },
  },
});
