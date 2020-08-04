<template>
    <div>
        <v-app-bar app class="px-12" color="white" flat tile>
            <span class="display-1">{{$store.state.pageTitle}}</span>
            <v-spacer/>
            <v-spacer/>
            <v-text-field @input="emitSearch" background-color="grey lighten-4" clearable flat hide-details
                          prepend-inner-icon="mdi-magnify" solo/>
            <v-btn :disabled="!$store.state.topBar.refresh" @click="$topBar.eventBus.$emit('refresh')" class="mr-1 ml-5"
                   icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn :disabled="!$store.state.topBar.add" @click="$topBar.eventBus.$emit('add')" class="mx-1"
                   color="primary"
                   icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn :disabled="!$store.state.topBar.delete" @click="$topBar.eventBus.$emit('delete')" class="mx-1"
                   color="red"
                   icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-divider inset vertical/>

            <v-btn class="mx-1" icon>
                <v-badge overlap color="primary" content="10" bordered>
                <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
            </v-btn>

            <v-avatar class="mx-1" v-if="user && user.avatar">
                <v-img :src="user.avatar"/>
            </v-avatar>
            <v-btn class="mx-1" icon v-else>
                <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn class="mx-1" icon color="red" @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>

        </v-app-bar>
        <NavigationDrawer v-model="navigationDrawer"/>
        <NotificationDrawer v-model="notificationDrawer"/>
        <router-view/>
    </div>
</template>

<script>
    import NotificationDrawer from '@/components/NotificationDrawer';
    import NavigationDrawer from '@/components/NavigationDrawer';
    import {onLogout} from '@/vue-apollo';

    export default {
        name: 'AppRoot',
        components: {NavigationDrawer, NotificationDrawer},
        data() {
            return {
                navigationDrawer: true,
                notificationDrawer: true,
                user: JSON.parse(localStorage.getItem('user')),
                searchBar: false
            };
        },
        methods: {
            emitSearch: function (val) {
                this.$topBar.eventBus.$emit('search', val);

            },
            logout: function () {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                onLogout(this.$apollo.getClient());
                this.$router.push({name: 'login'});
            }
        },
        mounted: function () {
        }
    };
</script>

<style scoped>

</style>
