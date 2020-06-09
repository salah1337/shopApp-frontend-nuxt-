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
    methods: {
        message(){
            console.log('kek')
        }
    },
    middleware: ['preloader'],
}
</script>
