const state = {

    deleteInfo: {},
    editInfo: {},
}
const mutations = {
    setDeleteInfo: (state, info) => state.deleteInfo = info,
    setEditInfo: (state, info) => state.editInfo = info
}
const getters = {
    deleteInfo: state => state.deleteInfo,
    editInfo: state => state.editInfo,
}
const actions = {
    getContactModalMode({ commit }, contactModalMode) {
        commit('setContactModalMode', contactModalMode)
    },
    getDeleteInfo({ commit }, info) {
        commit('setDeleteInfo', info)
    },
    async getEditInfo({ commit }, info) {
        // const companiesAndOffices = await this.getFullList('companies_offices', {
        //     filter: `company_id="${info.company_id}"`,
        //     expand: `office_id`
        // })
        // const officesFiltered = companiesAndOffices.map(office => office.expand.office_id)
        // commit('setOffices', officesFiltered)

        // const officesAndDivisions = await this.getFullList('offices_divisions', {
        //     filter: `office_id="${info.office_id}"`,
        //     expand: 'division_id'
        // })

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
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})
        }
        else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
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
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteContact({ commit, dispatch }, contactId) {
        const contact = await this.deleteItem('employees', contactId)
        if (contact.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getContacts', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', contact.message, { root: true })
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