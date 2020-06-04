<template>
  <div>
      suh {{ this.$auth.user.username }}
      <nuxt-link :to="`/user/profile`" >
        My profile
      </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>