<template>
<div>
   <div class="container">

        <div class="categoryName">
            <a href="#"><p>Laptops</p></a>
        </div>
       <div class="product">
           <div class="header">
                <div>
                    <div class="name">Product name</div>
                    <div class="price">1337$</div>
                </div>
                <div class="btns">
                    <div class="order bg">order</div>
                    <div class="cart bg">add</div>
                    <div class="wishlist bg">add</div>
                </div>
           </div>
           <div class="details">
               <div class="selectedImage gridcenter bg">
                <img src="/img.jpg" alt="">
               </div>
               <div class="options">
                <div v-for="option in product.options" :key="option.id" class="option gridcenter bg">
                    {{option.name}}
                </div>
               </div>
          
           </div>
           <div class="images">
            <div class="image bg gridcenter">
                 <img  src="/img.jpg" alt="">
            </div>
            <div class="image bg gridcenter">
                 <img  src="/img.jpg" alt="">
            </div>
            <div class="image bg gridcenter">
                 <img  src="/landingImg.png" alt="">
            </div>
            <div class="image bg gridcenter">
                 <img  src="/img.jpg" alt="">
            </div>
            <div class="image bg gridcenter">
                 <img  src="/landingImg.png" alt="">
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
            product: ''
        }
    },
    computed: {
        ...mapState({
        cart: state => state.cart.cart,
        }),
    },
    mounted() {
        this.load()
    },
    methods: {
        async load(){
            let data = await this.loadOne('product', this.id, this.scope)
            this.product = data.product
            this.product.images = JSON.parse(data.product.image) 
        }
    }
}
</script>

<style lang="scss">
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
.bg{
    border-radius: 8px;
    border: 1px solid var(--gray);
    background-color: var(--gray);
    &:hover{
        border-color: var(--main);
    }
    cursor: pointer;
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
        width: 70%;
        height: fit-content;
        max-width: 220px;
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
            grid-area: options;
            display: grid;
            grid-template-rows: repeat(auto-fill, 35px);
            grid-row-gap: 10px;
            max-height: 50vh;
            overflow-y: scroll;
            overflow: overlay;
            .option{
                height: 35px;
            }
        }
        .selectedImage{
            overflow: hidden;
            grid-area: image;
            border-color: var(--main);
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
</style>