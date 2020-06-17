<template>
    <v-dialog :persistent="persistent" :scrollable="scrollable" :value="active" :width="width">
        <v-card :height="height">
            <v-card-title>
                <slot name="title"/>
                <v-spacer/>
                <v-btn @click="closeDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <slot :closeDialog="closeDialog"/>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "YDialog",
        model: {
            prop: 'active',
            event: 'update:active'
        },
        props: {
            active: Boolean,
            width: {
                type: String,
                required: false,
                default: '25%'
            },
            height: {
                type: String,
                required: false,
                // default: 500
            },
            persistent: {
                type: Boolean,
                required: false,
                default: false
            },
            scrollable: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        methods: {
            closeDialog: function () {
                this.$emit('update:active', false);
            }
        }
    }
</script>

<style scoped>

</style>