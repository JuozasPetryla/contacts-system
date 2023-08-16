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
                const groups = await pb.collection('groups').getList(1, 5)
                commit('setGroups', groups.items)


            }
        } catch (err) {
            console.log(err)
        }
    },
    getGroupFilterId({ commit, dispatch }, groupFilterId) {
        commit('setGroupFilterId', groupFilterId)
        if (groupFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getGroups')
        }
        else {
            commit('setFilter', { filter: `group_id="${groupFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
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