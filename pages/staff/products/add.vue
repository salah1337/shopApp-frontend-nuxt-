<template>
<div>
<div>
      <v-btn @click="createProduct()">
          Create
      </v-btn>
      <div>
        <label for="name">
            <strong>name:</strong><br/>
        </label>
        <input v-model="product.name" type="text">
        <strong v-if="errors.name" >{{errors.name}}</strong>
      </div>
      <br>
      <div>
        <label for="price">
            <strong>price:</strong><br/>
        </label>
        <input v-model="product.price" type="text">
        <strong v-if="errors.price" >{{errors.price}}</strong>
      </div>
      <br>
      <div>
        <label for="SKU">
            <strong>SKU:</strong><br/>
        </label>
        <input v-model="product.SKU" type="text">
        <strong v-if="errors.SKU" >{{errors.SKU}}</strong>
      </div>
      <br>
      <div>
        <label for="stock">
            <strong>stock:</strong><br/>
        </label>
        <input v-model="product.stock" type="text">
        <strong v-if="errors.stock" >{{errors.stock}}</strong>
      </div>
      <br>
      <div>
        <label for="shortDesc">
            <strong>shortDesc:</strong><br/>
        </label>
        <input v-model="product.shortDesc" type="text">
        <strong v-if="errors.shortDesc" >{{errors.shortDesc}}</strong>
      </div>
      <br>
      <div>
        <label for="longDesc">
            <strong>longDesc:</strong><br/>
        </label>
        <input v-model="product.longDesc" type="text">
        <strong v-if="errors.longDesc" >{{errors.longDesc}}</strong>
      </div>
      <div>
        <label for="cartDesc">
            <strong>cartDesc:</strong><br/>
        </label>
        <input v-model="product.cartDesc" type="text">
        <strong v-if="errors.cartDesc" >{{errors.cartDesc}}</strong>
      </div>
      <br>
      <div>
        <label for="live">
            <strong>live:</strong><br/>
        </label>
        <input v-model="product.live" type="text">
        <strong v-if="errors.live" >{{errors.live}}</strong>
      </div>
      <br>
      <div>
        <label for="location">
            <strong>location:</strong><br/>
        </label>
        <input v-model="product.location" type="text">
        <strong v-if="errors.location" >{{errors.location}}</strong>
      </div>
      <br>
      <div>
        <label for="weight">
            <strong>weight:</strong><br/>
        </label>
        <input v-model="product.weight" type="text">
        <strong v-if="errors.weight" >{{errors.weight}}</strong>
      </div>
      <div>
        <label for="product_category_id">
            <strong>product_category_id:</strong><br/>
        </label>
        <input v-model="product.product_category_id" type="text">
        <strong v-if="errors.product_category_id" >{{errors.product_category_id}}</strong>
      </div>
      <div>
        <label for="unlimited">
            <strong>unlimited:</strong><br/>
        </label>
        <input v-model="product.unlimited" type="text">
        <strong v-if="errors.unlimited" >{{errors.unlimited}}</strong>
      </div>
      <div>
        <label for="image">
            <strong>image:</strong><br/>
        </label>
        <input v-model="product.image" type="text">
        <strong v-if="errors.image" >{{errors.image}}</strong>
      </div>
      <div>
        <label for="thumb">
            <strong>thumb:</strong><br/>
        </label>
        <input v-model="product.thumb" type="text">
        <strong v-if="errors.thumb" >{{errors.thumb}}</strong>
      </div>
      <br>
</div>
</div>
</template>

<script>

export default {
    data(){
        return{
            product: {
                'name': 'name',
                'SKU': 'SSS',
                'price': '123',
                'weight': '123',
                'cartDesc': 'cartDesc',
                'shortDesc': 'shortDesc',
                'longDesc': 'longDesc',
                'thumb': 'thumb',
                'image': 'image',
                'location': 'location',
                'stock': '123',
                'live': '0',
                'unlimited': '1',
                'product_category_id': '1',
            },
            errors: {}
        }
    },
  methods: {
    async createProduct() {
        await this.dbAction('post', `api/product/add`, this.product, 'orders/get')
        .then(reply => console.log('success')).catch(err => console.log('fail'))
    },
  },
}
</script>