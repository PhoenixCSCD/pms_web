<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},

        data: () => ({
            //
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