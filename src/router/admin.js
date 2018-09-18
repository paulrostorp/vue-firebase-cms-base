import Dashboard from '../components/admin/dashboard'
import Auth from '../components/admin/auth/'

var routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true // #TODO
    }
  },
  {
    path: '/admin/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      requiresNoAuth: true
    }
  }
]
export default routes
