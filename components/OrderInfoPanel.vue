<template>
   <div class="oip-container">
        <div class="oip-panel panel_info order-info-panel">
            <div class="oip-details">
                <div class="oip-title">Details</div>
                <div class="oip-content">
                    <div>
                        <div class="oip-detail">
                            <label for="">full name</label>
                            <p>Jhon doe</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">country</label>
                            <p>US</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">state</label>
                            <p>texas</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">city</label>
                            <p>smth</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">phone</label>
                            <p>(555) 123 456</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">zip code</label>
                            <p>123 456</p>
                        </div>
                        <div class="oip-detail">
                            <label for="">fax</label>
                            <p>123</p>
                        </div>
                    </div>
                    <div>
                        <div class="oip-detail description">
                            <label for="">first address</label>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores perferendis vel ipsa cupiditate aperiam doloribus!</p>
                        </div>
                        <div class="oip-detail description">
                            <label for="">second address</label>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor natus, nobis hic, dolorem officiis incidunt quam nihil.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="oip-orders">
                <div class="oip-title">orders</div>
                <div class="oip-content">
                    <div class="oip-header">
                        <div class="oip-main">
                            <p>Name</p>
                        </div>
                        <div class="oip-others">
                            <div class="oip-row">
                                <p>unit price</p>
                            </div>
                            <div class="oip-row">
                                <p>ammount ordered</p>
                            </div>
                            <div class="oip-row">
                                <p>order total</p>
                            </div>
                        </div>
                    </div>
                    <div class="oip-items">
                        <div class="oip-item">
                            <div class="oip-main">
                                <p>Razer Headset</p>
                            </div>
                            <div class="oip-others">
                                <div class="oip-row">
                                    <p>10 $</p>
                                </div>
                                <div class="oip-row">
                                    <p>3</p>
                                </div>
                                <div class="oip-row">
                                    <p>30 $</p>
                                </div>
                            </div>
                        </div>
                        <div class="oip-item">
                            <div class="oip-main">
                                <p>Corsair Case</p>
                            </div>
                            <div class="oip-others">
                                <div class="oip-row">
                                    <p>5 $</p>
                                </div>
                                <div class="oip-row">
                                    <p>1</p>
                                </div>
                                <div class="oip-row">
                                    <p>5 $</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="oip-prices">
                <div class="oip-price subtotal">
                    <div class="oip-title">Subtotal</div>
                    <div class="oip-value">35 $</div>
                </div>
                <div class="oip-price tax">
                    <div class="oip-title">Tax</div>
                    <div class="oip-value">1.7 $</div>
                </div>
                <div class="oip-price total">
                    <div class="oip-title">Total</div>
                    <div class="oip-value">37.7 $</div>
                </div>
            </div>
            <div class="oip-btns">
                <div class="oip-gridcenter btn cancel">Cancel</div>
                <div class="oip-gridcenter btn ship">Mark Shipped</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.oip-order-info-panel{
    display: grid;
    .oip-stock, .oip-details, .oip-orders, .oip-btns{
        margin: 15px 0;
        width: 100%;
    }
    .oip-stock, .oip-details, .oip-orders{
        display: grid;
        grid-row-gap: 10px;
        .oip-title{
            font-size: calc(0.9rem + 0.9vw);
        }
    }
    .oip-stock{
        .oip-content{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 10px;
            max-width: 500px;
            width: 80%;
            margin: 0 auto;
            .oip-row{
                display: grid;
                grid-template-rows: 1fr 1fr;
                .oip-title{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
                .oip-value{
                    font-size: calc(0.8rem + 0.8vw);
                }
            }
        }
    }
    .oip-details{
        .oip-content{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 50px;
            grid-row-gap: 20px;
            &>div{
                display: grid;
                grid-row-gap: 20px;
            }
            .oip-detail{
                display: flex;
                justify-content: space-between;
                max-width: 300px;
                label{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
            }
            .oip-description{
                flex-direction: column;
            }
        }
    }
    .oip-orders{
        .oip-content{
            .oip-header, .oip-item{
                display: grid;
                grid-template-columns: .5fr 1fr;
                .oip-others{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-column-gap: 5px;
                }
            }
            .oip-header{
                font-size: calc(0.7rem + 0.7vw);
                color: var(--grayTxt);
            }
        }
    }
    .oip-btns{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .oip-btn{
            height: 50px;
            width: 150px;
            margin: 2% 0;
            color: white;
            border-radius: 2px;
            cursor: pointer;
        }
        .oip-ship{
            background: var(--success);
            box-shadow: 0px 2px 0px var(--successDark);
            &:hover{
                background: var(--successHover);
            }
            &:active{
                background: var(--successActive);
                transform: translateY(2px);
                box-shadow: 0px 1px 0px var(--successDark);
            }
        }
        .oip-cancel{
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
    .oip-prices{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
@media (max-width: 700px) {
    .oip-details{
        .oip-content{
            grid-template-columns: 1fr !important;
        }
    }
    .oip-orders{
        .oip-content{
            .oip-header, .oip-item{
                grid-template-columns: .1fr 1fr;
            }
        }
    }
    .oip-btns{
        flex-direction: unset !important;
        .oip-btn{
            margin: 0 2% !important;
        }
    }
}
</style>