import pb from '../plugins/pocketBaseAPI'

const state = {
    officeDeleteInfo: {},
    officeEditInfo: {},
    officeModalMode: '',
    officeModalOpen: false,
}
const mutations = {
    setOfficeDeleteInfo: (state, info) => state.officeDeleteInfo = info,
    setOfficeEditInfo: (state, info) => state.officeEditInfo = info,
    setOfficeModalOpen: state => state.officeModalOpen = true,
    setOfficeModalClosed: state => state.officeModalOpen = false,
    setOfficeModalMode: (state, officeModalMode) => state.officeModalMode = officeModalMode,

}
const getters = {
    officeDeleteInfo: state => state.officeDeleteInfo,
    officeEditInfo: state => state.officeEditInfo,
    officeModalOpen: state => state.officeModalOpen,
    officeModalMode: state => state.officeModalMode,
}
const actions = {
    openOfficeModal({ commit }) {
        commit('setOfficeModalOpen')
    },
    closeOfficeModal({ commit }) {
        commit('setOfficeModalClosed')
    },

    getOfficeModalMode({ commit }, officeModalMode) {
        commit('setOfficeModalMode', officeModalMode)
    },

    getOfficeDeleteInfo({ commit }, info) {
        commit('setOfficeDeleteInfo', info)
    },
    getOfficeEditInfo({ commit }, info) {
        commit('setOfficeEditInfo', info)
    },
    async createOffice({ commit, dispatch }, { officeCreateObj, company_id }) {
        try {
            const office = await pb.collection('offices').create(officeCreateObj)

            const officeCompaniesObj = {
                company_id,
                office_id: office.id
            }
            const officesCompanies = await pb.collection('companies_offices').create(officeCompaniesObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setOfficeModalClosed')
            dispatch('getOffices', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setOfficeModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editOffice({ commit, dispatch }, { officeEditObj, company_id }) {
        try {
            const office = await pb.collection('offices').update(officeEditObj.id, officeEditObj)
            const officeCompaniesObj = {
                company_id,
                office_id: officeEditObj.id
            }
            const officesCompanies = await pb.collection('companies_offices').getFirstListItem(
                `office_id="${office.id}"`
            )
            const officesCompaniesEdit = await pb.collection('companies_offices').update(`${officesCompanies.id}`, officeCompaniesObj)

            commit('setInfoModalMode', 'success', { root: true })
            commit('setOfficeModalClosed')
            dispatch('getOffices', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setOfficeModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteOffice({ commit, dispatch }, officeDeleteInfo) {
        try {
            const office = await pb.collection('offices').delete(officeDeleteInfo)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setOfficeModalClosed')
            dispatch('getOffices', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setOfficeModalClosed')
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





