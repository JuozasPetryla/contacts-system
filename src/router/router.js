import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail', component: DetailedContactPage },
];

const router = new VueRouter({
    routes
});

export default router;