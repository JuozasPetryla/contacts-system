import Vuex from "vuex";
import Vue from "vue";
import contactAPI from "../plugins/pocketBaseAPI";

import contacts from "./contacts/contacts";
import companies from "./companies/companies";
import divisions from "./divisions/divisions";
import departments from "./departments/departments";
import groups from "./groups/groups";
import offices from "./offices/offices";
import login from "./general/login";
import infoModal from "./general/infoModal";
import contactActions from "./contacts/contactsActions";
import companiesActions from "./companies/companiesActions";
import officesActions from "./offices/officesActions";
import divisionsActions from "./divisions/divisionsActions";
import departmentsActions from "./departments/departmentsActions";
import groupsActions from "./groups/groupsActions";
import users from "./user/users";
import userActions from "./user/userActions";
import drop from "./general/drop";
import modal from "./general/modal";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        errorMessage: ''
    },
    mutations: {
        setErrorMessage: (state, errorMessage) => state.errorMessage = errorMessage
    },
    getters: {
        errorMessage: state => state.errorMessage
    },
    modules: {
        contacts,
        companies,
        divisions,
        departments,
        groups,
        offices,
        login,
        infoModal,
        contactActions,
        companiesActions,
        officesActions,
        divisionsActions,
        departmentsActions,
        groupsActions,
        users,
        userActions,
        drop,
        modal
    }
})

contactAPI(store)

export default store;
