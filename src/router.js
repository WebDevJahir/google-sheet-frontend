// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import store from './store/index';
import GoogleSheets from './views/GoogleSheets.vue';
import ReadGoogleSheet from './views/ReadGoogleSheet.vue';
import AddNew from './views/AddNew.vue';
import EditData from './views/EditData.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.getters.isLoggedIn) {
                next({ name: 'Dashboard' });
            } else {
                next();
            }
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/google-sheets',
        name: 'GoogleSheets',
        component: GoogleSheets,
    },
    {
        path: '/read-spreadsheet-data/:id/:docname',
        name: 'ReadGoogleSheets',
        component: ReadGoogleSheet,
    },
    {
        path: '/add-sheet-data/:spreadsheetId/:sheetname',
        name: 'AddNew',
        component: AddNew,
        props: true,
    },
    {
        path: '/edit-sheet-data/:spreadsheetId/:sheetname/:rowId',
        name: 'EditData',
        component: EditData,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn;
    const token = localStorage.getItem('token');
    if (to.name === 'Login') {
        next();
    } else if (!token) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
