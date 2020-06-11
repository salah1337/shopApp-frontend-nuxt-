<template>
<div>
<div v-if="product">
      <v-btn @click="updateProduct()">
          Update
      </v-btn>
      <div>
        <label for="name">
            <strong>name:</strong><br/>
        </label>
        <input type="text" :value="product.name">
      </div>
      <br>
      <div>
        <label for="price">
            <strong>price:</strong><br/>
        </label>
        <input type="text" :value="product.price">
      </div>
      <br>
      <div>
        <label for="SKU">
            <strong>SKU:</strong><br/>
        </label>
        <input type="text" :value="product.SKU">
      </div>
      <br>
      <div>
        <label for="stock">
            <strong>stock:</strong><br/>
        </label>
        <input type="text" :value="product.stock">
      </div>
      <br>
      <div>
        <label for="shortDesc">
            <strong>shortDesc:</strong><br/>
        </label>
        <input type="text" :value="product.shortDesc">
      </div>
      <br>
      <div>
        <label for="longDesc">
            <strong>longDesc:</strong><br/>
        </label>
        <input type="text" :value="product.longDesc">
      </div>
      <br>
      <div>
        <label for="live">
            <strong>live:</strong><br/>
        </label>
        <input type="text" :value="product.live">
      </div>
      <br>
      <div>
        <label for="location">
            <strong>location:</strong><br/>
        </label>
        <input type="text" :value="product.location">
      </div>
      <br>
      <div>
        <label for="weight">
            <strong>weight:</strong><br/>
        </label>
        <input type="text" :value="product.weight">
      </div>
      <br>
</div>
</div>
</template>

<script>

export default {
    data(){
        return{
            errors: {}
        }
    },
  async asyncData({ store, params}){
    let res = await store.dispatch('products/getOne', params.id)
    let prod = res.data
    if ( res.success ) return prod 
  },
  methods: {
      async updateProduct() {
      this.$store.dispatch('products/update', this.product)
        .then(res => {
              this.notify(res)
        }, err => {
            if (err.status == 422){
              this.notify([false, err.data.message])
              this.errors = err.data.errors
            }
            else{
              this.notify([false, "Something went wrong :O, contact us"])
            }
        })
    },
  },
}
</script>