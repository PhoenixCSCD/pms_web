<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined>
                <v-data-table :headers="dataTable.headers" :items="sales" :loading="$apollo.loading"
                              :page.sync="dataTable.page" :search="dataTable.search"
                              @page-count="dataTable.pageCount = $event" hide-default-footer item-key="id">
                    <template v-slot:item.attendant="{item}">
                        {{item.attendant.firstName + ' ' + item.attendant.lastName}}
                    </template>
                    <template v-slot:item.time="{item}">
                        {{(new Date(item.timestamp)).toUTCString()}}
                    </template>
                    <template v-slot:item.actions="{item}">
                        <v-btn @click="viewSaleLines(item.saleLines)" icon>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <add-sale :active.sync="addDialog" @complete-submit="$apollo.queries.sales.refetch()"/>
        <view-sale :sale-lines="viewDialogSaleLines" v-model="viewDialog"/>
    </v-layout>
</template>

<script>
    import AddSale from '@/dialogs/AddSale';
    import {SALES} from '@/graphql/queries';
    import ViewSale from "@/dialogs/ViewSale";

    export default {
        name: 'ListSales',
        components: {ViewSale, AddSale},
        data: () => ({
            sales: [],
            addDialog: false,
            viewDialog: false,
            viewDialogSaleLines: [],
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
        methods: {
            viewSaleLines: function (saleLines) {
                this.viewDialogSaleLines = saleLines;
                this.viewDialog = true;
            }
        },
        apollo: {
            sales: SALES,
        },
        mounted() {
            this.$utils.setPageTitle('Sales');
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