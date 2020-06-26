<template>
<div class="container">
    
    <div class="content">
      <ul class="cartItems">
        <h3>{{cart.count}} items in cart // total: {{cart.total}} <span @click="cartclear()">X</span> </h3>
        <li class="cartItem" v-for="item in cart.items" :key="item.id">
          <div class="info">
            <span class="name">
              {{item.name}}  
            </span>
            <span class="price">
              {{item.price}}
            </span>
          </div>
          <div class="count">
            <span @click="decrement(item)" class="edit">
              -
            </span>
            <span class="count">
              {{item.count}}
            </span>
            <span @click="increment(item)" class="edit">
              +
            </span>
          </div>
          <div class="checkbox">
            <b-form-checkbox switch :value="isSelected(item)" class="checkbox" @change="select(item)">[select]</b-form-checkbox>  
          </div> 
        </li>
      <p style="color:red;" class="font-weight-light" v-if="errors.details">{{errors.details[0]}}</p>
      </ul>

      <ul class="selectedItems">
        <li class="selectedItem" v-for="item in orderinfo.details" :key="item.id">
          {{item.count}} | {{item.name}} | {{item.price}}<br/>
        </li>
      </ul>

      <div class="form">
        <h2>Order Information:</h2>
          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            description="Name used on your order.">

            <b-form-input
              id="input-1"
              v-model="orderinfo.shipName"
              placeholder="Enter name"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.shipName">{{errors.shipName[0]}}</p>
          
          </b-form-group>
          
          <b-form-group
            id="input-group-2"
            label="Adress:"
            label-for="input-2"
            description="Adresses used on your order">

            <b-form-input
              id="input-2"
              v-model="orderinfo.shipAddress"
              placeholder="Enter adress"
            ></b-form-input>

            <p style="color:red;" class="font-weight-light" v-if="errors.shipAddress">{{errors.shipAddress[0]}}</p>

            <br>
            <b-form-input
              id="input-3"
              v-model="orderinfo.shipAddress2"
              placeholder="Enter second adress adress"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.shipAddress2">{{errors.shipAddress2[0]}}</p>
          

          </b-form-group>


          <b-form-group
            id="input-group-3"
            label="City:"
            label-for="input-3">

            <b-form-input
              id="input-4"
              v-model="orderinfo.city"
              placeholder="City"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.city">{{errors.city[0]}}</p>
          </b-form-group>
         
         
          <b-form-group
            id="input-group-4"
            label="State:"
            label-for="input-4">

            <b-form-input
              id="input-5"
              v-model="orderinfo.state"
              placeholder="State"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.state">{{errors.state[0]}}</p>
          </b-form-group>
         
         
          <b-form-group
            id="input-group-5"
            label="Zip:"
            label-for="input-5">

            <b-form-input
              id="input-6"
              v-model="orderinfo.zip"
              placeholder="zip"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.zip">{{errors.zip[0]}}</p>
          </b-form-group>
         
         
          <b-form-group
            id="input-group-6"
            label="Country:"
            label-for="input-6">

            <b-form-input
              id="input-7"
              v-model="orderinfo.country"
              placeholder="Country"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.country">{{errors.country[0]}}</p>
          </b-form-group>
         
           
          <b-form-group
            id="input-group-8"
            label="Phone:"
            label-for="input-8">

            <b-form-input
              id="input-9"
              v-model="orderinfo.phone"
              placeholder="Phone"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.phone">{{errors.phone[0]}}</p>
          </b-form-group>
          
          
          <b-form-group
            id="input-group-9"
            label="Fax"
            label-for="input-9">

            <b-form-input
              id="input-10"
              v-model="orderinfo.fax"
              placeholder="Fax"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.fax">{{errors.fax[0]}}</p>
          </b-form-group>
          
          
          <b-form-group
            id="input-group-10"
            label="email"
            label-for="input-10"
            description="Your account email will be used by default if you leave this empty.">

            <b-form-input
              id="input-11"
              v-model="orderinfo.email"
              placeholder="email"
            ></b-form-input>
            
            <p style="color:red;" class="font-weight-light" v-if="errors.email">{{errors.email[0]}}</p>
          </b-form-group>
           
          
      </div>
    </div>

    
    <v-btn class="submitBtn" depressed dark @click="placeOrder()" > Order </v-btn>
</div>
</template>

<style lang="scss" scoped>

.content{
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 25px;
}

.cartItems, .selectedItems, .form{
  background: rgb(204, 204, 204);
  padding: 10px;
  border-radius: 5px;
  list-style: none;
}

.cartItem{
  display: flex;
  justify-content: space-between;
}

.submitBtn{
  width: 200px;
  height: 300px;
  margin: 10px auto;
}

@media (max-width: 750px){
  .content{
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
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
      cunt:true
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
      if (this.isSelected(item)) {
        this.orderinfo.details.splice(this.orderinfo.details.indexOf(item), 1);
        return
      }      
      this.orderinfo.details.push(JSON.parse(JSON.stringify(item)))
    },
    isSelected(item){
      if (this.orderinfo.details.find(x => x.product_id = item.product_id)) return true;
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
    async increment(item){
      await this.cartedit('add', item.product_id, true)
      if (this.isSelected(item)) {
        this.orderinfo.details.find(x => x.product_id == item.product_id).count++
      }
    },
    async decrement(item){
      await this.cartedit('remove', item.product_id, true)
      if (this.isSelected(item)) {
        this.orderinfo.details.find(x => x.product_id == item.product_id).count--
      }
    },
    

  }
}
</script>