import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '../views/HomePage.vue'
import DetailedContactPage from '../views/DetailedContactPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import CompaniesManagePage from '../views/CompaniesManagePage.vue'
import StructureManagePage from '../views/StructureManagePage.vue'
import OfficeManagePage from '../views/OfficeManagePage.vue'
import AdminAccountsPage from '../views/AdminAccountsPage.vue'
import DivisionsTable from '../components/structure/structures/DivisionsTable.vue'
import DepartmentsTable from '../components/structure/structures/DepartmentsTable.vue'
import GroupsTable from '../components/structure/structures/GroupsTable.vue'
import ErrorPage from '../views/ErrorPage.vue'

import store from '../store/store'

Vue.use(VueRouter);

const auth = function (to, from, next) {
    const adminPermissions = JSON.parse(localStorage.getItem('pocketbase_auth')).model.permissions_id
    const permissions = store.state.users.currentUserPermissions
    if (!localStorage.getItem('user')) {
        next('/login')
    } else {
        next()
    }

    if (permissions.id !== adminPermissions && to.path === '/admin-accounts') {
        next(from.path)
    } else next()


    if (permissions.edit_employees || permissions.delete_employees) {
        next()
    }
    else if (permissions.edit_companies || permissions.delete_companies) {
        next()
    }
    else if (permissions.edit_offices || permissions.delete_offices) {
        next()
    }
    else if (permissions.edit_structure || permissions.delete_structure) {
        next()
    }
    else {
        next(from.path)
    }
}

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact-detail/:id', component: DetailedContactPage },
    { path: '/login', component: AdminLoginPage },
    { path: '/company-manage', component: CompaniesManagePage, beforeEnter: (to, from, next) => auth(to, from, next) },
    {
        path: '/structure-manage', component: StructureManagePage, children: [
            {
                path: 'divisions',
                component: DivisionsTable
            },
            {
                path: 'departments',
                component: DepartmentsTable
            },
            {
                path: 'groups',
                component: GroupsTable
            },
        ],
        beforeEnter: (to, from, next) => auth(to, from, next)
    },
    { path: '/office-manage', component: OfficeManagePage, beforeEnter: (to, from, next) => auth(to, from, next) },
    { path: '/admin-accounts', component: AdminAccountsPage, beforeEnter: (to, from, next) => auth(to, from, next) },
    { path: '/*', name: 'error', component: ErrorPage },
];

const router = new VueRouter({
    mode: 'history',
    routes
});



export default router;