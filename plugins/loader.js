import Vue from 'vue'
import RSVP from 'rsvp'

Vue.mixin({
    methods: {
        async loadForUser (user, store) {
            store.dispatch('resetAll')
            await RSVP.all([
                store.dispatch('products/loadLive'),
            ])
            if( user ){
                await RSVP.all([
                    store.dispatch('cart/load'),
                ])
            }
            if( user && user.isStaff){
                await RSVP.all([
                store.dispatch('products/load'),
                store.dispatch('orders/load'),
                store.dispatch('users/load'),
                ])
                if ( user.isAdmin ){
                    await RSVP.all([
                    store.dispatch('products/loadAll'),
                    store.dispatch('orders/loadAll'),
                    store.dispatch('roles/load'),
                    store.dispatch('roles/loadAbilities'),
                    store.dispatch('staff/load'),
                    // store.dispatch('stats/load'),
                    ])
                }
            }
        }
    }
})