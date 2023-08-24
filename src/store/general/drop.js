const state = {
    imageDropOpen: false,
    file: {},
    fileUrl: '',
    imageSelected: false,
}
const mutations = {
    setFile: (state, file) => state.file = file,
    setFileUrl: (state, fileUrl) => state.fileUrl = fileUrl[0],
    setImageDropOpen: (state) => state.imageDropOpen = true,
    setImageDropClosed: (state) => state.imageDropOpen = false,
    setImageSelected: (state, imageSelected) => state.imageSelected = imageSelected,
}
const getters = {
    file: state => state.file,
    fileUrl: state => state.fileUrl,
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
        if (file.length === 1) {
            commit('setImageSelected', true)
            commit('setFile', file[0])
            const url = URL.createObjectURL(file[0])
            commit('setFileUrl', url)

        } else if (Object.values(file).length === 0) {
            commit('setImageSelected', false)
            commit('setFile', {})
            commit('setFileUrl', '')
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}