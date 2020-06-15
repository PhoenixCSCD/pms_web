<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined>
                <v-data-table :search="dataTable.search" :page.sync="dataTable.page" @page-count="dataTable.pageCount = $event" :headers="dataTable.headers" hide-default-footer :items="sales" item-key="id">
                    <template v-slot:item.attendant="{item}">
                        {{item.attendant.firstName + ' ' + item.attendant.lastName}}
                    </template>
                    <template v-slot:item.time="{item}">
                        {{new Date(item.timestamp).getHours() + ' : ' + new Date(item.timestamp).getMinutes()}}
                    </template>
                    <template v-slot:item.actions="{}">
                        <v-btn icon>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <add-sale :active.sync="addDialog"/>
    </v-layout>
</template>

<script>
    import AddSale from "@/dialogs/AddSale";
    import {TODAY_SALES} from "@/graphql/queries";

    export default {
        name: "ListSales",
        components: {AddSale},
        data: () => ({
            sales: [],
            addDialog: false,
            dataTable: {
                search: '',
                page: 1,
                pageCount: 1,
                headers: [
                    {text: 'Time', value: 'time'},
                    {text: 'Attendant', value: 'attendant'},
                    {text: 'Sub Total', value: 'subTotal'},
                    {text: 'Discount', value: 'discount'},
                    {text: 'Grand Total', value: 'grandTotal'},
                    {text: 'Actions', value: 'actions'}
                ]
            }
        }),
        apollo: {
            sales: {
                query: TODAY_SALES,
                update: data => data['todaySales']
            }
        },
        mounted() {
            this.$utils.setPageTitle('Sales')
            this.$topBar.enableAdd();
            this.$topBar.disableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => {
                this.addDialog = true;
            });

            // this.$apollo.subscribe({query: HELLO})
            // .subscribe(response => console.log(response["data"]["hello"]));
        }
    }
</script>

<style scoped>

</style>