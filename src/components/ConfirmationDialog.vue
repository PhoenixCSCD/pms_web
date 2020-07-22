<template>
    <v-dialog :value="value" persistent width="500">
        <v-card>
            <v-card-title class="justify-center">{{title}}</v-card-title>
            <v-card-text class="text-center">
                {{message}}
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn :color="action.color"
                       :key="action.name"
                       :outlined="action.outlined"
                       @click="$emit(`${action.name.toLowerCase()}-click`)"
                       v-for="action in actions">
                    {{action.name}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'ConfirmationDialog',
        props: {
            value: Boolean,
            title: String,
            message: String,
            actions: Array
        }
    };
</script>

<style scoped>

</style>