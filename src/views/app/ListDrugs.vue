<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined>
                <v-data-table :search="dataTable.search"  :page.sync="dataTable.page" @page-count="dataTable.pageCount = $event" :headers="dataTable.headers" :items="drugs" item-key="id" show-select :loading="$apollo.loading" hide-default-footer @item-selected="selectRow" @toggle-select-all="selectAllRows">
                    <template v-slot:item.actions="{}">
                        <v-btn color="orange" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon color="red">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-pagination v-if="dataTable.pageCount > 1" v-model="dataTable.page" :length="dataTable.pageCount"/>
        </v-flex>
        <add-drug @complete-submit="$apollo.queries.drugs.refetch()" :active.sync="addDialog"/>
    </v-layout>
</template>

<script>

    import AddDrug from "@/dialogs/AddDrug";
    import {DRUGS} from "@/graphql/queries";
    export default {
        name: "ListDrugs",
        components: {AddDrug},
        data () {
            return {
                addDialog: false,
                dataTable: {
                    page: 1,
                    pageCount: 1,
                    headers: [
                        {text: 'Name', value: 'name'},
                        {text: 'Selling Price', value: 'sellingPrice'},
                        {text: 'Cost Price (Pack)', value: 'costPricePerPack'},
                        {text: 'Qty Per Pack', value: 'quantityPerPack'},
                        {text: 'Actions', value: 'actions'}
                    ],
                    selectedRows: [],
                    search: '',
                },
                drugs: []
            }
        },
        apollo: {
            drugs: DRUGS
        },
        methods: {
            selectRow: function (data) {
                if (data.value)
                    this.dataTable.selectedRows.push(data.item.id);
                else
                    this.dataTable.selectedRows = this.dataTable.selectedRows.filter(rowId => data.item.id !== rowId);
            },
            selectAllRows: function (data) {
                data.items.forEach(item => this.selectRow({item: item, value: data.value}));
            },
            handleAddClick: () => {
            },
            handleDelClick: () => {
            }
        },
        watch: {
            'dataTable.selectedRows': {
                handler: function(selectedRows) {
                    selectedRows.length === 0 ? this.$topBar.disableDelete() : this.$topBar.enableDelete();
                },
                immediate: true
            }
        },
        mounted () {
            this.$utils.setPageTitle('Drugs');
            this.$topBar.enableAdd();
            this.$topBar.enableRefresh();

            this.$topBar.eventBus.$on('add', () => this.addDialog = true)
            this.$topBar.eventBus.$on('refresh', () => this.$apollo.queries.drugs.refetch());
            this.$topBar.eventBus.$on('search', (search) => this.dataTable.search = search);
        }
    }
</script>

<style scoped>

</style>
