import pb from '../plugins/pocketBaseAPI'

const state = {
    groups: [],
    groupFilterId: '',
}
const mutations = {
    setGroups: (state, groups) => state.groups = groups,
    setGroupFilterId: (state, groupFilterId) => state.getGroupFilterId = groupFilterId
}
const getters = {
    groups: state => state.groups
}
const actions = {
    async getGroups({ commit, state, rootState }, groupsFiltered) {
        try {
            if (state.groupFilterId) {
                const groups = await pb.collection('groups').getList(1, 5)
                commit('setGroups', groups.items)
            } else if (groupsFiltered) {
                commit('setGroups', groupsFiltered)
            }
            else {
                const groups = await pb.collection('groups').getList(1, 10)
                commit('setGroups', groups.items)
            }
        } catch (err) {
            console.log(err)
        }
    },
    getGroupFilterId({ commit, dispatch, rootState }, groupFilterId) {
        if (!groupFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && group_id="${state.groupFilterId}"` : `group_id="${state.groupFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getGroups')
        } else if (rootState.contacts.filter && state.groupFilterId) {
            commit('resetFilter', { oldFilter: state.groupFilterId, newFilter: groupFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setGroupFilterId', groupFilterId)
            dispatch('getGroups')
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