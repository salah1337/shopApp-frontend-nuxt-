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
export default {
    data(){
        return{
            userInfo: {
                username:'ksrrek@lol.com',
                password:'lollol'
            },
            ...validations
        }
    },
    methods: {
        submitForm(){
            this.$auth.loginWith('local', {
                data: {
                    username: this.userInfo.username,
                    password: this.userInfo.password
                }
            })
        }
    }
}
</script>

<style>

</style>