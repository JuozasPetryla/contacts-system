import pb from '../../plugins/pocketBaseAPI'

const state = {
    contactModalOpen: false,
    contactModalMode: '',
    deleteInfo: {},
    editInfo: {},
}
const mutations = {
    setContactModalOpen: state => state.contactModalOpen = true,
    setContactModalClosed: state => state.contactModalOpen = false,
    setContactModalMode: (state, contactModalMode) => state.contactModalMode = contactModalMode,
    setDeleteInfo: (state, info) => state.deleteInfo = info,
    setEditInfo: (state, info) => state.editInfo = info
}
const getters = {
    contactModalOpen: state => state.contactModalOpen,
    contactModalMode: state => state.contactModalMode,
    deleteInfo: state => state.deleteInfo,
    editInfo: state => state.editInfo,
}
const actions = {
    openContactModal({ commit }) {
        commit('setContactModalOpen')
    },
    closeContactModal({ commit, dispatch }) {
        dispatch('getFile', {})
        commit('setContactModalClosed')
        commit('setImageDropClosed')
        dispatch('getFilter', '')
        dispatch('getContacts')
    },
    getContactModalMode({ commit }, contactModalMode) {
        commit('setContactModalMode', contactModalMode)
    },
    getDeleteInfo({ commit }, info) {
        commit('setDeleteInfo', info)
    },
    getEditInfo({ commit }, info) {
        commit('setEditInfo', info)
    },
    async createContact({ commit, dispatch, rootState }, contactCreateObj) {
        const formData = new FormData()
        if (rootState.drop.imageSelected) {
            formData.append('photo', rootState.drop.file)
        } else {
            formData.append('photo', '')
        }
        for (const [key, value] of Object.entries(contactCreateObj)) {
            formData.append(`${key}`, value)
        }
        const contact = await this.postItem('employees', formData)
        if (contact.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})
        }
        else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
            commit('setContactModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editContact({ commit, dispatch, rootState }, contactEditObj) {

        const formData = new FormData()

        if (rootState.drop.imageSelected) {
            formData.append('photo', rootState.drop.file)
        } else {
            formData.append('photo', '')
        }
        for (const [key, value] of Object.entries(contactEditObj)) {
            formData.append(`${key}`, value)
        }
        const contact = await this.editItem('employees', contactEditObj.id, formData)
        if (contact.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
            commit('setContactModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteContact({ commit, dispatch }, contactId) {
        const contact = await this.deleteItem('employees', contactId)
        if (contact.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
            commit('setContactModalClosed')
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