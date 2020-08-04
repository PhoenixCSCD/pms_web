<template>
    <v-menu :close-on-content-click="false" absolute offset-y
            transition="scale-transition">
        <v-time-picker :max="max" :min="min" :value="value"
                       @input="input" landscape scrollable/>
        <template v-slot:activator="{ on }">
            <v-text-field :dense="dense" :error-messages="errorMessages" :label=label
                          :outlined=outlined :value="value"
                          hide-details="auto" readonly
                          v-on="on"/>
        </template>
    </v-menu>
</template>

<script>
    export default {
        name: 'YTimeField',
        props: {
            value: String,
            min: {
                type: String,
                required: false
            },
            max: {
                type: String,
                required: false
            },
            outlined: {
                type: Boolean,
                required: false
            },
            dense: {
                type: Boolean,
                required: false
            },
            label: {
                type: String,
                required: false
            },
            errorMessages: {
                type: Array,
                required: false
            }
        },
        methods: {
            input: function (value) {
                this.$emit('input', value);
            }
        }
    };
</script>

<style scoped>

</style>