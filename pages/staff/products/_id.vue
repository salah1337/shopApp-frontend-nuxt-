<template>
<div>
<!-- <div v-if="product">
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
      <img v-for="img in product.image" :key="img" style="width:200px;height:200px;" :src="`http://localhost:6969/storage/${img}`" alt="">
</div> -->
<Product :id="$route.params.id" />
</div>
</template>

<script>
import Product from '../../../components/Product'
export default {
  components: {
    Product
  },
  // data(){
  //   return {
  //     product: ''
  //   }
  // },
  // asyncData({params}){
  //   return{
  //     id: params.id
  //   }
  // },
  // computed: {
  //  async load(){
  //     this.product = await this.loadProduct(this.$route.params.id)
  //   }
  // },
}
</script>