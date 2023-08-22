const state = {
    imageDropOpen: false,
    file: {},
}
const mutations = {
    setFile: (state, file) => state.file = file[0],
    setImageDropOpen: (state) => state.imageDropOpen = true,
    setImageDropClosed: (state) => state.imageDropOpen = false,
}
const getters = {
    file: state => state.file,
    imageDropOpen: state => state.imageDropOpen
}
const actions = {
    openImageDrop({ commit }) {
        commit('setImageDropOpen')
    },
    closeImageDrop({ commit }) {
        commit('setImageDropClosed')
    },
    getFile({ commit }, file) {
        commit('setFile', file)

    }
}

export default {
    state,
    mutations,
    getters,
    actions
}