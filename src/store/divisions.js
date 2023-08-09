import pb from '../plugins/pocketBaseAPI'

const state = {
    divisions: []
}
const mutations = {
    setDivisions: (state, divisions) => state.divisions = divisions
}
const getters = {
    divisions: state => state.divisions
}
const actions = {
    async getDivisions({ commit }) {
        try {

            const divisions = await pb.collection('divisions').getList(1, 5, {
            })
            commit('setDivisions', divisions.items)
        } catch (err) {
            console.log(err)
        }
    },
    getDivisionFilterId({ commit, dispatch, rootState }, divisionFilterId) {
        if (divisionFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
        }
        else {
            commit('setFilter', { filter: `division_id="${divisionFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}