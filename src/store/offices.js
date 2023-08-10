import pb from '../plugins/pocketBaseAPI'

const state = {
    offices: [],
}
const mutations = {
    setOffices: (state, offices) => state.offices = offices,

}
const getters = {
    offices: state => state.offices
}
const actions = {
    async getOffices({ commit }) {
        try {
            const offices = await pb.collection('offices').getList(1, 5)
            commit('setOffices', offices.items)
        } catch (err) {
            console.log(err)
        }
    },
    getOfficeFilterId({ commit, dispatch }, officeFilterId) {
        if (officeFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getOffices', null)
            dispatch('getRelations',
                {
                    filterId: null,
                    filterMutation: 'setDivisions',
                    relationReq: 'offices_divisions',
                    expandProp: 'division_id',
                    filterProp: null
                },
                { root: true })
        }
        else {
            commit('setFilter', { filter: `office_id="${officeFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getOffices', officeFilterId)
            dispatch('getRelations',
                {
                    filterId: officeFilterId,
                    filterMutation: 'setDivisions',
                    relationReq: 'offices_divisions',
                    expandProp: 'division_id',
                    filterProp: 'office_id'
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