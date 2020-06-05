<template>
  <div>
      <strong>username:</strong> {{ user.username }} <br/>
      <strong>firstName:</strong> {{ user.firstName }} <br/>
      <strong>lastName:</strong> {{ user.lastName }} <br/>
      <strong>email:</strong> {{ user.email }} <br/>
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