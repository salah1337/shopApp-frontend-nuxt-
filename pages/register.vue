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
      :rules="[required('password'), minLength('password', 6)]"
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
                email:'6à9@1337jjj.com',
                password:'lollol',
                password_confirmation:'lollol',
                firstName:'lollol',
                lastName:'',
                username:'lollojjjl'
            },
            ...validations
        }
    },
    methods: {
        async submitForm(){
        let res = await this.$axios.post('api/register', this.userInfo).then(res => {
            console.log(res);
            
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
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err.response.data.message)
            console.log(err.response.data.errors)
        })
        }
}}
</script>

<style>

</style>