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
        try {
            const formData = new FormData()
            if (rootState.drop.imageSelected) {
                formData.append('photo', rootState.drop.file)
            } else {
                formData.append('photo', '')
            }

            for (const [key, value] of Object.entries(contactCreateObj)) {
                formData.append(`${key}`, value)
            }


            const contact = await pb.collection('employees').create(formData)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})
            console.log(contact)
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setContactModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editContact({ commit, dispatch, rootState }, contactEditObj) {
        try {
            const formData = new FormData()

            if (rootState.drop.imageSelected) {
                formData.append('photo', rootState.drop.file)
            } else {
                formData.append('photo', '')
            }


            for (const [key, value] of Object.entries(contactEditObj)) {
                formData.append(`${key}`, value)
            }

            const contact = await pb.collection('employees').update(contactEditObj.id, formData)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setContactModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteContact({ commit, dispatch }, contactId) {
        try {
            const contact = await pb.collection('employees').delete(contactId)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setContactModalClosed')
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
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