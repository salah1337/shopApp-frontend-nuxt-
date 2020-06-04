<template>
<div>
    <h1>Prods:</h1>
  <div v-for="prod in prods" :key="prod.id">
    <nuxt-link :to="`/products/${prod.id}`" >
      {{prod.name}}
    </nuxt-link>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      prods:""
    }
  },
  async asyncData({ $axios }){
    let res = await $axios.get(`api/customer/products`)
    let prods = res.data.products
    return {
      prods
    }
  }
}
</script>