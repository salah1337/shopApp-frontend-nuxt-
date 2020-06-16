<template>
<div>
<Order :id="$route.params.id" />
</div>
</template>

<script>
import Order from '../../../components/Order'
export default {
  components: {
    Order
  },
}
</script>