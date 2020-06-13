export const state = () => ({
    orders: [],
    userOrders: []
})

export const getters = {
    allOrders: state => {
        return state.orders
    },
    userOrders: state => {
        return state.userOrders
    },
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
    SET_USER_ORDERS(state, orders) {
        state.userOrders = orders
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
    },
    async get({ commit }) {
        let res = await this.$axios.get('api/customer/order/all')
        let orders = res.data.data;
        commit('SET_USER_ORDERS', orders)
    },
}
