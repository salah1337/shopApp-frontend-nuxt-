<template>
<div>
    <nuxt-link :to="`/products/${product.id}`" >
        <div class="text-center">
            <img style="width:200px;height:200px;" :src="`http://localhost:6969/storage/${product.thumb}`" alt="">
        </div>
        <div>
            <h3 class="text-center">
                {{product.name}}
            </h3>
        </div>
    </nuxt-link>
</div>
</template>

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