import pb from '../../plugins/pocketBaseAPI'

const state = {
    users: [],
    userPermissions: {
        edit_employees: false,
        delete_employees: false,
        edit_offices: false,
        delete_offices: false,
        edit_structure: false,
        delete_structure: false,
        edit_companies: false,
        delete_companies: false,
    },
    currentUserPermissions: {}
}
const mutations = {
    setCurrentUserPermissions: (state, perm) => state.currentUserPermissions = perm,
    setUsers: (state, users) => state.users = users,
    setUserPermissions: (state, userPermissions) => state.userPermissions = userPermissions,
}
const getters = {
    users: state => state.users,
    userPermissions: state => state.userPermissions,
    currentUserPermissions: state => state.currentUserPermissions
}
const actions = {
    async getUsers({ commit }) {
        let arrayWithAvatars = []
        const users = await this.getFullList('users')
        for (const user of users) {
            const avatar = user.avatar
            let url
            if (avatar) {
                url = this.getFiles(user, avatar, { 'thumb': '100x100' })
            }
            user.avatar = url ? url : avatar
            arrayWithAvatars.push(user)
        }
        commit('setUsers', arrayWithAvatars)

    },
    async getUserPermissions({ commit }, user) {
        const userPermissions = await this.getListItem('user_permissions', [`id="${user.permissions_id}"`])
        const permissions = {
            ...userPermissions,
            read_permissions: true
        }
        commit('setUserPermissions', { ...userPermissions, read_permissions: true })
    },
    async getCurrentUserPermissions({ commit }, userPermissionsId) {
        const userPermissions = await this.getListItem('user_permissions', [`id="${userPermissionsId}"`]);
        commit('setCurrentUserPermissions', userPermissions)
    }

}

export default {
    state,
    mutations,
    getters,
    actions
}