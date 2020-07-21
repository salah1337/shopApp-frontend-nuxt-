export const state = () => ({
    products: [],
    liveProducts: [],
    allProducts: [],
})

export const getters = {
    products: state => {
        return state.products
    },
    liveProducts: state => {
        return state.liveProducts
    },
    allProducts: state => {
        return state.allProducts
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_LIVE_PRODUCTS(state, products) {
        state.liveProducts = products
    },
    SET_ALL_PRODUCTS(state, products) {
        state.allProducts = products
    },
    reset(state) {
        state.products = []
        state.allProducts = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/product')
        .catch(err => {
            console.log(err.response)
        })
        if (res) {
            let products = res.data.data;
            commit('SET_PRODUCTS', products)
        }
    },
    async loadLive({ commit }) {
        let res = await this.$axios.get('api/customer/product/all').catch(err => {
            console.log(err.response)
        })
        if (res) {
            let products = res.data.data;
            commit('SET_LIVE_PRODUCTS', products)
        }
    },
    async loadAll({ commit }) { // loads products with trashed
        let res = await this.$axios.get('api/admin/product/all').catch(err => {
            console.log(err.response)
        })
        if (res) {
            let products = res.data.data;
            commit('SET_ALL_PRODUCTS', products)
        }
    },
}