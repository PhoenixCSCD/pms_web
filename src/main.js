import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import utils from '@/plugins/utils'
import graghql from '@/plugins/graghql'

Vue.config.productionTip = false;

Vue.use( utils );
Vue.use( graghql );

new Vue( {
    router,
    store,
    vuetify,
    render: h => h( App )
} ).$mount( '#app' );
