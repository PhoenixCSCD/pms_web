import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoot from '@/views/auth/AuthRoot'
import AppRoot from '@/views/app/AppRoot'

Vue.use( VueRouter );

const loginRequired = (to, from, next) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken === null) next({name: 'login'})
    else next();
};

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'login' }
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthRoot,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/auth/Login')
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('@/views/auth/ResetPassword')
            }
        ]
    },
    {
        path: '/app',
        name: 'app',
        component: AppRoot,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/app/Dashboard'),
                beforeEnter: loginRequired
            },
            {
                path: 'drugs',
                name: 'list-drugs',
                component: () => import('@/views/app/ListDrugs'),
                beforeEnter: loginRequired
            },
            {
                path: 'users',
                name: 'list-users',
                component: () => import('@/views/app/ListUsers'),
                beforeEnter: loginRequired
            },
            {
                path: 'groups',
                name: 'list-groups',
                component: () => import('@/views/app/ListGroups'),
                beforeEnter: loginRequired
            },
            {
                path: 'supplies',
                name: 'list-supplies',
                component: () => import('@/views/app/ListSupplies'),
                beforeEnter: loginRequired
            },
            {
                path: 'sales',
                name: 'list-sales',
                component: () => import('@/views/app/ListSales'),
                beforeEnter: loginRequired
            },
            {
                path: 'stock-adjustments',
                name: 'list-stock-adjustments',
                component: () => import('@/views/app/ListStockAdjustments'),
                beforeEnter: loginRequired
            }
        ]
    },

];

const router = new VueRouter( {
    base: process.env.BASE_URL,
    routes
} );

export default router
