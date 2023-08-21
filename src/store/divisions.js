import pb from '../plugins/pocketBaseAPI'

const state = {
    divisions: [],
    divisionFilterId: '',
}
const mutations = {
    setDivisions: (state, divisions) => state.divisions = divisions,
    setDivisionFilterId: (state, divisionFilterId) => state.divisionFilterId = divisionFilterId
}
const getters = {
    divisions: state => state.divisions
}
const actions = {
    async getDivisions({ commit, state, dispatch, }, divisionsFiltered) {
        try {
            let departmentsList = []

            if (state.divisionFilterId) {
                const divisions = await pb.collection('divisions').getList(1, 5)
                commit('setDivisions', divisions.items)
                const divisionsAndDepartments = await pb.collection('divisions_departments').getList(1, 5, {
                    filter: `division_id="${state.divisionFilterId}"`,
                    expand: 'department_id'
                })

                const departmentsFiltered = divisionsAndDepartments.items.map(department => department.expand.department_id)
                departmentsList.push(...departmentsFiltered)
            } else if (divisionsFiltered) {
                commit('setDivisions', divisionsFiltered)
                for (const division of divisionsFiltered) {
                    const divisionsAndDepartments = await pb.collection('divisions_departments').getList(1, 5, {
                        filter: `division_id="${division.id}"`,
                        expand: 'department_id'
                    })
                    const departmentsFiltered = divisionsAndDepartments.items.map(department => department.expand.department_id)
                    departmentsList.push(...departmentsFiltered)
                }
            }
            else {
                const divisions = await pb.collection('divisions').getList(1, 10)
                commit('setDivisions', divisions.items)
                dispatch('getDepartments', null)

            }
            departmentsList = departmentsList.filter((departmentFirst, index, self) => self.findIndex(department => (departmentFirst.id === department.id)) === index)
            dispatch('getDepartments', departmentsList)
        } catch (err) {
            console.log(err)
        }
    },
    getDivisionFilterId({ commit, dispatch, rootState }, divisionFilterId) {
        if (!divisionFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && division_id="${state.divisionFilterId}"` : `division_id="${state.divisionFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getDivisions')
        } else if (rootState.contacts.filter && state.divisionFilterId) {
            commit('resetFilter', { oldFilter: state.divisionFilterId, newFilter: divisionFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getDivisions')
        } else if (!rootState.contacts.filter) {
            commit('setFilter', `division_id="${divisionFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getDivisions')
        } else if (rootState.contacts.filter && !state.divisionFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && division_id="${divisionFilterId}"`, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getDivisions')
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}