import pb from '../../plugins/pocketBaseAPI'

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
        try {
            const company = await pb.collection('companies').create(companyCreateObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setCompanyModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editCompany({ commit, dispatch }, companyEditObj) {
        try {
            const company = await pb.collection('companies').update(companyEditObj.id, companyEditObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setCompanyModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteCompany({ commit, dispatch }, companyId) {
        try {
            const companiesOffices = await pb.collection('companies_offices').getFullList({
                filter: `company_id="${companyId}"`,
                expand: 'office_id'
            })
            companiesOffices.forEach(office => {
                dispatch('deleteOffice', office.expand.office_id.id)
            })
            const company = await pb.collection('companies').delete(companyId)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setCompanyModalClosed')
            dispatch('getCompanies', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
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