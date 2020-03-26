<template>
    <v-layout class="justify-center align-center py-12">
        <v-flex class="md7">
            <v-card outlined>
<!--                <v-data-table :headers="tableHeaders" :items="groups" caption="Drugs" item-key="id" show-select>-->
<!--                    <template v-slot:item.actions="{}">-->
<!--                        <v-btn color="orange" icon>-->
<!--                            <v-icon>mdi-pencil</v-icon>-->
<!--                        </v-btn>-->
<!--                        <v-btn icon>-->
<!--                            <v-icon>mdi-filter</v-icon>-->
<!--                        </v-btn>-->
<!--                    </template>-->
<!--                </v-data-table>-->
            </v-card>
        </v-flex>
        <add-del-speed-dial @addClick="addDialog = true" @delClick="delDialog = true"/>
        <add-user v-model="addDialog"/>
    </v-layout>
</template>

<script>
    import AddDelSpeedDial from '@/components/AddDelSpeedDial';
    import AddUser from '@/dialogs/AddUser';
    export default {
        name: 'ListUsers',
        components: { AddUser, AddDelSpeedDial },
        data: function () {
            return {
                addDialog: false,
                delDialog: false
            }
        }
    }
</script>

<style scoped>

</style>
