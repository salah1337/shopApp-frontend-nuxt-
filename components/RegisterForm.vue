<template>
  <div>
  <b-button v-b-modal.modal-1>{{$t('auth.singup')}}</b-button>

  <b-modal id="modal-1" :title="$t('auth.singup')">
    <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="userInfo.email"
          placeholder="Enter email"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.email">{{errors.email[0]}}</p>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="User name:"
        label-for="input-2"
        description="Name displayed on your profile page."
      >
        <b-form-input
          id="input-2"
          v-model="userInfo.username"
          type="text"
          placeholder="Enter username"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.username">{{errors.username[0]}}</p>
      </b-form-group>
      
      <b-form-group
        id="input-group-3"
        label="Name:"
        label-for="input-3"
        description="This information will not be displayed on your profile page."
      >
      <b-form-input
          id="input-3"
          v-model="userInfo.firstName"
          type="text"
          placeholder="Enter first name"
      ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.firstName">{{errors.firstName[0]}}</p>
      <br>
      <b-form-input
          id="input-4"
          v-model="userInfo.lastName"
          type="text"
          placeholder="Enter last name"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.lastName">{{errors.lastName[0]}}</p>

      </b-form-group>

      <b-form-group id="input-group-4" label="Your Password:" label-for="input-5">
        
        <b-form-input
          id="input-5"
          v-model="userInfo.password"
          type="password"
          
          placeholder="Enter password"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.password">{{errors.password[0]}}</p>
        <br>
        <b-form-input
          id="input-6"
          v-model="userInfo.password_confirmation"
          type="password"
          
          placeholder="Confirm password"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</p>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  </b-modal>
</div>
</template>

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
        show: true,
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
            console.log('suck ma dick ----' + res);
            
            if ( res.data.success ){
                this.$auth.loginWith('local', {
                    data: {
                        username: this.userInfo.email,
                        password: this.userInfo.password
                    }
                }).then(async ()=>{
                        await loader(this.$auth.user, this.$store)
                })
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
                console.log(err.response);
                
                  this.notify([false, "Something went wrong :O, contact us"])
                }
        })
        }
    }
  }
</script>
<style>
#modal-1___BV_modal_footer_{
  display: none;
}
</style>