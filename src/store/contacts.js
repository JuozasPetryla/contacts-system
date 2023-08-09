import pb from '../plugins/pocketBaseAPI'

const state = {
    contacts: [],
    totalContacts: 0,
    filter: {}
}
const mutations = {
    setContacts: (state, contacts) => state.contacts = contacts,
    setTotalContacts: (state, totalContacts) => state.totalContacts = totalContacts,
    setFilter: (state, filter) => state.filter = filter
}
const getters = {
    contacts: state => state.contacts,
    totalContacts: state => state.totalContacts,
    getters: state => state.filter
}
const actions = {
    async getContacts({ commit, state }) {

        try {
            const contacts = await pb.collection('employees').getList(1, 5, state.filter)
            commit('setContacts', contacts.items)
            commit('setTotalContacts', contacts.totalItems)
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