<template>
    <div>
      <div v-if="show" @click="show = !show" class="bg"></div>
      <div @click="show = !show" class="action">
        <span>Featured</span> <span class="sign">+</span>
      </div>
      <div v-if="show" id="featuredproductform" class="container gridcenter">
        <div v-if="show" @click="show = !show" class="product-form-bg"></div>
        <div class="panel panel_content panel_submit">
          <div class="panel-header">
            <div class="panel-title">Featured Products</div>
          </div>
          <div @click="show = !show" class="panel-close">X</div>
          <div class="panel-content">
            <div class="searchBar gridcenter">
              <input type="text" class="input input-form input-form2" placeholder="product name...">
            </div>
            <div class="user-list">
              <div v-for="product in products" v-if="product.live" :key="product.id">
                <div v-if="product.featured" class="user-card clicked">
                  <img :src="`http://localhost:6969/storage/${product.thumb}`" alt="">
                  <h5>{{product.name}}</h5>
                  <div @click="addProduct(product)" style="margin-left:auto;cursor:pointer"
                    class="status status-primary">Remove</div>
                </div>
                <div v-else class="user-card">
                  <img :src="`http://localhost:6969/storage/${product.thumb}`" alt="">
                  <h5>{{product.name}}</h5>
                  <div @click="addProduct(product)" style="margin-left:auto;cursor:pointer"
                    class="status status-success">Add</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: [ 'products'],
  data() {
    return {
      username: '',
      product: '',
      show: false,
      errors: []
    }
  },
  methods: {
   async addProduct(product){
       await this.dbAction('get', `api/product/feature/${product.id}`, null, 'products/load')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
   }
  }
}
</script>

<style lang="scss">
#featuredproductform{
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    .panel-submit{
      margin-bottom: 5%;
    }
    .product-form-bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }
        .panel {
          min-height: 400px;
          width: 400px;
          z-index: 999;
          // max-height: 95vh;
          max-width: 95vw;
          max-height: 95vh;
          display: grid;
          position: relative;
          overflow: overlay;
          overflow-y: scroll;
          .panel-header{
              grid-column: auto / span 2;
          }
          &.panel_content {
            grid-template-rows: none;
            .panel-content, .panel-content .input-group{
                display: flex;
                flex-direction: column;
            }
            .panel-content{
                display: grid;
                grid-row-gap: 15px;
                .input-group{
                    max-width: 250px;
                    .input-description{
                        color: var(--grayTxt);
                        font-size: calc(0.65rem + 0.1vw);
                        text-transform: capitalize;
                    }
                }
            }
            // height: 100%;
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
.searchBar{
    width: 100%;
}
.user-list{
    max-height: 50vh;
    overflow-y: scroll;
    // overflow: overlay;
    display: grid;
    grid-row-gap: 5px;
    border-radius: 4px;
    .user-card{
        background: var(--gray);
        display: flex;
        align-items: center;
        padding: 10px;
        img{
            height: 35px;
            width: 35px;
            margin-right: 5px;
            border-radius: 100px;
        }
        h5{
            font-size: calc(0.7rem + 0.5vw);
        }
        &:hover{
            border: 2px solid var(--main);
            padding: 8px;
        }
        &:active{
            border: 4px solid var(--main);   
            padding: 6px;
        }
        &.clicked{
            border: 4px solid var(--main);   
            padding: 6px;
        }
    }
}
.productSelect{
    select{
        background: var(--gray);
        width: 100%;
        border-radius: 4px;
        padding: 5px;
        &:focus{
            outline: var(--main) 2px solid;
            -moz-outline-radius: 4px;
        }
    }
}
</style>