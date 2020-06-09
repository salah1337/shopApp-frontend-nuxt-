<template>
<div>
  <h5>
    <ul>
      <h3>{{cart.count}} items in cart <span @click="cartclear()">X</span> </h3>
      <li v-for="item in cart.items" :key="item.id">
        {{item.count}} | {{item.name}} <br/>
        Total: {{item.price}}
      </li>
    </ul>
  </h5>
    <h1>Prods:</h1>
    <h4>count: {{products.count}}</h4>
    <div v-for="prod in products.products" :key="prod.id">
    <nuxt-link :to="`/products/${prod.id}`" >
      <h1>
        {{prod.name}}
      </h1>
    </nuxt-link>
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
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueNotifications from 'vue-notifications'

export default {
  data(){
    return{
      prods:""
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.liveProducts,
      cart: state => state.cart.cart,
    }),
  },
  methods: {
    cartedit(action, id){
      let payload = {action, id}
      this.$store.dispatch('cart/edit', payload)
          .then(res => {
            this.showSuccessMsg()
          })
    },
    cartclear(){
      this.$store.dispatch('cart/clear').then(res => console.log(res))
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello there',
      message: 'That\'s the success!'
    },
    showInfoMsg: {
      type: VueNotifications.types.info,
      title: 'Hey you',
      message: 'Here is some info for you'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: 'Wow, man',
      message: 'That\'s the kind of warning'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: 'That\'s the error'
    }
  }

}
</script>