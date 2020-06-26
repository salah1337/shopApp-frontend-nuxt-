<template>
<div class="container">

    <div class="image">
        <img style="width:200px;height:200px;" :src="`http://localhost:6969/storage/${product.thumb}`" alt="">
    </div>
    <div class="info">
        <div class="title">
            <nuxt-link :to="`/products/${product.id}`" >
                <h1>
                    {{product.name}}
                </h1>
            </nuxt-link>
        </div>
        <div class="btns">
            <v-btn v-if="!cartHas(product.id)" @click="cartedit('add', product.id)">
                <v-icon>add_shopping_cart</v-icon>
            </v-btn>
            <v-btn v-if="cartHas(product.id)" @click="cartedit('removeitem', product.id)">
                <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            <nuxt-link :to="`/user/order?i=${product.id}`">
                <v-btn>
                    Buy Now
                </v-btn>
            </nuxt-link>
        </div>
    </div>

</div>
</template>

<style lang="scss" scoped>
.container{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 15px;
    background: rgb(235, 235, 235);
    border-radius: 5px;
    .info{
        display: grid;
        grid-template-rows: 1.5fr 1fr;
        .btns{
            justify-self: end;
            align-self: end;
        }
    }
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        product: {
            required: true
        },
    },
    computed: {
        ...mapState({
        cart: state => state.cart.cart,
        }),
    },
    methods: {
        // cartHas(id){
        //     var found = false;
        //     for(var i = 0; i < this.cart.items.length; i++) {
        //         if (this.cart.items[i].product_id == id) {
        //             found = true;
        //         }
        //     }
        //     return found;
        // }
    }
}
</script>