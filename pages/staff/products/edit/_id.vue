<template>
<div>
<div v-if="product">
      <v-btn @click="updateProduct(product.id)">
          Update
      </v-btn>
      <div>
        <label for="name">
            <strong>name:</strong><br/>
        </label>
        <input type="text" v-model="product.name">
      </div>
      <br>
      <div>
        <label for="price">
            <strong>price:</strong><br/>
        </label>
        <input type="text" v-model="product.price">
      </div>
      <br>
      <div>
        <label for="SKU">
            <strong>SKU:</strong><br/>
        </label>
        <input type="text" v-model="product.SKU">
      </div>
      <br>
      <div>
        <label for="stock">
            <strong>stock:</strong><br/>
        </label>
        <input type="text" v-model="product.stock">
      </div>
      <br>
      <div>
        <label for="shortDesc">
            <strong>shortDesc:</strong><br/>
        </label>
        <input type="text" v-model="product.shortDesc">
      </div>
      <br>
      <div>
        <label for="longDesc">
            <strong>longDesc:</strong><br/>
        </label>
        <input type="text" v-model="product.longDesc">
      </div>
      <br>
      <div>
        <label for="live">
            <strong>live:</strong><br/>
        </label>
        <input type="text" v-model="product.live">
      </div>
      <br>
      <div>
        <label for="location">
            <strong>location:</strong><br/>
        </label>
        <input type="text" v-model="product.location">
      </div>
      <br>
      <div>
        <label for="weight">
            <strong>weight:</strong><br/>
        </label>
        <input type="text" v-model="product.weight">
      </div>
      <br>
</div>
</div>
</template>

<script>

export default {
    data(){
        return{
            // tryna load product info into inputs
            product: {
                'name': '',
                'SKU': '',
                'price': '',
                'weight': '',
                'cartDesc': '',
                'shortDesc': '',
                'longDesc': '',
                'thumb': '',
                'image': '',
                'location': '',
                'stock': '',
                'live': '',
                'unlimited': '',
                'product_category_id': '',
            },
            errors: {}
        }
    },
  computed: {
    //   async loadProduct(){
    //     let res = await this.$store.dispatch('products/getOne', this.$route.params.id)
    //     .catch(err => console.log(err))
    //     let prod = res.data.product
    //     this.product = prod
    //   },
      async loadProduct() {
        let res = await this.dbAction('get', `api/product/show/${this.$route.params.id}`, null, null, true)
        .catch(err => console.log(err))
        res = JSON.parse(res)
        if ( !res.success ) {
            console.log(res.message)
            return
        }
        this.product = res.data.product
    },
  },
  methods: {
    async updateProduct(id) {
        await this.dbAction('post', `api/product/update/${id}`, this.product, 'orders/get')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
  },
}
</script>