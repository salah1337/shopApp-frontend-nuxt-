<template>
<div>
  <h5>
    <ul>
      <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        <CartItem :item="item" />
      </li>
    </ul>
  </h5>
</div>
</template>

<script>
import CartItem from './CartItem'

export default {
  components: {
    CartItem
  },
  props: {
    cart: {
        required: true
    }
  },
}
</script>