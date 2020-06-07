<template>
  <v-container>

      <v-text-field
      v-model="userInfo.username"
      label="Email"
      :rules="[required('email'), emailFormat()]"
      />
      <v-text-field
      v-model="userInfo.password"
      label="Password"
      counter="true"
      :rules="[required('password'), minLength('password', 8)]"
      />

    <v-btn  @click="submitForm(userInfo)">
         Log In
    </v-btn>

  </v-container>
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
            ...validations
        }
    },
    methods: {
        submitForm({store}){
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

</style>