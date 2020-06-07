export const state = () => ({
    products: [],
    liveProducts: []
})

export const getters = {
    allProducts: state => {
        return state.products
    },
    liveProducts: state => {
        return state.liveProducts
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_LIVE_PRODUCTS(state, products) {
        state.liveProducts = products
    },
    reset(state) {
        state.products = []
        state.liveProducts = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/products')
        let products = res.data.data;
        commit('SET_PRODUCTS', products)
    },
    async loadLive({ commit }) {
        let res = await this.$axios.get('api/customer/products')
        let products = res.data.data;
        commit('SET_LIVE_PRODUCTS', products)
    }
}

