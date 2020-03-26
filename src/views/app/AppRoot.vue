<template>
    <div>
        <v-app-bar app clipped-left color="primary" dark>
            <!--            <v-app-bar-nav-icon @click="navigationDrawer = !navigationDrawer"/>-->
            <v-toolbar-title>PMS</v-toolbar-title>
            <v-spacer/>
            <v-btn @click="notificationDrawer = !notificationDrawer" icon>
                <v-icon>mdi-comment-text</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
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
                notificationDrawer: true
            }
        },
        mounted () {
            this.$utils.setPageTitle( 'App Root' );
        }
    }
</script>

<style scoped>

</style>
