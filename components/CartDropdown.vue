<template>
   <b-dropdown right id="cartdropdown">
     <template v-slot:button-content>
     <v-icon class="nav-btn">shopping_cart</v-icon>
    </template>
    <b-dropdown-item v-for="item in cart.items" :key="item.id">
      <div class="cartdropdown-item">
        <div class="name">{{item.name}}</div>
        <div @click="cartedit('removeitem', item.product_id)" class="delete gridcenter">X</div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['items'],
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
        cart: state => state.cart.cart,
    })
  },
  methods: {
    test() {
      console.log('lol')
    }
  }
}
</script>

<style lang="scss">
#cartdropdown{
  background-color: unset !important;
  color: var(--grayTxt) !important;
  border-color: unset !important;
}
.cartdropdown-item{
  width: 100%;
  display: flex;

  justify-content: space-between;
  .delete{
    color: white;
    background: var(--danger);
    width: 24px;
    border-radius: 3px;
    box-shadow: 0px 1px 0px var(--dangerDark);
  }
}
</style>