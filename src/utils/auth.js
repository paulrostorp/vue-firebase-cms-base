import firebase from 'firebase'
import Router from '@/router/'

var mixin = {
  data: () => {
    return {
      form: {
        error: '',
        isLoading: false
      },
      userRules: {
        name: [
          { required: true, message: 'Please input your name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' }
        ]
        // checkPassword: [
        //   { required: true, message: 'Please confirm your password', trigger: 'blur' },
        //   { validator: validateMatchingPasswords, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    login (email, password) {
      console.log('Attempting to log in using username ' + email + ' and password ' + password)
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          // console.log('Sign in successful: ', user)
          return Router.push('/admin')
        })
        .catch((e) => {
          // console.log('Error signing in: ', e)
          throw e
        })
    },
    register (data) {
      if (data.email && data.password) {
        return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then((user) => {
            if (Object.keys(data).length > 2) {
              var extraData = data
              delete extraData.password
              return firebase.firestore().collection('users').doc(user.user.uid).set(extraData) // #TODO Filter allowed props
                .then(userData => {
                  return Object.assign(user, {userData: userData})
                })
                .catch(e => {
                  throw e
                })
            } else {
              return user
            }
          })
          .catch(e => {
            throw e
          })
      } else {
        throw new Error('Registration data missing')
      }
    }
  }
}
export default mixin
