<template>
<div>
  
<Product :id="$route.params.id" />
 
</div>
</template>

<script>
import Product from '../../components/Product'
export default {
  components: {
    Product
  },
}
</script>

