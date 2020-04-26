import store from '@/store';
import Vue from 'vue';

const topBar = {
    enableRefresh: function () {
        store.commit( 'setRefresh', true );
    },
    disableRefresh: function () {
        store.commit( 'setRefresh', false );
    },
    enableAdd: function () {
        store.commit( 'setAdd', true );
    },
    disableAdd: function () {
        store.commit( 'setAdd', false );
    },
    enableDelete: function () {
        store.commit( 'setDelete', true );
    },
    disableDelete: function () {
        store.commit( 'setDelete', false );
    },
    eventBus: new Vue(),
};

export default {
    install: function ( V ) {
        V.prototype.$topBar = topBar;
    }
}

export {topBar};
