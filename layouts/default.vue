<template>
<div>
    <nuxt />
</div>
</template>

<script>
export default {
    head () {
        return this.$nuxtI18nSeo()
    },
    middleware: ['preloader']
}
</script>
