const state = {
    infoModalOpen: false,
    infoModalMode: '',
    infoModalError: '',
}

const mutations = {
    setInfoModalOpen: state => state.infoModalOpen = true,
    setInfoModalClosed: state => state.infoModalOpen = false,
    setInfoModalMode: (state, infoModalMode) => state.infoModalMode = infoModalMode,
    setInfoModalError: (state, infoModalError) => state.infoModalError = infoModalError,
}

const getters = {
    infoModalOpen: state => state.infoModalOpen,
    infoModalMode: state => state.infoModalMode,
    infoModalError: state => state.infoModalError
}

const actions = {
    openInfoModal({ commit }) {
        commit('setInfoModalOpen')
    },
    closeInfoModal({ commit }) {
        commit('setInfoModalClosed')
    },
    getInfoModalMode({ commit }, infoModalMode) {
        commit('setInfoModalMode', infoModalMode)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}