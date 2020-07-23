<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined :disabled="$apollo.loading">
                <v-data-table :headers="dataTable.headers" :items="stockAdjustments" :loading="$apollo.loading"
                              :page.sync="dataTable.page" :search="dataTable.search"
                              @page-count="dataTable.pageCount = $event" hide-default-footer item-key="id">
                    <template v-slot:item.user="{item}">
                        {{item.user.firstName + ' ' + item.user.lastName}}
                    </template>
                    <template v-slot:item.date="{item}">
                        {{(new Date(item.timestamp)).toUTCString()}}
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
        <add-stock-adjustment :active.sync="addDialog" @submit="$apollo.queries.stockAdjustments.refetch()"/>
    </v-layout>
</template>

<script>
    import AddStockAdjustment from '@/dialogs/AddStockAdjustment';
    import {STOCK_ADJUSTMENTS} from '@/graphql/queries';

    export default {
        name: 'ListStockAdjustments',
        components: {AddStockAdjustment},
        data: () => {
            return {
                addDialog: false,
                stockAdjustments: [],
                dataTable: {
                    search: '',
                    page: 1,
                    pageCount: 1,
                    headers: [
                        {text: 'Date', value: 'timestamp'},
                        {text: 'Adjusted By', value: 'user'},
                        {text: 'Reason', value: 'reason'},
                        {text: 'Actions', value: 'actions'},
                    ]
                }
            }
        },
        mounted() {
            this.$utils.setPageTitle('Stock Adjustments');

            this.$topBar.enableAdd();
            this.$topBar.enableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => this.addDialog = true);
            this.$topBar.eventBus.$on('refresh', () => this.$apollo.queries.stockAdjustments.refetch());
        },
        apollo: {
            stockAdjustments: STOCK_ADJUSTMENTS
        }
    };
</script>

<style scoped>

</style>