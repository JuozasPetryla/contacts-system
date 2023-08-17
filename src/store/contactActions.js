import pb from '../plugins/pocketBaseAPI'

const state = {
    contactModalOpen: false,
    contactModalMode: ''
}
const mutations = {
    setContactModalOpen: state => state.contactModalOpen = true,
    setContactModalClosed: state => state.contactModalOpen = false,
    setContactModalMode: (state, contactModalMode) => state.contactModalMode = contactModalMode,

}
const getters = {
    contactModalOpen: state => state.contactModalOpen,
    contactModalMode: state => state.contactModalMode
}
const actions = {
    openContactModal({ commit }) {
        commit('setContactModalOpen')
    },
    closeContactModal({ commit }) {
        commit('setContactModalClosed')
    },
    getContactModalMode({ commit }, contactModalMode) {
        commit('setContactModalMode', contactModalMode)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}