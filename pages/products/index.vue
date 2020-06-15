<template>
<div>
  <Cart :cart="cart" />
    <h1>Prods:</h1>
    <h4>count: {{products.count}}</h4>
    <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" />
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProductCard from '../../components/ProductCard'
import Cart from '../../components/Cart'

export default {
  components: {
    ProductCard,
    Cart
  },
  computed: {
    ...mapState({
      products: state => state.products.liveProducts,
      cart: state => state.cart.cart,
    }),
  },
}
</script>