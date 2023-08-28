const state = {
    userDeleteInfo: {},
    userEditInfo: {},
    userPassword: '',
}
const mutations = {
    setUserPassword: (state, password) => state.userPassword = password,
    setUserDeleteInfo: (state, info) => state.userDeleteInfo = info,
    setUserEditInfo: (state, info) => state.userEditInfo = info
}
const getters = {
    userPassword: state => state.userPassword,
    userDeleteInfo: state => state.userDeleteInfo,
    userEditInfo: state => state.userEditInfo,
}
const actions = {
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

        const user = await this.postItem('users', formData)
        if (user.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            commit('setUserPassword', userCreateObj.password)
            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', user.message, { root: true })

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

            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
            dispatch('getFile', {})

        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userEdited.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async editUserPermissions({ commit, dispatch }, userPermissionsObj) {
        const userPermissions = await this.editItem('user_permissions', userPermissionsObj.id, userPermissionsObj)
        if (userPermissions.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userPermissions.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteUser({ commit, dispatch }, userId) {
        const user = await this.getListItem('users', [`id="${userId}"`])
        const userDelete = await this.deleteItem('users', userId)
        const userPermissions = await this.deleteItem('user_permissions', user.permissions_id)
        if (userPermissions.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getUsers', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', userPermissions.message, { root: true })

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