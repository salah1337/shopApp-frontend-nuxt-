<template>
<div>
<div v-if="product">
  <nuxt-link :to="`/user/order?i=${product.id}`">
    BUY
  </nuxt-link>
      <h1>
        {{product.name}}
      </h1>
      <h2>
       - {{product.price}}$
      </h2>
      <h2>
       - {{product.SKU}}
      </h2>
      <h2>
       - {{product.stock}}
      </h2>
      <h2>
       - {{product.shortDesc}}
      </h2>
      <h2>
       - {{product.longDesc}}
      </h2>
      <h2>
       - {{product.live}} is live ?
      </h2>
      <h2>
       - {{product.location}}
      </h2>
      <h2>
       - {{product.weight}}
      </h2>
</div>
</div>
</template>

<script>

export default {
  async asyncData({ store, params}){
    let res = await store.dispatch('products/getOne', params.id)
    let prod = res.data
    if ( res.success ) return prod 
  },
  methods: {

  },
  computed: {
    // async getProd(){
    //   let res = await this.$store.dispatch('products/getOne', this.$route.params.id)
    //   console.log(res);
      
    // }
  },
}
</script>