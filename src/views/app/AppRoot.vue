<template>
    <div>
        <v-app-bar app class="px-12" color="white" flat tile>
            <span class="display-1">{{$store.state.pageTitle}}</span>
            <v-spacer/>
            <v-text-field @input="emitSearch" background-color="grey lighten-3" clearable flat hide-details
                          prepend-inner-icon="mdi-magnify" solo/>
            <v-spacer/>
            <v-btn class="mx-1" :disabled="!$store.state.topBar.refresh" @click="$topBar.eventBus.$emit('refresh')" icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn class="mx-1" :disabled="!$store.state.topBar.add" @click="$topBar.eventBus.$emit('add')" color="primary"
                   icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn class="mx-1" :disabled="!$store.state.topBar.delete" @click="$topBar.eventBus.$emit('delete')" color="red"
                   icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-divider inset vertical/>
            <v-btn icon class="mx-1">
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
            <v-avatar v-if="user && user.avatar" class="mx-1">
                <v-img :src="`http://localhost:8000/media/${user['avatar']}`"/>
            </v-avatar>
            <v-btn class="mx-1" icon v-else>
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
                user: JSON.parse(localStorage.getItem('user'))
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
