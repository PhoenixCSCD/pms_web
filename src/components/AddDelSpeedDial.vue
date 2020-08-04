<template>
    <v-speed-dial bottom direction="top" fixed right transition="slide-y-reverse-transition" v-model="speedDial">
        <template v-slot:activator>
            <v-btn color="blue darken-2" dark fab v-model="speedDial">
                <v-icon v-if="speedDial">mdi-close</v-icon>
                <v-icon v-else>mdi-disc</v-icon>
            </v-btn>
        </template>
        <v-btn :disabled="addDisabled" @click="handleAddClick" color="indigo" fab small>
            <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
        <v-btn :disabled="delDisabled" @click="handleDelClick" color="red" fab small>
            <v-icon color="white">mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {
        name: 'AddDelSpeedDial',
        props: {
            addDisabled: {
                type: Boolean,
                default: false
            },
            delDisabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                speedDial: true
            };
        },
        methods: {
            handleAddClick: function () {
                this.$emit('addClick');
            },
            handleDelClick: function () {
                this.$emit('delClick');
            }
        }
    };
</script>

<style scoped>

</style>
