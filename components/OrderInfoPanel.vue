<template>
   <div class="container">
        <div class="panel panel_info product-info-panel">
            <div class="details">
                <div class="title">Details</div>
                <div class="content">
                    <div>
                        <div class="detail">
                            <label for="">full name</label>
                            <p>Jhon doe</p>
                        </div>
                        <div class="detail">
                            <label for="">country</label>
                            <p>US</p>
                        </div>
                        <div class="detail">
                            <label for="">state</label>
                            <p>texas</p>
                        </div>
                        <div class="detail">
                            <label for="">city</label>
                            <p>smth</p>
                        </div>
                        <div class="detail">
                            <label for="">phone</label>
                            <p>(555) 123 456</p>
                        </div>
                        <div class="detail">
                            <label for="">zip code</label>
                            <p>123 456</p>
                        </div>
                        <div class="detail">
                            <label for="">fax</label>
                            <p>123</p>
                        </div>
                    </div>
                    <div>
                        <div class="detail description">
                            <label for="">first address</label>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores perferendis vel ipsa cupiditate aperiam doloribus!</p>
                        </div>
                        <div class="detail description">
                            <label for="">second address</label>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor natus, nobis hic, dolorem officiis incidunt quam nihil.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="products">
                <div class="title">products</div>
                <div class="content">
                    <div class="header">
                        <div class="main">
                            <p>Name</p>
                        </div>
                        <div class="others">
                            <div class="row">
                                <p>unit price</p>
                            </div>
                            <div class="row">
                                <p>ammount ordered</p>
                            </div>
                            <div class="row">
                                <p>product total</p>
                            </div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="item">
                            <div class="main">
                                <p>Razer Headset</p>
                            </div>
                            <div class="others">
                                <div class="row">
                                    <p>10 $</p>
                                </div>
                                <div class="row">
                                    <p>3</p>
                                </div>
                                <div class="row">
                                    <p>30 $</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="main">
                                <p>Corsair Case</p>
                            </div>
                            <div class="others">
                                <div class="row">
                                    <p>5 $</p>
                                </div>
                                <div class="row">
                                    <p>1</p>
                                </div>
                                <div class="row">
                                    <p>5 $</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="prices">
                <div class="price subtotal">
                    <div class="title">Subtotal</div>
                    <div class="value">35 $</div>
                </div>
                <div class="price tax">
                    <div class="title">Tax</div>
                    <div class="value">1.7 $</div>
                </div>
                <div class="price total">
                    <div class="title">Total</div>
                    <div class="value">37.7 $</div>
                </div>
            </div>
            <div class="btns">
                <div class="gridcenter btn cancel">Cancel</div>
                <div class="gridcenter btn ship">Mark Shipped</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.product-info-panel{
    display: grid;
    .stock, .details, .products, .btns{
        margin: 15px 0;
        width: 100%;
    }
    .stock, .details, .products{
        display: grid;
        grid-row-gap: 10px;
        .title{
            font-size: calc(0.9rem + 0.9vw);
        }
    }
    .stock{
        .content{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 10px;
            max-width: 500px;
            width: 80%;
            margin: 0 auto;
            .row{
                display: grid;
                grid-template-rows: 1fr 1fr;
                .title{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
                .value{
                    font-size: calc(0.8rem + 0.8vw);
                }
            }
        }
    }
    .details{
        .content{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 50px;
            grid-row-gap: 20px;
            &>div{
                display: grid;
                grid-row-gap: 20px;
            }
            .detail{
                display: flex;
                justify-content: space-between;
                max-width: 300px;
                label{
                    font-size: calc(0.7rem + 0.7vw);
                    color: var(--grayTxt);
                }
            }
            .description{
                flex-direction: column;
            }
        }
    }
    .products{
        .content{
            .header, .item{
                display: grid;
                grid-template-columns: .5fr 1fr;
                .others{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-column-gap: 5px;
                }
            }
            .header{
                font-size: calc(0.7rem + 0.7vw);
                color: var(--grayTxt);
            }
        }
    }
    .btns{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .btn{
            height: 50px;
            width: 150px;
            margin: 2% 0;
            color: white;
            border-radius: 2px;
            cursor: pointer;
        }
        .ship{
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
        .cancel{
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
    .prices{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
@media (max-width: 700px) {
    .details{
        .content{
            grid-template-columns: 1fr !important;
        }
    }
    .products{
        .content{
            .header, .item{
                grid-template-columns: .1fr 1fr;
            }
        }
    }
    .btns{
        flex-direction: unset !important;
        .btn{
            margin: 0 2% !important;
        }
    }
}
</style>