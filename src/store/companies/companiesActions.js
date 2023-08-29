const state = {
    companyDeleteInfo: {},
    companyEditInfo: {},
}
const mutations = {
    setCompanyDeleteInfo: (state, info) => state.companyDeleteInfo = info,
    setCompanyEditInfo: (state, info) => state.companyEditInfo = info
}
const getters = {
    companyDeleteInfo: state => state.companyDeleteInfo,
    companyEditInfo: state => state.companyEditInfo,
}
const actions = {
    getCompanyDeleteInfo({ commit }, info) {
        commit('setCompanyDeleteInfo', info)
    },
    getCompanyEditInfo({ commit }, info) {
        commit('setCompanyEditInfo', info)
    },
    async createCompany({ commit, dispatch }, companyCreateObj) {
        const company = await this.postItem('companies', companyCreateObj)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        }
        else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async editCompany({ commit, dispatch }, companyEditObj) {
        const company = await this.editItem('companies', companyEditObj.id, companyEditObj)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteCompany({ commit, dispatch }, companyId) {
        const companiesOffices = await this.getFullList('companies_offices', {
            filter: `company_id="${companyId}"`,
            expand: 'office_id'
        })
        const companyEmployees = await this.getFullList('employees', {
            filter: `company_id="${companyId}"`
        })

        if (companyEmployees.length !== 0) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', 'Kompanija turi priskirtų darbuotojų', { root: true })
            dispatch('openInfoModal', { root: true })
            return
        }

        if (companiesOffices.length !== 0) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', 'Kompanija turi priskirtų ofisų', { root: true })
            dispatch('openInfoModal', { root: true })
            return
        }

        const company = await this.deleteItem('companies', companyId)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            dispatch('openInfoModal', { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}