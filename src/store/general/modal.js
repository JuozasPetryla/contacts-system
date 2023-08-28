const state = {
    modalOpen: false,
    modalMode: '',
    modalType: '',
    structureModalFormMode: 'division',
}
const mutations = {
    setModalOpen: state => state.modalOpen = true,
    setModalClosed: state => state.modalOpen = false,
    setStructureModalFormMode: (state, formMode) => state.structureModalFormMode = formMode,
    setModalMode: (state, modalMode) => state.modalMode = modalMode,
    setModalType: (state, modalType) => state.modalType = modalType,
}
const getters = {
    modalOpen: state => state.modalOpen,
    modalMode: state => state.modalMode,
    modalType: state => state.modalType,
    structureModalFormMode: state => state.structureModalFormMode,
}
const actions = {
    openModal({ commit }) {
        if (state.modalMode === 'create' && state.modalType === 'user') {
            commit('setUserPermissions', {})
        }
        commit('setModalOpen')
    },
    closeModal({ commit, dispatch }) {
        commit('setModalClosed')
        commit('setEditInfo', {})
        commit('setCompanyFilterId', '')
        commit('setOfficeFilterId', '')
        commit('setDivisionFilterId', '')
        commit('setDepartmentFilterId', '')
        commit('setGroupFilterId', '')
        dispatch('getFile', {})
        commit('setImageDropClosed')
        dispatch('getFilter', '')
        dispatch('getContacts')
    },
    getModalMode({ commit }, modalMode) {
        commit('setModalMode', modalMode)
    },
    getModalType({ commit }, modalType) {
        commit('setModalType', modalType)
    },
    getStructureModalFormMode({ commit }, formMode) {
        commit('setStructureModalFormMode', formMode)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}