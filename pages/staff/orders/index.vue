<template>
<div>
    <ul>
        <h4>{{orders.count}} orders</h4>
        <li v-for="order in orders.orders" :key="order.id">
          <OrderCard :order="order" />
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
import OrderCard from '../../../components/OrderCard'

export default {
  components: {
    OrderCard
  },
  computed: {
      getOrders(){
        this.$store.dispatch('orders/load')
      },
    ...mapState({
      orders: state => state.orders.orders,
    }),
  },
}
</script>