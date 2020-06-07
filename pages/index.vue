<template>
<div>
  <ul>
    <li v-for="locale in availableLocales()" > 
      <strong @click="change(locale.code)">
        {{ locale.code }}  
      </strong>  
    </li>
  </ul>
    <div v-if="this.$auth.loggedIn">
      <h3>
          {{ $t('welcome') }} {{ this.$auth.user.info.username }}
      </h3>
       <v-btn @click="logoutUser()">{{ $t('auth.singout') }}</v-btn>
    </div>
    <div v-else>
       <nuxt-link :to="`/login`" >
        {{ $t('auth.signin') }}
      </nuxt-link>
      <nuxt-link :to="`/register`" >
        {{ $t('auth.singup') }}
      </nuxt-link>
    </div>
    <nuxt-link :to="`/products`" >
      {{ $t('products') }}
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
    },
    change(lang) {
      this.$i18n.setLocale(lang);
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>