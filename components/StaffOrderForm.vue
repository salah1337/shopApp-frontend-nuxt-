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
                                            <div class="status status-success">Add</div>
                                            <div class="status status-primary">
                                                <OrderFormProductPanel :product="product"/>
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
                            <div class="order-item">
                                <div class="gridcenter cartItem-thumbnail">
                                    <img src="/landingImg.png" alt="">
                                </div>
                                <div class="cartItem-info">
                                    <p>Name</p>
                                    <p>13£</p>
                                </div>
                                <div class="cartItem-count">
                                    <p class="btn">-</p>
                                    <p class="count">69</p>
                                    <p class="btn">+</p>
                                </div>
                                <!-- <div class="btns"> -->
                                <div class="cartItem-select">
                                    []
                                </div>
                                <div class="cartItem-delete">
                                    x
                                </div>
                                <!-- </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="order-info">
                        <div class="form">
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
                <div @click="show = !show" class="panel-close">X</div>
                <div class="panel-submit">Create</div>
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
            showProductList: false
        }
    },
    computed: {
        ...mapState({
            products: state => state.products.liveProducts,
        })
    },
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
    position: relative;
    display: grid;
    background: var(--gray);
    padding: 10px;
    border-radius: 4px;
    max-width: 500px;
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