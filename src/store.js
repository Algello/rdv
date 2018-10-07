import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keysArray: []
  },
  mutations: {
    addKeys(state,payload) {
      state.keysArray = payload;
      console.log(state.keysArray);
    }
  },
  actions: {

  }
})
