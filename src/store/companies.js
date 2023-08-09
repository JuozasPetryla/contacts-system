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
    getCompanyFilterId({ commit, dispatch, rootState }, companyFilterId) {
        if (companyFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
        }
        else {
            commit('setFilter', { filter: `company_id="${companyFilterId}"` }, { root: true })
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