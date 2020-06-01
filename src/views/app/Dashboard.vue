<template>
    <permission>
    <div>
        <h1>{{count}}</h1>
        <v-btn @click="reduce" color="indigo" dark icon>
            <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn @click="count++" color="indigo" dark icon>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
    </permission>
</template>

<script>
    export default {
        name: 'Dashboard',
        data () {
            return {
                count: 0
            }
        },
        methods: {
            reduce () {
                if ( this.count > 0 ) this.count--;
            }
        },
        mounted () {
            this.$utils.setPageTitle( 'Dashboard' );
        }
    }
</script>

<style scoped>

</style>
