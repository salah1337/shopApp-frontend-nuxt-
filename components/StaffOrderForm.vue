<template>
  <div>
    <div v-if="show" @click="show = !show" class="bg"></div>
    <div @click="show = !show" class="action">
      <span>Place Order</span> <span class="sign">+</span>
    </div>
    <div v-if="show" id="stafforderform" class="container ²">
      <div v-if="show" @click="show = !show" class="order-form-bg"></div>

      <div v-if="showProductList" class="addProductsList">
        <div class="list">
          <div class="staff-products-tab-panel panel panel_list">
            <div @click="showProductList = !showProductList" class="panel-close">X</div>
            <div class="panel-header">
              <div class="panel-title">Products List</div>
              <div class="panel-description">Click the cards to see more information</div>
            </div>
            <div class="panel-search">
              <input type="text" class="input input-form input-form2">
            </div>
            <div class="panel-list">
              <div class="list-head">
                <div class="main">
                  <p>name</p>
                </div>
                <div class="others">
                  <p>price</p>
                  <p>stock</p>
                  <p>status</p>
                </div>
              </div>
              <div class="list-items">
                <div v-for="product in products.products" :key="product.id" class="item">
                  <p class="main">{{product.name}}</p>
                  <div class="others">
                    <p class="line">{{product.price}}</p>
                    <p class="line">{{product.stock}}</p>
                    <div class="line addproductlist-btns">
                      <div v-if="!productInDetails(product.id)" @click="addToDetails(product)"
                        class="status status-success">Add</div>
                      <div class="status status-primary">
                        <OrderFormProductPanel :product="product" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="addProductsList-bg" v-if="showProductList" @click="showProductList = !showProductList"></div>

      <div class="mainpanel panel panel_content panel_submit">
        <div class="panel-header">
          <div class="panel-title">Place Order</div>
        </div>
        <div class="panel-content">
          <div class="order-items">
            <div class="header">
              <p>Order info</p>
              <div class="actions">
                <div @click="showProductList = !showProductList" class="action">
                  <span>Add product</span> <span class="sign">+</span>

                </div>
              </div>
            </div>
            <div class="items">
              <div v-for="(item, index) in orderinfo.details" class="order-item" :key="item.id">
                <div class="top">
                  <div class="gridcenter cartItem-thumbnail">
                    <img :src="`${apiUrl}/storage/${item.image}`" alt="">
                  </div>
                  <div class="cartItem-info">
                    <p>{{item.name}}</p>
                    <p>
                      {{item.price}}$ 
                      <span v-if="item.options.length > 0" class="increment">({{priceWithOptions(index)}}$)</span>
                    </p>
                  </div>
                  <div class="cartItem-count">
                    <p v-if="item.quantity > 1" @click="item.quantity--" class="btn">-</p>
                    <p class="count">{{item.quantity}}</p>
                    <p @click="item.quantity++" class="btn">+</p>
                  </div>
                  <!-- <div class="btns"> -->
                  <div class="cartItem-select">
                    <OrderFormProductPanel :product="item.product" />
                  </div>
                  <div @click="removeFromDetails(item)" class="cartItem-delete">
                    <font-awesome-icon class="remove" icon="trash" />
                  </div>
                  <!-- </div> -->
                </div>
                <div class="bottom">
                  <div class="options">
                    <h5 class="options-title">Options</h5>
                    <div class="options-list">
                      <div 
                      v-if="groupHasSelectedOptions(index, group)" 
                      v-for="group in allProducts.optionGroups" 
                      :key="group.id">
                      <div class="groupName">{{group.name}}</div>
                      <div 
                      class="option"
                      v-for="opt in item.options"  
                      v-if="opt.group_id == group.id"
                      :key="opt.id">
                          {{opt.name}} 
                          <span class="increment">(+{{opt.increment}}$)</span> 
                          <font-awesome-icon class="remove" @click="unselectOption(index, opt.id)" icon="times" /></div>
                      </div>
                    </div>
                    <select name="" ref="optionSelect" v-model="optionSelect" @change="addOption(index)">
                        <option selected disabled value="0">Select options...</option>
                      <optgroup v-if="groupHasOptions(index, group)" :label="group.name" v-for="group in allProducts.optionGroups" :key="group.id">
                        <option 
                        v-for="option in item.product.options" 
                        v-if="option.group.id == group.id && !optionIsSelected(index, option.id)" 
                        :value="option" :key="option.id"
                        :disabled="optionActive(index, option)"
                        :title="optionActive(index, option) ? 'you can only select one option per category' : ''">
                            {{option.name}}
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>

              </div>
              <span class="error" v-if="errors.details">{{errors.details[0]}}</span>
            </div>
          </div>
          <div class="order-info">
            <div class="form">
              <div class="email">
                <label for="email">email</label>
                <input v-model="orderinfo.email" id="email" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.email">{{errors.email[0]}}</span>
              </div>
              <div class="firstName">
                <label for="firstName">firstName</label>
                <input v-model="orderinfo.firstName" id="firstName" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.shipName">{{errors.shipName[0]}}</span>
              </div>
              <div class="lastName">
                <label for="lastName">lastName</label>
                <input v-model="orderinfo.lastName" id="lastName" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.shipName">{{errors.shipName[0]}}</span>
              </div>
              <div class="country">
                <label for="country">country</label>
                <input v-model="orderinfo.country" id="country" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.country">{{errors.country[0]}}</span>
              </div>
              <div class="state">
                <label for="state">state</label>
                <input v-model="orderinfo.state" id="state" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.state">{{errors.state[0]}}</span>
              </div>
              <div class="city">
                <label for="city">city</label>
                <input v-model="orderinfo.city" id="city" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.city">{{errors.city[0]}}</span>
              </div>
              <div class="phone">
                <label for="phone">phone</label>
                <input v-model="orderinfo.phone" id="phone" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.phone">{{errors.phone[0]}}</span>
              </div>
              <div class="zip">
                <label for="zip">zip</label>
                <input v-model="orderinfo.zip" id="zip" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.zip">{{errors.zip[0]}}</span>
              </div>
              <div class="fax">
                <label for="fax">fax</label>
                <input v-model="orderinfo.fax" id="fax" type="text" class="input input-form input-form2">
                <span class="error" v-if="errors.fax">{{errors.fax[0]}}</span>
              </div>
              <div class="address">
                <label for="address">address</label>
                <textarea v-model="orderinfo.shipAddress" id="address1" class="input input-form input-form2"></textarea>
                <span class="error" v-if="errors.shipAddress">{{errors.shipAddress[0]}}</span>
              </div>
              <div class="address2">
                <label for="address2">address2</label>
                <!-- <input id="address2" type="text" class="input input-form input-form2"> -->
                <textarea v-model="orderinfo.shipAddress2" id="address2"
                  class="input input-form input-form2"></textarea>
                <span class="error" v-if="errors.shipAddress2">{{errors.shipAddress2[0]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div @click="show = !show" class="panel-close">X</div>
        <div @click="placeOrder()" class="panel-submit">Create</div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderFormProductPanel from './OrderFormProductPanel'
import { mapState } from 'vuex'

export default {
    components: {
        OrderFormProductPanel
    },
    data() {
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
            show: false,
            showProductList: false,
            optionSelect: 0,
            apiUrl: process.env.apiUrl
        }
    },
    computed: {
        ...mapState({
            products: state => state.products.liveProducts,
            allProducts: state => state.products.allProducts,
        })
    },
    methods: {
        async placeOrder() {
          this.orderinfo.amount = this.addTotal()
          console.log(this.orderinfo.amount);
            this.orderinfo.shipName = `${this.orderinfo.firstName} ${this.orderinfo.lastName}`
            await this.dbAction('post', `api/order/add`, this.orderinfo, 'orders/load')
            .then(reply => this.show = false).catch(err => console.log('fail'))
            
        },
        addToDetails(product){
            this.orderinfo.details.push({
                'name': product.name,
                'price': product.price,
                'image': product.thumb,
                'sku': product.SKU,
                'quantity': 1,
                'product_id': product.id,
                'product': product,
                'options': []
            })
            this.showProductList = false
        },
        removeFromDetails(item){
            this.orderinfo.details.splice(this.orderinfo.details.indexOf(item), 1)
        },
        productInDetails(id){
            return this.orderinfo.details.filter(detail => {
                return detail.product_id == id
            }).length > 0 ? true : false
        },
        addOption(itemIndex) {
            let option = this.optionSelect
            if (!option) {
                console.log('cunt');
                return
            }
            this.orderinfo.details[itemIndex].options.push(option)
            this.optionSelect = 0
        },
        productHasOption(itemIndex, id) {
            return this.orderinfo.details[itemIndex].options.filter(opt => {
                return opt.id == id
            }).length > 0 ? true : false
        },
        groupHasOptions(itemIndex, group){
            return  this.orderinfo.details[itemIndex].product.options.filter(opt => {
                return opt.group.id == group.id
            }).length > 0 ? true : false
        },
        groupHasSelectedOptions(itemIndex, group){
            return  this.orderinfo.details[itemIndex].options.filter(opt => {
                return opt.group_id == group.id
            }).length > 0 ? true : false
        },
        optionIsSelected(itemIndex, id){
            return this.orderinfo.details[itemIndex].options.filter(opt => {
                return opt.id == id
            }).length > 0 ? true : false
        },
        unselectOption(itemIndex, id){
            let option = this.orderinfo.details[itemIndex].options.filter(opt => {
                return opt.id == id
            })[0]
            this.orderinfo.details[itemIndex].options.splice(this.orderinfo.details[itemIndex].options.indexOf(option), 1)
        },
        optionActive(itemIndex, option){
            return this.orderinfo.details[itemIndex].options.filter(opt => {
                return opt.group_id == option.group.id
            }).length > 0 ? true : false
        },
        priceWithOptions(itemIndex) {
          let price = this.orderinfo.details[itemIndex].price 
          this.orderinfo.details[itemIndex].options.forEach(option => {
            price += option.increment
          });
          return price
        },
        addTotal() {
          let total = 0
          this.orderinfo.details.forEach(item => {
            total += this.priceWithOptions(this.orderinfo.details.indexOf(item)) * item.quantity
          })
          return Math.round(Math.ceil(total))
        },
        // priceWithOptions(itemIndex) {
        //   let price = this.orderinfo.details[itemIndex].price 
        //   if (typeof(this.orderinfo.details[itemIndex]) == "string") {
        //     this.orderinfo.details[itemIndex] = JSON.parse(this.orderinfo.details[itemIndex]) 
        //   }
        //   this.orderinfo.details[itemIndex].options.forEach(option => {
        //     price += option.priceIncrement
        //   });
        //   return price
        // }
    }
}
</script>

<style lang="scss">
#stafforderform{
    
      color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    .addproductlist-btns{
        display: grid;
        grid-row-gap: 1px;
    }
    .addProductsList{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        max-height: 95vh;
        z-index: 999;
        .panel-close{
            position: absolute;
            top: 10px;
            right: 10px;
            height: 35px;
            width: 35px;
        }
    }
    .addProductsList-bg{
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }
     .panel-submit{
      margin-bottom: 5%;
    }
      .order-form-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 996;
    }
.order-items{
    .header{
        display: flex;
        justify-content: space-between;
    }

    .items{
        display: grid;
        grid-row-gap: 5px;
        overflow-y: scroll;
        max-height: 40vh;
    }
}
.actions{
    display: grid;
   
    .action{
        align-self: flex-start;
        justify-self: end;
        height: 100%;
        width: 100%;
        max-height: 45px;
        max-width: 150px;
        background-color: var(--success);
        box-shadow: 0px 2px 0px var(--successDark);
        border-radius: 2px;
        color: white;
        font-size: calc(0.4vw + 0.8rem);
        font-weight: 450;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .sign{
            font-size: calc(0.5vw + 1rem);
            font-weight: 600;
        }
        &:hover{background-color: var(--successHover);}
        &:active{
            box-shadow: 0px 1px 0px var(--successDark) !important;
            transform: translateY(3px);
            background-color: var(--successActive);
        }
    }
}
.form{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 10px;
    input{
        width: 100%;
        height: 35px;
    }
    label{
        font-weight: 800;
        text-transform: capitalize;
    }
    label::after{
        content: ':';
    }
    .address textarea, .address2 textarea{
        height: 100%;
        width: 100%;
        resize: none;
    }
    .email{
        grid-column: auto / span 12;
    }
    .firstName, .lastName, .address, .address2{
        grid-column: auto / span 6;
    }
    .country, .state, .city, .phone, .zip, .fax, .panel-header{
        grid-column: auto / span 4;
    }
    
}

.order-item{
    background: var(--gray);
    padding: 10px;
    border-radius: 4px;
    max-width: 500px;
    min-height: 100px;
    height: fit-content;
    display: grid;
    grid-column-gap: 10px;
    position: relative;
    .cartItem-thumbnail{
      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .options{
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
    .increment{
      color: var(--primary);
      font-size: calc(0.6rem + 0.3vw);
    }
    .remove{
      color: var(--danger);
      cursor: pointer;
    }
    .top{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-column-gap: 5px;
    min-height: 100px;

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
        top: 10px;
        color: var(--primary);
   
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
}
.mainpanel{
       z-index: 997;
          // max-height: 95vh;
          max-width: 95vw;
          overflow-y: scroll;
          display: grid;
          position: relative;
    .panel-header, .panel-close{
        height: 40px;
    }
    grid-template-rows: unset !important;
    .header{
        height: 40px;
        margin: 5px;
    }
}
}
.action{
    align-self: flex-start;
    justify-self: end;
    height: 100%;
    width: 100%;
    max-height: 45px;
    max-width: 150px;
    background-color: var(--success);
    box-shadow: 0px 2px 0px var(--successDark);
    border-radius: 2px;
    color: white;
    font-size: calc(0.4vw + 0.8rem);
    font-weight: 450;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sign{
        font-size: calc(0.5vw + 1rem);
        font-weight: 600;
    }
    &:hover{background-color: var(--successHover);}
    &:active{
        box-shadow: 0px 1px 0px var(--successDark) !important;
        transform: translateY(3px);
        background-color: var(--successActive);
    }
}
.bg{
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
}
</style>