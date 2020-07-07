<template>
  <div>
       <div @click="show = !show" class="item">
            <p class="main">{{product.name}}</p>
            <div class="others">
                <p class="line">{{product.price}}</p>
                <p class="line">{{product.stock}}</p>
                <p v-if="product.live" class="line status status-success">Live</p>
                <p v-else class="line status status-primary">Unlisted</p>
            </div>
        </div>
     <div v-if="show" class="productinfopanel gridcenter pip-container">
        <div v-if="show" @click="show = !show" class="product-info-panel-bg"></div>
        <div class="panel panel_info product-info-panel">
            <div @click="show = !show" class="product-panel-close">X</div>
            <div class="pip-stock">
                <div class="pip-title">Stock</div>
                <div class="pip-content">
                    <div class="pip-row">
                        <div class="pip-title">
                            Current Stock
                        </div>
                        <div class="pip-value">
                            154
                        </div>
                    </div>
                    <div class="pip-row">
                        <div class="pip-title">
                            Shipped
                        </div>
                        <div class="pip-value">
                            32
                        </div>
                    </div>
                    <div class="pip-row">
                        <div class="pip-title">
                            Ordered
                        </div>
                        <div class="pip-value">
                            14
                        </div>
                    </div>
                    <div class="pip-row">
                        <div class="pip-title">
                            Total sales
                        </div>
                        <div class="pip-value">
                            3124$
                        </div>
                    </div>
                </div>
            </div>
            <div class="pip-details">
                <div class="pip-title">Details</div>
               <div class="pip-content">
                    <div>
                        <div class="pip-detail">
                            <label for="">category</label>
                            <p>{{product.category.name}}</p>
                        </div>
                        <div class="pip-detail">
                            <label for="">name</label>
                            <p>{{product.name}}</p>
                        </div>
                        <div class="pip-detail">
                            <label for="">price</label>
                            <p>{{product.price}}</p>
                        </div>
                        <div class="pip-detail">
                            <label for="">weight</label>
                            <p>{{product.weight}}</p>
                        </div>
                        <div class="pip-detail description">
                            <label for="">Cart Description</label>
                            <p>{{product.cartDesc}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="pip-detail description">
                            <label for="">Short Description</label>
                            <p>{{product.shortDesc}}</p>
                        </div>
                        <div class="pip-detail description">
                            <label for="">Long Description</label>
                            <p>{{product.longDesc}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pip-options">
                <div class="pip-title">Options</div>
                <div class="pip-content">
                    <div class="pip-header">
                        <div class="pip-main">
                            <p>Name</p>
                        </div>
                        <div class="pip-others">
                            <div class="pip-row">
                                <p>group</p>
                            </div>
                            <div class="pip-row">
                                <p>ammount ordered</p>
                            </div>
                            <div class="pip-row">
                                <p>price increment</p>
                            </div>
                        </div>
                    </div>
                    <div class="pip-items">
                        <div v-for="option in product.options" :key="option.id" class="pip-item">
                        <div class="pip-main">
                            <p>{{option.name}}</p>
                        </div>
                        <div class="pip-others">
                            <div class="pip-row">
                                <p>{{option.group.name}}</p>
                            </div>
                            <div class="pip-row">
                                <p>3</p>
                            </div>
                            <div class="pip-row">
                                <p>3 $</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pip-btns">
                <div class="gridcenter pip-btn pip-edit">Edit</div>
                <div class="gridcenter pip-btn pip-delete">Delete</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductInfoPanel from './ProductInfoPanel'
export default {
    props: [
        'product'
    ],
    components: {
        ProductInfoPanel
    },
    data(){
        return{
            show: false
        }
    }
}
</script>

<style lang="scss">

// .product-info-panel-bg{
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     background: rgba(0, 0, 0, 0.2);
// }
.productinfopanel{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .product-panel-close{
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: calc(1vw + 1rem);
        color: var(--primaryActive);
        cursor: pointer;
        font-weight: 700;
    }
    .product-info-panel-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }
   .product-info-panel{
        z-index: 999;
        max-height: 95vh;
        max-width: 95vw;
        overflow-y: scroll;
        display: grid;
        position: relative;
    .pip-stock, .pip-details, .pip-options, .pip-btns{
        margin: 15px 0;
        width: 100%;
    }
    .pip-stock, .pip-details, .pip-options{
        display: grid;
        grid-row-gap: 10px;
        .pip-title{
            font-size: calc(0.9rem + 0.9vw);
        }
    }
    .pip-stock{
        .pip-content{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 10px;
            max-width: 500px;
            width: 80%;
            margin: 0 auto;
            .pip-row{
                display: grid;
                grid-template-rows: 1fr 1fr;
                .pip-title{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
                .pip-value{
                    font-size: calc(0.8rem + 0.8vw);
                }
            }
        }
    }
    .pip-details{
        .pip-content{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 50px;
            grid-row-gap: 20px;
            &>div{
                display: grid;
                grid-row-gap: 20px;
            }
            .pip-detail{
                display: flex;
                justify-content: space-between;
                max-width: 280px;
                label{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
            }
            .pip-description{
                flex-direction: column;
            }
        }
    }
    .pip-options{
        .pip-content{
            .pip-header, .pip-item{
                display: grid;
                grid-template-columns: .5fr 1fr;
                .pip-others{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-column-gap: 5px;
                }
            }
            .pip-header{
                font-size: calc(0.7rem + 0.7vw);
                color: var(--grayTxt);
            }
        }
    }
    .pip-btns{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .pip-btn{
            height: 50px;
            width: 150px;
            margin: 2% 0;
            color: white;
            border-radius: 2px;
            cursor: pointer;
        }
        .pip-edit{
            background: var(--primary);
            box-shadow: 0px 2px 0px var(--primaryDark);
            &:hover{
                background: var(--primaryHover);
            }
            &:active{
                background: var(--primaryActive);
                transform: translateY(2px);
                box-shadow: 0px 1px 0px var(--primaryDark);
            }
        }
        .pip-delete{
            background: var(--danger);
            box-shadow: 0px 2px 0px var(--dangerDark);
            &:hover{
                background: var(--dangerHover);
            }
            &:active{
                background: var(--dangerActive);
                transform: translateY(2px);
                box-shadow: 0px 1px 0px var(--dangerDark);
            }
        }
    }
}
@media (max-width: 700px) {
    .pip-details{
        .pip-content{
            grid-template-columns: 1fr !important;
        }
    }
    .pip-options{
        .pip-content{
            .pip-header, .pip-item{
                grid-template-columns: .1fr 1fr;
            }
        }
    }
    .pip-btns{
        flex-direction: unset !important;
        .pip-btn{
            margin: 0 2% !important;
        }
    }
}
}
</style>