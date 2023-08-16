const state = {
    infoModalOpen: false
}

const mutations = {
    setInfoModalOpen: state => state.infoModalOpen = true,
    setInfoModalClosed: state => state.infoModalOpen = false,
}

const getters = {
    infoModalOpen: state => state.infoModalOpen
}

const actions = {
    openInfoModal({ commit }) {
        commit('setInfoModalOpen')
    },
    closeInfoModal({ commit }) {
        commit('setInfoModalClosed')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}