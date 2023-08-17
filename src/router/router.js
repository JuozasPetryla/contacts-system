import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import EmployeeContactManagePage from '../views/EmployeeContactManagePage.vue'
import CompaniesManagePage from '../views/CompaniesManagePage.vue'
import StructureManagePage from '../views/StructureManagePage.vue'
import OfficeManagePage from '../views/OfficeManagePage.vue'
import AdminAccountsPage from '../views/AdminAccountsPage.vue'


Vue.use(VueRouter);

const auth = function (to, from, next) {
    if (!localStorage.getItem('user')) {
        next('/login')
    } else {
        next()
    }
}

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail/:id', component: DetailedContactPage },
    { path: '/login', component: AdminLoginPage },
    {
        path: '/employee-manage', component: EmployeeContactManagePage, beforeEnter: (to, from, next) => auth(to, from, next)
    },
    { path: '/company-manage', component: CompaniesManagePage, beforeEnter: (to, from, next) => auth(to, from, next) },
    { path: '/structure-manage', component: StructureManagePage, beforeEnter: (to, from, next) => auth(to, from, next) },
    { path: '/office-manage', component: OfficeManagePage, beforeEnter: (to, from, next) => auth(to, from, next) },
    { path: '/admin-accounts', component: AdminAccountsPage, beforeEnter: (to, from, next) => auth(to, from, next) },
];

const router = new VueRouter({
    mode: 'history',
    routes
});



export default router;