<template>
<div>
   <div id="productShow" v-if="product" class="container">
        <div class="categoryName">
            <a :href="`/products?c=${product.category.name}`"><p>{{product.category.name}}</p></a>
        </div>
        <div class="product">
            <div class="header">
                    <div>
                        <div class="name">{{product.name}}</div>
                        <div class="price">{{product.price}}$</div>
                    </div>
                    <div v-if="this.$auth.loggedIn" class="btns">
                        <div @click="addToCart(product.id)" class="order product-bg">
                                Add to cart
                        </div>
                        <div class="wishlist product-bg">
                            <v-icon>fa fa-heart</v-icon>
                        </div>
                    </div>
                    <div v-else>
                        you need to <nuxt-link to="/login">login</nuxt-link> or <nuxt-link to="/signup">signup</nuxt-link> before you can order.
                    </div>
            </div>
            <div class="details">
                <div class="selectedImage gridcenter product-bg">
                    <img :src="`${apiUrl}/storage/${selectedImage}`" alt="">
                </div>
                <div class="options">
                    <div class="optiongroup" v-if="getGroup(group)" v-for="group in products.optiongroups" :key="group">
                        <div>
                            {{group}} <span class="error" v-if="errors.includes(group)"> -- please select one of the {{group}} </span>
                        </div>
                        <div v-for="option in product.options" :key="option.id" v-if="option.group.name == group" @click="selectOption(option)">
                        <div v-if="selectedOptions.includes(option)" class="selectedImage option gridcenter product-bg">
                            <div>
                                {{option.name}} <span class="increment">(+${{option.priceIncrement}})</span>
                            </div>
                        </div>
                        <div v-else class="option gridcenter product-bg">
                            <div>
                                {{option.name}} <span class="increment">(+${{option.priceIncrement}})</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="images">
                <div v-for="image in product.images" class="image product-bg gridcenter">
                    <img v-if="image == selectedImage" class="selectedImage" :src="`${apiUrl}/storage/${image}`" alt="">
                    <img v-else @click="selectImage(image)" :src="`${apiUrl}/storage/${image}`" alt="">
                </div>
            </div> -->
            
            <div class="images">
                <div v-for="image in product.images">
                    <div v-if="image == selectedImage" class="selectedImage image product-bg gridcenter">
                        <img :src="`${apiUrl}/storage/${image}`" alt="">
                    </div>
                    <div v-else @click="selectImage(image)" class="image product-bg gridcenter">
                        <img :src="`${apiUrl}/storage/${image}`" alt="">
                    </div>
                </div>
            </div>
        </div>
           <div class="preview">
            <div class="preview-header">
                <p class="preview-title">
                    Featured Products
                </p>
                <nuxt-link to="/products" class="preview-btn">
                    See More
                </nuxt-link>
            </div>
            <div class="preview-content cardgrid">
                <nuxt-link :to="`/products/${product.id}`" v-for="(product, index) in products.products" v-if="product.featured" :key="product.id" class="card">
                    <!-- <nuxt-link :to="`/products/${product.id}`"> -->
                        <div class="card-image">
                            <img :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                        </div>
                        <p class="card-title">
                                {{product.name}}
                        </p>
                        <p class="card-description">
                            {{product.cartDesc}}
                        </p>
                    </nuxt-link>
                <!-- </div> -->
            </div>
        </div>
    </div>
    <div class="successPanel gridcenter" v-if="showSuccessPopup">
        <div class="successPanel-bg" @click="showSuccessPopup = false"></div>
         <div class="panel panel_content">
            <div class="panel-header">
              <div class="panel-title">Item Added To Cart</div>
            </div>
            <div class="panel-content">
              <div class="successimg gridcenter">
                <img :src="`${apiUrl}/storage/pages/success.png`" alt="">
              </div>
              <div class="order-success-btns">
                <span class="btn backbtn gridcenter" @click="showSuccessPopup = false">
                  Continue shopping
                </span>
                <nuxt-link class="btn backbtn gridcenter" to="/user/order">
                  Go to checkout
                </nuxt-link>
              </div>
            </div>
          </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return {
            product: '',
            apiUrl: process.env.apiUrl,
            selectedImage: null,
            selectedOptions: [],
            errors: [],
            showSuccessPopup: false,
            id: this.$route.params.id
        }
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart,
            products: state => state.products.liveProducts,
        }),
        async l() {
            this.id = this.$route.params.id
            await this.load()
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        await this.load()
    },
    methods: {
        async load(){
            let data = await this.loadOne('product', this.id, this.scope)
            this.product = data.product
            this.product.images = JSON.parse(this.product.image)
            this.selectedImage = this.product.images[0]
            // this.product.images = JSON.parse(data.product.image) 
        },
        getGroup(name) {
           let group = this.product.options.filter(opt => {
               return opt.group.name == name
           })
           return group.length > 0 ? true : false
        },
        selectImage(image){
            this.selectedImage = image
        },
        selectOption(option){
            this.selectedOptions = this.selectedOptions.filter(opt => {
                return opt.group.name != option.group.name
            })
            this.selectedOptions.push(option)
        },
        isSelected(option){
            return this.selectedOptions.filter(opt => {
                return opt.name == option.name
            }).length > 0 ? true : false
        },
        optionsSelected(){
            // for each option group there should be one selected option
            let pass = 0;
            let groups = this.products.optiongroups.filter(group => {
                return this.getGroup(group)
            })
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if (this.selectedOptions.filter(opt => {
                    return opt.group.name == group
                }).length > 0) { pass++ }
            }
            return pass == groups.length
        },
        validateOptions(){
            this.errors = []
            let pass = true;
            this.products.optiongroups.forEach(group => {
                if (!this.getGroup(group)) return
                pass = this.selectedOptions.filter(opt => {
                    return opt.group.name == group
                }).length > 0 ? true : false
                if (pass == false) this.errors.push(group) 
            });
            return this.errors.length > 0 ? false : true
        },
        async Order(){
            await this.cartedit('add', this.product.id, this.selectedOptions, true)
            window.location.href = `/user/order?i=${this.product.id}`
        },
        async addToCart(id) {
            // check if options chosen
            if (!this.validateOptions()) {
                console.log("kek");
                return} 
            // add item to cart
            await this.cartedit('add', this.product.id, this.selectedOptions, true)
            // open success popup
            this.showSuccessPopup = true
            this.selectedOptions = []
        }
    }
}
</script>

<style lang="scss">
.increment{
      color: var(--primary);
      font-size: calc(0.6rem + 0.3vw);
    }
.successPanel{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    height: 100vh;
    width: 100vw;

    .successPanel-bg{
        position: fixed;
        height: 100vh;
        z-index: 998;
        width: 100vw;
        background: rgba(0, 0, 0, 0.25);
    }
  .panel{
      z-index: 999;
    .panel-header{
      grid-column: auto / span 2;
    }
    height: 95%;
    width: 95%;
    max-height: 550px;
    max-width: 650px;
    margin: 0 auto;
    .panel-content{
      display: grid;
     .successimg{
       height: 100%;
        img{
            height: 300px;
            max-width: 100%;
          }
     }
      .order-success-btns{
        max-width: 100%;
        margin: 0;
        display: grid;
        grid-column-gap: 10px;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        .btn{
          padding: 0.5rem 1rem;
          background: var(--main);
          color: white;
          max-height: unset !important;
          a{
            text-decoration: none;
          }
        }
      }
    }
  }
}
.cardgrid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1FR));
    .card-title{
        text-align: center;
        a{
            color: var(--main);
            &:hover{
                font-weight: 600;
                text-decoration: none;
            }
        }
    }
   .card{
        .card-image{
            height: 100%;
            overflow: hidden;
        img{
            max-height: 100%;
        }
    }
   }
}
#productShow{
    .categoryName{
    a{
        color: var(--grayTxt);
    }
}
img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
.product-bg{
    border-radius: 8px;
    border: 1px solid var(--gray);
    background-color: var(--gray);
    &:hover{
        border-color: var(--main);
    }
    cursor: pointer;
}
.selectedImage{
    border: 1px solid var(--main);
}
@media(max-width: 700px){
    .header{
        grid-template-columns: 1fr !important;
        .btns{
          width: 100% !important;
        }
    }
}
.product{
    .header{
        display: grid;
        grid-template-columns: 1fr 1fr;
        .name{
            font-size: calc(1rem + 1vw);
        }
        .price{
            font-size: calc(0.7rem + 0.7vw);
        }
    }
    .btns{
        justify-self: end;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: fit-content;
        max-width: 220px;
        a{
            text-decoration: none;
        }
        .order{
            background-color: var(--main);
            border-radius: 4px;
            padding: 0.6rem 1.3rem;
            color: white;
            cursor: pointer;
        }
        .cart, .wishlist{
            background-color: var(--gray);
            border-radius: 4px;
            padding: 0.6rem 0.6rem;
            color: var(--main);
            cursor: pointer;
            &.invert{
                background: var(--main);
            }
        }
    }
    .details{
        margin: 5% 0;
        min-height: 50vh;
        display: grid;
        grid-template-areas: 
        "image options"
        ;
        grid-template-columns: 1fr 0.45fr;
        grid-gap: 10px;
        .options{
            .optiongroup{
                grid-area: options;
                display: grid;
                grid-template-rows: repeat(auto-fill, 35px);
                grid-row-gap: 10px;
                // max-height: 50vh;
                overflow-y: scroll;
                overflow: overlay;
            }
            .option{
                height: 35px;
            }
        }
        .selectedImage{
            overflow: hidden;
            grid-area: image;
            border-color: var(--main);
            max-height: 50vh;
            img{
                height: 100%;
            }
        }
   
    }
    .images{
        grid-area: images;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        
        grid-gap: 30px;
        .image{
            overflow: hidden;   
            height: 90px;
        }
    }
}
}
</style>