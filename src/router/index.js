import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/Login'
import AuthRoot from '@/views/auth/AuthRoot'
import AppRoot from '@/views/app/AppRoot'
import Dashboard from '@/views/app/Dashboard'
import ListDrugs from '@/views/app/ListDrugs'
import ListUsers from '@/views/app/ListUsers'
import ListGroups from '@/views/app/ListGroups';
import ListSupplies from "@/views/app/ListSupplies";
import ListSales from "@/views/app/ListSales";
import ResetPassword from "@/views/auth/ResetPassword";

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
                component: Login
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: ResetPassword
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
                component: Dashboard,
                beforeEnter: loginRequired
            },
            {
                path: 'drugs',
                name: 'list-drugs',
                component: ListDrugs,
                beforeEnter: loginRequired
            },
            {
                path: 'users',
                name: 'list-users',
                component: ListUsers,
                beforeEnter: loginRequired
            },
            {
                path: 'groups',
                name: 'list-groups',
                component: ListGroups,
                beforeEnter: loginRequired
            },
            {
                path: 'supplies',
                name: 'list-supplies',
                component: ListSupplies,
                beforeEnter: loginRequired
            },
            {
                path: 'sales',
                name: 'list-sales',
                component: ListSales,
                beforeEnter: loginRequired
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter( {
    base: process.env.BASE_URL,
    routes
} );

export default router
