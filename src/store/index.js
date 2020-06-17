import Vue from 'vue'
import Vuex from 'vuex'
import {v4 as uuidv4} from 'uuid'
Vue.use( Vuex );

export default new Vuex.Store( {
    state: {
        pageTitle: '',
        topBar: {
            refresh: false,
            add: true,
            delete: true
        },
        subscriptions: []
    },
    mutations: {
        setRefresh: function ( state, payload ) {
            state.topBar.refresh = payload;
        },
        setAdd: function ( state, payload ) {
            state.topBar.add = payload;
        },
        setDelete: function ( state, payload ) {
            state.topBar.delete = payload;
        },
        setPageTitle: function ( state, payload ) {
            state.pageTitle = payload;
        },
        registerSubscription: function (state, payload) {
            state.subscriptions.push(payload)
        },
        unregisterSubscription: function (state, id) {
            state.subscriptions = state.subscriptions.filter(subscription => {
                if (subscription.id === id) {
                    subscription.subscription.unsubscribe();
                    return false;
                }
                return true;
            });
        }
    },
    actions: {
        registerSubscription: function ({commit}, subscription) {
            const identifiedSubscription = {id: uuidv4(), subscription}
            commit('registerSubscription', identifiedSubscription);
            return identifiedSubscription.id;
        },

    },
    modules: {}
} )
