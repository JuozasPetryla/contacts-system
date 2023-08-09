import pb from '../plugins/pocketBaseAPI'

const state = {
    groups: []
}
const mutations = {
    setGroups: (state, groups) => state.groups = groups
}
const getters = {
    groups: state => state.groups
}
const actions = {
    async getGroups({ commit }) {
        try {

            const groups = await pb.collection('groups').getList(1, 5, {
            })
            commit('setGroups', groups.items)
        } catch (err) {
            console.log(err)
        }
    },
    getGroupFilterId({ commit, dispatch }, groupFilterId) {
        if (groupFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
        } else {
            commit('setFilter', { filter: `group_id="${groupFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}