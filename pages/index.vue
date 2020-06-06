<template>
<div>
    <div v-if="this.$auth.loggedIn">
      {{ this.$auth.user.info.email }}
       <v-btn @click="logoutUser()">Logout</v-btn>
    </div>
    <div v-else>
       <nuxt-link :to="`/login`" >
        Login
      </nuxt-link>
      <nuxt-link :to="`/register`" >
        Register
      </nuxt-link>
    </div>
    <nuxt-link :to="`/products`" >
      Products
    </nuxt-link>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return{
    }
  },
  // async fetch({store}) {
  //   await store.dispatch('loadProducts');
  // },
  // computed: {
  //   ...mapState(['products']),
  // },
  methods: {
    async logoutUser() {
      await this.$auth.logout()
    }
  }
}
</script>