const state = {
    structureChooseModalOpen: false,
}

const mutations = {
    setStructureChooseModalOpen: state => state.structureChooseModalOpen = true,
    setStructureChooseModalClosed: state => state.structureChooseModalOpen = false,
}

const getters = {
    structureChooseModalOpen: state => state.structureChooseModalOpen,
    structureChooseModalMode: state => state.structureChooseModalMode,
}

const actions = {
    openStructureChooseModal({ commit }) {
        commit('setStructureChooseModalOpen')
    },
    closeStructureChooseModal({ commit }) {
        commit('setStructureChooseModalClosed')
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}