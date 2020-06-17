<template>
<div>
    <ul>
      <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        {{item.count}} | {{item.name}} | {{item.price}}
        <span @click="select(item)">[select]</span> 
      </li>
    </ul>
    <h4>{{errors}}</h4>
    <ul>
      <li v-for="item in orderinfo.details" :key="item.id">
        {{item.count}} | {{item.name}} | {{item.price}}<br/>
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
        'shipped': '0', 
        'trackingNumber': '1',
        'details': []
      },
      errors: {}
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
    }),
  },
  mounted() {
    this.addQueryItem()
  },
  methods: {
    async placeOrder() {
        await this.dbAction('post', `api/customer/order`, this.orderinfo, 'orders/get')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
    select(item){
      if ( this.orderinfo.details.includes(item) ) {
        this.orderinfo.details.splice(this.orderinfo.details.indexOf(item), 1);
        return
      }
      this.orderinfo.details.push(item)
    },
    isSelected(item){
      if (this.orderinfo.details.includes(item)) return true;
    },
    async addQueryItem(){
      if(!this.$route.query.i) return
      this.cartedit('add', this.$route.query.i, true)
      await this.$store.dispatch('cart/load')
      this.cart.items.forEach(item => {
        if (item.product_id == this.$route.query.i){
          this.orderinfo.details.push(item)
        }
      });
    }
  }
}
</script>