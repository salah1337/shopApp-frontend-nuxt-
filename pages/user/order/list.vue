<template>
<div>
    <div id="orderlist">
                <div class="orderlist panel panel_list">
                    <div class="panel-header">
                        <div class="panel-title">Orders</div>
                    </div>
                    <div class="panel-list">
                        <div class="list-head">
                            <div class="main">Order details</div>
                            <div class="others">
                                <p>placed at</p>
                                <p>status</p>
                            </div>
                        </div>
                        <div class="list-items">
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="main">
                                    <div class="line">
                                        3 x headset
                                    </div>
                                </div>
                                <div class="others">
                                    <div class="line">11/22/33</div>
                                    <div class="line status status-success">shipped</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
</template>

<style lang="scss">
.orderlist{
    width: 95vw;
    height: 80vh;
    max-height: 600px;
    max-width: 600px;
}
</style>

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