<template>
  <div id="staffOrdersTab" class="content">
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
                                    <div class="name">{{orders.count}}</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">Shipped</div>
                                    <div class="name">{{shipped(1)}}</div>
                                </div>
                                <div class="stat-row">
                                    <div class="name">Not Shipped</div>
                                    <div class="name">{{shipped(0)}}</div>
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
                <div class="staff-orders-tab-panel panel panel_list">
                    <div class="panel-header">
                        <div class="panel-title">Orders List</div>
                        <div class="panel-description">Click the cards to see more information</div>
                    </div>
                    <div class="panel-search">
                        <input v-model="searchField" placeholder="search by order name..." type="text" class="input input-form input-form2">
                        <font-awesome-icon icon="times" class="clearSearch" @click="searchField = ''"/>
                    </div>
                    <div class="panel-list">
                        <div @click="refresh()" class="refresh">
                          refresh
                          <font-awesome-icon icon="sync" />
                        </div>
                        <div class="list-head">
                            <div class="main">
                                <p>orders</p>
                            </div>
                            <div class="others">
                                <p>Name</p>
                                <p>status</p>
                            </div>
                        </div>
                        <div class="list-items">
                            <div v-for="order in orders.orders" v-if="filterSearch(searchField, order.shipName)" :key="order.id" class="item">
                                <p class="main">
                                    {{order.details.length}} products, total: {{order.amount}}
                                </p>
                                <div class="others">
                                    <p v-html="highlight(searchField, order.shipName)" class="line">{{order.shipName}}</p>
                                    <p v-if="order.shipped" class="line status status-success">shipped</p>
                                    <p v-else class="line status status-primary">not shipped</p>
                                </div>
                                <div>
                                    {{timeSince(new Date(order.created_at))}} ago
                                </div>
                            <OrderPanel class="order-info-btn" :order="order"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import OrderForm from './StaffOrderForm'
import OrderPanel from './StaffOrderPanel'

import { mapState } from 'vuex'

export default {
    data() {
        return {
            searchField: ''
        }
    },
    components:{
        OrderForm,
        OrderPanel
    },
      computed: {
        ...mapState({
            orders: state => state.orders.orders,
        })
    },
    methods: {
         async refresh(){
          let loader = this.$loading.show()
          await this.$store.dispatch('orders/load')
          if (this.$auth.user.isAdmin) await this.$store.dispatch('orders/loadAll')
          loader.hide()
        },
        shipped(n){
            return this.orders.orders.filter(order => {
                return order.shipped == n
            }).length
        }
    }
}
</script>

<style lang="scss">
    .order-info-btn{
        width: 100px;
        justify-self: flex-end;
        cursor: pointer;
    }
.content{
    padding: 30px;
    display: grid;
    max-height: 100vh;
    overflow: overlay;
    overflow-y: scroll;
    .header{
        display: grid;
        grid-template-columns: 1fr 0.7fr;
        column-gap: 15px;
        margin-bottom: 5%;
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
        .staff-orders-tab-panel{
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
                height: 50vh;
                .item{
                    display: grid;
                    grid-row-gap: 5px;
                    height: fit-content;
                }
            }
        }
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
}
</style>