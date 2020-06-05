<template>
<div>
      <h1>
        {{prod.name}}
      </h1>
      <h2>
       - {{prod.price}}$
      </h2>
      <nuxt-link :to="`/user/order`">
        Buy
      </nuxt-link>
</div>
</template>

<script>
export default {
  data(){
    return{
      prod:""
    }
  },
  async asyncData({ $axios, params }){
    let res = await $axios.get(`api/customer/product/${params.id}`)
    let prod = res.data
    return {
      prod
    }
  }
}
</script>