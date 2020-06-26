<template>

  <div>
     <div @click="show = !show" class="popup-trigger">
        <p>Register</p>
      </div>
      <div v-if="show" @click="show = !show" class="popup-bg"></div>
      <div v-if="show" class="popup-content register">
        <div class="panel register">
          <div class="title">
            <h3>register</h3>
          </div>
          <div class="form">
            <div class="input">
              <label>Email</label>
              <input type="email" class="input input-form input-form1">
            </div>
            <div class="input">
              <label>Username</label>
              <input type="text" class="input input-form input-form1">
            </div>
            <div class="input">
              <label>Password</label>
              <input type="password" class="input input-form input-form1">
            </div>
            <div class="input">
              <label>Confirm</label>
              <input type="password" class="input input-form input-form1">
            </div>
          </div>
          <div class="submit gridcenter">register</div>
        </div>
      </div>
  </div>

</template>

<style lang="scss">
.register{
    max-height: 550px;
    max-width: 550px;

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
export default {
    data() {
      return {
        userInfo: {
                email:'6à9@1337jjj.com',
                password:'lollol',
                password_confirmation:'lollol',
                firstName:'lollol',
                lastName:'dzdz',
                username:'lollojjjl'
        },
        show: false,
        errors: {}
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.submitForm()
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.userInfo.email = ''
        this.userInfo.username = ''
        this.userInfo.firstName = ''
        this.userInfo.lastName = ''
        this.userInfo.password = ''
        this.userInfo.password_confirmation = ''

        this.userInfo.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
       async submitForm(){
        let res = await this.$axios.post('api/register', this.userInfo).then(res => {
            console.log('suck ma dick ----' + res.response);
            
            if ( res.data.success ){
                this.$auth.loginWith('local', {
                    data: {
                        username: this.userInfo.email,
                        password: this.userInfo.password
                    }
                }).then(async ()=>{           
                        await loader(this.$auth.user, this.$store)
                }).catch(err => console.log(err.response)
                )
            }else{
                console.log('lil bitch----' + res.data)
            }
        }).catch(err => {
            const errCodes = [404, 422, 403]
                if ( errCodes.indexOf(err.response.status) !== -1 ){
                    let message = err.response.status == 422 
                                ? err.response.data.message
                                : err.response.data.data.message;
                  
                    let errors = err.response.status == 422 
                                ? err.response.data.errors
                                : err.response.data.data.erroprs;

                  this.notify([false, message])
                  this.errors = errors
                }
                else{
                console.log('keeeeeeeekkkkee----' + err.response);
                
                  this.notify([false, "Something went wrong :O, contact us"])
                }
        })
        }
    }
  }
</script>