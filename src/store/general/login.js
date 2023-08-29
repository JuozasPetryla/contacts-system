import router from '../../router/router'

const state = {
    forgotPassword: false,
    currentUser: {}
}

const mutations = {
    setCurrentUser: (state, user) => state.currentUser = user,
    setForgotPasswordOpen: state => state.forgotPassword = true,
    setForgotPasswordClosed: state => state.forgotPassword = false
}

const getters = {
    currentUser: state => state.currentUser,
    forgotPassword: state => state.forgotPassword
}

const actions = {
    async loginWithPassword({ commit, dispatch }, { email, password }) {
        const user = await this.authWithPassword([`${email}`, `${password}`])
        if (user.status === 400) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', user.message, { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setCurrentUser', user)
            localStorage.setItem('user', user.token)
            router.push('/')
        }
    },
    logout({ commit }) {
        localStorage.removeItem('user')
        router.push('/login')
        commit('setCurrentUser', {})
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