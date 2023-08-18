import pb from '../plugins/pocketBaseAPI'

const state = {
    divisionDeleteInfo: {},
    divisionEditInfo: {},
}
const mutations = {
    setDivisionDeleteInfo: (state, info) => state.divisionDeleteInfo = info,
    setDivisionEditInfo: (state, info) => state.divisionEditInfo = info
}
const getters = {
    divisionDeleteInfo: state => state.divisionDeleteInfo,
    divisionEditInfo: state => state.divisionEditInfo,
}
const actions = {
    getDivisionDeleteInfo({ commit }, info) {
        commit('setDivisionDeleteInfo', info)
    },
    getDivisionEditInfo({ commit }, info) {
        commit('setDivisionEditInfo', info)
    },
    async createDivision({ commit, dispatch }, { divisionCreateObj, office_id }) {
        try {
            const division = await pb.collection('divisions').create(divisionCreateObj)

            const divisionCompaniesObj = {
                office_id,
                division_id: division.id
            }
            const divisionsCompanies = await pb.collection('offices_divisions').create(divisionCompaniesObj)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisions', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async editDivision({ commit, dispatch }, { divisionEditObj, office_id }) {
        try {
            const division = await pb.collection('divisions').update(divisionEditObj.id, divisionEditObj)
            const divisionCompaniesObj = {
                office_id,
                division_id: divisionEditObj.id
            }
            const divisionsCompanies = await pb.collection('offices_divisions').getFirstListItem(
                `division_id="${division.id}"`
            )
            const divisionsCompaniesEdit = await pb.collection('offices_divisions').update(`${divisionsCompanies.id}`, divisionCompaniesObj)

            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisions', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteDivision({ commit, dispatch }, divisionDeleteInfo) {
        try {
            const division = await pb.collection('divisions').delete(divisionDeleteInfo)
            commit('setInfoModalMode', 'success', { root: true })
            commit('setStructureModalClosed')
            dispatch('getDivisions', { root: true })
            dispatch('openInfoModal', { root: true })
        } catch (err) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', err.message, { root: true })
            commit('setStructureModalClosed')
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