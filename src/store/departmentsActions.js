import pb from '../plugins/pocketBaseAPI'

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
    getDepartmentEditInfo({ commit }, info) {
        commit('setDepartmentEditInfo', info)
    },
    async createDepartment({ commit, dispatch }, { departmentCreateObj, division_id }) {
        try {
            const department = await pb.collection('departments').create(departmentCreateObj)

            const departmentCompaniesObj = {
                division_id,
                department_id: department.id
            }
            const departmentsCompanies = await pb.collection('divisions_departments').create(departmentCompaniesObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editDepartment({ commit, dispatch }, { departmentEditObj, division_id }) {
        try {
            const department = await pb.collection('departments').update(departmentEditObj.id, departmentEditObj)
            const departmentCompaniesObj = {
                division_id,
                department_id: departmentEditObj.id
            }
            const departmentsCompanies = await pb.collection('divisions_departments').getFirstListItem(
                `department_id="${department.id}"`
            )
            const departmentsCompaniesEdit = await pb.collection('divisions_departments').update(`${departmentsCompanies.id}`, departmentCompaniesObj)

            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteDepartment({ commit, dispatch }, departmentDeleteInfo) {
        try {
            const departamentsGroups = await pb.collection('departments_groups').getFullList({
                filter: `department_id="${departmentDeleteInfo}"`,
                expand: 'group_id'
            })
            departamentsGroups.forEach(group => {
                dispatch('deleteGroup', group.expand.group_id.id)
            })
            const department = await pb.collection('departments').delete(departmentDeleteInfo)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDepartmentsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
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