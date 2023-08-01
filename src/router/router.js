import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'


Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail', component: DetailedContactPage },
    { path: '/login', component: AdminLoginPage },
];

const router = new VueRouter({
    routes
});

export default router;