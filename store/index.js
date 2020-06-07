export const state = () => ({
    
})

export const getters = {
    // allProduct: state => {
    //     return state.products.products
    // },
    // liveProducts: state => {
    //     return 'state.products.products'
    // }
}

export const mutations = {
  
}

export const actions = {
    async resetAll({ commit }) {
        commit('products/reset')
        commit('orders/reset')
        commit('users/reset')
        commit('roles/reset')
        commit('staff/reset')
    }
}

