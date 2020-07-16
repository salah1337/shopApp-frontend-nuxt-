import Vue from 'vue'
import RSVP from 'rsvp'

Vue.mixin({
    methods: {
        async load(){
            let user = this.$auth.user
            this.$store.dispatch('resetAll')
            await RSVP.all([
                this.$store.dispatch('products/loadLive'),
            ])
            if( user ){
                await RSVP.all([
                    this.$store.dispatch('cart/load'),
                    this.$store.dispatch('orders/get'),
                ])
            }
            if( user && user.isStaff){
                await RSVP.all([
                this.$store.dispatch('products/load'),
                this.$store.dispatch('orders/load'),
                this.$store.dispatch('users/load'),
                ])
                if ( user.isAdmin ){
                    await RSVP.all([
                    this.$store.dispatch('products/loadAll'),
                    this.$store.dispatch('orders/loadAll'),
                    this.$store.dispatch('roles/load'),
                    this.$store.dispatch('roles/loadAbilities'),
                    this.$store.dispatch('staff/load'),
                    // this.$store.dispatch('stats/load'),
                    ])
                }
            }
        }
    }
})