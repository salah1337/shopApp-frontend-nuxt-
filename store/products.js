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
        let res = await this.$axios.get('api/product')
        let products = res.data.data;
        commit('SET_PRODUCTS', products)
    },
    async loadLive({ commit }) {
        let res = await this.$axios.get('api/customer/products')
        let products = res.data.data;
        commit('SET_LIVE_PRODUCTS', products)
    },
    async getOne({ commit }, id) {
        let url = 'api/customer/products/'
        if ( this.$auth.user.isStaff ){
            url = 'api/product/show/'
        }
        let res = await this.$axios.get(url + id)
        .catch(err => {
            throw {
                'status': err.response.status,
                'data': err.response.data,
            }
        })
        return res.data;
    },
}

