import pb from '../plugins/pocketBaseAPI'

const state = {
    companies: [],
}
const mutations = {
    setCompanies: (state, companies) => state.companies = companies,
}
const getters = {
    companies: state => state.companies,
}
const actions = {
    async getCompanies({ commit }) {
        try {
            const companies = await pb.collection('companies').getList(1, 5, {
            })
            commit('setCompanies', companies.items)
        } catch (err) {
            console.log(err)
        }
    },
    getCompanyFilterId({ commit, dispatch }, companyFilterId) {
        if (companyFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getCompanies', null)
            dispatch('getRelations',
                {
                    filterId: null,
                    filterMutation: 'setOffices',
                    relationReq: 'companies_offices',
                    expandProp: 'office_id',
                    filterProp: null
                },
                { root: true })
        }
        else {
            commit('setFilter', { filter: `company_id="${companyFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getCompanies', companyFilterId)
            dispatch('getRelations',
                {
                    filterId: companyFilterId,
                    filterMutation: 'setOffices',
                    relationReq: 'companies_offices',
                    expandProp: 'office_id',
                    filterProp: 'company_id'
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