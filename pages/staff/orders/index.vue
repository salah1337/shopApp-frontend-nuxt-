<template>
<div>
    <ul>
        <h4>{{orders.count}} orders</h4>
        <li v-for="order in orders.orders" :key="order.id">
            {{order.shipName}} {{order.id}} || 
            <span @click="cancel(order.id)"> [cancel] </span>
            <span v-if="!order.shipped" @click="markShipped(order.id)"> [markShipped] </span>
            <ol>
                <hr>
                <li v-for="detail in order.details" :key="detail.id">
                    {{detail.name}} || {{detail.SKU}}
                </li>
                <br/>
                <br/>
            </ol>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
      getOrders(){
        this.$store.dispatch('orders/load')
      },
    ...mapState({
      orders: state => state.orders.orders,
    }),
  },
  methods: {
    cancel(id) {
        this.dbAction('get', `api/order/cancel/${id}`, null, 'orders/load')
    },
    markShipped(id) {
        this.dbAction('get', `api/order/ship/${id}`, null, 'orders/load')
    }
  }
}
</script>