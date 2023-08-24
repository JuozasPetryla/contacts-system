import pb from '../../plugins/pocketBaseAPI'

const state = {
    departmentDeleteInfo: {},
    departmentEditInfo: {},
}
const mutations = {
    setDepartmentDeleteInfo: (state, info) => state.departmentDeleteInfo = info,
    setDepartmentEditInfo: (state, info) => state.departmentEditInfo = info
}
const getters = {
    departmentDeleteInfo: state => state.departmentDeleteInfo,
    departmentEditInfo: state => state.departmentEditInfo,
}
const actions = {
    getDepartmentDeleteInfo({ commit }, info) {
        commit('setDepartmentDeleteInfo', info)
    },
    async getDepartmentEditInfo({ commit }, info) {
        const departmentDivision = await this.getFullList('divisions_departments', {
            filter: `department_id="${info.id}"`,
            expand: 'division_id'
        })
        const infoObj = {
            ...info, division_id: departmentDivision[0].expand.division_id.id
        }
        commit('setDepartmentEditInfo', infoObj)
    },
    async createDepartment({ commit, dispatch }, { departmentCreateObj, division_id }) {
        const department = await this.postItem('departments', departmentCreateObj)

        const departmentCompaniesObj = {
            division_id,
            department_id: department.id
        }
        const departmentsCompanies = await this.postItem('divisions_departments', departmentCompaniesObj)
        if (department.status === 200 && departmentsCompanies.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', department.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editDepartment({ commit, dispatch }, { departmentEditObj, division_id }) {
        const department = await this.editItem('departments', departmentEditObj.id, departmentEditObj)
        const departmentCompaniesObj = {
            division_id,
            department_id: departmentEditObj.id
        }
        const departmentsCompanies = await this.getListItem('divisions_departments',
            `department_id="${department.id}"`
        )
        const departmentsCompaniesEdit = await this.editItem('divisions_departments', `${departmentsCompanies.id}`, departmentCompaniesObj)
        if (department.status === 200) {

            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', department.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteDepartment({ commit, dispatch }, departmentDeleteInfo) {
        const departamentsGroups = await this.getFullList('departments_groups', {
            filter: `department_id="${departmentDeleteInfo}"`,
            expand: 'group_id'
        })
        departamentsGroups.forEach(group => {
            dispatch('deleteGroup', group.expand.group_id.id)
        })
        const department = await this.deleteItem('departments', departmentDeleteInfo)
        if (department.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', department.message, { root: true })
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