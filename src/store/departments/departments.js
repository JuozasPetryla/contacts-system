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
    async getDepartments({ commit, dispatch, rootState }) {
        commit('setDepartments', []);
        let departments = [];
        const departmentsList = await this.getFullList('divisions_departments', {
            expand: 'department_id',
            filter: rootState.divisions.divisionFilterId ? `division_id="${rootState.divisions.divisionFilterId}"` : ""
        });
        for (const department of departmentsList) {
            departments.push(department.expand.department_id)
        }
        commit('setDepartments', rootState.divisions.divisionFilterId ? departments : []);
        dispatch('getGroups')
    },
    async getDepartmentsForDisplay({ commit }) {
        const departments = await this.getFullList('departments')
        commit('setDepartmentsForDisplay', departments)
    },
    getDepartmentFilterId({ commit, dispatch, rootState }, departmentFilterId) {
        if (!departmentFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && department_id="${state.departmentFilterId}"` : `department_id="${state.departmentFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
        } else if (rootState.contacts.filter && state.departmentFilterId) {
            commit('resetFilter', { oldFilter: state.departmentFilterId, newFilter: departmentFilterId }, { root: true })
        } else if (rootState.contacts.filter && !state.departmentFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && department_id="${departmentFilterId}"`, { root: true })
        }
        dispatch('getDepartments')
        dispatch('getContacts', { root: true })
        commit('setDepartmentFilterId', departmentFilterId)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}