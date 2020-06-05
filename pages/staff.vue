<template>
  <div>
      <nuxt-child/>
  </div>
</template>

<script>
export default {
    middleware: ['auth', 'staff']
}
</script>

<style>

</style>