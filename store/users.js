export const state = () => ({
    users: [],
})

export const getters = {
    allUsers: state => {
        return state.users
    },
}

export const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/user')
        let users = res.data.data;
        commit('SET_USERS', users)
    }
}
