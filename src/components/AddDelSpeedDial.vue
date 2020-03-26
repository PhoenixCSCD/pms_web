<template>
    <v-speed-dial bottom direction="top" fixed right transition="slide-y-reverse-transition" v-model="speedDial">
        <template v-slot:activator>
            <v-btn color="blue darken-2" dark fab v-model="speedDial">
                <v-icon v-if="speedDial">mdi-close</v-icon>
                <v-icon v-else>mdi-disc</v-icon>
            </v-btn>
        </template>
        <v-btn @click="handleAddClick" color="indigo" dark fab small>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn @click="handleDelClick" color="red" dark fab small>
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {
        name: "AddDelSpeedDial",
        data () {
            return {
                speedDial: true
            }
        },
        methods: {
            handleAddClick: function () {
                this.$emit( 'addClick' );
            },
            handleDelClick: function () {
                this.$emit( 'delClick' );
            }
        }
    }
</script>

<style scoped>

</style>
