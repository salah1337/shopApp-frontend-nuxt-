<template>
    <div class="container">
        <div class="searchBar">
            <input v-model="searchField" @change="filter()" type="text" class="input search">
        </div>
        <div class="list">
            <div v-for="product in products.products" :key="product.id" v-if="filter(product.name)" class="productCard">
                <div class="info">
                    <div class="thumbnail">
                        <img :src="`http://localhost:6969/storage/noimage.jpg`" alt="">
                    </div>
                    <div class="name" v-html="highlight(product.name)">
                        {{product.name}}
                    </div>
                </div>
                <div class="btns">
                    <nuxt-link :to="`/products/${product.id}`" class="view">
                        View
                    </nuxt-link>
                    <div v-if="!cartHas(product.id)" @click="cartedit('add', product.id)" class="addcart">
                        <font-awesome-icon icon="cart-plus"/>
                    </div>
                    <div v-if="cartHas(product.id)" @click="cartedit('removeitem', product.id)" class="addcart">
                        <font-awesome-icon icon="shopping-cart"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero">
            <div class="hero-text">
                Deals that <br> <strong>you don't want to miss!</strong>
            </div>
            <div class="hero-cta">
                <input type="text" placeholder="Search products..." class="input search">
            </div>
            <div class="hero-illustration">
                <img :src="`http://localhost:6969/storage/pages/productlist.png`" alt="">
            </div>
        </div>
        <div class="preview">
            <div class="preview-header">
                <div class="preview-title">
                    Products you may like
                </div>
                <div class="preview-btn">See More</div>
            </div>
            <div class="preview-content cardgrid">
                <div class="card">
                    <div class="card-image">
                        <img src="/img.jpg" alt="">
                    </div>
                    <div class="card-title">
                        <p>Product Name</p>
                    </div>
                    <p class="card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="/img.jpg" alt="">
                    </div>
                    <div class="card-title">
                        <p>Product Name</p>
                    </div>
                    <p class="card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="/img.jpg" alt="">
                    </div>
                    <div class="card-title">
                        <p>Product Name</p>
                    </div>
                    <p class="card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div class="card">
                    <div class="card-image">
                        <img src="/img.jpg" alt="">
                    </div>
                    <div class="card-title">
                        <p>Product Name</p>
                    </div>
                    <p class="card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.searchBar{
    height: 120px;
    display: grid;
    .input{
        justify-self: center;
        align-self: center;
        width: 70vw;
        height: 30px;
        max-width: 500px;
    }
}
.list{
    padding: 10px;
    display: grid;
    max-height: 100vh;
    overflow-y: scroll;
    overflow: overlay;
    grid-template-rows: repeat(auto-fit, 100px);
    grid-row-gap: 10px;
    .productCard{
        height: 100px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-radius: 15px;
        background-color: var(--gray);
        .title{
            text-transform: capitalize;
        }
        .info{
            height: 100%;
            display: flex;
            img{
                height: 60px;
            }
            .thumbnail{
                height: 100%;
            }
        }
        .btns{
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-row-gap: 5px;
            max-width: 80px;
            .view{
                padding: 0.5rem 1.2rem;
                border: 1px var(--main) solid;
                border-radius: 4px;
                color: var(--main);
                transition: 200ms ease-in-out;
                &:hover{
                    background-color: var(--main);
                    color: white;
                }
            }
            .addCart{
                border: 1px var(--primary) solid;
                transition: 200ms ease-in-out;
                color: var(--primary);

                justify-self: end;
                width: 50%;
                height: 100%;
                border-radius: 4px;
                &:hover{
                    background-color: var(--primary);
                    color: white;
                }
            }
        }
    }
}
.cardgrid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1FR));
}
</style>

<script>
import { mapActions, mapState } from 'vuex'
import ProductCard from '../../components/ProductCard'
import Cart from '../../components/Cart'

export default {
    components: {
        ProductCard,
        Cart
    },
    data(){
        return{
            searchField:''
        }
    },
    mounted() {
        this.addQueryItem()
    },
    computed: {
        ...mapState({
            products: state => state.products.liveProducts,
        cart: state => state.cart.cart,
        }),
    },
    methods:{
        filter(str){
            if (!this.searchField == "")  {
            let regex = RegExp(`${this.searchField}+`, 'ig')
            // console.log(`${str} / ${this.searchField}  = ` + regex.test(str));
            return regex.test(str)}
            else{
                return true
            }
        },
        highlight(str){
            if (this.searchField) {
                let regex = RegExp(`${this.searchField}+`, 'ig')
                return str.replace(regex, `<span class='highlited' style='color:var(--main)'>${this.searchField}</span>`)
            }else{
                return str
            }
        },
        async addQueryItem(){
          this.searchField = this.$route.query.s
        }
    },
}
</script>