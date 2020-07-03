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
                <div class="btn gridcenter">Overview</div>
                <div @click="show('products')" class="btn gridcenter">Products</div>
                <div @click="show('orders')" class="btn gridcenter">Orders</div>
            </div>
        </div>
        <div v-if="showProducts" id="products" class="content">
            <div class="header">
                <div class="stats">
                    <div class="panel panel_content">
                        <div class="panel-header">
                            <div class="panel-title">Stats</div>
                        </div>
                        <div class="panel-content">
                            <div class="stat-rows">
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <ProductForm/>
                </div>
            </div>
            <div class="list">
                <div class="panel panel_list">
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
                                <p>fuck</p>
                            </div>
                            <div class="others">
                                <p>Y</p>
                                <p>o</p>
                                <p>u</p>
                            </div>
                        </div>
                        <div class="list-items">
                            <div class="item">
                                <p class="main">suh</p>
                                <div class="others">
                                    <p class="line">suh</p>
                                    <p class="line">suh</p>
                                    <p class="line">suh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showOrders" id="orders" class="content">
            <div class="header">
                <div class="stats">
                    <div class="panel panel_content">
                        <div class="panel-header">
                            <div class="panel-title">Stats</div>
                        </div>
                        <div class="panel-content">
                            <div class="stat-rows">
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">All</div>
                                    <div class="name">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <OrderForm/>
                </div>
            </div>
            <div class="list">
                <div class="panel panel_list">
                    <div class="panel-header">
                        <div class="panel-title">Orders List</div>
                        <div class="panel-description">Click the cards to see more information</div>
                    </div>
                    <div class="panel-search">
                        <input type="text" class="input input-form input-form2">
                    </div>
                    <div class="panel-list">
                        <div class="list-head">
                            <div class="main">
                                <p>fuck</p>
                            </div>
                            <div class="others">
                                <p>Y</p>
                                <p>o</p>
                                <p>u</p>
                            </div>
                        </div>
                        <div class="list-items">
                            <div class="item">
                                <p class="main">suh</p>
                                <div class="others">
                                    <p class="line">suh</p>
                                    <p class="line">suh</p>
                                    <p class="line">suh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductForm from '../../components/StaffProductForm'
import OrderForm from '../../components/StaffOrderForm'
export default {
    components:{
        ProductForm,
        OrderForm,
    },
    data() {
        return{
            showProducts: true,
            showOrders: false,
            showSideMenu: false,
            showProductForm: false,
        }
    },
    methods: {
        show(tab) {
            this.showProducts = this.showOrders = this.showSideMenu = false;
            switch (tab) {
                case 'products':
                    this.showProducts = true
                    break;
                case 'orders':
                    this.showOrders = true
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#wrapper{
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    height: 100vh;
    width: 100vw;
}
img{
    max-width: 70px;
    max-height: 70px;
}
.sidebar, .menu{
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
    }
}
.content{
    padding: 30px;
    display: grid;
    .header{
        display: grid;
        grid-template-columns: 1fr 0.7fr;
        column-gap: 15px;
        height: 150px;
        margin-bottom: 15px;
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