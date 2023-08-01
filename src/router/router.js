import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import EmployeeContactManagePage from '../views/EmployeeContactManagePage.vue'


Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail', component: DetailedContactPage },
    { path: '/login', component: AdminLoginPage },
    { path: '/employee-manage', component: EmployeeContactManagePage },
];

const router = new VueRouter({
    routes
});

export default router;