<template>
<div>
    <ul>
        <h4>{{orders.count}} orders</h4>
        <li v-for="order in orders.orders" :key="order.id">
            {{order.shipName}} {{order.id}} || <span @click="cancel(order.id)"> [cancel] </span>
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
import { mapActions, mapState } from 'vuex'

export default {
  data(){    
    return{
 
    }
  },
  computed: {
      getOrders(){
        this.$store.dispatch('orders/get')
      },
    ...mapState({
      orders: state => state.orders.userOrders,
    }),
  },
  methods: {
    async cancel(id) {
      await this.dbAction('get', `api/customer/order/cancel/${id}`, null, 'orders/get')
      .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
  }
}
</script>