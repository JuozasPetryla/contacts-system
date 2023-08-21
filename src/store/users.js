import pb from '../plugins/pocketBaseAPI'

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
    }
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
    async getUserPermissions({ commit }, user) {
        try {
            const userPermissions = await pb.collection('user_permissions').getFirstListItem(`id="${user.permissions_id}"`)
            commit('setUserPermissions', userPermissions)
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