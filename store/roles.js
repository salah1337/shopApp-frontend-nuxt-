export const state = () => ({
    roles: [],
    abilities: []
})

export const getters = {
    allRoles: state => {
        return state.roles
    },
}

export const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_ABILITIES(state, abilities) {
        state.abilities = abilities
    },
    reset(state) {
        state.roles = []
        state.abilities = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/admin/roles').catch(err => {
            console.log(err.response)
        })
        let roles = res.data.data;
        commit('SET_ROLES', roles)
    },
    async loadAbilities({ commit }) {
        let res = await this.$axios.get('api/admin/abilities').catch(err => {
            console.log(err)
        })
        let abilities = res.data.data;
        commit('SET_ABILITIES', abilities)
    },
}
