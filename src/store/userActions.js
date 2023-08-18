import pb from '../plugins/pocketBaseAPI'

const state = {
    userModalOpen: false,
    userModalMode: '',
    userDeleteInfo: {},
    userEditInfo: {},
}
const mutations = {
    setUserModalOpen: state => state.userModalOpen = true,
    setUserModalClosed: state => state.userModalOpen = false,
    setUserModalMode: (state, userModalMode) => state.userModalMode = userModalMode,
    setUserDeleteInfo: (state, info) => state.userDeleteInfo = info,
    setUserEditInfo: (state, info) => state.userEditInfo = info
}
const getters = {
    userModalOpen: state => state.userModalOpen,
    userModalMode: state => state.userModalMode,
    userDeleteInfo: state => state.userDeleteInfo,
    userEditInfo: state => state.userEditInfo,
}
const actions = {
    openUserModal({ commit }) {
        commit('setUserModalOpen')
    },
    closeUserModal({ commit }) {
        commit('setUserModalClosed')
    },
    getUserModalMode({ commit }, userModalMode) {
        commit('setUserModalMode', userModalMode)
    },
    getUserDeleteInfo({ commit }, info) {
        commit('setUserDeleteInfo', info)
    },
    getUserEditInfo({ commit }, info) {
        commit('setUserEditInfo', info)
    },
    async createUser({ commit, dispatch }, { userPermissionsObj, userCreateObj }) {
        try {
            const userPermissions = await pb.collection('user_permissions').create(userPermissionsObj)
            const userObj = {
                ...userCreateObj,
                permissions_id: userPermissions.id
            }
            console.log(userObj)
            const user = await pb.collection('users').create(userObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUser({ commit, dispatch }, userEditObj) {
        try {
            const user = await pb.collection('users').getFirstListItem(`id="${userEditObj.id}"`)
            const userFull = {
                ...userEditObj,
                permissions_id: user.permissions_id
            }
            console.log(userFull)
            console.log(userEditObj)
            const userEdited = await pb.collection('users').update(userEditObj.id, userFull)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUserPermissions({ commit, dispatch }, { id, userPermissionsObj }) {
        try {
            const user = await pb.collection('users').getFirstListItem(`id="${id}"`)

            const userPermissions = await pb.collection('users').update(user.permissions_id, userPermissionsObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteUser({ commit, dispatch }, userId) {
        try {
            const user = await pb.collection('users').delete(userId)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
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