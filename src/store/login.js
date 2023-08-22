import pb from '../plugins/pocketBaseAPI'
import router from '../router/router'


const state = {
    forgotPassword: false
}

const mutations = {
    setForgotPasswordOpen: state => state.forgotPassword = true,
    setForgotPasswordClosed: state => state.forgotPassword = false
}

const getters = {
    forgotPassword: state => state.forgotPassword
}

const actions = {
    async loginWithPassword({ commit, dispatch }, { email, password }) {
        try {
            const user = await pb.collection('users').authWithPassword(
                `${email}`,
                `${password}`
            )

            localStorage.setItem('user', user.token)
            router.push('/employee-manage')
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            dispatch('openInfoModal', { root: true })
        }
    },
    logout() {
        localStorage.removeItem('user')
        router.push('/login')
    },
    openForgotPassword({ commit }) {
        commit('setForgotPasswordOpen')
    },
    closeForgotPassword({ commit }) {
        commit('setForgotPasswordClosed')
    }

}

export default {
    state,
    mutations,
    getters,
    actions
}