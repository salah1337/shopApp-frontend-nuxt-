<template>
  <div class="nav">
      <div class="navBody">
        <ul class="lang" >
            <h3 class="navLogo">
                logo
            </h3>
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item v-for="locale in availableLocales()" @click="change(locale.code)" :key="locale.code">
                    {{ locale.code }}
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </ul>
        <ul class="navBtns" v-if="this.$auth.loggedIn">
            <li v-if="this.$auth.user.isAdmin">
                <v-btn small depressed>Admin</v-btn>
            </li>
            <li v-if="this.$auth.user.isStaff">
                <v-btn small depressed>Staff</v-btn>
            </li>
            <li>
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </li>
            <li>
                <v-btn rounded small depressed>
                    <v-icon>shopping_cart</v-icon>
                </v-btn>
            </li>
        </ul>
        <ul v-else>
            <li>Register</li>
            <li>Login</li>
        </ul>
      </div>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
    methods: {
        change(lang) {
            this.$i18n.setLocale(lang);
        },
        availableLocales () {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        }
    }
}
</script>

<style lang="scss">
ul{
    margin: 0 !important;
}
.nav{
    height: 8vh;
    width: 100vw;
    .navBody{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        width: 90vw;
        max-width: 1200px;
        .lang{
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 50%;
            max-width: 200px;
        }
        .navBtns{
            list-style: none;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 50%;
            max-width: 350px;
        }
    }
}
</style>