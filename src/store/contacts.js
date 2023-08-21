import pb from '../plugins/pocketBaseAPI'

const state = {
    contacts: [],
    totalContacts: 0,
    filter: '',
    contact: {},
    page: 1,
    totalPages: 0,
    searchTerm: ''
}
const mutations = {
    setContacts: (state, contacts) => state.contacts = contacts,
    setContact: (state, contact) => state.contact = contact,
    setTotalContacts: (state, totalContacts) => state.totalContacts = totalContacts,
    setTotalPages: (state, totalPages) => state.totalPages = totalPages,
    setFilter: (state, filter) => state.filter = filter,
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
    setSearchTerm: (state, searchTerm) => state.searchTerm = searchTerm
}
const getters = {
    contacts: state => state.contacts,
    contact: state => state.contact,
    totalContacts: state => state.totalContacts,
    getters: state => state.filter,
    page: state => state.page
}
const actions = {
    async getContacts({ commit, state }) {
        try {
            const contacts = await pb.collection('employees').getList(state.page, 5, {
                filter: state.filter
            })
            commit('setContacts', contacts.items)
            commit('setTotalContacts', contacts.totalItems)

            commit('setTotalPages', contacts.totalPages)

        } catch (err) {
            console.log(err)
        }
    },
    async getContact({ commit }, id) {
        try {
            const contact = await pb.collection('employees').getFirstListItem(`id="${id}"`)
            commit('setContact', contact)
        } catch (err) {
            console.log(err)
        }
    },
    goToNextPage({ commit }) {
        commit('setNextPage')
    },
    goToPrevPage({ commit }) {
        commit('setPrevPage')
    },
    getSearchTerm({ commit, dispatch }, searchTerm) {
        if (searchTerm === '') {
            const oldFilter = state.filter.includes('&&') ? ` && (name~"${state.searchTerm}" || surname~"${state.searchTerm}" || email~"${state.searchTerm}")` : `(name~"${state.searchTerm}" || surname~"${state.searchTerm}" || email~"${state.searchTerm}")`
            commit('resetFilter', { oldFilter, newFilter: '' })
            dispatch('getContacts')
        } else {
            console.log(state.filter)
            commit('setSearchTerm', searchTerm)
            const filter = state.filter.includes('&&') ? ` && (name~"${searchTerm}" || surname~"${searchTerm}" || email~"${searchTerm}")` : `(name~"${searchTerm}" || surname~"${searchTerm}" || email~"${searchTerm}")`
            commit('setFilter', state.filter + filter)
            dispatch('getContacts')
        }
    }
}


// Groups aren't resetting when filter empty.
// Filters don't react to child filters changes.

export default {
    state,
    mutations,
    getters,
    actions
}