<template>
  <div>
      <strong>username:</strong> {{ this.$auth.user.username }} <br/>
      <strong>firstName:</strong> {{ this.$auth.user.firstName }} <br/>
      <strong>lastName:</strong> {{ this.$auth.user.lastName }} <br/>
      <strong>email:</strong> {{ this.$auth.user.email }} <br/>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>