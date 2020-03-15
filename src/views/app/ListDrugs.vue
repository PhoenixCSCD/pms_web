<template>
    <v-layout class="justify-center align-center py-12">
        <v-flex class="md7">
            <v-card outlined>
                <v-data-table :items="groups" :headers="tableHeaders" show-select caption="Drugs" item-key="id">
                    <template v-slot:item.actions="{}">
                        <v-btn icon color="orange">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-filter</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <add-del-speed-dial @addClick="handleAddClick" @delClick="handleDelClick"/>
    </v-layout>
</template>

<script>
    import AddDelSpeedDial from '@/components/AddDelSpeedDial';

    export default {
        name: "ListDrugs",
        components: {
            AddDelSpeedDial,
        },
        data() {
            return {
                fab: true,
                groups: [],
                tableHeaders: [
                    {text: 'name', value: 'name'},
                    // {text: 'Price (GHS)', value: 'price'},
                    {text: 'Actions', value: 'actions'}
                ],
                drugs: []
            }
        },
        methods: {
            handleAddClick: () => {
                console.log('Add clicked');
            },
            handleDelClick: () => {
                console.log('Del Clicked');
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
