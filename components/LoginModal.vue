<template>

  <div>
     <div @click="show = !show" class="popup-trigger">
        <v-icon class="nav-btn">fa fa-user</v-icon>
      </div>
      <div v-if="show" @click="show = !show" class="popup-bg"></div>
      <div v-if="show" class="popup-content login">
        <div class="panel login-panel login">
          <div class="title">
            <h3>login</h3>
          </div>
          <div class="form">
            <div class="input">
              <label>Email</label>
              <input v-model="userInfo.email" type="email" class="input input-form input-form1">
            </div>
            <div class="input">
              <label>Password</label>
              <input v-model="userInfo.password" type="password" class="input input-form input-form1">
            </div>
            <div><RegisterModal /></div>
            <div>Frogot password</div>
          </div>
          <div @click="submitForm()" class="submit gridcenter">login</div>
        </div>
      </div>
  </div>

</template>

<style lang="scss">
.login{
    max-height: 450px !important;
    max-width: 550px;

}
.login-panel{
  height: 100%;
  margin: auto;
}
.popup-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 998;
}
.popup-content{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  height: 90vh;
  width: 95vw;

}
.title, .form{
  margin-bottom: 5%;
}
 .title{
   text-align: center;
   
      h3{
        text-shadow: -4px 4px 0px var(--main);
        color: var(--dark);
        font-weight: 800;
        font-size: calc(2.5rem + 1.2vw);
      }
  }
  .form{
    display: grid;
    .input{
      display: grid;
      font-size: calc(0.8rem + 0.6vw);
      label{
        font-size: calc(1rem + 0.4vw);
        font-weight: 800;
      }
    }
  }
  .submit{
    color: white;
    margin: auto;
    background: var(--main);
    max-width: 100px;
    min-height: 40px;
    background: var(--main);
    box-shadow: -3px 3px 0px var(--mainDark);
    border-radius: 1px;
    transition: 200ms ease-in-out;
    &:hover{
      background-color: var(--mainHover);
      box-shadow: -1px 1px 0px var(--mainDark);
    }
    &:active{
      box-shadow: 3px -3px 0px var(--mainDark) !important;
      transform: translateY(3px);
      background-color: var(--mainActive);
    }
  }
</style>

<script>
import RegisterModal from '../components/RegisterModal'

export default {
  components: {
    RegisterModal
  },
  data() {
    return {
      userInfo: {
        email: '69@1337.com',
        password: 'lollol'
      },
      show: false,
      errors: {}
    }
  },
  methods: {
    async submitForm() {
      let loader = this.$loading.show()
      await this.$auth.loginWith('local', {
        data: {
          username: this.userInfo.email,
          password: this.userInfo.password
        }
      }).then(async () => {
        await this.load()
        this.notify([true, "Welcome back."])
        this.show = false
      }).catch(err => {    
          this.notify([false, "make sure your data is correct"])
      })
      loader.hide()
    }
  }
}
</script>