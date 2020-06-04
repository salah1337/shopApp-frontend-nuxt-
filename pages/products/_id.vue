<template>
<div>
      {{prod.name}}
</div>
</template>

<script>
export default {
  data(){
    return{
      prod:""
    }
  },
  async asyncData({ $axios, params }){
    let res = await $axios.get(`api/customer/product/${params.id}`)
    let prod = res.data
    return {
      prod
    }
  }
}
</script>