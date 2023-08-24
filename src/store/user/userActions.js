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
        const userPermissions = await this.postItem('user_permissions', {
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

        formData.append('permissions_id', userPermissions.data.id)

        for (const [key, value] of Object.entries(userCreateObj)) {
            formData.append(`${key}`, value)
        }
        for (const [key, value] of formData.entries()) {
            console.log(key, value)
        }
        const user = await this.postItem('users', formData)

        if (user.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', user.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUser({ commit, dispatch, rootState }, userEditObj) {
        const formData = new FormData()
        if (rootState.drop.imageSelected) {
            formData.append('avatar', rootState.drop.file)
        } else {
            formData.append('avatar', '')
        }


        for (const [key, value] of Object.entries(userEditObj)) {
            formData.append(`${key}`, value)
        }
        const userEdited = await this.editItem('users', userEditObj.id, formData)
        if (userEdited.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } else {
            console.log(err)
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userEdited.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editUserPermissions({ commit, dispatch }, userPermissionsObj) {
        const userPermissions = await this.editItem('user_permissions', userPermissionsObj.id, userPermissionsObj)
        if (userPermissions.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userPermissions.message, { root: true })
            commit('setUserModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteUser({ commit, dispatch }, userId) {
        const user = await this.getListItem('users', [`id="${userId}"`])
        const userDelete = await this.deleteItem('users', userId)
        const userPermissions = await this.deleteItem('user_permissions', user.permissions_id)
        if (userPermissions.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserModalClosed')
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userPermissions.message, { root: true })
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