import pb from '../../plugins/pocketBaseAPI'

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
    getGroupEditInfo({ commit }, info) {
        commit('setGroupEditInfo', info)
    },
    async createGroup({ commit, dispatch }, { groupCreateObj, department_id }) {
        try {
            const group = await pb.collection('groups').create(groupCreateObj)

            const groupCompaniesObj = {
                department_id,
                group_id: group.id
            }
            const groupsCompanies = await pb.collection('departments_groups').create(groupCompaniesObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getGroupsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editGroup({ commit, dispatch }, { groupEditObj, department_id }) {
        try {
            const group = await pb.collection('groups').update(groupEditObj.id, groupEditObj)
            const groupCompaniesObj = {
                department_id,
                group_id: groupEditObj.id
            }
            const groupsCompanies = await pb.collection('departments_groups').getFirstListItem(
                `group_id="${group.id}"`
            )
            const groupsCompaniesEdit = await pb.collection('departments_groups').update(`${groupsCompanies.id}`, groupCompaniesObj)

            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getGroupsForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteGroup({ commit, dispatch }, groupDeleteInfo) {
        try {
            const group = await pb.collection('groups').delete(groupDeleteInfo)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getGroupsForDisplay', { root: true })
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