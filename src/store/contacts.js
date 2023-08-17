import pb from '../plugins/pocketBaseAPI'

const state = {
    contacts: [],
    totalContacts: 0,
    filter: {},
    contact: {}
}
const mutations = {
    setContacts: (state, contacts) => state.contacts = contacts,
    setContact: (state, contact) => state.contact = contact,
    setTotalContacts: (state, totalContacts) => state.totalContacts = totalContacts,
    setFilter: (state, filter) => state.filter = filter,
}
const getters = {
    contacts: state => state.contacts,
    contact: state => state.contact,
    totalContacts: state => state.totalContacts,
    getters: state => state.filter
}
const actions = {
    async getContacts({ commit, state }) {
        try {
            const contacts = await pb.collection('employees').getList(1, 10, state.filter)
            commit('setContacts', contacts.items)
            commit('setTotalContacts', contacts.totalItems)
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
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}