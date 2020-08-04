import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import utils from '@/plugins/utils'
import {createProvider} from './vue-apollo'
import topBar from '@/plugins/topBar'
import YDialog from "@/components/YDialog"
import YDateField from "@/components/YDateField"
import Permission from "@/components/Permission"
import YTimeField from "@/components/YTimeField"
import { ValidationProvider, ValidationObserver } from 'vee-validate'

Vue.config.productionTip = false;

Vue.use( utils );
Vue.use( topBar );
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('y-dialog', YDialog);
Vue.component('y-date-field', YDateField);
Vue.component('permission', Permission);
Vue.component('y-time-field', YTimeField);

new Vue( {
    router,
    store,
    vuetify,
    apolloProvider: createProvider(),
    render: h => h( App )
} ).$mount( '#app' );
