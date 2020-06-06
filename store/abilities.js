export const state = () => ({
    abilities: [],
})

export const getters = {
    allabilities: state => {
        return state.abilities
    },
}

export const mutations = {
    SET_ABILITIES(state, abilities) {
        state.abilities = abilities
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/admin/abilities')
        let abilities = res.data.data;
        commit('SET_ABILITIES', abilities)
    }
}
