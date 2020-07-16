<template>
<div>
   <div id="productShow" v-if="product" class="container">
        <div class="categoryName">
            <a href="#"><p>{{product.category.name}}</p></a>
        </div>
        <div class="product">
            <div class="header">
                    <div>
                        <div class="name">{{product.name}}</div>
                        <div class="price">{{product.price}}$</div>
                    </div>
                    <div class="btns">
                        <div @click="validateOptions()" v-if="!optionsSelected()" class="order product-bg">
                                order1
                        </div>
                        <div v-else @click="Order()" class="order product-bg">
                            order
                        </div>
                        <div v-if="!cartHas(product.id)" @click="cartedit('add', product.id, selectedOptions)" class="cart product-bg">
                            <v-icon>fa fa-shopping-cart</v-icon>
                        </div>
                        <div v-if="cartHas(product.id)" @click="cartedit('remove', product.id)" class="cart product-bg invert">
                            <v-icon>fa fa-shopping-cart</v-icon>
                        </div>
                        <div class="wishlist product-bg">
                            <v-icon>fa fa-heart</v-icon>
                        </div>
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
                            {{option.name}}
                        </div>
                        <div v-else class="option gridcenter product-bg">
                            {{option.name}}
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
            <div class="preview-content products">
                <div v-for="(product, index) in products.products" v-if="product.featured" :key="product.id" class="featuredProductCard">
                    <nuxt-link :to="`/products/${product.id}`">
                        <div class="image">
                            <img :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                        </div>
                        <div class="name">
                            <p>{{product.name}}</p>
                        </div>
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
    props: {
        id: {
            required: true
        },
        scope: {
            required: false
        }
    },
    data(){
        return {
            product: '',
            apiUrl: process.env.apiUrl,
            selectedImage: null,
            selectedOptions: [],
            errors: [],
        }
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart,
            products: state => state.products.liveProducts,
        }),
        async l() {
            await this.load()
        }
    },
    async mounted() {
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
            let pass = true;
            let groups = this.products.optiongroups
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if (!this.getGroup(group)) break
                pass = this.selectedOptions.filter(opt => {
                    return opt.group.name == group
                }).length > 0 ? true : false
                if (pass == false) break
            }

            console.log(pass);
            return pass
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
        },
        async Order(){
            await this.cartedit('add', this.product.id, this.selectedOptions, true)
            window.location.href = `/user/order?i=${this.product.id}`
        }
    }
}
</script>

<style lang="scss">
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