import pb from '../plugins/pocketBaseAPI'

const actions = {
    async getRelations({ commit }, { filterId, filterMutation, relationReq, expandProp, filterProp }) {
        try {
            if (!filterId) {
                const allFilters = await pb.collection(relationReq).getList(1, 5, {
                    expand: expandProp
                })
                const allFiltersFiltered = allFilters.items.map(filter => filter.expand[expandProp])
                commit(filterMutation, allFiltersFiltered)
            } else {

                const filters = await pb.collection(relationReq).getList(1, 5, {
                    filter: `${filterProp}="${filterId}"`,
                    expand: expandProp
                })
                const filtersFiltered = filters.items.map(filter => filter.expand[expandProp])
                commit(filterMutation, filtersFiltered)
            }
        } catch (err) {
            console.log(err)
        }
    },
}

export default {
    actions
}