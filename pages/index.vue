<template>
<div class="container">
  <ul>
  </ul>
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
      this.$store.dispatch('resetAll')
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