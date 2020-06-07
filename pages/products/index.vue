<template>
<div>
    <h1>Prods:</h1>
    <h4>count: {{liveProducts.count}}</h4>
    <div v-for="prod in liveProducts.products" :key="prod.id">
    <nuxt-link :to="`/products/${prod.id}`" >
      {{prod.name}}
    </nuxt-link>


  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data(){
    return{
      prods:""
    }
  },
  computed: {
    ...mapGetters('products', [
      'liveProducts',
    ]),
  },
  methods: {
    
  }
}
</script>