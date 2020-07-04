<template>
    <div id="products" class="content">
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
            <div class="staff-products-tab-panel panel panel_list">
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
                        <StaffProductPanel v-for="product in products.products" :key="product.id" :product="product"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductForm from './StaffProductForm'
import StaffProductPanel from './StaffProductPanel'

import { mapState } from 'vuex'

export default {
       components:{
        ProductForm,
        StaffProductPanel,
    },
      computed: {
        ...mapState({
            products: state => state.products.products,
        })
    },
}
</script>

<style lang="scss">
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
                bProduct-radius: 2px;
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
        .staff-products-tab-panel{
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
@media (max-width: 700px) {
    #wrapper{
        // grid-template-columns: unset;
        display: flex;
        .content{
            margin: 0 auto;
            overflow: unset !important;
            // overflow-y: scroll;
        }
    }
}
</style>