<template>
<div>
    <ul>
      <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        {{item.count}} | {{item.name}} | {{item.price}} <span @click="select(item)">[select]</span> <br/>
      </li>
    </ul>
    <v-btn depressed dark @click="placeOrder()" > Order </v-btn>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data(){    
    return{
      orderinfo: {
        'amount': '3',
        'shipName': 'shipName', 
        'shipAddress': 'shipAddress', 
        'shipAddress2': 'shipAddress2', 
        'city': 'city', 
        'state': 'state', 
        'zip': '3', 
        'country': 'country', 
        'phone': '3', 
        'fax': '3', 
        'shipping': '3', 
        'tax': '3', 
        'email': 'email', 
        'shipped': '1', 
        'trackingNumber': '1',
        'details': []
      }
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
    }),
    addQueryItem(){
      this.cart.items.forEach(item => {
        if (item.id == this.$route.query.i){
          this.orderinfo.details.push(item)
        }
      });
    }
  },
  methods: {
    placeOrder() {
      let payload = [this.orderinfo];
      this.$store.dispatch('orders/place', this.orderinfo)
    },
    select(item){
      this.orderinfo.details.push(item)
    }
  }
}
</script>