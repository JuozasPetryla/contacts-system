import pb from '../../plugins/pocketBaseAPI'

const state = {
    divisionDeleteInfo: {},
    divisionEditInfo: {},
}
const mutations = {
    setDivisionDeleteInfo: (state, info) => state.divisionDeleteInfo = info,
    setDivisionEditInfo: (state, info) => state.divisionEditInfo = info
}
const getters = {
    divisionDeleteInfo: state => state.divisionDeleteInfo,
    divisionEditInfo: state => state.divisionEditInfo,
}
const actions = {
    getDivisionDeleteInfo({ commit }, info) {
        commit('setDivisionDeleteInfo', info)
    },
    async getDivisionEditInfo({ commit }, info) {
        const divisionOffice = await this.getFullList('offices_divisions', {
            filter: `division_id="${info.id}"`,
            expand: 'office_id'
        })
        const infoObj = {
            ...info, office_id: divisionOffice[0].expand.office_id.id
        }
        commit('setDivisionEditInfo', infoObj)
    },
    async createDivision({ commit, dispatch }, { divisionCreateObj, office_id }) {
        const division = await this.postItem('divisions', divisionCreateObj)

        const divisionCompaniesObj = {
            office_id,
            division_id: division.data.id
        }
        const divisionsCompanies = await this.postItem('offices_divisions', divisionCompaniesObj)
        if (division.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisionsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', division.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editDivision({ commit, dispatch }, { divisionEditObj, office_id }) {
        const division = await this.editItem('divisions', divisionEditObj.id, divisionEditObj)
        const divisionCompaniesObj = {
            office_id,
            division_id: divisionEditObj.id
        }
        const divisionsCompanies = await this.getListItem('offices_divisions',
            [`division_id="${division.data.id}"`]
        )
        const divisionsCompaniesEdit = await this.editItem('offices_divisions', `${divisionsCompanies.id}`, divisionCompaniesObj)
        if (division.status === 200) {

            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisionsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', division.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteDivision({ commit, dispatch }, divisionDeleteInfo) {
        const divisionsDepartments = await this.getFullList('divisions_departments', {
            filter: `division_id="${divisionDeleteInfo}"`,
            expand: 'department_id'
        })
        divisionsDepartments.forEach(department => {
            dispatch('deleteDepartment', department.expand.department_id.id)
        })
        const division = await this.deleteItem('divisions', divisionDeleteInfo)
        if (division.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisionsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', division.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}