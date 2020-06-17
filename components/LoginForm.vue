<template>
    <div>
  <b-button v-b-modal.modal-2>{{$t('auth.signin')}}</b-button>

  <b-modal id="modal-2" :title="$t('auth.signin')">
    <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

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

      <b-form-group id="input-group-4" label="Your Password:" label-for="input-5">
        
        <b-form-input
          id="input-5"
          v-model="userInfo.password"
          type="password"
          
          placeholder="Enter password"
        ></b-form-input>
        <p style="color:red;" class="font-weight-light" v-if="errors.password">{{errors.password[0]}}</p>

      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  </b-modal>
</div>
</template>

<script>
import validations from "../utils/validation";
import loader from "../utils/loader";
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            userInfo: {
                username:'69@1337.com',
                password:'lollol'
            },
            ...validations,
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
        submitForm(){
            this.$auth.loginWith('local', {
                data: {
                    username: this.userInfo.username,
                    password: this.userInfo.password
                }
            }).then(async ()=>{
                    await loader(this.$auth.user, this.$store)
            })
        }
    }
}
</script>

<style>
#modal-2___BV_modal_footer_{
  display: none;
}
</style>