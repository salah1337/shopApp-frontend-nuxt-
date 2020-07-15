<template>
    <div class="container">
        <div class="searchBar">
            <h3 class="title">Find Anything You need!</h3>
            <input v-model="searchField" placeholder="search products by name..." @change="filterSearch()" type="text" class="input search">
        </div>
        <div class="categories">
            <div @click="selectCategory(category.name)" 
            v-bind:class='(selectedCategory == category.name ? "selected" : "")'
            v-for="category in products.categories" :key="category.id" class="categoryCard">
                <v-icon>{{category.icon}}</v-icon>
                <p>{{category.name}}</p>
            </div>
        </div>
        <div class="list">
            <div v-for="product in products.products" :key="product.id" class="productCard" v-if="filterSearch(product.name) && filterCategory(product.category.name)">
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
                <nuxt-link to="#">
                    <div @click="search()" class="searchBtn">see deals</div>
                </nuxt-link>
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
    height: 20vh;
    display: flex;
    flex-direction: column;
    .title{
        font-size: calc(1vw + 1rem);
        text-align: center;
    }
    .input{
        justify-self: center;
        align-self: center;
        width: 70vw;
        height: 30px;
        max-width: 500px;
    }
}
.categories{
    display: flex;
    margin: 10px;
    max-width: 100%;
    overflow-x: hidden;
    overflow: overlay;
    .categoryCard{
        background-color: var(--gray);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        align-items: center;
        height: 120px;
        text-align: center;
        cursor: pointer;
        margin-right: 5px;
    }
    .selected{
        border: 1px solid var(--main);
    }
}
.list{
    padding: 10px;
    display: grid;
    min-height: 50vh;
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
.searchBtn{
        background: var(--main);
        width: 100px;
        color: white;
        margin: 0 auto;
        text-align: center;
        border-radius: 3px;
        box-shadow: 0px 2.5px 0px  var(--mainDark);
        &:hover{
            background: var(--mainHover);
        }
        &:active{
            transform: translateY(1px);
            box-shadow: 0px 2px 0px  var(--mainDark);
        }
    }
@media (max-width: 700px){
  .hero{
    height: 30vh;
    grid-template-columns: 1fr;
    grid-template-areas: "text" "cta";
  }
  .hero-illustration{
    img{
      display: none;
    }
  }
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
            searchField: '',
            selectedCategory: '',
            listProducts: null
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
        filterSearch(name){
            if (!this.searchField == "")  {
                let regex = RegExp(`${this.searchField}+`, 'ig')
                // console.log(`${str} / ${this.searchField}  = ` + regex.test(str));
                return regex.test(name)}
            else{
                return true
            }
        },
        filterCategory(category){
            if (this.selectedCategory != '') {
                return this.selectedCategory == category ? true : false
            }else{
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
          this.selectedCategory = this.$route.query.c ? this.$route.query.c : '' 
        },
        selectCategory(name){
            this.selectedCategory = name
        }
    },
}
</script>