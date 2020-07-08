export const state = () => ({
    staff: [],
})

export const getters = {
    allStaff: state => {
        return state.staff
    },
}

export const mutations = {
    SET_STAFF(state, staff) {
        state.staff = staff
    },
    reset(state) {
        state.staff = []
    },
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/admin/staff').catch(err => {
            console.log(err)
        })
        let staff = res.data.data;
        commit('SET_STAFF', staff)
    }
}
