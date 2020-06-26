<template>
  <div>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand href="/">shOP</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item v-for="locale in availableLocales()" @click="change(locale.code)" :key="locale.code">
                    {{ locale.code }}
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="this.$auth.loggedIn" class="ml-auto">
        <b-nav-item v-if="this.$auth.user.isAdmin" href="#">
            <v-btn small depressed>
                <nuxt-link to="/admin">Admin</nuxt-link>
            </v-btn>
        </b-nav-item>
        <b-nav-item v-if="this.$auth.user.isStaff" href="#">
            <v-btn small depressed>
                <nuxt-link to="/staff">Staff</nuxt-link>
            </v-btn>
        </b-nav-item>
        <b-nav-item-dropdown  right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{$t('nav.user')}}</em>
          </template>
          <b-dropdown-item href="/user/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown  right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em><v-icon>shopping_cart</v-icon></em>
          </template>
          <b-dropdown-item v-for="item in cart.items" :key="item.id">
            {{item.count}} | {{item.name}} | {{item.price}} <br/>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
              <RegisterForm />
          </b-nav-item>
          <b-nav-item>
              <LoginForm />
          </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapState } from 'vuex'

import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import Cart from '../components/Cart'

export default {
    components: {
        RegisterForm,
        LoginForm,
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart,
        })
    },
    methods: {
        change(lang) {
            this.$i18n.setLocale(lang);
        },
        availableLocales () {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        },
        async logout() {
            this.$store.dispatch('resetAll')
            await this.$auth.logout()
        },
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