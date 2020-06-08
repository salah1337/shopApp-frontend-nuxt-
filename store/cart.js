export const state = () => ({
    cart: [],
})

export const getters = {
    cartItems: state => {
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
        let res = await this.$axios.get('api/customer/cart')
        let cart = res.data.data.cart;
        commit('SET_CART', cart)
    },
    async edit({ commit }, {action, id}){
        let res = await this.$axios.post(`api/customer/cart/${action}/${id}`)
        if (res.data.success) {
            let cart = res.data.data.cart;
            commit('SET_CART', cart)
        }
        return [res.data.success, res.data.data.message];
    },
    async clear({ commit }){
        let res = await this.$axios.post(`api/customer/cart/clear`)
        if (res.data.success) {
            commit('reset')
        }
        return [res.data.success, res.data.data.message];
    },
}
