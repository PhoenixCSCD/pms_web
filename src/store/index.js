import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex );

export default new Vuex.Store( {
    state: {
        pageTitle: '',
        topBar: {
            refresh: false,
            add: true,
            delete: true
        }
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
        }
    },
    actions: {},
    modules: {}
} )
