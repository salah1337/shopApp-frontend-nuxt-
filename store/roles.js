export const state = () => ({
    roles: [],
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
    reset(state) {
        state.roles = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/admin/roles')
        let roles = res.data.data;
        commit('SET_ROLES', roles)
    }
}
