<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
        <notification-snackbar v-for="notification in notifications" :value="true" :message="notification.message" :key="notification.message"/>
    </v-app>
</template>

<script>

    import NotificationSnackbar from "@/components/NotificationSnackbar";

    export default {
        name: 'App',

        components: {NotificationSnackbar},

        data: () => ({
            notifications: [
                {
                    message: 'Hello world!!'
                }
            ]
        }),
    };
</script>

<style>
    .v-navigation-drawer__content {
        -ms-overflow-style: none;
        scrollbar-width: none;
        overflow: -moz-scrollbars-none;
    }
    .v-navigation-drawer__content::-webkit-scrollbar {
        display: none;
    }

</style>