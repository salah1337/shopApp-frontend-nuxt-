<template>
<div>
    <div>
        {{order.shipName}} <span v-if="scope === 'staff' && scop == 'admin'">[id: {{order.id}}]</span>
    </div>
    <div v-if="scope === 'staff' && scop == 'admin'">
        <span @click="cancel(order.id)"> [cancel] </span>
        <span v-if="!order.shipped" @click="markShipped(order.id)"> [markShipped] </span>
    </div>
    <nuxt-link :to="`/staff/orders/${order.id}`"> [more] </nuxt-link>
    <ul>
        <li v-for="detail in order.details" :key="detail.id">
            {{detail.name}} || {{detail.SKU}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        order: {
            required: true
        },
        scope:''
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