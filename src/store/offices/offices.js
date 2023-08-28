
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
    officeFilterId: state => state.officeFilterId,
    officesForDisplay: state => state.officesForDisplay,
}
const actions = {
    async getOffices({ commit, dispatch, rootState }) {
        commit('setOffices', []);
        let offices = [];
        const officesList = await this.getFullList('companies_offices', {
            expand: 'office_id',
            filter: rootState.companies.companyFilterId ? `company_id="${rootState.companies.companyFilterId}"` : ""
        });
        for (const office of officesList) {
            offices.push(office.expand.office_id)
        }
        commit('setOffices', rootState.companies.companyFilterId ? offices : []);
        dispatch('getDivisions', state.officeFilterId)
    },
    async getOfficesForDisplay({ commit }) {
        const offices = await this.getFullList('offices')
        commit('setOfficesForDisplay', offices)
    },


    getOfficeFilterId({ commit, dispatch, rootState }, officeFilterId) {
        if (!officeFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && office_id="${state.officeFilterId}"` : `office_id="${state.officeFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
        } else if (rootState.contacts.filter && state.officeFilterId) {
            commit('resetFilter', { oldFilter: state.officeFilterId, newFilter: officeFilterId }, { root: true })
        } else if (rootState.contacts.filter && !state.officeFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && office_id="${officeFilterId}"`, { root: true })
        }
        dispatch('getContacts', { root: true })
        commit('setOfficeFilterId', officeFilterId)
        dispatch('getOffices')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}