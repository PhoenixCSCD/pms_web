<template>
    <v-snackbar :timeout="5000" :value="value" bottom right>
        {{message}}
        <v-spacer/>
        <v-btn color="white" icon>
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'NotificationSnackbar',
        props: {
            value: Boolean,
            message: String
        }
    };
</script>

<style scoped>

</style>