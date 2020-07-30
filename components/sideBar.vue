<template>
  <div>
    <b-button v-b-toggle.sidebar-menu>
        <v-icon>fa fa-user</v-icon>
    </b-button>
    <b-sidebar id="sidebar-menu" right backdrop shadow>
        <ul class="">
            <li @click="(loginshow = !loginshow) && hide" v-if="!this.$auth.loggedIn" class="col-12 nav-btn">login</li>
            <li @click="(registershow = !registershow) && hide" v-if="!this.$auth.loggedIn" class="col-12 nav-btn">register</li>
            <li class="col-12" v-if="this.$auth.loggedIn">
                <b-img :src="`${apiUrl}/storage/${$auth.user.info.image}`" fluid thumbnail></b-img>
                <h2>{{this.$auth.user.info.username}}</h2>
            </li>
            <li class="col-12">
                <nuxt-link to="/user/profile">
                    Profile
                </nuxt-link>
            </li>
            <li class="col-12">
                <nuxt-link to="/user/order/list">
                    Orders
                </nuxt-link>
            </li>
            <li v-if="this.$auth.user.isStaff" class="col-12">
                <nuxt-link to="/staff">
                    staff
                </nuxt-link>
            </li>
            <li v-if="this.$auth.user.isAdmin" class="col-12">
                <nuxt-link to="/admin">
                    Admin
                </nuxt-link>
            </li>
        </ul>
        <template v-slot:footer="{ hide }">
            <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                <b-button id="logoutbtn" size="sm" @click="logout()">Logout</b-button>
            </div>
        </template>
    </b-sidebar>
    <LoginForm v-if="loginshow" class="popups"/>
    <RegisterForm v-if="registershow" class="popups"/>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
    components: {
        RegisterForm,
        LoginForm
    },
    data () {
        return {
            loginshow: false,
            registershow:false,
            apiUrl: process.env.apiUrl,
        }
    },
    methods: {
        async logout() {
            let loader = this.$loading.show()
            await this.$store.dispatch('resetAll')
            await this.$auth.logout()
            loader.hide()
            this.notify([true, "Bye."])
        },
    },
}
</script>

<style lang="scss">
.popups{
    z-index: 999;
}
#logoutbtn{
    background: var(--danger);
    border: none;
    box-shadow: 0px 1px 0px var(--dangerDark);
    &:hover{
        background: var(--dangerHover);
    }
    &:active{
        background: var(--dangerActive);
    }
}
</style>