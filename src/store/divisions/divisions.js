const state = {
    divisions: [],
    divisionsForDisplay: [],
    divisionFilterId: '',
}
const mutations = {
    setDivisionsForDisplay: (state, divisionsForDisplay) => state.divisionsForDisplay = divisionsForDisplay,
    setDivisions: (state, divisions) => state.divisions = divisions,
    setDivisionFilterId: (state, divisionFilterId) => state.divisionFilterId = divisionFilterId
}
const getters = {
    divisions: state => state.divisions,
    divisionFilterId: state => state.divisionFilterId,

    divisionsForDisplay: state => state.divisionsForDisplay
}
const actions = {
    async getDivisions({ commit, state, dispatch, }, divisionsFiltered) {

        let departmentsList = []
        if (state.divisionFilterId) {
            const divisionsAndDepartments = await this.getFullList('divisions_departments', {
                filter: `division_id="${state.divisionFilterId}"`,
                expand: 'department_id'
            })

            const departmentsFiltered = divisionsAndDepartments.map(department => department.expand.department_id)
            departmentsList.push(...departmentsFiltered)
        } else if (divisionsFiltered) {
            commit('setDivisions', divisionsFiltered)
        }
        else {
            const divisions = await this.getFullList('divisions')
            commit('setDivisions', divisions)
            dispatch('getDepartments', null)

        }
        departmentsList = departmentsList.filter((departmentFirst, index, self) => self.findIndex(department => (departmentFirst.id === department.id)) === index)
        dispatch('getDepartments', departmentsList)

    },
    async getDivisionsForDisplay({ commit }) {
        const divisions = await this.getFullList('divisions')
        commit('setDivisionsForDisplay', divisions)
    },
    getDivisionFilterId({ commit, dispatch, rootState }, divisionFilterId) {
        if (!divisionFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && division_id="${state.divisionFilterId}"` : `division_id="${state.divisionFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getContacts', { root: true })
            dispatch('getOffices')
            commit('setDepartments', [])
        } else if (rootState.contacts.filter && state.divisionFilterId) {
            commit('resetFilter', { oldFilter: state.divisionFilterId, newFilter: divisionFilterId }, { root: true })
            dispatch('getContacts', { root: true })
            commit('setDivisionFilterId', divisionFilterId)
            dispatch('getOffices')
            commit('setDepartments', [])
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