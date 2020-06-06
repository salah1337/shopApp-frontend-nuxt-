export const state = () => ({
    products: [],
})

export const getters = {
    allProducts: state => {
        return state.products
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/customer/products')
        let products = res.data.data;
        commit('SET_PRODUCTS', products)
    }
}

