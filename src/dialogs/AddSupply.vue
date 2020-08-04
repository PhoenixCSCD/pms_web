<template>
    <v-dialog :value="value" persistent scrollable width="80%">
        <v-card>
            <v-card-title>
                Record Supply
                <v-spacer/>
                <v-btn @click="closeDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-form @submit.prevent="onSubmit" ref="form">
                <v-container fluid>
                    <v-row>
                        <v-col cols="2">
                            <y-date-field dense hide-details="auto" label="Supply Date" outlined
                                          v-model="supply.supplyDate"/>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field dense hide-details="auto" label="Supplier" outlined
                                          v-model="supply.supplier"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field @input="computeVat" dense hide-details="auto" label="VAT (%)" outlined
                                          v-model="supply.vatRate"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field @input="computeVatRate" dense hide-details="auto" label="VAT (GHS)" outlined
                                          v-model="supply.vat"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field dense hide-details="auto" label="Freight Charge" outlined
                                          v-model="supply.freightCharge"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field dense hide-details="auto" label="Discount" outlined
                                          v-model="supply.discount"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field dense hide-details="auto" label="Sub Total" outlined readonly
                                          v-model="subTotal"/>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field dense hide-details="auto" label="Grand Total" outlined readonly
                                          v-model="grandTotal"/>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider/>
                <v-card-text style="height: 50vh; overflow-y: auto">
                    <v-data-table :headers="dataTable.headers" :items="supply.supplyLines"
                                  @item-selected="selectSupplyLine"
                                  @toggle-select-all="selectSupplyLines" hide-default-footer item-key="id"
                                  show-select>
                        <template v-slot:item.drug="{item}">
                            <v-autocomplete :items="drugs" @input="(drugId) => presetRowData(item.id, drugId)" dense
                                            hide-details item-text="name"
                                            item-value="id" outlined
                                            v-model="item.drugId"/>
                        </template>
                        <template v-slot:item.costPrice="{item}">
                            <v-text-field dense hide-details outlined v-model="item.costPrice"/>
                        </template>
                        <template v-slot:item.lotNumber="{item}">
                            <v-text-field dense hide-details outlined v-model="item.lotNumber"/>
                        </template>
                        <template v-slot:item.quantity="{item}">
                            <v-text-field dense hide-details outlined v-model="item.quantity"/>
                        </template>
                        <template v-slot:item.expiryDate="{item}">
                            <y-date-field dense outlined v-model="item.expiryDate"/>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-btn @click="() => {clearForm(); closeDialog();}" color="red" dark outlined>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn-toggle dense rounded>
                        <v-btn @click="removeSupplyLines" icon>
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn @click="addSupplyLine" icon>
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                    <v-spacer/>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>

    import {v4 as uuidv4} from 'uuid';
    import {DRUGS} from '@/graphql/queries';
    import {RECORD_SUPPLY} from '@/graphql/mutations';

    export default {
        name: 'AddSupply',
        props: {
            value: Boolean
        },
        data: () => {
            return {
                drugs: [],
                supply: {
                    supplyDate: undefined,
                    supplier: '',
                    vatRate: 0,
                    vat: 0,
                    freightCharge: 0,
                    discount: 0,
                    subTotal: 0,
                    grandTotal: 0,
                    supplyLines: []
                },
                dataTable: {
                    headers: [
                        {text: 'Select Drug', value: 'drug', width: '35%'},
                        {text: 'Cost Price', value: 'costPrice'},
                        {text: 'LOT Number', value: 'lotNumber'},
                        {text: 'Quantity', value: 'quantity'},
                        {text: 'Expiry Date', value: 'expiryDate'}
                    ],
                    selectedRows: []
                }
            };
        },
        apollo: {
            drugs: DRUGS
        },
        methods: {
            closeDialog: function () {
                this.$emit('input', false);
            },
            clearForm: function () {
                this.supply.supplyLines = [];
                this.supply.supplier = '';
                this.supply.supplyDate = undefined;
                this.supply.freightCharge = this.supply.discount = this.supply.vat = this.supply.vatRate = 0;
            },
            cleanSupplyData: function () {
                const supply = {};

                supply.supplyDate = this.supply.supplyDate;
                supply.supplier = this.supply.supplier;
                supply.vat = this.supply.vat;
                supply.freightCharge = this.supply.freightCharge;
                supply.discount = this.supply.discount;

                supply.supplyLines = this.supply.supplyLines.map(supplyLine => {
                    const supplyLine1 = {};
                    supplyLine1.drugId = supplyLine.drugId;
                    supplyLine1.expiryDate = supplyLine.expiryDate;
                    supplyLine1.costPrice = supplyLine.costPrice;
                    supplyLine1.lotNumber = supplyLine.lotNumber;
                    supplyLine1.quantity = supplyLine.quantity;
                    return supplyLine1;
                });
                return supply;
            },
            onSubmit: function () {
                this.$apollo.mutate({
                    mutation: RECORD_SUPPLY,
                    variables: this.cleanSupplyData()
                })
                    .then(() => {
                        this.$emit('submit');
                        this.clearForm();
                        this.closeDialog();
                    });
            },
            addSupplyLine: function () {
                this.supply.supplyLines.push({
                    id: uuidv4(),
                    drugId: '',
                    costPrice: 0,
                    lotNumber: '',
                    quantity: '',
                    expiryDate: ''
                });
            },
            selectSupplyLine: function (data) {
                if (data.value)
                    this.dataTable.selectedRows.push(data.item.id);
                else
                    this.dataTable.selectedRows = this.dataTable.selectedRows.filter(rowId => data.item.id !== rowId);
            },
            removeSupplyLines: function () {
                this.supply.supplyLines = this.supply.supplyLines.filter(supplyLine => !this.dataTable.selectedRows.includes(supplyLine.id));
            },
            selectSupplyLines: function (data) {
                data.items.forEach(item => this.selectSupplyLine({item: item, value: data.value}));
            },
            presetRowData: function (rowId, drugId) {
                const drug = this.drugs.find(drug => drug.id === drugId);
                this.supply.supplyLines.forEach(row => {
                    if (row.id === rowId) row.costPrice = drug.costPricePerPack;
                });
            },
            computeVat: function () {
                this.supply.vat = this.supply.vatRate / 100 * this.subTotal;
            },
            computeVatRate: function () {
                this.supply.vatRate = this.supply.vat / this.subTotal * 100;
            }
        },
        computed: {
            subTotal: function () {
                return this.supply.supplyLines.reduce((accumulator, currentValue) =>
                    accumulator + currentValue.costPrice * currentValue.quantity
                    , 0);
            },
            grandTotal: function () {
                return this.subTotal + parseInt(this.supply.vat) + parseInt(this.supply.freightCharge) - parseInt(this.supply.discount);
            }
        }
    };
</script>

<style scoped>

</style>