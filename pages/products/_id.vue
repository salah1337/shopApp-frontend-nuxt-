<template>
<div>
   <ul>
      <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        {{item.count}} | {{item.name}} | {{item.price}} <br/>
      </li>
    </ul>
      <h1>
        {{prod.name}}
      </h1>
      <h2>
       - {{prod.price}}$
      </h2>
      <h4 @click="buyNow()"> 
        KEKE
      </h4>
      <v-btn @click="cartedit('add', prod.id)">
        add to cart
      </v-btn>
      <v-btn @click="cartedit('remove', prod.id)">
        remove from cart
      </v-btn>
      <v-btn @click="cartedit('removeitem', prod.id)">
        delete from cart
      </v-btn>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return{
      prod:""
    }
  },
  methods: {
      buyNow(){
        let inCart = false;
        let id;
        this.cart.items.forEach(item => {
          if (item.product_id == this.prod.id){
            inCart = true
            id = item.id
          }
        });
        if (!inCart) {
          this.cartedit('add', this.prod.id)
        }
          window.location.href = `/user/order?i=${id}`
      }, 
  },
  async asyncData({ $axios, params }){
    let res = await $axios.get(`api/customer/product/${params.id}`)
    let prod = res.data.data.product
    return {
      prod
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
    }),
  },
}
</script>