<template>
<div>
    <div id="orderlist" class="gridcenter">
                <div class="orderlist panel panel_list">
                    <div class="panel-header">
                        <div class="panel-title">Orders</div>
                    </div>
                    <div class="panel-list">
                        <div class="list-head">
                            <div class="main">Order details</div>
                            <div class="others">
                                <p>created</p>
                                <p>status</p>
                            </div>
                        </div>
                        <div class="list-items">
                            <div v-for="order in orders.orders" class="item">
                                <div class="main">
                                    <div class="line">
                                        <ul>
                                            <li v-for="detail in order.details">
                                                {{detail.quantity}} x {{detail.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line"> {{timeSince(new Date(order.created_at))}} ago</div>
                                    <div v-if="order.shipped" class="line status status-success">shipped</div>
                                    <div v-else class="line status status-primary">not shipped</div>
                                </div>
                                <div></div>
                                <OrderPanel class="order-info-btn" :order="order"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
</template>

<style lang="scss">
 .order-info-btn{
        width: 100px;
        justify-self: flex-end;
        cursor: pointer;
}
.orderlist{
    width: 95vw;
    height: 80vh;
    max-height: 600px;
    max-width: 600px;
    .panel-header{
        grid-column: auto / span 2;
    }
    .panel-search{
        input{
            width: 90%;
        }
    }
    .list-items{
        max-height: 50vh;
        .item{
            height: 80px !important;
        }
    }
}
</style>

<script>
import OrderPanel from '../../../components/UserOrderPanel'

import { mapState } from 'vuex'

export default {
    components:{
        OrderPanel
    },
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