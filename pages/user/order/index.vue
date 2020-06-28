<template>
  <v-app>
        <div class="container">
        <div v-if="step == 1" class="cart panel panel_list">
           <div class="panel-head">
                <div class="panel-title">
                    Cart Items
                </div>
                <div class="panel-description">
                    Select which items you want to order
                </div>
           </div>
           <div class="panel-list">
               <div class="list-items">
                <div v-for="item in cart.items" :key="item.id" class="cartItem">
                    <div class="gridcenter cartItem-thumbnail">
                         <img :src="`http://localhost:6969/storage/${item.image}`" alt="">
                    </div>
                    <div class="cartItem-info">
                        <p>{{item.name}}</p>
                        <p>{{item.price}}</p>
                    </div>
                    <div class="cartItem-count">
                         <p class="btn" v-if="item.count > 1" @click="cartedit('remove', item.product_id)">-</p>    
                         <p class="count">{{item.count}}</p>
                         <p class="btn" @click="cartedit('add', item.product_id)">+</p>
                    </div>
                    <!-- <div class="btns"> -->
                         <div class="cartItem-select">
                             <v-switch 
                             v-model="selectedItems" 
                             :value="item.id"
                             ></v-switch>
                         </div>
                         <div @click="cartedit('removeitem', item.product_id)" class="cartItem-delete">
                            <font-awesome-icon icon="trash"/>
                         </div>
                    <!-- </div> -->
                </div>
              </div>
           </div>
        </div>

        <div v-if="step == 2"  id="orderForm">
          <div class="orderForm panel panel_content">
              <div class="panel-header">
                  <div class="panel-title">Order Information</div>
                  <div class="panel-description">
                      Please fill in your order details
                  </div>
              </div>
            <div class="panel-content">
              <div class="email">
                  <label for="email">email</label>
                  <input id="email" type="text" class="input input-form input-form2">
              </div>
              <div class="firstName">
                  <label for="firstName">firstName</label>
                  <input id="firstName" type="text" class="input input-form input-form2">
              </div>
              <div class="lastName">
                  <label for="lastName">lastName</label>
                  <input id="lastName" type="text" class="input input-form input-form2">
              </div>
              <div class="country">
                  <label for="country">country</label>
                  <input id="country" type="text" class="input input-form input-form2">
              </div>
              <div class="state">
                  <label for="state">state</label>
                  <input id="state" type="text" class="input input-form input-form2">
              </div>
              <div class="city">
                  <label for="city">city</label>
                  <input id="city" type="text" class="input input-form input-form2">
              </div>
              <div class="phone">
                  <label for="phone">phone</label>
                  <input id="phone" type="text" class="input input-form input-form2">
              </div>
              <div class="zip">
                  <label for="zip">zip</label>
                  <input id="zip" type="text" class="input input-form input-form2">
              </div>
              <div class="fax">
                  <label for="fax">fax</label>
                  <input id="fax" type="text" class="input input-form input-form2">
              </div>
              <div class="address">
                  <label for="address">address</label>
                  <textarea id="address1" class="input input-form input-form2"></textarea>
              </div>
              <div class="address2">
                  <label for="address2">address2</label>
                  <!-- <input id="address2" type="text" class="input input-form input-form2"> -->
                  <textarea id="address2" class="input input-form input-form2"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div v-if="step == 3" id="paymentpanel">
            <div class="panel panel_content">
              <div class="panel-header">
                <div class="panel-title">Payment</div>
                <div class="panel-description">Chose your payment method</div>
              </div>
              <div class="panel-content">
                <div class="credit-card gridcenter">
                  <img src="http://localhost:6969/storage/creditcard.png" alt="">
                </div>
                <div class="paymentForm">
                  <div class="cardnumber">
                    <label for="cardnumber">Card number</label>
                    <input id="cardnumber" type="text" class="input input-form input-form1">
                  </div>
                  <div class="cardholder">
                    <label for="cardholder">Card holder name</label>
                    <input id="cardholder" type="text" class="input input-form input-form1">
                  </div>
                  <div class="enddate">
                    <label for="enddate">End date</label>
                    <input id="enddate" type="text" class="input input-form input-form1">
                  </div>
                  <div class="cvc">
                    <label for="cvc">CVC</label>
                    <input id="cvc" type="text" class="input input-form input-form1">
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div v-if="step == 4" id="ordersuccess">
          <div class="panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Order has been placed</div>
              <div class="panel-description">Order has been place and will be delivered to you as soon as possible</div>
            </div>
            <div class="panel-content">
              <div class="successimg gridcenter">
                <img src="http://localhost:6969/storage/order-success.png" alt="">
              </div>
              <div class="order-success-btns">
                <nuxt-link class="btn backbtn" to="/">
                  Back to store
                </nuxt-link>
                <nuxt-link class="btn backbtn" to="/user/order/list">
                  My orders
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="step != 4" class="summary panel panel_content panel_submit">
            <div v-if="step == 1" @click="addDetails()" class="panel-submit">Procced</div>
            <div v-if="step == 2" @click="step++" class="panel-submit">go to payment</div>
            <div v-if="step == 3" @click="placeOrder()" class="panel-submit">Confirm order</div>
            <div class="panel-head">
                <div class="panel-title">summary</div>
                <div class="panel-description">Here's your order summary for today</div>
            </div>
            <div class="panel-content">
                <div class="items">
                    <div v-for="item in cart.items" :key="item.id"  class="item">
                        <div v-if="selectedItems.includes(item.id)">{{item.name}} || {{item.count}}</div>
                    </div>
                </div>
                <hr>
                <div class="prices">
                    <div class="price">
                        Subtotal: <span>123,456</span>$
                    </div>
                    <div class="price">
                        Subtotal: <span>123</span>$
                    </div>
                    <div class="price total">
                        Subtotal: <span>123,456</span>$
                    </div>
                </div>
            </div>
        </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
#ordersuccess{
  .panel{
    .panel-header{
      grid-column: auto / span 2;
    }
    .panel-content{
      display: grid;
     .successimg{
       height: 100%;
        img{
            height: 300px;
            max-width: 100%;
          }
     }
      .order-success-btns{
        max-width: 100%;
        margin: 0;
        display: flex;
        justify-content: space-between;
        .btn{
          padding: 0.7rem 1.2rem;
          background: var(--main);
          color: white;
          max-height: unset !important;
          a{
            text-decoration: none;
          }
        }
      }
    }
  }
}
@media (max-width: 450px) {
  #ordersuccess{
    .order-success-btns{
      .btn{
        max-width: 100px;
      }
    }
  }
}
.container{
    display: grid;
    grid-template-columns: 1fr 0.45fr;
    grid-gap: 30px;
}
@media(max-width: 800px){
    .container{
        grid-template-columns: 1fr !important;
    }
}
.cart{
    height: 70vh;
    padding: 5px;
    .panel-list{
      .list-items{
        grid-template-rows: repeat(auto-fill, 100px);
      }
    }
}
.cartItem{
    position: relative;
    display: grid;
    background: var(--gray);
    border-radius: 4px;
    height: 100px;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

    grid-column-gap: 5px;
    .cartItem-thumbnail{
      img{
        height: 100%;
        width: 100%;
      }
    }
    .cartItem-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .cartItem-delete, .cartItem-select{
        position: absolute;
        right: 10px;
    }
    .cartItem-delete{
        bottom: 10px;
        color: var(--danger);
    }
    .cartItem-select{
        top: 0px;
        color: var(--primary);
        margin: 0;

    }
    .cartItem-count{
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-weight: 700;
        max-width: 100px;
        .count{
            color: var(--main);
        }
    }
}
.summary{
  margin: 0;
  max-height: 70vh;
    .panel-submit{
        max-height: 40px;
    }
}



 #orderForm {
      .panel-submit {
        justify-self: center !important;
      }

      .panel-content {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 10px;
      }

      .orderForm {
        min-height: 90vh;
        grid-template-rows: 0.25fr 1fr 0.15fr !important;
        max-width: 600px;
      }

      input {
        width: 100%;
        height: 35px;
      }

      label {
        font-weight: 800;
        text-transform: capitalize;
      }

      label::after {
        content: ':';
      }

      .address textarea,
      .address2 textarea {
        height: 100%;
        width: 100%;
        resize: none;
      }

      .email {
        grid-column: auto / span 12;
      }

      .firstName,
      .lastName,
      .address,
      .address2 {
        grid-column: auto / span 6;
      }

      .country,
      .state,
      .city,
      .phone,
      .zip,
      .fax,
      .panel-header {
        grid-column: auto / span 4;
      }

      @media (max-width: 500px) {

        .firstName,
        .lastName,
        .address,
        .address2 {
          grid-column: auto / span 12;
        }

        .country,
        .state,
        .city,
        .phone,
        .zip,
        .fax,
        .panel-header {
          grid-column: auto / span 6;
        }

        .orderForm {
          grid-template-rows: 0.1fr 1fr 0.15fr !important;
        }
      }
    }

#paymentpanel{
  .panel-header {
    grid-column: auto / span 4;
  }
  .panel-content{
    display: grid;
    grid-row-gap: 25px;
  }
  .credit-card{
    width: 100%;
  }
  .paymentForm{
    width: 100%;
    display: grid;
    grid-row-gap: 15px;
    & > div{
      display: grid;
    }
    // grid-template-columns: repeat(3, 1fr);
    // .cardnumber{
    //   grid-column: auto / span 6;
    // }
  }
}

</style>

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
      errors: {},
      selectedItems: [],
      step: 1
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

    },
    async addDetails() {
        this.orderinfo.details = []
        this.cart.items.forEach(item => {
          if (this.selectedItems.includes(item.id)) {
            this.orderinfo.details.push(item)
            console.log(item);
            
          }
        })
        this.step++
        // await this.dbAction('post', `api/customer/order`, this.orderinfo, 'orders/get')
        // .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
    async AddAddress() {

    },
    async addQueryItem(){
      if(!this.$route.query.i) return
      if (!this.cartHas(this.$route.query.i)){
        this.cartedit('add', this.$route.query.i, true)
        await this.$store.dispatch('cart/load')
      }
      this.cart.items.forEach(item => {
        if (item.product_id == this.$route.query.i){
          this.select(item)
        }
      });
    },
  }
}
</script>