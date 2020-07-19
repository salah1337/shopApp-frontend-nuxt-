<template>
  <div id="wrapper">
        <div class="sidebar-menu">
            <div @click="showSideMenu = !showSideMenu" class="trigger gridcenter"><span>=</span></div>
            <div v-if="showSideMenu" @click="showSideMenu = !showSideMenu" class="sidebar-menu-bg"></div>
            <div v-if="showSideMenu" class="menu">
                <div @click="showSideMenu = !showSideMenu" class="sidebar-menu-close-btn">X</div>
                <div class="user gridcenter">
                    <div class="image">
                        <img src="/img.jpg" alt="">
                    </div>
                    <div class="username">
                        username
                    </div>
                </div>
                <div class="btns">
                    <div class="btn gridcenter">Overview</div>
                    <div @click="show('products')" class="btn gridcenter">Products</div>
                    <div @click="show('orders')" class="btn gridcenter">Orders</div>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <div class="user gridcenter">
                <div class="image">
                    <img src="/img.jpg" alt="">
                </div>
                <div class="username">
                    username
                </div>
            </div>
            <div class="btns">
                <div :class="{'btn-active':showOverview }" class="btn gridcenter">Overview</div>
                <div @click="show('staff')" :class="{'btn-active':showStaff }" class="btn gridcenter">Staff</div>
                <div @click="show('products')" :class="{'btn-active':showProducts || showProductCategories || showProductOptions }" class="btn gridcenter">Products</div>
                <div class="sub-btns" v-if="showProducts || showProductCategories || showProductOptions">
                    <div @click="show('products')" :class="{'sub-btn-active': showProducts}" class="sub-btn gridcenter">Products</div>
                    <div @click="show('product-categories')" :class="{'sub-btn-active': showProductCategories}" class="sub-btn gridcenter">Categories</div>
                    <div @click="show('product-options')" :class="{'sub-btn-active': showProductOptions}" class="sub-btn gridcenter">Options</div>
                </div>
                <div @click="show('orders')" :class="{'btn-active':showOrders }" class="btn gridcenter">Orders</div>
                <div @click="show('roles')" :class="{'btn-active':showRoles }" class="btn gridcenter">Roles</div>
            </div>
        </div>
        <ProductsTab v-if="showProducts" />
        <OrdersTab v-if="showOrders" />
        <RolesTab v-if="showRoles" />
        <StaffTab v-if="showStaff" />
        <ProductCategoriesTab v-if="showProductCategories" />
        <ProductOptionsTab v-if="showProductOptions" />
    </div>
</template>

<script>
import ProductsTab from '../../components/StaffProductsTab'
import OrdersTab from '../../components/StaffOrdersTab'
import RolesTab from '../../components/AdminRolesTab'
import StaffTab from '../../components/AdminStaffTab'
import ProductCategoriesTab from '../../components/AdminProductCategoriesTab'
import ProductOptionsTab from '../../components/AdminProductOptionsTab'
import { mapState } from 'vuex'

export default {
  components:{
        OrdersTab,
        ProductsTab,
        RolesTab,
        StaffTab,
        ProductOptionsTab,
        ProductCategoriesTab
    },
   data(){
     return{
        role: {
          label: '',
          name: ''
        },
        ability: '',
        user:'',
        roleToAssign: '',
        showProducts: true,
        showOrders: false,
        showSideMenu: false,
        showProductForm: false,
        showRoles: false,
        showStaff: false,
        showProductCategories: false,
        showProductOptions: false,
     }
   },
   methods: {
     async createRole(){
       await this.dbAction('post', `api/admin/roles/add`, this.role, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async deleteRole(id){
       await this.dbAction('get', `api/admin/roles/delete/${id}`, null, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async grantAbility(role){
       let ability = this.ability
       await this.dbAction('post', `api/admin/roles/allow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async removeAbility(role, ability){
       await this.dbAction('post', `api/admin/roles/unallow`, {role, ability}, 'roles/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async assignRole(username, role){
        await this.dbAction('post', `api/admin/staff/assign`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     async revokeRole(username, role){
        await this.dbAction('post', `api/admin/staff/revoke`, {username, role}, 'staff/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
     },
     show(tab) {
            this.showProducts 
            = this.showOrders 
            = this.showRoles 
            = this.showStaff 
            = this.showSideMenu 
            = this.showProductCategories
            = this.showProductOptions
            = false;
            switch (tab) {
                case 'products':
                    this.showProducts = true
                    break;
                case 'orders':
                    this.showOrders = true
                    break;
                case 'roles':
                    this.showRoles = true
                    break;
                case 'staff':
                    this.showStaff = true
                    break;
                case 'product-options':
                    this.showProductOptions = true
                    break;
                case 'product-categories':
                    this.showProductCategories = true
                    break;
            
                default:
                    break;
            }
        }
   },
 computed: {
   ...mapState({
      roles: state => state.roles.roles,
      abilities: state => state.roles.abilities,
      staff: state => state.staff.staff,
      products: state => state.products.allProducts,
      orders: state => state.orders.allOrders,
    }),

 }
}
</script>

<style lang="scss" scoped>
#wrapper{
    display: flex;
    grid-template-columns: 0.4fr 1fr;
    height: 100vh;
    width: 100vw;
}
img{
    max-width: 70px;
    max-height: 70px;
}

.sidebar, .menu{
    width: 40%;
    max-width: 300px;
    background-color: var(--dark);
    display: grid;
    grid-template-rows: 0.3fr 1fr;
    .user{
        .image{
            border-radius: 100px;
            overflow: hidden;
        }
        .username{
            color: var(--grayTxt);
            text-align: center;
        }
    }
    .btns{
        align-self: center;
        display: grid;
        grid-row-gap: 10px;
        padding: 0 5px;
        .btn{
            height: 45px;
            border: 0.2px solid var(--main);
            color: var(--main);
            font-weight: 650;
            transition: 100ms ease-in-out;
            &:hover{
                box-shadow: inset 0px 0px 4px var(--main);
                border: 1px solid var(--main);
            }
            &:active{
                box-shadow: inset 0px 0px 12px var(--main);
                border: 1px solid var(--main);
            }
        }
        .btn-active{
            box-shadow: inset 0px 0px 12px var(--main);
            border: 1px solid var(--main);
        }
    }
    .sub-btns{
        display: grid;
        grid-row-gap: 5px;
        cursor: pointer;
        .sub-btn{
            color: var(--main);
            &:hover{
                text-shadow: 1px 0px 4px var(--main);
            }
        }
        .sub-btn-active{
            text-shadow: 1px 0px 4px var(--main);
        }
    }
}
.content{
    width: 100%;
    padding: 30px;
    display: grid;
    max-height: 100vh;
    overflow: overlay;
    overflow-y: scroll;
    .header{
        display: grid;
        grid-template-columns: 1fr 0.7fr;
        column-gap: 15px;
        height: 150px;
        margin-bottom: 8%;
        .stats{
            .panel{
                height: 100%;
                .panel-content{
                    padding-bottom: 0px;
                    .stat-rows{
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
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
    }
    .list{
        .panel{
            height: 100%;
            .panel-header{
                grid-column: auto / span 2;
            }
            .panel-search{
                input{
                    width: 90%;
                }
            }
            .list-items{
                max-height: 50vh;
            }
        }
    }
}
.sidebar-menu{
    display: none;
    height: 0;
    position: relative;
    .sidebar-menu-close-btn{
        position: absolute;
        top: 15px;
        right: 20px;
        color: white;
        font-weight: 600;
    }
    .sidebar-menu-bg{
        height: 100vh;
        width: 100vw;
        position: absolute;
        z-index: 997;
        background: rgba(0, 0, 0, 0.3);
    }
    .trigger{
        display: none;
        position: fixed;
        width: 30px;
        height: 30px;
        border-radius: 2px;
        top: 5%;
        left: 0;
        background-color: var(--main);
    }
    .menu{
        // display: none;
        // max-width: unset;
        z-index: 998;
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
}
@media (max-width: 700px) {
    #wrapper{
        // grid-template-columns: unset;
        display: flex;
        .content{
            margin: 0 auto;
        }
    }
    .sidebar{
        display: none;
    }
    .sidebar-menu{
        display: grid;
        .trigger{
            display: grid;
        }
    }
}
</style>