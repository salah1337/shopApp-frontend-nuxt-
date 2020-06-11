<template>
<div>
    <h1>Prods:</h1>
    <h4>count: {{products.count}}</h4>
    <div v-for="prod in products.products" :key="prod.id">
    <nuxt-link :to="`/staff/products/${prod.id}`" >
      <h1>
        {{prod.name}} | {{prod.live}}
      </h1>
    </nuxt-link>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      products: state => state.products.products,
    }),
  },
}
</script>