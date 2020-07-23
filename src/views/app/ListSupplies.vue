<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined :disabled="$apollo.loading">
                <v-data-table :headers="dataTable.headers" :items="supplies" :loading="$apollo.loading"
                              :page.sync="dataTable.page" :search="dataTable.search"
                              @page-count="dataTable.pageCount = $event" hide-default-footer item-key="id">
                    <template v-slot:item.receiver="{item}">
                        {{item.receiver.firstName + ' ' + item.receiver.lastName}}
                    </template>
                    <template v-slot:item.supplyDate="{item}">
                        {{(new Date(item.supplyDate)).toUTCString()}}
                    </template>
                    <template v-slot:item.actions="{}">
                        <v-btn icon>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
                <v-pagination :length="dataTable.pageCount" v-if="dataTable.pageCount > 1" v-model="dataTable.page"/>
            </v-card>
        </v-flex>
        <add-supply v-model="addDialog" @submit="$apollo.queries.supplies.refetch()"/>
    </v-layout>
</template>

<script>
    import AddSupply from '@/dialogs/AddSupply';
    import {SUPPLIES} from '@/graphql/queries';

    export default {
        name: 'ListSupplies',
        components: {AddSupply},
        data: () => {
            return {
                addDialog: false,
                supplies: [],
                dataTable: {
                    search: '',
                    page: 1,
                    pageCount: 1,
                    headers: [
                        {text: 'Date', value: 'supplyDate'},
                        {text: 'Received By', value: 'receiver'},
                        {text: 'Supplier', value: 'supplier'},
                        {text: 'Sub Total', value: 'subTotal'},
                        {text: 'Vat', value: 'vat'},
                        {text: 'Discount', value: 'discount'},
                        {text: 'Freight Charge', value: 'freightCharge'},
                        {text: 'Grand Total', value: 'grandTotal'},
                        {text: 'Actions', value: 'actions'}
                    ]
                }
            };
        },
        mounted: function () {
            this.$utils.setPageTitle('Supplies');
            this.$topBar.enableAdd();
            this.$topBar.enableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => this.addDialog = true);
            this.$topBar.eventBus.$on('refresh', () => this.$apollo.queries.supplies.refetch())
        },
        apollo: {
            supplies: SUPPLIES,
        }
    };
</script>

<style scoped>

</style>