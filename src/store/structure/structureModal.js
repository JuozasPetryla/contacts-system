const state = {
    structureModalOpen: false,
    structureModalMode: '',
    structureModalFormMode: '',
}

const mutations = {
    setStructureModalOpen: state => state.structureModalOpen = true,
    setStructureModalClosed: state => state.structureModalOpen = false,
    setStructureModalMode: (state, structureModalMode) => state.structureModalMode = structureModalMode,
    setStructureModalFormMode: (state, structureModalFormMode) => state.structureModalFormMode = structureModalFormMode,
}

const getters = {
    structureModalOpen: state => state.structureModalOpen,
    structureModalMode: state => state.structureModalMode,
    structureModalFormMode: state => state.structureModalFormMode,
}

const actions = {
    openStructureModal({ commit }) {
        commit('setStructureModalOpen')
    },
    closeStructureModal({ commit }) {
        commit('setStructureModalClosed')
        commit('setDepartmentEditInfo', {})
        commit('setDivisionEditInfo', {})
        commit('setGroupEditInfo', {})
    },
    getStructureModalMode({ commit }, structureModalMode) {
        commit('setStructureModalMode', structureModalMode)
    },
    getStructureModalFormMode({ commit }, structureModalFormMode) {
        commit('setStructureModalFormMode', structureModalFormMode)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}