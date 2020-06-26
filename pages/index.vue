<template>
<div class="container">

      <div class="hero">
            <div class="hero-text">
                The best products, <br> <strong>at your finger tips!</strong>
            </div>
            <div class="hero-cta">
                <input type="text" placeholder="Search products..." class="input search">
            </div>
            <div class="hero-illustration">
                <img :src="`http://localhost:6969/storage/pages/landingImg.png`" alt="">
            </div>
        </div>
        <div class="preview">
            <div class="preview-header">
                <p class="preview-title">
                    Categories
                </p>
                <p class="preview-btn">
                    See All
                </p>
            </div>
            <div class="preview-content categories">
                <div v-for="category in products.categories" :key="category.id" class="categoryCard">
                    <v-icon>{{category.icon}}</v-icon>
                    <p>{{category.name}}</p>
                </div>
            </div>
        </div>
        <div class="preview">
            <div class="preview-header">
                <p class="preview-title">
                    Featured Products
                </p>
                <p class="preview-btn">
                    See All
                </p>
            </div>
            <div class="preview-content products">
                <div v-for="(product, index) in products.products" :key="product.id" class="featuredProductCard">
                    <nuxt-link :to="`/products/${product.id}`">
                        <div class="image">
                            <img :src="`http://localhost:6969/storage/noimage.jpg`" alt="">
                        </div>
                        <div class="name">
                            <p>{{product.name}}</p>
                        </div>
                    </nuxt-link>
                </div>
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
     'featuredProducts': ''
    }
  },
  async fetch({store}) {
    await store.dispatch('products/loadLive');
  },
  computed: {
    ...mapState({
      products: state => state.products.liveProducts,
    })
  },
  mounted(){
    this.getProds()
  },
  methods: {
    getProds(){
      this.featuredProducts = Object.values(this.products.products).slice(0, 4);
    }
  }
}
</script>
<style lang="scss" scoped>
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
        img{
            width: 100%;
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