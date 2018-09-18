// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import Store from './store/index'
// import AuthUtils from './utils/auth'
// import VueFire from 'vuefire'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue Use

Vue.use(ElementUI)
// Vue.use(VueFire)
// End Use

// Vue.mixin(AuthUtils)
Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: '**',
  authDomain: '**',
  databaseURL: '**',
  projectId: '**'
})
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
firebase.auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    Store,
    components: { App },
    template: '<App/>',
    beforeCreate () {
      if (user) {
        Store.dispatch('init', user)
        Store.dispatch('setUser').then(m => {
          Store.dispatch('setLoaded', true)
        })
      }
    }
  })
})
