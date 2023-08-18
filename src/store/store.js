import Vuex from "vuex";
import Vue from "vue";

import contacts from "./contacts";
import companies from "./companies";
import divisions from "./divisions";
import departaments from "./departaments";
import groups from "./groups";
import offices from "./offices";
import login from "./login";
import infoModal from "./infoModal";
import contactActions from "./contactsActions";
import companiesActions from "./companiesActions";
import structureModal from "./structureModal";
import structureChooseModal from "./structureChooseModal";
import officesActions from "./officesActions";
import divisionsActions from "./divisionsActions";
import departmentsActions from "./departmentsActions";
import groupsActions from "./groupsActions";
import users from "./users";
import userActions from "./userActions";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        contacts,
        companies,
        divisions,
        departaments,
        groups,
        offices,
        login,
        infoModal,
        contactActions,
        companiesActions,
        structureModal,
        structureChooseModal,
        officesActions,
        divisionsActions,
        departmentsActions,
        groupsActions,
        users,
        userActions
    }
})

export default store;
