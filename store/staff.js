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
}

export const actions = {
    async load({ commit }) {
        let res = await this.$axios.get('api/admin/staff')
        let staff = res.data.data;
        commit('SET_STAFF', staff)
    }
}
