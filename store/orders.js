export const state = () => ({
    orders: [],
})

export const getters = {
    allOrders: state => {
        return state.orders
    },
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
    reset(state) {
        state.orders = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/order')
        let orders = res.data.data;
        commit('SET_ORDERS', orders)
    }
}
