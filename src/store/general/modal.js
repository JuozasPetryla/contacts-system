const state = {
    modalOpen: false,
    modalMode: '',
    modalType: '',
}
const mutations = {
    setModalOpen: state => state.modalOpen = true,
    setModalClosed: state => state.modalOpen = false,
    setModalMode: (state, modalMode) => state.modalMode = modalMode,
    setModalType: (state, modalType) => state.modalType = modalType,
}
const getters = {
    modalOpen: state => state.modalOpen,
    modalMode: state => state.modalMode,
    modalType: state => state.modalType,

}
const actions = {
    openModal({ commit }) {
        if (state.modalMode === 'create' && state.modalType === 'user') {
            commit('setUserPermissions', {})
        }
        commit('setModalOpen')
    },
    closeModal({ commit }) {
        commit('setModalClosed')
        commit('setCompanyEditInfo', {})
        commit('setEditInfo', {})
        commit('setDivisionEditInfo', {})
        commit('setOfficeEditInfo', {})
        commit('setDepartmentEditInfo', {})
        commit('setGroupEditInfo', {})
    },
    getModalMode({ commit }, modalMode) {
        commit('setModalMode', modalMode)
    },
    getModalType({ commit }, modalType) {
        commit('setModalType', modalType)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}