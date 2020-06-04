<template>
  <div>
      <nuxt-child/>
  </div>
</template>

<script>
export default {
    middleware: ['auth']
}
</script>

<style>

</style>