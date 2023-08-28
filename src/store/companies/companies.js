const state = {
    companies: [],
    companyFilterId: '',
    totalCompanies: 0,
}
const mutations = {
    setCompanies: (state, companies) => state.companies = companies,
    setTotalCompanies: (state, totalCompanies) => state.totalCompanies = totalCompanies,
    setCompanyFilterId: (state, companyFilterId) => state.companyFilterId = companyFilterId,
}
const getters = {
    companies: state => state.companies,
    totalCompanies: state => state.totalCompanies,
}
const actions = {
    async getCompanies({ commit, state, dispatch }) {
        const companies = await this.getFullList('companies')
        commit('setCompanies', companies)
        dispatch('getOffices', state.companyFilterId)
        commit('setTotalCompanies', companies.length)
    },
    getCompanyFilterId({ commit, dispatch, rootState }, companyFilterId) {
        if (!companyFilterId) {
            commit('setFilter', '', { root: true })
        } else if (rootState.contacts.filter && state.companyFilterId) {
            commit('resetFilter', { oldFilter: state.companyFilterId, newFilter: companyFilterId }, { root: true })
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `company_id="${companyFilterId}"`, { root: true })
        } else if (rootState.contacts.filter && !state.companyFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && company_id="${companyFilterId}"`, { root: true })
        }

        dispatch('getContacts', { root: true })
        commit('setCompanyFilterId', companyFilterId)
        dispatch('getCompanies')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}