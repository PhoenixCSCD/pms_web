<template>
    <v-speed-dial fixed v-model="speedDial" bottom right direction="top" transition="slide-y-reverse-transition" >
        <template v-slot:activator>
            <v-btn v-model="speedDial" color="blue darken-2" dark fab>
                <v-icon v-if="speedDial">mdi-close</v-icon>
                <v-icon v-else>mdi-disc</v-icon>
            </v-btn>
        </template>
        <v-btn fab dark small color="indigo" @click="$emit('add-click')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click="$emit('del-click')">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {
        name: "AddDelSpeedDial",
        data() {
            return {
                speedDial: true
            }
        }
    }
</script>

<style scoped>

</style>
