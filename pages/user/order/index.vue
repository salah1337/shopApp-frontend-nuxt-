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
                  <img :src="`${item.image}`" alt="">
                </div>
                <div class="cartItem-info">
                  <p>{{item.name}}</p>
                  <p>
                    {{item.price}}$
                    <span v-if="item.options.length > 0" class="increment">({{priceWithOptions(index)}}$)</span>
                  </p>
                </div>
                <div class="cartItem-count">
                  <p class="btn" v-if="item.count > 1" @click="cartedit('remove', item.product_id, item.options, true)">
                    -</p>
                  <p class="count">{{item.count}}</p>
                  <p class="btn" @click="cartedit('add', item.product_id, item.options, true)">+</p>
                </div>
                <!-- <div class="btns"> -->
                <div class="cartItem-select">
                  <v-switch v-model="selectedItems" :value="item.id"></v-switch>
                </div>
                <div @click="cartedit('removeitem', item.product_id)" class="cartItem-delete">
                  <font-awesome-icon icon="trash" />
                </div>
                <!-- </div> -->
              </div>
              <div class="options" v-if="showOptions[index]">
                <div class="options-list">
                  <div v-if="groupHasOptions(index, group)" v-for="group in allProducts.optionGroups" :key="group.id">
                    <div class="groupName">{{group.name}}</div>
                    <div class="option" v-for="opt in item.options" v-if="opt.group.id == group.id" :key="opt.id">
                      {{opt.name}}
                      <span class="increment">(+{{opt.priceIncrement}}$)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="toggleOptions" v-if="!showOptions[index]" @click="toggleOptions(index)">
                <font-awesome-icon icon="chevron-down" />
              </div>
              <div class="toggleOptions" v-else @click="toggleOptions(index)">
                <font-awesome-icon icon="chevron-up" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step == 2" id="orderForm">
        <div class="orderForm panel panel_content">
          <div class="panel-header">
            <div class="panel-title">Order Information</div>
            <div class="panel-description">
              Please fill in your order details
            </div>
          </div>
          <div class="panel-content">
            <div>
              <AddressForm :address="orderinfo"/>
            </div>
            <div v-for="(address, index) in $auth.user.info.addresses" @click="$refs.address[index].click()" class="choseAddress">
              <div class="addressRadio">
                <span v-if="orderinfo.addressId != address.id">{{address.address.substr(0, 20)}}</span> 
                <span class="addressRadio-btns" v-else> 
                  <AddressForm :address="address"/> 
                  <font-awesome-icon @click="deleteAddress(address.id)" class="delete-btn" icon="trash" title="delete address"/>
                </span>
                <input ref="address" :value="address.id" v-model="orderinfo.addressId"
                  name="addressChoice" type="radio">
              </div>
              <div v-if="orderinfo.addressId == address.id">
                <Address :address="address"/>
              </div>
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
              <div class="cardNumber">
                <label for="cardNumber">Card number</label>
                <div id="cardNumber" ref="cardNumber" type="text" class="input input-form input-form1">
                </div>
              </div>
              <div class="expiryDate">
                <label for="expiryDate">Expiry date</label>
                <div id="expiryDate" ref="expiryDate" type="text" class="input input-form input-form1">
                </div>
              </div>
              <div class="cvc">
                <label for="cvc">CVC</label>
                <div id="cvc" ref="cvc" type="text" class="input input-form input-form1">
                </div>
              </div>
              <div class="errormsg">
                {{cardError}}
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
              <img src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-box-marketing-seo-flatart-icons-lineal-color-flatarticons.png"/>
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
          <div class="panel-submit-btns">
            <div v-if="step > 1" @click="step--" class="summary-submit-btn gridcenter last-step">go back</div>
            <div v-if="step == 1 && selectedItems.length > 0" @click="addDetails()"
              class="summary-submit-btn gridcenter next-step">Procced</div>
           
            <!-- <div v-if="step == 2" @click="step++ && addAddress()" class="summary-submit-btn gridcenter next-step">go to payment</div> -->
            <div v-if="step == 2 && typeof(orderinfo.addressId) == 'number'" @click="addAddress()" class="summary-submit-btn gridcenter next-step">go
              to payment</div>
            <div v-if="step == 3" @click="placeOrder()" class="summary-submit-btn gridcenter next-step">Confirm order
            </div>
          </div>
           <div v-if="step == 1 && selectedItems == 0" class="panel-submit-error">Please select at least one item to procced.</div>
           <div v-if="step == 2 && orderinfo.addressId == null" class="panel-submit-error">Please select an address for your order.</div>
          <!-- <div class="panel-submit-error">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, debitis.</div> -->
        </div>
        <div class="panel-head">
          <div class="panel-title">summary</div>
          <div class="panel-description">Here's your order summary for today</div>
        </div>
        <div class="panel-content">
          <div class="items">
            <div v-for="item in cart.items" :key="item.id" class="item">
              <div v-if="selectedItems.includes(item.id)">{{item.name}} <span class="increment">(x{{item.count}})</span>
              </div>
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
    cursor: pointer;
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
.increment{
  color: var(--primary);
  font-size: calc(0.6rem + 0.3vw);
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
        div{
          margin: 0;
        }
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
        p{
          margin: 0;
        }
    }
    .remove{
      color: var(--danger);
      cursor: pointer;
    }
        .options{
          padding: 5px;
        .options-title{
            font-size: calc(0.7rem + 0.5vh);
        }    
        .options-list{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
          .groupName{
            color: var(--grayTxt);
            font-size: calc(0.6rem + 0.3vw);
          }
     
 
        }
        select{
            background: white;
            color: black;
            width: 60%;
            border-radius: 4px;
            padding: 3px;
            position: relative;
            &:focus{
                outline: var(--main) 2px solid;
                -moz-outline-radius: 4px;
            }
        }
    }
}
.summary{
  margin: 0;
  max-height: 70vh;
  height: 100%;
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
        // height: 50%;
        // width: 100%;
        max-width: 100%;
        .panel-submit-btns{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 15px;
        }
        .panel-submit-error{
          color: var(--grayTxt);
          font-size: calc(0.6rem + 0.5vw);
        }
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
      .choseAddress{
        position: relative;
        padding: 10px;
        background: var(--gray);
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        transition: 150ms ease-in-out;
          &:hover{
            background: rgb(197, 197, 197);
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
          }
      }
      .addressRadio{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        cursor: pointer;
        input{
          width: 25px;
          color: var(--main)
        }
        span{
          width: 100%;
          margin-bottom: 0;
        }
        .addressRadio-btns{
            .delete-btn{
              color: var(--danger);
              position: absolute;
              bottom: 10px;
              right: 10px;
            }
        }
      }
      .panel-submit {
        justify-self: center !important;
      }
      .panel-content{
        display: grid;
        grid-row-gap: 10px;
      }
      .form{
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 10px;
        background: white;
        padding: 5px;
        border-radius: 4px;
        .address-submit-btn{
          grid-column: auto / span 4;
          background: var(--success);
          max-width: unset;
        }
      }

      .orderForm {
        // min-height: 90vh;
        grid-template-rows: unset !important;
        // max-width: 600px;
      }

      input {
        width: 100%;
        height: 35px;
      }

      label {
        font-weight: 600;
        text-transform: capitalize;
      }

      label::after {
        content: ':';
      }

      .address textarea,
      .address2 textarea {
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
import { ValidationProvider, ValidationObserver  } from 'vee-validate';
import AddressForm from '../../../components/AddressForm';
import Address from '../../../components/Address';
export default {
  components: {
    ValidationProvider,
    ValidationObserver ,
    Address,
    AddressForm,
  },
  data(){    
    return{
      orderinfo: {
        'amount': '3',
        'firstName': 'first name',
        'lastName': 'last name', 
        'address': 'shipAddress', 
        'address2': 'shipAddress2', 
        'city': null, 
        'state': null, 
        'zip': '3', 
        'country': null, 
        'phone': '3', 
        'fax': '3', 
        'shipping': '3', 
        'tax': '3', 
        'email': 'email@mmm.com', 
        'shipped': '0', 
        'trackingNumber': '1',
        'details': [],
        'addressId': null
      },
      errors: {},
      selectedItems: [],
      step: 1,
      showOptions: [],
      cardError: '',
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
      allProducts: state => state.products.allProducts,
    }),
    formValid() {
      // return this.$refs.formValid ? this.$refs.formValid.disabled : false
      this.formIsValid = this.$refs.formValid ? this.$refs.formValid.disabled : false
    },
  },
  mounted() {
    this.addQueryItem()
    if (this.cart.items.length > 0) {
      for (let i = 0; i < this.cart.items.length; i++) {
        // this.itemOptions[i] = this.cart.items.options
        this.$set(this.showOptions, i, false)
      }  
    }
  },
  methods: {
    loadStrip(){
      if (this.step == 3) {
        let loader = this.$loading.show()
        this.stripe = Stripe(`pk_test_51HHY7iC209mGcTriS8H6PP4xevgOtvZYzqUTQmqjTRUAQDZkecKo9TstcxqLojzKngnC51Z1SrQ88vnRT3uBoXJc007AVKMcBb`),
        this.elements = this.stripe.elements(),

        this.cardNumber = this.elements.create("cardNumber");
        this.cardNumber.mount(this.$refs.cardNumber);

        this.cardExpiry = this.elements.create("cardExpiry");
        this.cardExpiry.mount(this.$refs.expiryDate);

        this.cardCvc = this.elements.create("cardCvc");
        this.cardCvc.mount(this.$refs.cvc);
        loader.hide()
      }   else{
        console.log('strip error');
      }
    },
    async placeOrder() {
      let result = await this.stripe.createToken(this.cardNumber);
      if ( result.error ) {
        this.cardError = result.error.message
      } else{
        this.orderinfo.stripeToken = result.token
        this.orderinfo.amount = this.addTotal()
        this.orderinfo.shipName = `${this.orderinfo.firstName} ${this.orderinfo.lastName}`
        await this.dbAction('post', `api/customer/order`, this.orderinfo, 'orders/get')
        .then(reply => {
          this.$store.dispatch('cart/load')
        }).catch(err => console.log('fail'))
        this.step++;
        window.scrollTo(0,0)
      }
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
        window.scrollTo(0,0)
    },
    async addAddress() {
      this.step = 3

      console.log(this.step);
      let loader = this.$loading.show()
      await this.sleep(4000)
      loader.hide()
      this.loadStrip()
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
          total += this.priceWithOptions(this.cart.items.indexOf(item)) * item.count
        }
      })
      return Math.round(Math.ceil(total))
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
    },
    groupHasOptions(itemIndex, group){
      return  this.cart.items[itemIndex].options.filter(opt => {
          return opt.group.id == group.id
      }).length > 0 ? true : false
    },
    priceWithOptions(itemIndex) {
      let price = this.cart.items[itemIndex].price 
      if (typeof(this.cart.items[itemIndex]) == "string") {
        this.cart.items[itemIndex] = JSON.parse(this.cart.items[itemIndex]) 
      }
      this.cart.items[itemIndex].options.forEach(option => {
        price += option.priceIncrement
      });
      return price
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async addNewAddress() {
      await this.dbAction('post', `api/customer/address/add`, this.orderinfo)
        .then(async reply => {
          await this.$auth.fetchUser()
        }).catch(err => console.log('fail'))
    },
    async deleteAddress(id) {
      await this.dbAction('get', `api/customer/address/delete/${id}`)
        .then(async reply => {
          await this.$auth.fetchUser()
          this.orderinfo.addressId = null
        }).catch(err => console.log('fail'))
    },
  },
}



</script>