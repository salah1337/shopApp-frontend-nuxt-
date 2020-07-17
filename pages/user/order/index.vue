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
                <div v-for="(item, index) in cart.items" :key="item.id" class="cartItem">
                    <div class="top">
                       <div class="gridcenter cartItem-thumbnail">
                         <img :src="`http://localhost:6969/storage/${item.image}`" alt="">
                      </div>
                      <div class="cartItem-info">
                          <p>{{item.name}}</p>
                          <p>{{item.price}}</p>
                      </div>
                      <div class="cartItem-count">
                          <p class="btn" v-if="item.count > 1" @click="cartedit('remove', item.product_id, item.options, true)">-</p>    
                          <p class="count">{{item.count}}</p>
                          <p class="btn" @click="cartedit('add', item.product_id, item.options, true)">+</p>
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
                    <div v-if="showOptions[index]">
                      <ul>
                        <li v-for="productOption in item.options">
                          {{productOption.option.name}}
                        </li>
                      </ul>
                    </div>
                    <div class="toggleOptions" v-if="!showOptions[index]" @click="toggleOptions(index)">
                      <font-awesome-icon icon="chevron-down"/>
                    </div>
                    <div class="toggleOptions" v-else @click="toggleOptions(index)">
                      <font-awesome-icon icon="chevron-up"/>
                    </div>
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
                  <input v-model="orderinfo.email" id="email" type="text" class="input input-form input-form2">
              </div>
              <div class="firstName">
                  <label for="firstName">firstName</label>
                  <input v-model="orderinfo.firstName" id="firstName" type="text" class="input input-form input-form2">
              </div>
              <div class="lastName">
                  <label for="lastName">lastName</label>
                  <input v-model="orderinfo.lastName" id="lastName" type="text" class="input input-form input-form2">
              </div>
              <div class="country">
                  <label for="country">country</label>
                  <input v-model="orderinfo.country" id="country" type="text" class="input input-form input-form2">
              </div>
              <div class="state">
                  <label for="state">state</label>
                  <input v-model="orderinfo.state" id="state" type="text" class="input input-form input-form2">
              </div>
              <div class="city">
                  <label for="city">city</label>
                  <input v-model="orderinfo.city" id="city" type="text" class="input input-form input-form2">
              </div>
              <div class="phone">
                  <label for="phone">phone</label>
                  <input v-model="orderinfo.phone" id="phone" type="text" class="input input-form input-form2">
              </div>
              <div class="zip">
                  <label for="zip">zip</label>
                  <input v-model="orderinfo.zip" id="zip" type="text" class="input input-form input-form2">
              </div>
              <div class="fax">
                  <label for="fax">fax</label>
                  <input v-model="orderinfo.fax" id="fax" type="text" class="input input-form input-form2">
              </div>
              <div class="address">
                  <label for="address">address</label>
                  <textarea v-model="orderinfo.shipAddress" id="address1" class="input input-form input-form2"></textarea>
              </div>
              <div class="address2">
                  <label for="address2">address2</label>
                  <!-- <input id="address2" type="text" class="input input-form input-form2"> -->
                  <textarea v-model="orderinfo.shipAddress2" id="address2" class="input input-form input-form2"></textarea>
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
            <div class="summary-submit panel-submit">
            <div v-if="step > 1" @click="step--" class="summary-submit-btn gridcenter last-step">go back</div>
              <div v-if="step == 1" @click="addDetails()" class="summary-submit-btn gridcenter next-step">Procced</div>
              <div v-if="step == 2" @click="step++" class="summary-submit-btn gridcenter next-step">go to payment</div>
              <div v-if="step == 3" @click="placeOrder()" class="summary-submit-btn gridcenter next-step">Confirm order</div>
            </div>
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
                        Subtotal: <span>{{addTotal()}}</span>$
                    </div>
                    <div class="price">
                        Tax: <span>{{addTax()}}</span>$
                    </div>
                    <div class="price total">
                        Total: <span>{{addTotal() + addTax()}}</span>$
                    </div>
                </div>
            </div>
        </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
  .toggleOptions{
    text-align: center;
  }
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
    position: relative;
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
        display: flex;
        flex-direction: column;
      }
    }
}
.cartItem{
    display: grid;
    // grid-template-rows: 1fr 1fr;
    height: fit-content;
    margin-bottom: 5px;
  .top{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-column-gap: 5px;
    height: 100px;
  }
    position: relative;
    background: var(--gray);
    border-radius: 4px;

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
        cursor: pointer;
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
        all: unset;
        &:hover{background-color: unset;}
        &:active{
            box-shadow: unset !important;
            transform: unset;
            background-color: unset;
        }
        grid-area: submit;
        align-self: flex-end;
        height: 50%;
        // width: 100%;
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 15px;
    }
    .summary-submit-btn{
      text-align: center;
      height: 100%;
      max-height: 70px;
      max-width: 150px;
      background-color: var(--success);
      box-shadow: 0px 2px 0px var(--successDark);
      border-radius: 2px;
      color: white;
      font-size: calc(0.5vw + 0.9rem);
      font-weight: 450;
      cursor: pointer;
      user-select: none;
      &:hover{background-color: var(--successHover);}
      &:active{
        box-shadow: 0px 1px 0px var(--successDark) !important;
          transform: translateY(3px);
          background-color: var(--successActive);
      }
      &.last-step{
        background-color: var(--primary);
        box-shadow: 0px 2px 0px var(--primaryDark);
        &:hover{background-color: var(--primaryHover);}
        &:active{
          box-shadow: 0px 1px 0px var(--primaryDark) !important;
          background-color: var(--primaryActive);
        }
      }
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
        'firstName': 'first name',
        'lastName': 'last name', 
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
      step: 1,
      showOptions: []
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
    }),
  },
  mounted() {
    this.addQueryItem()
    for (let i = 0; i < this.cart.items.length; i++) {
      // this.itemOptions[i] = this.cart.items.options
      this.$set(this.showOptions, i, false)
    }
  },
  methods: {
    async placeOrder() {
      this.orderinfo.shipName = `${this.orderinfo.firstName} ${this.orderinfo.lastName}`
      await this.dbAction('post', `api/customer/order`, this.orderinfo, 'orders/get')
      .then(reply => console.log('success')).catch(err => console.log('fail'))
      this.step++
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
    },
    async AddAddress() {

    },
    async addQueryItem(){
      if(!this.$route.query.i) return
      // if (!this.cartHas(this.$route.query.i)){
      //   this.cartedit('add', this.$route.query.i, true)
      //   await this.$store.dispatch('cart/load')
      // }
      this.cart.items.forEach(item => {
        if (item.product_id == this.$route.query.i){
          this.selectedItems.push(item.id)
        }
      });
    },
    addTotal() {
      let total = 0
      this.cart.items.forEach(item => {
        if (this.selectedItems.includes(item.id)) {
          total += item.price * item.count
        }
      })
      return Math.ceil(total)
    },
    addTax() {
      let tax = 0
      this.cart.items.forEach(item => {
        if (this.selectedItems.includes(item.id)) {
          tax += item.tax * item.count
        }
      })
      return Math.ceil(tax)
    },
    toggleOptions(i){
      this.$set(this.showOptions, i, !this.showOptions[i])
    }
  }
}
</script>