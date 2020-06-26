<template>
<div>
    <NavBar />
    <nuxt />
</div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
    components: {
        NavBar
    },
    head () {
        return this.$nuxtI18nSeo()
    },
    middleware: ['preloader'],
}
</script>