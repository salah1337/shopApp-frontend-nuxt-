<template>
<div>
    <ul>
      <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        {{item.count}} | {{item.name}} | {{item.price}}
        <span v-if="!isSelected(item)" @click="select(item)">[select]</span> 
        <span v-if="isSelected(item)" @click="unSelect(item)">[unselect]</span> 
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
        'shipped': '1', 
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
    addQueryItem(){
      this.cart.items.forEach(item => {
        if (item.id == this.$route.query.i){
          this.orderinfo.details.push(item)
        }
      });
    }
  },
  methods: {
    async placeOrder() {
      this.$store.dispatch('orders/place', this.orderinfo)
        .then(res => {
              this.notify(res)
        }, err => {
            if (err.status == 422){
              this.notify([false, err.data.message])
              this.errors = err.data.errors
            }
            else{
              this.notify([false, "Something went wrong :O, contact us"])
            }
        })
    },
    select(item){
      if (!this.isSelected(item)) {
        this.orderinfo.details.push(item)
      }
    },
    isSelected(item){
      if (this.orderinfo.details.includes(item)) return true;
    },
    unSelect(item){
      this.orderinfo.details.splice(this.orderinfo.details.indexOf(item), 1)
    }
  }
}
</script>