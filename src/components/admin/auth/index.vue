<template>
    <div class="authForms">
      <h3>Auth</h3>
      <input id="username" style="display:none" type="text" name="fakeusernameremembered">
      <input id="password" style="display:none" type="password" name="fakepasswordremembered">

      <Register v-show="toShow == 'register'">
        <a @click="toShow = 'login'">Login</a>
        <a @click="toShow = 'forgot'">Forgot Password ?</a>
      </Register>
      <Login v-show="toShow == 'login'">
        <a @click="toShow = 'register'">Register</a>
        <a @click="toShow = 'forgot'">Forgot Password ?</a>
      </Login>
    </div>
</template>

<script>
export default {
  name: 'Auth',
  data: () => {
    return {
      toShow: 'login'
    }
  },
  components: {
    'Login': () => ({
      component: import('./login')
    }),
    'Register': () => ({
      component: import('./Register')
    })
  }
}
</script>
<style>
.authForm {
  /* display: inline-block; */
  max-width: 300px;
  width: 90vw;
  margin: auto;
}
.loginLinks {
  text-align: left;
  float: left;
  display: flex;
  flex-direction: column;
  line-height: 20px;
  font-size: 16px;
}
</style>
