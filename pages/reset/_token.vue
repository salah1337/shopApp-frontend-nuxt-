<template>
<div class="container">

    <div>
        <label for="">new password</label>
        <input v-model="info.password" type="text" class="input input-form input-form2">
    </div>
    <div>
        <label for="">confirm password</label>
        <input v-model="info.password_confirmation" type="text" class="input input-form input-form2">
    </div>
    <div @click="submitform()">submit</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            info: {
                'password': '',
                'password_confirmation': '',
                'token': ''
            }
        }
    },
    methods: {
        async submitform(){
            this.info.token = this.$route.params.token
            await this.dbAction('post', '/api/changepassword', this.info)
            .then(res => console.log('succcess'))
            .catch(err => console.log(err))
        }
    }


}
</script>

