<template>
<div>
<div>
     Detail Name:----{{ detail.name }}
</div>
</div>
</template>

<script>

export default {
    props: {
        detail: {
            required: true
        },
        scope: {
            required: false
        }
    },
    data(){
        return {
            product: ''
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load(){
            let data = await this.loadOne('product', this.detail.product_id, this.scope)
            this.product = data.product
        }
    }
}
</script>