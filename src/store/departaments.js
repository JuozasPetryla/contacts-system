import pb from '../plugins/pocketBaseAPI'

const state = {
    departaments: []
}
const mutations = {
    setDepartaments: (state, departaments) => state.departaments = departaments
}
const getters = {
    departaments: state => state.departaments
}
const actions = {
    async getDepartaments({ commit }) {
        try {
            const departaments = await pb.collection('departments').getList(1, 5, {
            })
            commit('setDepartaments', departaments.items)
        } catch (err) {
            console.log(err)
        }
    },
    getDepartamentFilterId({ commit, dispatch }, departamentFilterId) {
        if (departamentFilterId === '') {
            commit('setFilter', {}, { root: true })
            dispatch('getContacts', { root: true })
        } else {
            commit('setFilter', { filter: `department_id="${departamentFilterId}"` }, { root: true })
            dispatch('getContacts', { root: true })
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}