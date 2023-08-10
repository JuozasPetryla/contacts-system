import pb from '../plugins/pocketBaseAPI'

const state = {
    departments: []

}
const mutations = {
    setDepartments: (state, departments) => state.departments = departments

}
const getters = {
    departments: state => state.departments
}
const actions = {
    async getDepartments({ commit }) {
        try {
            const departments = await pb.collection('departments').getList(1, 5, {
            })
            commit('setDepartments', departments.items)
        } catch (err) {
            console.log(err)
        }
    },

    getDepartmentFilterId({ commit, dispatch }, departmentFilterId) {

        if (departmentFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getRelations',
                {
                    filterId: null,
                    filterMutation: 'setGroups',
                    relationReq: 'departments_groups',
                    expandProp: 'group_id',
                    filterProp: null
                },
                { root: true })
        }

        else {
            commit('setFilter', { filter: `department_id="${departmentFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
            dispatch('getRelations',
                {
                    filterId: departmentFilterId,
                    filterMutation: 'setGroups',
                    relationReq: 'departments_groups',
                    expandProp: 'group_id',
                    filterProp: 'department_id'
                },
                { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}