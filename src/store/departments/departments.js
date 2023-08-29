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
        const departmentsExists = departmentsList.some(department => {
            return department.department_id === state.departmentFilterId
        })
        if (state.departmentFilterId && !departmentsExists) {
            commit('setFilter', `company_id="${rootState.companies.companyFilterId}" && office_id="${rootState.offices.officeFilterId}" && division_id="${rootState.divisions.divisionFilterId}"`)
            commit('setGroupFilterId', '')
            dispatch('getDepartmentFilterId', '')
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
            const oldFilter = `${rootState.contacts.searchFilter} && company_id="${rootState.companies.companyFilterId}" && office_id="${rootState.offices.officeFilterId}" && division_id="${rootState.divisions.divisionFilterId}"`
            commit('setFilter', oldFilter, { root: true })
            commit('setGroupFilterId', '')
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