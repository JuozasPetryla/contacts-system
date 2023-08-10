import pb from '../plugins/pocketBaseAPI'

const state = {
    divisions: [],

}
const mutations = {
    setDivisions: (state, divisions) => state.divisions = divisions,

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
    getDivisionFilterId({ commit, dispatch }, divisionFilterId) {

        if (divisionFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getRelations',
                {
                    filterId: null,
                    filterMutation: 'setDepartments',
                    relationReq: 'divisions_departments',
                    expandProp: 'department_id',
                    filterProp: null
                },
                { root: true })
        }

        else {
            commit('setFilter', { filter: `division_id="${divisionFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getRelations',
                {
                    filterId: divisionFilterId,
                    filterMutation: 'setDepartments',
                    relationReq: 'divisions_departments',
                    expandProp: 'department_id',
                    filterProp: 'division_id'
                },
                { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}