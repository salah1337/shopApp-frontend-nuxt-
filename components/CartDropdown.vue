<template>
   <b-dropdown right id="cartdropdown">
     <template v-slot:button-content>
     <v-icon class="nav-btn">fa fa-shopping-cart</v-icon>
    </template>
    <b-dropdown-item v-if="cart.items.length <= 0">
        <div class="cartdropdown-item">
          <div class="info"> 
          <div class="name">
            <div>You don't have any products in your cart.</div>
          </div>
            </div>
            <!-- <div class="description">{{item.description}}</div> -->
        </div>
    </b-dropdown-item>
    <b-dropdown-item class="cartItems cartdropdown-container" v-for="item in cart.items" :key="item.id">
        <div class="cartdropdown-item">
          <div class="image">
            <img :src="`${item.image}`" alt="">
          </div>
          <div class="info"> 
          <div class="name">
            <div>{{item.count}} x <nuxt-link :to="`/products/${item.product_id}`">{{item.name}}</nuxt-link> </div>
          </div>
            <div @click="cartedit('removeitem', item.product_id)" class="delete gridcenter">X</div>
            </div>
            <!-- <div class="description">{{item.description}}</div> -->
        </div>
        <hr>
    </b-dropdown-item>
    <b-dropdown-item v-if="cart.items.length > 0" class="gridcenter checkout cartdropdown-container">
        <nuxt-link to="/user/order" class="backbtn">go to checkout</nuxt-link>
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
  &> ul{
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  }
}
.checkout{
  padding: 5px;
}
.backbtn{
  
  &:hover{
    color: white;
    text-decoration: none;
  }
}
.cartdropdown-container{
    width: 95vw;
    max-width: 400px;
    cursor: auto;
    &> a{
      &:active{
        background-color: unset;
      }
    }
}

.cartdropdown-item{
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  justify-content: space-between;
  grid-column-gap: 5px;
  cursor: auto;
  .image{
    img{
      height: 40px;
    }
  }
  .name{
      a{
        color: black;
      &:hover{
        color: var(--grayTxt);
        text-decoration: none;
      }
    }
  }
  .info{
    display: grid;
  }
  .delete{
    color: white;
    background: var(--danger);
    width: 24px;
    border-radius: 3px;
    box-shadow: 0px 1px 0px var(--dangerDark);
    justify-self: end;
    user-select: none;
    cursor: pointer;
  }
}
</style>