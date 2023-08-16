import Vuex from "vuex";
import Vue from "vue";

import contacts from "./contacts";
import companies from "./companies";
import divisions from "./divisions";
import departaments from "./departaments";
import groups from "./groups";
import offices from "./offices";


Vue.use(Vuex);

const store = new Vuex.Store({

    modules: {
        contacts,
        companies,
        divisions,
        departaments,
        groups,
        offices,
    }
})

export default store;
