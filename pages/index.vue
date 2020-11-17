<template>
<div class="container">

      <div class="hero">
            <div class="hero-text">
                The best products, <br> <strong>at your finger tips!</strong>
            </div>
            <div class="hero-cta">
                <input v-model="searchField" type="text" placeholder="Search products..." class="input search">
                <nuxt-link :to="`/products?s=${searchField}`">
                    <div @click="search()" class="searchBtn">search</div>
                </nuxt-link>
            </div>
            <div class="hero-illustration">
                <img :src="`${apiUrl}/storage/pages/landingImg.png`" alt="">
            </div>
        </div>
        <div class="preview">
            <div class="preview-header">
                <p class="preview-title">
                    Categories
                </p>
                 <nuxt-link to="/products" class="preview-btn">
                    See All
                </nuxt-link>
            </div>
            <div class="preview-content categories">
                <nuxt-link :to="`/products?c=${category.name}`" v-for="category in products.categories" :key="category.id" class="categoryCard">
                    <div>
                        <font-awesome-icon :icon="category.icon"/>
                    </div>
                    <div>
                        <p>{{category.name}}</p>
                    </div>
                </nuxt-link>
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
                        <div class="card-image">
                        <img :src="`${apiUrl}/storage/${product.thumb}`" alt="">
                        </div>
                        <p class="card-title">
                            <!-- <nuxt-link :to="`/products/${product.id}`"> -->
                                {{product.name}}
                        </p>
                        <p class="card-description">
                            {{product.cartDesc}}
                        </p>
                </nuxt-link>
                <!-- </div> -->
            </div>
        </div>
        <div class="infoCards">
            <div class="aboutCard">
                <p class="text">
                    Why trust <strong>chopSHOP</strong>?
                </p>
                <p class="btn">
                    <button>About Us</button>
                </p>
            </div>
            <div class="card">
                <div class="card-image">
                    icon
                </div>
                <p class="card-title">
                    <strong>Title</strong>
                </p>
                <p class="card-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div class="card">
                <div class="card-image">
                    icon
                </div>
                <p class="card-title">
                    <strong>Title</strong>
                </p>
                <p class="card-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div class="card">
                <div class="card-image">
                    icon
                </div>
                <p class="card-title">
                    <strong>Title</strong>
                </p>
                <p class="card-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
        </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

import FeaturedProductCard from '../components/FeaturedProductCard'

export default {
  components: {
    FeaturedProductCard
  },
  data(){
    return{
     'featuredProducts': '',
     'searchField': '',
      apiUrl: process.env.apiUrl,
      products: ""
    }
  },
  async fetch({store}) {
    await store.dispatch('products/loadLive');
  },
  computed: {
    ...mapState({
      products: state => state.products.liveProducts,
    }),
  },
  mounted(){
    this.getProds()
  },
  methods: {
    getProds(){
      this.featuredProducts = Object.values(this.products.products).slice(0, 4);
    },
    search() {

    },
  }
}
</script>
<style lang="scss" scoped>
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
.hero-cta{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    a{
        &:hover{
            text-decoration: none;
        }
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
}
.categories{
    a{
        color: var(--grayTxt);
        &:hover{
            color: var(--main);
            text-decoration: none;
        }
    }
}
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
}
.featuredProductCard{
    display: grid;
    grid-template-rows: 1fr 0.3fr;
    min-height: 25vh;
    .image{
        background-color: var(--gray);
        border-radius: 8px;
        display: grid;
        align-items: center;
        overflow: hidden;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .name{
        display: grid;
        justify-content: center;
        align-items: center;
    }
}
.infoCards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 5% 0;
    .aboutCard{
        display: grid;
        font-size: calc(1vw + 1rem);
        .text{
            align-self: end;
        }
        .btn{
            align-self: center;
            button{
                cursor: pointer;
                font-size: calc(0.6vw + 0.6rem);
                background: var(--main);
                border-radius: 10px;
                padding: 0.8rem 1.8rem;
                border: none;
                color: white;
            }
        }
    }
    
}
@media (max-width: 700px){
  .hero{
    height: 40vh;
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