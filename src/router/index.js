import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import notFound from '@/components/404'
import firebase from 'firebase'
import Admin from './admin'
import Routes from './routes'

Vue.use(Router)
//
// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start()
//   }
//   next()
// })
// router.afterEach((to, from) => {
//   NProgress.done()
// })

var router = new Router({
  routes: [
    ...Admin,
    ...Routes,
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      name: 'NotFound',
      component: notFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let currentUser = firebase.auth().currentUser
  var isAdmin = () => {
    if (currentUser) {
      return firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            return true
          } else {
            return false
          }
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    } else {
      return false
    }
  }
  isAdmin = await isAdmin()

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth)
  let requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  if (requiresAdmin) {
    if (isAdmin) {
      next()
    } else if (currentUser) {
      next('NotFound')
    } else {
      next('/admin/auth')
    }
  } else if (requiresAuth && !currentUser) next('/admin/auth')
  else if (requiresNoAuth && currentUser) next('/admin')
  else if (!requiresAuth && currentUser) next()
  else next()
})

export default router
