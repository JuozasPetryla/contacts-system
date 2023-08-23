import pb from '../../plugins/pocketBaseAPI'

const state = {
    offices: [],
    officesForDisplay: [],
    officeFilterId: '',

}
const mutations = {
    setOffices: (state, offices) => state.offices = offices,
    setOfficesForDisplay: (state, officesForDisplay) => state.officesForDisplay = officesForDisplay,
    setOfficeFilterId: (state, officeFilterId) => state.officeFilterId = officeFilterId,
}
const getters = {
    offices: state => state.offices,
    officesForDisplay: state => state.officesForDisplay,
}
const actions = {
    async getOffices({ commit, dispatch }, officesFiltered) {
        try {
            let divisionsList = []
            if (state.officeFilterId) {
                const officesAndDivisions = await pb.collection('offices_divisions').getFullList({
                    filter: `office_id="${state.officeFilterId}"`,
                    expand: 'division_id'
                })

                const divisionsFiltered = officesAndDivisions.map(division => division.expand.division_id)
                divisionsList.push(...divisionsFiltered)
            }
            else if (officesFiltered) {
                commit('setOffices', officesFiltered)
            } else {
                const offices = await pb.collection('offices').getFullList()
                commit('setOffices', offices)
                dispatch('getDivisions', null)

            }
            divisionsList = divisionsList.filter((divisionFirst, index, self) => self.findIndex(division => (divisionFirst.id === division.id)) === index)
            dispatch('getDivisions', divisionsList)
        } catch (err) {
            console.log(err)
        }
    },
    async getOfficesForDisplay({ commit }) {
        try {
            const offices = await pb.collection('offices').getFullList()
            commit('setOfficesForDisplay', offices)
        } catch (err) {
            console.log(err)
        }
    },

    getOfficeFilterId({ commit, dispatch, rootState }, officeFilterId) {
        if (!officeFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && office_id="${state.officeFilterId}"` : `office_id="${state.officeFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setOfficeFilterId', officeFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getCompanies')
        } else if (rootState.contacts.filter && state.officeFilterId) {
            commit('resetFilter', { oldFilter: state.officeFilterId, newFilter: officeFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setOfficeFilterId', officeFilterId)
            dispatch('getCompanies')
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `office_id="${officeFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setOfficeFilterId', officeFilterId)
            dispatch('getOffices')

        } else if (rootState.contacts.filter && !state.officeFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && office_id="${officeFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setOfficeFilterId', officeFilterId)
            dispatch('getOffices')

        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}