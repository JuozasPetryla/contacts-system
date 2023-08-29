const state = {
    officeDeleteInfo: {},
    officeEditInfo: {},

}
const mutations = {
    setOfficeDeleteInfo: (state, info) => state.officeDeleteInfo = info,
    setOfficeEditInfo: (state, info) => state.officeEditInfo = info,
}
const getters = {
    officeDeleteInfo: state => state.officeDeleteInfo,
    officeEditInfo: state => state.officeEditInfo,
}
const actions = {

    getOfficeModalMode({ commit }, officeModalMode) {
        commit('setOfficeModalMode', officeModalMode)
    },
    getOfficeDeleteInfo({ commit }, info) {
        commit('setOfficeDeleteInfo', info)
    },
    async getOfficeEditInfo({ commit }, info) {
        const officeCompany = await this.getFullList('companies_offices', {
            filter: `office_id="${info.id}"`,
            expand: 'company_id'
        })
        const infoObj = {
            ...info, company_id: officeCompany[0].expand.company_id.id
        }
        commit('setOfficeEditInfo', infoObj)
    },
    async createOffice({ commit, dispatch }, { officeCreateObj, company_id }) {
        const office = await this.postItem('offices', officeCreateObj)

        const officeCompaniesObj = {
            company_id,
            office_id: office.data.id
        }
        const officesCompanies = await this.postItem('companies_offices', officeCompaniesObj)
        if (office.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })

            dispatch('getOfficesForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', office.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async editOffice({ commit, dispatch }, { officeEditObj, company_id }) {
        const office = await this.editItem('offices', officeEditObj.id, officeEditObj)
        const officeCompaniesObj = {
            company_id,
            office_id: officeEditObj.id
        }
        const officesCompanies = await this.getListItem('companies_offices',
            [`office_id="${office.data.id}"`]
        )
        const officesCompaniesEdit = await this.editItem('companies_offices', `${officesCompanies.id}`, officeCompaniesObj)
        if (office.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getOfficesForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', office.message, { root: true })

            dispatch('openInfoModal', { root: true })
        }
    },
    async deleteOffice({ commit, dispatch }, officeDeleteInfo) {
        const officesDivisions = await this.getFullList('offices_divisions', {
            filter: `office_id="${officeDeleteInfo}"`,
            expand: 'division_id'
        })

        const officeEmployees = await this.getFullList('employees', {
            filter: `office_id="${officeDeleteInfo}"`
        })

        if (officeEmployees.length !== 0) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', 'Ofisas turi priskirtų darbuotojų', { root: true })
            dispatch('openInfoModal', { root: true })
            return
        }

        if (officesDivisions.length !== 0) {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', 'Ofisas turi priskirtų padalinių', { root: true })
            dispatch('openInfoModal', { root: true })
            return
        }
        const office = await this.deleteItem('offices', officeDeleteInfo)
        if (office.status === 200) {
            commit('setInfoModalMode', 'success', { root: true })
            dispatch('getOfficesForDisplay', { root: true })
            dispatch('openInfoModal', { root: true })
        } else {
            commit('setInfoModalMode', 'error', { root: true })
            commit('setInfoModalError', office.message, { root: true })
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





