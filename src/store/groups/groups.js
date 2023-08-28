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
    async getGroups({ commit, rootState }) {
        commit('setGroups', []);
        let groups = [];
        const groupsList = await this.getFullList('departments_groups', {
            expand: 'group_id',
            filter: rootState.departments.departmentFilterId ? `department_id="${rootState.departments.departmentFilterId}"` : ""
        });
        for (const group of groupsList) {
            groups.push(group.expand.group_id)
        }
        commit('setGroups', rootState.departments.departmentFilterId ? groups : []);
    },
    async getGroupsForDisplay({ commit }) {
        const groups = await this.getFullList('groups')
        commit('setGroupsForDisplay', groups)
    },
    getGroupFilterId({ commit, dispatch, rootState }, groupFilterId) {
        if (!groupFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && group_id="${state.groupFilterId}"` : `group_id="${state.groupFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
        } else if (rootState.contacts.filter && state.groupFilterId) {
            commit('resetFilter', { oldFilter: state.groupFilterId, newFilter: groupFilterId }, { root: true })
        } else if (rootState.contacts.filter && !state.groupFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && group_id="${groupFilterId}"`, { root: true })

        }
        commit('setGroupFilterId', groupFilterId)
        dispatch('getContacts')
        dispatch('getGroups')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}