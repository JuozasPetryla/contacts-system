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
            commit('setModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        }
        else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editCompany({ commit, dispatch }, companyEditObj) {
        const company = await this.editItem('companies', companyEditObj.id, companyEditObj)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteCompany({ commit, dispatch }, companyId) {
        const companiesOffices = await this.getFullList('companies_offices', {
            filter: `company_id="${companyId}"`,
            expand: 'office_id'
        })
        companiesOffices.forEach(office => {
            dispatch('deleteOffice', office.expand.office_id.id)
        })
        const company = await this.deleteItem('companies', companyId)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setModalClosed')
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