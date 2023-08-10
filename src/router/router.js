import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import EmployeeContactManagePage from '../views/EmployeeContactManagePage.vue'
import CompaniesManagePage from '../views/CompaniesManagePage.vue'
import StructureManagePage from '../views/StructureManagePage.vue'
import AdminAccountsPage from '../views/AdminAccountsPage.vue'


Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail/:id', component: DetailedContactPage },
    { path: '/login', component: AdminLoginPage },
    { path: '/employee-manage', component: EmployeeContactManagePage },
    { path: '/company-manage', component: CompaniesManagePage },
    { path: '/structure-manage', component: StructureManagePage },
    { path: '/admin-accounts', component: AdminAccountsPage },
];

const router = new VueRouter({
    routes
});

export default router;