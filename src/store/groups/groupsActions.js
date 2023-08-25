const state = {
    groupDeleteInfo: {},
    groupEditInfo: {},
}
const mutations = {
    setGroupDeleteInfo: (state, info) => state.groupDeleteInfo = info,
    setGroupEditInfo: (state, info) => state.groupEditInfo = info
}
const getters = {
    groupDeleteInfo: state => state.groupDeleteInfo,
    groupEditInfo: state => state.groupEditInfo,
}
const actions = {
    getGroupDeleteInfo({ commit }, info) {
        commit('setGroupDeleteInfo', info)
    },
    async getGroupEditInfo({ commit }, info) {
        const groupDepartment = await this.getFullList('departments_groups', {
            filter: `group_id="${info.id}"`,
            expand: 'department_id'
        })
        const infoObj = {
            ...info, department_id: groupDepartment[0].expand.department_id.id
        }
        commit('setGroupEditInfo', infoObj)
    },
    async createGroup({ commit, dispatch }, { groupCreateObj, department_id }) {
        const group = await this.postItem('groups', groupCreateObj)

        const groupCompaniesObj = {
            department_id,
            group_id: group.data.id
        }
        const groupsCompanies = await this.postItem('departments_groups', groupCompaniesObj)
        if (group.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getGroupsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', group.message, { root: true })
            dispatch('openInfoModal', { root: true })
        }
    },
    async editGroup({ commit, dispatch }, { groupEditObj, department_id }) {
        const group = await this.editItem('groups', groupEditObj.id, groupEditObj)
        const groupCompaniesObj = {
            department_id,
            group_id: groupEditObj.id
        }
        const groupsCompanies = await this.getListItem('departments_groups',
            [`group_id="${group.data.id}"`]
        )
        const groupsCompaniesEdit = await this.editItem('departments_groups', `${groupsCompanies.id}`, groupCompaniesObj)
        if (group.status === 200) {

            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getGroupsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', group.message, { root: true })
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteGroup({ commit, dispatch }, groupDeleteInfo) {
        const group = await this.deleteItem('groups', groupDeleteInfo)
        if (group.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getGroupsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', group.message, { root: true })
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