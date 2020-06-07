import RSVP from 'rsvp'

export default async function (user, store) {
    store.dispatch('resetAll')
    await RSVP.all([
        store.dispatch('products/loadLive'),
    ])
    if( user && user.isStaff){
    await RSVP.all([
      store.dispatch('orders/load'),
      store.dispatch('users/load'),
    ])
    if ( user.isAdmin ){
        await RSVP.all([
        store.dispatch('roles/load'),
        store.dispatch('staff/load'),
        // store.dispatch('stats/load'),
        ])
    }
    }
}