import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseAction, firebaseMutations } from 'vuexfire'

import customStore from './custom'
import userStore from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loaded: false
  },
  mutations: {
    ...firebaseMutations,
    setLoaded: (state, val) => { state.loaded = val }
  },
  actions: {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    unbindRef: firebaseAction(({ unbindFirebaseRef }, name) => {
      unbindFirebaseRef(name)
    }),
    setLoaded: (context, val) => { context.commit('setLoaded', val) },
    init: firebaseAction(({ bindFirebaseRef, commit }, user) => {
      var promises = []
      if (user) {
        promises.push(bindFirebaseRef('user.userData', firebase.firestore().collection('users').doc(user.uid)))
      }
      return Promise.all(promises).then(fetch => {
        return fetch
      })
    })
  },
  modules: {
    custom: customStore,
    user: userStore
  }
})

export default store
