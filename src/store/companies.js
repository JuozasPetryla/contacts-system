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
    async getCompanies({ commit, state, dispatch }) {
        try {
            // let companyList
            // if (state.companyFilterId) {
            //     const companies = await pb.collection('companies').getList(1, 5, {
            //     })
            //     companyList = companies.items
            //     const companiesAndOffices = await pb.collection('companies_offices').getList(1, 5, {
            //         filter: `company_id="${state.companyFilterId}"`,
            //         expand: `office_id`
            //     })
            //     commit('setCompanies', companies.items)
            //     const officesFiltered = companiesAndOffices.items.map(office => office.expand.office_id)
            //     dispatch('getOffices', officesFiltered, { root: true })
            // } else {
            const companies = await pb.collection('companies').getList(1, 5, {
            })
            // dispatch('getOffices', null)
            commit('setCompanies', companies.items)
            commit('setTotalCompanies', companies.totalItems)
            // }
        } catch (err) {
            console.log(err)
        }
    },
    getCompanyFilterId({ commit, dispatch }, companyFilterId) {
        commit('setCompanyFilterId', companyFilterId)
        if (companyFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getCompanies')

        }
        else {
            commit('setFilter', { filter: `company_id="${companyFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
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