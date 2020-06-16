<template>
<div>
<div>
     Order Name<h1>{{ order.shipName }}</h1>
     <ul>
         <li v-for="detail in order.details" :key="detail.id">
             <OrderDetail :detail="detail"/>
         </li>
     </ul>
</div>
</div>
</template>

<script>
import OrderDetail from '../components/OrderDetail'

export default {
    components: {
        OrderDetail
    },
    props: {
        id: {
            required: true
        },
        scope: {
            required: false
        }
    },
    data(){
        return {
            order: ''
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        async load(){
            let data = await this.loadOne('order', this.id, this.scope)
            this.order = data.order
        }
    }
}
</script>