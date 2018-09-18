<template>
    <div class="loginForm authForm">
      <h3>Register</h3>

      <el-form :model="form" class='authForm' ref='registerForm' :rules="userRules" @keyup.enter.native="submit('registerForm')">
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
        <el-form-item label="Confirm Password" prop="checkPassword">
          <el-input type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="loginLinks">
            <slot></slot>
          </div>
          <el-button type="primary" class='loginBtn' @click="submit('registerForm')" :loading="form.isLoading">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import AuthUtils from '../../../utils/auth'

export default {
  name: 'Register',
  mixins: [AuthUtils],
  data: function () {
    var validateMatchingPasswords = (rule, value, cb) => {
      console.log('pass: ', this.form)
      if (value !== this.form.password) {
        cb(new Error('The two passwords don\'t match'))
      } else {
        cb()
      }
    }
    return {
      form: {
        email: '',
        password: '',
        checkPassword: ''
      },
      userRules: {
        checkPassword: [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
          { validator: validateMatchingPasswords, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (formName) {
      console.log('Form: ', this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.isLoading = true
          this.register({email: this.form.email, password: this.form.password})
            .then(user => {
              // console.log('logged in: ', user)
              this.$message({ message: 'Account created succesfully', type: 'success', center: true, customClass: 'bannerNotif' })
              this.login(this.form.email, this.form.password)
                .catch(e => { this.form.error = e.message })
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
