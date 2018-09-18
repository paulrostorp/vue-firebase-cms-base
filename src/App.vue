<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeRouteEnter (to, from, next) {
    // console.log('Firebase User: ', firebase.auth().currentUser)
    console.log('Before route enter')
    next()
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  margin-top: 60px;
  text-align: center;
}
a:link, a:visited, .loginLinks a {
    text-decoration: none;
    color: #4076d4;
    cursor: pointer;
}
a:active, a:link:focus, a:link:hover, .loginLinks a:active, .loginLinks a:focus, .loginLinks a:hover{
    text-decoration: underline;
}
a:active, a:link:focus {
    color: #e2001a;
}
/* // FORMS */
.authForm .el-form-item {
  position: relative;
}
.authForm .el-form-item .el-form-item__content .el-input input {
  height: 50px;
  padding: 1.8rem 6px 1rem;
  font-size: 1.3em;
}
.authForm .el-form-item .el-form-item__label {
  text-transform: capitalize;
  position: absolute;
  z-index: 1000;
  left: 6px;
  top: 4px;
  /* display: inline-block; */
  /* height: 5px; */
  flex-direction: row-reverse;
  display: flex;
  /* font-size: 0.8em; */
  margin: 0;
  padding: 0;
  color: #acb3bb;
  line-height: 1;
}
.el-form-item.is-required .el-form-item__label:before {
  margin-left: 3px;
}
.el-form-item__error {
  padding-top: 0px;
}
/* END FORMS */

/* Notifications */
.el-message.is-center.bannerNotif {
    border: 0;
    border-radius: 0;
    width: 100%;
    top: 0;
    padding: 30px 20px;
}
.bannerNotif .el-message__icon {
  display: none;
}
/* Success */
.el-message--success.bannerNotif {
  background-color: #13CE66;
}
.el-message--success.bannerNotif .el-message__content {
  color: white;
  font-size: 20px;
}
/* Error */

.el-message--error.bannerNotif {
  background-color: #FF4949;
}
.el-message--error.bannerNotif .el-message__content {
  color: white;
  font-size: 20px;
}
/* END Error */

</style>
