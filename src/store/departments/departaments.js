const state = {
    departments: [],
    departmentsForDisplay: [],
    departmentFilterId: '',

}
const mutations = {
    setDepartments: (state, departments) => state.departments = departments,
    setDepartmentsForDisplay: (state, departmentsForDisplay) => state.departmentsForDisplay = departmentsForDisplay,
    setDepartmentFilterId: (state, departmentFilterId) => state.departmentFilterId = departmentFilterId

}
const getters = {
    departments: state => state.departments,
    departmentFilterId: state => state.departmentFilterId,

    departmentsForDisplay: state => state.departmentsForDisplay
}
const actions = {
    async getDepartments({ commit, state, dispatch }, departmentsFiltered) {

        let groupsList = []
        if (state.departmentFilterId) {
            const departmentsAndGroups = await this.getFullList('departments_groups', {
                filter: `department_id="${state.departmentFilterId}"`,
                expand: 'group_id'
            })
            const groupsFiltered = departmentsAndGroups.map(group => group.expand.group_id)
            groupsList.push(...groupsFiltered)
        }
        else if (departmentsFiltered) {
            commit('setDepartments', departmentsFiltered)

        } else {
            const departments = await this.getFullList('departments')
            commit('setDepartments', departments)
            dispatch('getGroups', null)
        }
        groupsList = groupsList.filter((groupFirst, index, self) => self.findIndex(group => (groupFirst.id === group.id)) === index)
        dispatch('getGroups', groupsList)
    },
    async getDepartmentsForDisplay({ commit }) {
        const departments = await this.getFullList('departments')
        commit('setDepartmentsForDisplay', departments)
    },
    getDepartmentFilterId({ commit, dispatch, rootState }, departmentFilterId) {
        if (!departmentFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && department_id="${state.departmentFilterId}"` : `department_id="${state.departmentFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getDivisions')
            commit('setGroups', [])
        }
        else if (rootState.contacts.filter && state.departmentFilterId) {
            commit('resetFilter', { oldFilter: state.departmentFilterId, newFilter: departmentFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getDivisions')
            commit('setGroups', [])
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `department_id="${departmentFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getDepartments')
        } else if (rootState.contacts.filter && !state.departmentFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && department_id="${departmentFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getDepartments')
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}