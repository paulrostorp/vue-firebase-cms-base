import firebase from 'firebase'

const userStore = {
  state: {
    user: null,
    userData: {}
  },
  actions: {
    setUser: context => { context.commit('setUser') }
  },
  mutations: {
    setUser: state => { state.user = firebase.auth().currentUser }
  },
  getters: {
    getUser: state => {
      return {...state.user, ...state.userData}
    }
  }
}
export default userStore
