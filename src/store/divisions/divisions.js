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
    async getDivisions({ commit, dispatch, rootState }) {
        commit('setDivisions', []);
        let divisions = [];
        const divisionsList = await this.getFullList('offices_divisions', {
            expand: 'division_id',
            filter: rootState.offices.officeFilterId ? `office_id="${rootState.offices.officeFilterId}"` : ""
        });
        for (const division of divisionsList) {
            divisions.push(division.expand.division_id)
        }
        commit('setDivisions', rootState.offices.officeFilterId ? divisions : []);
        dispatch('getDepartments')
    },
    async getDivisionsForDisplay({ commit }) {
        const divisions = await this.getFullList('divisions')
        commit('setDivisionsForDisplay', divisions)
    },
    getDivisionFilterId({ commit, dispatch, rootState }, divisionFilterId) {
        if (!divisionFilterId) {
            const oldFilter = rootState.contacts.filter.includes('&&') ? ` && division_id="${state.divisionFilterId}"` : `division_id="${state.divisionFilterId}"`
            commit('resetFilter', { oldFilter, newFilter: '' }, { root: true })
        } else if (rootState.contacts.filter && state.divisionFilterId) {
            commit('resetFilter', { oldFilter: state.divisionFilterId, newFilter: divisionFilterId }, { root: true })
        } else if (rootState.contacts.filter && !state.divisionFilterId) {
            commit('setFilter', `${rootState.contacts.filter} && division_id="${divisionFilterId}"`, { root: true })
        }
        dispatch('getContacts', { root: true })
        commit('setDivisionFilterId', divisionFilterId)
        dispatch('getDivisions')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}