import pb from '../plugins/pocketBaseAPI'

const state = {
    departments: [],
    departmentFilterId: '',

}
const mutations = {
    setDepartments: (state, departments) => state.departments = departments,
    setDepartmentFilterId: (state, departmentFilterId) => state.departmentFilterId = departmentFilterId

}
const getters = {
    departments: state => state.departments
}
const actions = {
    async getDepartments({ commit, state, dispatch, rootState }, departmentsFiltered) {
        try {
            let groupsList = []
            if (state.departmentFilterId) {
                const departments = await pb.collection('departments').getList(1, 5)
                commit('setDepartments', departments.items)

                const departmentsAndGroups = await pb.collection('departments_groups').getList(1, 5, {
                    filter: `department_id="${state.departmentFilterId}"`,
                    expand: 'group_id'
                })
                const groupsFiltered = departmentsAndGroups.items.map(group => group.expand.group_id)
                groupsList.push(...groupsFiltered)
            }
            else if (departmentsFiltered) {
                commit('setDepartments', departmentsFiltered)
                for (const department of departmentsFiltered) {
                    const departmentsAndGroups = await pb.collection('departments_groups').getList(1, 5, {
                        filter: `department_id="${department.id}"`,
                        expand: 'group_id'
                    })
                    const groupsFiltered = departmentsAndGroups.items.map(group => group.expand.group_id)
                    groupsList.push(...groupsFiltered)
                }
            } else {
                const departments = await pb.collection('departments').getList(1, 10)
                commit('setDepartments', departments.items)
                dispatch('getGroups', null)
            }
            groupsList = groupsList.filter((groupFirst, index, self) => self.findIndex(group => (groupFirst.id === group.id)) === index)
            dispatch('getGroups', groupsList)
        } catch (err) {
            console.log(err)
        }
    },

    getDepartmentFilterId({ commit, dispatch, rootState }, departmentFilterId) {
        if (!departmentFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && department_id="${state.departmentFilterId}"` : `department_id="${state.departmentFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getDepartments')
        }
        else if (rootState.contacts.filter && state.departmentFilterId) {
            commit('resetFilter', { oldFilter: state.departmentFilterId, newFilter: departmentFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDepartmentFilterId', departmentFilterId)
            dispatch('getDepartments')
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