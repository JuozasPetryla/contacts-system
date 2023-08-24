const state = {
    companyModalOpen: false,
    companyModalMode: '',
    companyDeleteInfo: {},
    companyEditInfo: {},
}
const mutations = {
    setCompanyModalOpen: state => state.companyModalOpen = true,
    setCompanyModalClosed: state => state.companyModalOpen = false,
    setCompanyModalMode: (state, companyModalMode) => state.companyModalMode = companyModalMode,
    setCompanyDeleteInfo: (state, info) => state.companyDeleteInfo = info,
    setCompanyEditInfo: (state, info) => state.companyEditInfo = info
}
const getters = {
    companyModalOpen: state => state.companyModalOpen,
    companyModalMode: state => state.companyModalMode,
    companyDeleteInfo: state => state.companyDeleteInfo,
    companyEditInfo: state => state.companyEditInfo,
}
const actions = {
    openCompanyModal({ commit }) {
        commit('setCompanyModalOpen')
    },
    closeCompanyModal({ commit }) {
        commit('setCompanyModalClosed')
        commit('setCompanyEditInfo', {})
    },
    getCompanyModalMode({ commit }, companyModalMode) {
        commit('setCompanyModalMode', companyModalMode)
    },
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
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        }
        else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setCompanyModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editCompany({ commit, dispatch }, companyEditObj) {
        const company = this.editItem('companies', companyEditObj.id, companyEditObj)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setCompanyModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteCompany({ commit, dispatch }, companyId) {
        const companiesOffices = await this.getFullList('companies_offices', {
            filter: `company_id="${companyId}"`,
            expand: 'office_id'
        })
        console.log(companiesOffices)
        companiesOffices.forEach(office => {
            dispatch('deleteOffice', office.expand.office_id.id)
        })
        const company = await this.deleteItem('companies', companyId)
        if (company.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', company.message, { root: true })
            commit('setCompanyModalClosed')
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