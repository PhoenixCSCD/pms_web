<template>
    <v-snackbar :value="value" bottom right :timeout="5000">
        {{message}}
        <v-spacer/>
            <v-btn icon color="white"><v-icon>mdi-close</v-icon></v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "NotificationSnackbar",
        props: {
            value: Boolean,
            message: String,
        }
    }
</script>

<style scoped>

</style>