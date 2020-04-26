<template>
    <div>
        <v-app-bar app class="px-12" color="white" flat tile>
            <span class="display-1">{{$store.state.pageTitle}}</span>
            <v-spacer/>
            <v-text-field @input="emitSearch" background-color="grey lighten-3" clearable flat hide-details
                          prepend-inner-icon="mdi-magnify" solo/>
            <v-spacer/>
            <v-btn :disabled="!$store.state.topBar.refresh" @click="$topBar.eventBus.$emit('refreshClick')" icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn :disabled="!$store.state.topBar.add" @click="$topBar.eventBus.$emit('addClick')" color="primary"
                   icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn :disabled="!$store.state.topBar.delete" @click="$topBar.eventBus.$emit('deleteClick')" color="red"
                   icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-divider inset vertical/>
            <v-btn icon>
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <NavigationDrawer v-model="navigationDrawer"/>
        <NotificationDrawer v-model="notificationDrawer"/>
        <router-view/>
    </div>
</template>

<script>
    import NotificationDrawer from '@/components/NotificationDrawer'
    import NavigationDrawer from '@/components/NavigationDrawer';

    export default {
        name: 'AppRoot',
        components: { NavigationDrawer, NotificationDrawer },
        data () {
            return {
                navigationDrawer: true,
                notificationDrawer: true,
            }
        },
        methods: {
            emitSearch: function ( val ) {
                this.$topBar.eventBus.$emit( 'search', val );
            }
        },
        mounted: function () {
        }
    }
</script>

<style scoped>

</style>
