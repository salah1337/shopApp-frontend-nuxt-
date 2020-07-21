<template>

  <div id="forgot-password">
     <div @click="show = !show" class="popup-trigger">
              <p>Forgot Password</p>
      </div>
      <div v-if="show" @click="show = !show" class="popup-bg"></div>
      <div v-if="show" class="popup-content login">
        <div class="close-btn error" @click="show = !show">
          <font-awesome-icon icon="times"/>
        </div>
        <div class="panel login-panel login">
            <div v-if="step == 1">
                <div class="title">
                    <h3>Forgot Password</h3>
                </div>
                <div class="form">
                    <div class="input">
                    <label>Email</label>
                    <input v-model="userInfo.email" type="email" class="input input-form input-form1">
                    </div>
                </div>
                <div @click="submitForm()" class="submit gridcenter">Send Email</div>
            </div>
            <div class="gridcenter" v-if="step == 2">
                <img class="success2" :src="`${apiUrl}/storage/pages/success2.png`" alt="">
                <div>
                    <h3>Success</h3>
                    <h5>Check your email!</h5>
                    <p @click="show = !show" class="submit gridcenter">close</p>
                </div>
            </div>
            <div>
              <div @click="show = !show"><p>Back to login</p></div>
              <div><RegisterModal /></div>
            </div>
        </div>
      </div>
  </div>

</template>

<style lang="scss">
.close-btn{
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.error{
  color: var(--danger);
  font-weight: 500;
  font-size: calc(0.8rem + 0.3vw);
}
#forgot-password{
    .success2{
        max-height: 200px;
    }
}
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
import LoginModal from '../components/LoginModal'

export default {
  components: {
    RegisterModal,
    LoginModal
  },
  data() {
    return {
      userInfo: {
        email: '69@1337.com',
        password: 'lollol'
      },
      show: false,
      errors: {},
      step: 1,
      apiUrl: process.env.apiUrl
    }
  },
  methods: {
    async submitForm() {
      let loader = this.$loading.show()
      await this.dbAction('post', 'api/reset', {'email':this.userInfo.email}) 
      .then(async () => {
          console.log('success');
          this.step = 2
      }).catch(err => {    
          console.log('fail'); 
      })
      loader.hide()
    }
  }
}
</script>