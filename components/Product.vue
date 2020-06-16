<template>
<div>
<div>
      <nuxt-link :to="`/staff/products/edit/${product.id}`" >
        Edit
      </nuxt-link>
      <h1>
        {{product.name}}
      </h1>
      <h2>
       - {{product.price}}$
      </h2>
      <h2>
       - {{product.SKU}}
      </h2>
      <h2>
       - {{product.stock}}
      </h2>
      <h2>
       - {{product.shortDesc}}
      </h2>
      <h2>
       - {{product.longDesc}}
      </h2>
      <h2>
       - {{product.live}} is live ?
      </h2>
      <h2>
       - {{product.location}}
      </h2>
      <h2>
       - {{product.weight}}
      </h2>
      <img v-for="img in product.images" :key="img" style="width:200px;height:200px;" :src="`http://localhost:6969/storage/${img}`" alt="">
</div>
</div>
</template>

<script>

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