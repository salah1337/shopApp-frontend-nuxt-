<template>
    <div class="container">
        <div class="searchBar">
            <h3 class="title">Find Anything You need!</h3>
            <input v-model="searchField" placeholder="search products by name..." @change="filterSearch()" type="text" class="input search">
        </div>
        <div @click="clearFilters()">
            <p class="clearFilters">X Clear Filters</p>
        </div>
        <div class="categories">
            <div @click="selectCategory(category.name)" 
            v-bind:class='(selectedCategory == category.name ? "selected" : "")'
            v-for="category in products.categories" :key="category.id" class="categoryCard">
                 <div>
                    <font-awesome-icon :icon="category.icon"/>
                </div>
                <div>
                    <p>{{category.name}}</p>
                </div>
            </div>
        </div>
        <div class="list">
            <div v-for="product in products.products" :key="product.id" class="productCard" v-if="filterSearch(searchField, product.name) && filterCategory(product.category.name)">
                <div class="info">
                    <div class="thumbnail">
                        <img :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                    </div>
                    <div class="name" v-html="highlight(searchField, product.name)">
                        {{product.name}}
                    </div>
                </div>
                <div class="btns">
                    <nuxt-link :to="`/products/${product.id}`" class="view">
                        View
                    </nuxt-link>
                    <div class="addCart gridcenter">
                        <font-awesome-icon icon="heart"/>
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
                <img :src="`${apiUrl}/storage/pages/productlist.png`" alt="">
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
                <div v-for="(product, index) in products.products" v-if="product.featured" :key="product.id" class="card">
                    <div class="card-image">
                        <img :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                    </div>
                    <div class="card-title">
                        <p>{{product.name}}</p>
                    </div>
                    <p class="card-description">
                        {{product.cartDesc}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.clearFilters{
    cursor: pointer;
    margin: 10px;
    &:hover{
        font-weight: 700;
    }
}
.searchBar{
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
        width: 80px;
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
                max-width: 120px;
            }
            .thumbnail{
                width: 120px;
                height: 100%;
                margin: 4px;
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
            .removeCart{
                border: 1px var(--primary) solid;
                transition: 200ms ease-in-out;
                background-color: var(--primary);
                justify-self: end;
                width: 50%;
                height: 100%;
                border-radius: 4px;
                color: white;
                &:hover{
                    background-color: unset;
                    color: var(--primary);
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
            listProducts: null,
            apiUrl: process.env.apiUrl
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
        filterCategory(category){
            if (this.selectedCategory != '') {
                return this.selectedCategory == category ? true : false
            }else{
                return true
            }
        },
        async addQueryItem(){
          this.searchField = this.$route.query.s
          this.selectedCategory = this.$route.query.c ? this.$route.query.c : '' 
        },
        selectCategory(name){
            this.selectedCategory = name
        },
        clearFilters(){
            this.selectedCategory = ''
            this.searchField = ''
        }
    },
}
</script>