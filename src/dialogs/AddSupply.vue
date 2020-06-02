<template>
    <y-dialog :value="value" persistent width="80%" scrollable>
        <template v-slot:title>Add Supply</template>
        <template slot-scope="props">
            <v-form @submit.prevent="handleSubmit" ref="form">
                <v-container fluid>
                    <v-row>
                        <v-col cols="2">
                            <y-date-field label="Supply Date" outlined dense v-model="supply.supplyDate"
                                          hide-details="auto"/>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="Supplier" outlined dense v-model="supply.supplier"
                                          hide-details="auto"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field label="VAT (%)" outlined dense v-model="supply.vatRate" hide-details="auto"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field label="VAT (GHS)" outlined dense v-model="supply.vat" hide-details="auto"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field label="Freight Charge" outlined dense v-model="supply.freightCharge"
                                          hide-details="auto"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field label="Discount" outlined dense v-model="supply.discount"
                                          hide-details="auto"/>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field label="Sub Total" outlined readonly dense hide-details="auto"
                                          v-model="supply.subTotal"/>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field label="Grand Total" outlined readonly hide-details="auto" dense
                                          v-model="supply.grandTotal"/>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider/>
                <v-card-text style="height: 50vh; overflow-y: auto">
                    <v-data-table :headers="dataTable.headers" hide-default-footer :items="supply.supplyLines"
                                  show-select item-key="id" @item-selected="selectSupplyLine"
                                  @toggle-select-all="selectSupplyLines">
                        <template v-slot:item.drug="{item}">
                            <v-autocomplete outlined dense v-model="item.drugId" :items="drugs" item-text="name"
                                            item-value="id" hide-details
                                            @input="(drugId) => presetRowData(item.id, drugId)"/>
                        </template>
                        <template v-slot:item.costPrice="{item}">
                            <v-text-field dense outlined hide-details v-model="item.costPrice"/>
                        </template>
                        <template v-slot:item.lotNumber="{item}">
                            <v-text-field dense outlined hide-details v-model="item.lotNumber"/>
                        </template>
                        <template v-slot:item.quantity="{item}">
                            <v-text-field dense outlined hide-details v-model="item.quantity"/>
                        </template>
                        <template v-slot:item.expiryDate="{item}">
                            <y-date-field dense outlined v-model="item.expiryDate"/>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-btn @click="props.closeDialog" color="red" dark outlined>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn-toggle rounded dense>
                        <v-btn icon @click="removeSupplyLines">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn icon @click="addSupplyLine">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                    <v-spacer/>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-form>
        </template>
    </y-dialog>
</template>

<script>

    import {v4 as uuidv4} from 'uuid'
    import {DRUGS} from "@/graphql/queries";
    import {RECORD_SUPPLY} from "@/graphql/mutations";

    export default {
        name: "AddSupply",
        props: {
            value: Boolean
        },
        data: () => {
            return {
                drugs: [],
                    supply: {
                        supplyDate: undefined,
                        supplier: 'Yuranus Global',
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
            }
        },
        apollo: {
            drugs: DRUGS
        },
        methods: {
            handleInput: function (value) {
                this.$emit('input', value)
            },
            hideDialog: function () {
                this.$refs.form.reset();
                this.handleInput(false);
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
                })
                console.log(supply)
                return supply;
            },
            handleSubmit: function () {
                this.$apollo.mutate({
                    mutation: RECORD_SUPPLY,
                    variables: this.cleanSupplyData()
                })
                .then(data => {
                    console.log(data);
                })
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
                console.log(rowId, drugId)
                const drug = this.drugs.find(drug => drug.id === drugId);
                this.supply.supplyLines.forEach(row => {
                    if (row.id === rowId) row.costPrice = drug.costPricePerPack
                });
            }
        }
    }
</script>

<style scoped>

</style>