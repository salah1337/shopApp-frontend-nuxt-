<template>
<div>
    <nuxt-link :to="`/products/${product.id}`" >
        <h1>
            {{product.name}}
        </h1>
        <img style="width:200px;height:200px;" :src="`http://localhost:6969/storage/${product.thumb}`" alt="">
    </nuxt-link>
    <v-btn @click="cartedit('add', product.id)">
        add to cart
    </v-btn>
    <v-btn @click="cartedit('remove', product.id)">
        remove from cart
    </v-btn>
    <v-btn @click="cartedit('removeitem', product.id)">
        delete from cart
    </v-btn>
</div>
</template>

<script>
export default {
    props: {
        product: {
            required: true
        },
    },
}
</script>