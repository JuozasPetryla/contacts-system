const state = {
    contacts: [],
    totalContacts: 1,
    filter: '',
    contact: {},
    page: 1,
    totalPages: 1,
    searchTerm: '',
    searchFilter: '',
    contactsNumber: 25,
}
const mutations = {
    setContacts: (state, contacts) => state.contacts = contacts,
    setContact: (state, contact) => state.contact = contact,
    setTotalContacts: (state, totalContacts) => state.totalContacts = totalContacts,
    setTotalPages: (state, totalPages) => state.totalPages = totalPages,
    setFilter: (state, filter) => state.filter = filter,
    setSearchFilter: (state, filter) => state.searchFilter = filter,
    resetFilter: (state, { oldFilter, newFilter }) => {
        const newString = state.filter.replace(oldFilter, newFilter)
        state.filter = newString
    },
    setNextPage: (state) => {
        if (state.page === state.totalPages) {
            state.page = state.totalPages
        } else {
            state.page++
        }
    },
    setPrevPage: (state) => {
        if (state.page === 1) {
            state.page = 1
        } else {
            state.page--
        }
    },
    setPage: (state, page) => state.page = page,
    setSearchTerm: (state, searchTerm) => state.searchTerm = searchTerm,
    setContactsNumber: (state, contactsNumber) => state.contactsNumber = contactsNumber
}
const getters = {
    contacts: state => state.contacts,
    contact: state => state.contact,
    totalContacts: state => state.totalContacts,
    getters: state => state.filter,
    page: state => state.page,
    totalPages: state => state.totalPages
}
const actions = {
    async getContacts({ commit, state }) {

        let arrayWithPhotos = []
        if (state.page * state.contactsNumber > state.totalContacts) {
            const newPage = Math.ceil(state.totalContacts / state.contactsNumber)
            commit('setPage', newPage ? newPage : 1)
        }

        const contacts = await this.getList('employees', [state.page, state.contactsNumber, { filter: state.filter }])
        for (const contact of contacts.items) {
            const photo = contact.photo
            let url
            if (photo) {
                url = await this.getFiles(contact, photo, { 'thumb': '100x100' })
            }
            contact.photo = url ? url : photo
            arrayWithPhotos.push(contact)
        }
        commit('setContacts', arrayWithPhotos)
        commit('setTotalContacts', contacts.totalItems)
        commit('setTotalPages', contacts.totalPages)

    },
    async getContact({ commit }, id) {
        const contact = await this.getListItem('employees', [`id="${id}"`])
        const photo = contact.photo
        let url
        if (photo) {
            url = await this.getFiles(contact, photo, { 'thumb': '100x100' })
        }
        contact.photo = url ? url : photo
        commit('setContact', contact)
    },
    goToNextPage({ commit }) {
        commit('setNextPage')
    },
    goToPrevPage({ commit }) {
        commit('setPrevPage')
    },
    getSearchTerm({ commit, dispatch }, searchTerm) {
        let oldFilter = ''
        if (state.filter.includes('&&') && state.filter.startsWith('(')) {
            oldFilter = `(name~"${state.searchTerm}" || surname~"${state.searchTerm}" || email~"${state.searchTerm}") && `
        } else if (state.filter.includes('&&') && !state.filter.startsWith('(')) {
            oldFilter = ` && (name~"${state.searchTerm}" || surname~"${state.searchTerm}" || email~"${state.searchTerm}")`
        } else {
            oldFilter = `(name~"${state.searchTerm}" || surname~"${state.searchTerm}" || email~"${state.searchTerm}")`
        }
        if (searchTerm === '') {

            commit('resetFilter', { oldFilter, newFilter: '' })
            dispatch('getContacts')
        } else {
            commit('setSearchTerm', searchTerm)
            const filter = state.filter.includes('&&') ? ` && (name~"${searchTerm}" || surname~"${searchTerm}" || email~"${searchTerm}")` : `(name~"${searchTerm}" || surname~"${searchTerm}" || email~"${searchTerm}")`
            commit('resetFilter', { oldFilter, newFilter: '' })

            commit('setFilter', state.filter + filter)
            commit('setSearchFilter', filter)
            dispatch('getContacts')
        }
    },
    getFilter({ commit }, filter) {
        commit('setFilter', filter)
    },
    getContactsNumber({ commit, dispatch }, number) {

        if (number === 'all') {
            commit('setContactsNumber', state.totalContacts)
            dispatch('getContacts')
        } else {
            commit('setContactsNumber', number)
            dispatch('getContacts')
        }
    }
}



export default {
    state,
    mutations,
    getters,
    actions
}