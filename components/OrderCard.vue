<template>
<div>
    {{order.shipName}} {{order.id}} || 
    <span @click="cancel(order.id)"> [cancel] </span>
    <span v-if="!order.shipped" @click="markShipped(order.id)"> [markShipped] </span>
    <nuxt-link :to="`/staff/orders/${order.id}`"> [more] </nuxt-link>
    <ol>
        <hr>
        <li v-for="detail in order.details" :key="detail.id">
            {{detail.name}} || {{detail.SKU}}
        </li>
        <br/>
        <br/>
    </ol>
</div>
</template>

<script>
export default {
    props: {
        order: {
            required: true
        },
    },
    methods: {
        cancel(id) {
            this.dbAction('get', `api/order/cancel/${id}`, null, 'orders/load')
        },
        markShipped(id) {
            this.dbAction('get', `api/order/ship/${id}`, null, 'orders/load')
        }
    }
}
</script>