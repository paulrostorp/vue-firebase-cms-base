<template>
    <div class="loginForm authForm">
      <h3>Login</h3>
      <el-form :model="form" class='authForm' ref='loginForm' :rules="userRules" @keyup.enter.native="submit('loginForm')">
        <el-alert
          v-show="form.error !== '' "
          :title="form.error"
          type="error"
          show-icon
          style="margin: 20px 0px;"
          :closable="false">
        </el-alert>
        <el-form-item label="Email" prop="email">
          <el-input type="text" v-model="form.email" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" autoComplete="new-password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Confirm Password" prop="checkPassword">
          <el-input type="password" v-model="loginForm.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model.number="loginForm.age"></el-input>
        </el-form-item> -->
        <el-form-item>
          <div class="loginLinks">
            <slot></slot>
          </div>
          <el-button type="primary" class='loginBtn' @click="submit('loginForm')" :loading="form.isLoading">Connect</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import AuthUtils from '../../../utils/auth'

export default {
  name: 'Login',
  mixins: [AuthUtils],
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit (formName) {
      console.log('Form: ', this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.isLoading = true
          this.login(this.form.email, this.form.password)
            .then(user => {
              console.log('logged in: ', user)
            })
            .catch(e => {
              console.error('Failed to login: ', e)
              this.form.error = e.message
              this.form.isLoading = false
            })
        } else {

        }
      })
    }
  }
}
</script>
<style lang="css">

</style>
