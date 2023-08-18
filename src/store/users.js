import pb from '../plugins/pocketBaseAPI'

const state = {
    users: [],
    userPermissions: {}
}
const mutations = {
    setUsers: (state, users) => state.users = users,
    setUserPermissions: (state, userPermissions) => state.userPermissions = userPermissions,
}
const getters = {
    users: state => state.users,
    userPermissions: state => state.userPermissions,
}
const actions = {
    async getUsers({ commit }) {
        try {
            const users = await pb.collection('users').getList(1, 25)
            commit('setUsers', users.items)
        } catch (err) {
            console.log(err)
        }
    },
    async getUserPermission({ commit }, userId) {
        try {
            const userPermissions = await pb.collection('user_permissions').getFirstListItem(`id="${userId}"`)
            commit('setUserPermissions', userPermissions.items)
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