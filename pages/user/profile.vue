<template>
<div>
    <div class="container">
    <nuxt-link to="/" class="backbtn">
      back to store
    </nuxt-link>
        <div>
            <div id="dashboard">
                <div  class="content">
                    <div class="details panel panel_content">
                        <div class="panel-header">
                            <div class="panel-title">Details</div>
                        </div>
                        <div class="panel-content">
                            <div class="panel-row">
                                <div>
                                    <label for="">username</label>
                                    <div class="info">
                                        {{user.username}}
                                    </div>
                                </div>
                                <div class="editbtn">/</div>
                            </div>
                            <div class="panel-row">
                                <div>
                                    <label for="">email</label>
                                    <div class="info">
                                        {{user.email}}
                                    </div>
                                </div>
                                <div class="editbtn">/</div>
                            </div>
                            <div class="panel-row">
                                <div>
                                    <label for="">first name</label>
                                    <div class="info">
                                        {{user.firstName}}
                                    </div>
                                </div>
                                <div class="editbtn">/</div>
                            </div>
                            <div class="panel-row">
                                <div>
                                    <label for="">last name</label>
                                    <div class="info">
                                        {{user.lastName}}
                                    </div>
                                </div>
                                <div class="editbtn">/</div>
                            </div>
                        </div>
                    </div>
                    <div class="payment panel panel_content">
                        <div class="panel-header">
                            <div class="panel-title">Payment Method</div>
                        </div>
                        <div class="panel-content">
                            <img src="http://localhost:6969/storage/creditcard.png" alt="">
                        </div>
                    </div>
                    <div class="address panel panel_content">
                        <div class="panel-header">
                            <div class="panel-title">Address</div>
                        </div>
                        <div class="panel-content">
                            <div class="panel-row">
                                <div>
                                    <label for="">city</label>
                                    <div class="info">
                                        {{user.city ? user.city : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>

                            <div class="panel-row">
                                <div>
                                    <label for="">state</label>
                                    <div class="info">
                                        {{user.state ? user.state : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>
                           
                            <div class="panel-row">
                                <div>
                                    <label for="">country</label>
                                    <div class="info">
                                        {{user.country ? user.country : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>
                            
                            <div class="panel-row">
                                <div>
                                    <label for="">phone</label>
                                    <div class="info">
                                        {{user.phone ? user.phone : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>
                     
                            <div class="panel-row">
                                <div>
                                    <label for="">fax</label>
                                    <div class="info">
                                        {{user.fax ? user.fax : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>
                        
                            <div class="panel-row">
                                <div>
                                    <label for="">address</label>
                                    <div class="info">
                                        {{user.adress ? user.adress : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>
                         
                            <div class="panel-row">
                                <div>
                                    <label for="">second address</label>
                                    <div class="info">
                                        {{user.adress2 ? user.adress2 : 'unspecified'}}
                                    </div>
                                </div>
                                
                                <div class="editbtn">/</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.container{
    display: grid;
    grid-gap: 30px;
    margin-top: 5%;
    margin-bottom: 5%;

}
.orderlist{
    max-height: 85vh;
}
.content{
    display: grid;
    grid-template-areas: 
    "details address"
    "payment address"
    ;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    grid-gap: 30px;
    .details{
        grid-area: details;  
        width: 100%; 
    }
    .address{
        grid-area: address;
    }
    .payment{
        grid-area: payment;
    }
    .panel{
        grid-template-rows: unset !important;
    }
    .panel-content{
        display: grid;
        grid-row-gap: 10px;
        .panel-row{
            display: flex;
            width: 100%; 
            justify-content: space-between;
            label{
                color: var(--grayTxt);
                font-size: calc(0.5rem + 0.5vw);
            }
            .info{
                font-size: calc(0.6rem + 0.6vw);
            }
        }
    }
}

.side-panel{
    font-size: calc(0.7vw + 0.7rem);
    .user{
        display: grid;
        img{
            border-radius: 100px;
            width: 100%;
            height: auto;
        }
        .username{
            font-weight: 550;
        }
    }
}
.btns{
    .btn{
        height: 40px;
        justify-content: flex-start;
        grid-template-columns: 0.2fr 1fr;
        .txt{
            text-transform: capitalize;
            font-weight: 600;
        }
    }
}
.side-menu{
    .side-menu-toggle, .side-menu-content{
        position: fixed;
        background: var(--main);
        display: none;
    }
    .side-menu-toggle, .side-menu-close{
        cursor: pointer;
    }
    .side-menu-toggle, .side-menu-content{
        top: 0;
    }
    .side-menu-toggle{
        height: 100vh;
        width: 6vw;
        left: 0;
    }
    .side-menu-content{
        .side-menu-close{
            position: fixed;
            top: 5vh;
            right: 5vw;
            z-index: 3;
            font-size: calc(1vw + 1rem);
        }
        height: 100vh;
        width: 100vw;
        z-index: 2;
    }
}
@media (max-width: 700px){
    .side-panel{
        display: none;
    }
    .side-menu{
        .side-menu-toggle{
            display: grid;
        }
        .user{
            .image{
                img{
                    border-radius: 100px;
                    height: 150px ;
                    width: 150px ;
                }
            }
        }
    }
    .container{
        display: block;
        width: 95vw;
        .content{
            display: block;
            .panel{
                margin: 5% auto;
            }
        }
    }
}
</style>

<script>
import OrderCard from '../../components/OrderCard'
export default {
  components: {
    OrderCard
  },
    data(){
      return{
        user: this.$auth.user.info
      }
    }
}
</script>