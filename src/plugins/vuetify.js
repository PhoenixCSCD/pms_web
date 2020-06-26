import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use( Vuetify );

export default new Vuetify( {
    theme: {
        themes: {
            light: {
                primary: '#E55F00'
                // primary: '#390050'
            }
        }
    }
} );
