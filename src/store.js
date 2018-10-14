import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        keysArray: [],
        currentArticle: null
    },
    mutations: {
        addKeys(state, payload) {
            state.keysArray = payload;
        },
        updateCurrentArticle(state, index) {
            state.currentArticle = index;
        },
        articleUpdate(state, newArticle) {

        }
    },
    actions: {}
})
