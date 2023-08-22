import pb from '../plugins/pocketBaseAPI'

const state = {
    groups: [],
    groupsForDisplay: [],
    groupFilterId: '',
}
const mutations = {
    setGroupsForDisplay: (state, groupsForDisplay) => state.groupsForDisplay = groupsForDisplay,
    setGroups: (state, groups) => state.groups = groups,
    setGroupFilterId: (state, groupFilterId) => state.groupFilterId = groupFilterId
}
const getters = {
    groups: state => state.groups,
    groupsForDisplay: state => state.groupsForDisplay
}
const actions = {
    async getGroups({ commit }, groupsFiltered) {
        try {
            if (groupsFiltered) {
                commit('setGroups', groupsFiltered)
            }
        } catch (err) {
            console.log(err)
        }
    },
    async getGroupsForDisplay({ commit }) {
        const groups = await pb.collection('groups').getFullList()
        commit('setGroupsForDisplay', groups)
    },
    getGroupFilterId({ commit, dispatch, rootState }, groupFilterId) {
        if (!groupFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && group_id="${state.groupFilterId}"` : `group_id="${state.groupFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getDepartments')
        } else if (rootState.contacts.filter && state.groupFilterId) {
            commit('resetFilter', { oldFilter: state.groupFilterId, newFilter: groupFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getDepartments')
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `group_id="${groupFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getGroups')
        } else if (rootState.contacts.filter && !state.groupFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && group_id="${groupFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getGroups')
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}