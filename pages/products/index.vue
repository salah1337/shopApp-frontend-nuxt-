<template>
<div>
    <h2 class="m m-5 text-center">we got {{ products.count }} Productsssss boiiiii:</h2>
    <div class="productList" >
        <ProductCard v-for="product in products.products" :key="product.id" :product="product" />
    </div>
</div>
</template>

<style lang="scss" scoped>
  .productList{
    display: grid;
    grid-row-gap: 15px;
  }
</style>

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