export const state = () => ({
    cart: [],
})

export const getters = {
    cart: state => {
        return state.cart
    },
}

export const mutations = {
    SET_CART(state, cart) {
        state.cart = cart
    },
    reset(state) {
        state.cart = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/customer/cart').catch(err => {
            console.log(err)
        })
        let cart = res.data.data.cart;
        commit('SET_CART', cart)
    },
    async edit({ commit, dispatch }, {action, id, options}){
        let res = await this.$axios.post(`api/customer/cart/${action}/${id}`, {options: JSON.stringify(options)}).catch(err => {
            console.log(err.response)
        })
        if (res.data.success) {
            let cart = res.data.data.cart;
            commit('SET_CART', cart)
            return [res.data.success, res.data.data.message];
        }
    },
    async clear({ commit }){
        let res = await this.$axios.post(`api/customer/cart/clear`).catch(err => {
            console.log(err)
        })
        if (res.data.success) {
            commit('reset')
        }
        return [res.data.success, res.data.data.message];
    },
}
