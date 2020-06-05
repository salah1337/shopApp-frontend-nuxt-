<template>
  <div>
      suh {{ user.username }}
      <nuxt-link :to="`/user/profile`" >
        My profile
      </nuxt-link>
  </div>
</template>

<script>
export default {
  data(){
      return{
        user: this.$auth.user.info
      }
    }
}
</script>

<style>

</style>