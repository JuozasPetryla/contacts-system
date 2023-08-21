import pb from '../plugins/pocketBaseAPI'

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
    async getCompanies({ commit, dispatch }) {
        try {
            let companyList
            if (state.companyFilterId) {
                const companies = await pb.collection('companies').getFullList({
                })
                companyList = companies
                const companiesAndOffices = await pb.collection('companies_offices').getFullList({
                    filter: `company_id="${state.companyFilterId}"`,
                    expand: `office_id`
                })
                commit('setCompanies', companies)
                const officesFiltered = companiesAndOffices.map(office => office.expand.office_id)
                dispatch('getOffices', officesFiltered, { root: true })
            } else if (!state.companyFilterId) {
                const companies = await pb.collection('companies').getFullList({
                })
                commit('setCompanies', companies)
                commit('setTotalCompanies', companies.length)
            }
        } catch (err) {
            console.log(err)
        }
    },
    getCompanyFilterId({ commit, dispatch, rootState }, companyFilterId) {
        if (!companyFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && company_id="${state.companyFilterId}"` : `company_id="${state.companyFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setCompanyFilterId', companyFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getCompanies')
        } else if (rootState.contacts.filter && state.companyFilterId) {
            commit('resetFilter', { oldFilter: state.companyFilterId, newFilter: companyFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setCompanyFilterId', companyFilterId)
            dispatch('getCompanies')
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `company_id="${companyFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setCompanyFilterId', companyFilterId)
            dispatch('getCompanies')

        } else if (rootState.contacts.filter && !state.companyFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && company_id="${companyFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setCompanyFilterId', companyFilterId)
            dispatch('getCompanies')
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}