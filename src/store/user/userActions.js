import pb from '../../plugins/pocketBaseAPI'

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
        if (state.userModalMode === 'create') {
            commit('setUserPermissions', {})
        }
        commit('setUserModalOpen')
    },
    closeUserModal({ commit, dispatch }) {
        commit('setUserModalClosed')
        commit('setUserEditInfo', {})
        dispatch('getFile', {})
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
    async createUser({ commit, dispatch, rootState }, { userPermissionsObj, userCreateObj }) {
        try {
            const userPermissions = await pb.collection('user_permissions').create({
                ...userPermissionsObj,
                read_permissions: true,
                edit_permissions: false,
                delete_permissions: false,
            })
            const formData = new FormData()
            if (rootState.drop.imageSelected) {
                formData.append('avatar', rootState.drop.file)
            } else {
                formData.append('avatar', '')
            }

            formData.append('permissions_id', userPermissions.id)

            for (const [key, value] of Object.entries(userCreateObj)) {
                formData.append(`${key}`, value)
            }
            const user = await pb.collection('users').create(formData)
            console.log(user)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUser({ commit, dispatch, rootState }, userEditObj) {
        try {
            const formData = new FormData()
            if (rootState.drop.imageSelected) {
                formData.append('avatar', rootState.drop.file)
            } else {
                formData.append('avatar', '')
            }


            for (const [key, value] of Object.entries(userEditObj)) {
                formData.append(`${key}`, value)
            }
            const userEdited = await pb.collection('users').update(userEditObj.id, formData)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } catch (err) {
            console.log(err)
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUserPermissions({ commit, dispatch }, userPermissionsObj) {
        try {
            const userPermissions = await pb.collection('user_permissions').update(userPermissionsObj.id, userPermissionsObj)
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
            const user = await pb.collection('users').getFirstListItem(`id="${userId}"`)
            const userDelete = await pb.collection('users').delete(userId)
            const userPermissions = await pb.collection('user_permissions').delete(user.permissions_id)
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