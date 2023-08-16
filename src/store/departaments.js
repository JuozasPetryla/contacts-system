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
                const departments = await pb.collection('departments').getList(1, 5)
                commit('setDepartments', departments.items)
                dispatch('getGroups', null)
            }
            groupsList = groupsList.filter((groupFirst, index, self) => self.findIndex(group => (groupFirst.id === group.id)) === index)
            dispatch('getGroups', groupsList)
        } catch (err) {
            console.log(err)
        }
    },

    getDepartmentFilterId({ commit, dispatch }, departmentFilterId) {
        commit('setDepartmentFilterId', departmentFilterId)
        if (departmentFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getDepartments')
        }

        else {
            commit('setFilter', { filter: `department_id="${departmentFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
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