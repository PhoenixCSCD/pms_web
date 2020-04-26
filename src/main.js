import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import utils from '@/plugins/utils'
import graghql from '@/plugins/graghql'
import {createProvider} from './vue-apollo'
import topBar from '@/plugins/topBar';

Vue.config.productionTip = false;

Vue.use( utils );
Vue.use( graghql );
Vue.use( topBar );

new Vue( {
    router,
    store,
    vuetify,
    apolloProvider: createProvider(),
    render: h => h( App )
} ).$mount( '#app' );
