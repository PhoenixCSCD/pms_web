import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/Login'
import AuthRoot from '@/views/auth/AuthRoot'
import AppRoot from '@/views/app/AppRoot'
import Dashboard from '@/views/app/Dashboard'
import ListDrugs from '@/views/app/ListDrugs'
import ListUsers from '@/views/app/ListUsers'

Vue.use( VueRouter );

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthRoot,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
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
                component: Dashboard
            },
            {
                path: 'drugs',
                name: 'list-drugs',
                component: ListDrugs
            },
            {
                path: 'users',
                name: 'list-users',
                component: ListUsers
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
    mode: 'history',
    base: process.env.BASE_URL,
    routes
} );

export default router
