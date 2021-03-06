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
    reset(state) {
        state.users = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/user').catch(err => {
            console.log(err)
        })
        let users = res.data.data;
        commit('SET_USERS', users)
    }
}
