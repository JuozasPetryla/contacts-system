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
        edit_permissions: false,
        delete_permissions: false,
        read_permissions: false,
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
        try {
            let arrayWithAvatars = []
            const users = await pb.collection('users').getFullList()
            for (const user of users) {
                const avatar = user.avatar
                let url
                if (avatar) {
                    url = pb.files.getUrl(user, avatar, { 'thumb': '100x100' })
                }
                user.avatar = url ? url : avatar
                arrayWithAvatars.push(user)
            }
            commit('setUsers', arrayWithAvatars)
        } catch (err) {
            console.log(err)
        }
    },
    async getUserPermissions({ commit }, user) {
        try {
            const userPermissions = await pb.collection('user_permissions').getFirstListItem(`id="${user.permissions_id}"`)
            const permissions = {
                ...userPermissions,
                read_permissions: true
            }
            commit('setUserPermissions', { ...userPermissions, read_permissions: true })
        } catch (err) {
            console.log(err)
        }
    },
    async getCurrentUserPermissions({ commit }, userPermissionsId) {
        try {
            const userPermissions = await pb.collection('user_permissions').getFirstListItem(`id="${userPermissionsId}"`);
            commit('setCurrentUserPermissions', userPermissions)
        } catch (err) {
            console.log(err)
        }
    }

}

export default {
    state,
    mutations,
    getters,
    actions
}