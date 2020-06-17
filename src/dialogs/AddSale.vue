<template>
    <v-dialog :value="active" persistent width="80%">
        <v-card>
            <v-card-title>
                Record Sale
                <v-spacer/>
                <v-btn @click="closeDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <validation-observer ref="form" v-slot="{invalid}">
                <v-form @submit.prevent="submit">
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <validation-provider rules="required" v-slot="{errors}">
                                    <y-date-field :error-messages="errors" dense hide-details="auto" label="Date"
                                                  outlined v-model="sale.timestamp.date"/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <validation-provider rules="required" v-slot="{errors}">
                                    <y-time-field :error-messages="errors" dense hide-details="auto" label="Time"
                                                  outlined v-model="sale.timestamp.time"/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <validation-provider rules="required|maxValue:@subTotal" v-slot="{ errors }">
                                    <v-text-field :error-messages="errors" :max="saleSubTotal" dense
                                                  hide-details label="Discount"
                                                  min="0" outlined type="number"
                                                  v-model.number="sale.discount"/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <validation-provider vid="subTotal">
                                <v-text-field :value="saleSubTotal" dense disabled hide-details="auto"
                                              label="Sub Total"
                                              outlined/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <v-text-field :value="saleGrandTotal" dense disabled hide-details="auto"
                                              label="Grand Total"
                                              outlined/>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider/>
                    <v-card-text style="height: 50vh; overflow-y: auto">
                        <v-data-table :headers="dataTable.headers" :items="sale.saleLines"
                                      @item-selected="selectSaleLine"
                                      @toggle-select-all="selectSaleLines" hide-default-footer item-key="id"
                                      show-select>
                            <template v-slot:item.drug="{item}">
                                <validation-provider rules="required" v-slot="{errors}">
                                <v-autocomplete :items="filterDrugs(item.drugId)" :error-messages="errors"
                                                @input="presetRowData(item.id)" dense hide-details item-text="name"
                                                item-value="id" outlined v-model="item.drugId"/>
                                </validation-provider>
                            </template>
                            <template v-slot:item.quantity="{item}">
                                <validation-provider :rules="`required|maxValue:${item.stockLevel}`" v-slot="{errors}">
                                <v-text-field :readonly="!item.drugId" autocomplete="off" :error-messages="errors"
                                              dense hide-details outlined type="number" v-model.number="item.quantity"/>
                                </validation-provider>
                            </template>
                            <template v-slot:item.sellingPrice="{item}">
                                <span>{{item.sellingPrice}}</span>
                            </template>
                            <template v-slot:item.totalPrice="{item}">
                                <span>{{ item.quantity * item.sellingPrice || 0}}</span>
                            </template>

                            <template v-slot:item.stockLevel="{item}">
                                <span>{{item.stockLevel}}</span>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                        <v-btn @click="() => {resetForm(); closeDialog();}" color="red" dark outlined>Cancel</v-btn>
                        <v-spacer/>
                        <v-btn-toggle dense rounded>
                            <v-btn @click="removeSaleLines" icon>
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <v-btn @click="addSaleLine" icon>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                        <v-spacer/>
                        <v-btn :disabled="invalid" color="primary" type="submit">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </validation-observer>
        </v-card>
    </v-dialog>
</template>

<script>

    import {v4 as uuidv4} from 'uuid'
    import {extend} from 'vee-validate'
    import {required, max_value} from "vee-validate/dist/rules";
    import {DRUG_STOCK_LEVEL, DRUGS} from "@/graphql/queries"
    import {RECORD_SALE} from "@/graphql/mutations"
    import YTimeField from "@/components/YTimeField"
    import {STOCK_LEVEL_SUBSCRIPTION} from "@/graphql/subscriptions"

    extend('required', {
        ...required,
        message: 'This field is required',
    });

    extend('maxValue', max_value);

    export default {
        name: "AddSale",
        components: {YTimeField},
        model: {
            prop: 'active',
            event: 'update:active'
        },
        props: {
            active: Boolean
        },
        data: () => ({
            drugs: [],
            sale: {
                timestamp: {
                    date: undefined,
                    time: undefined,
                },
                discount: 0,
                saleLines: []
            },
            dataTable: {
                headers: [
                    {text: 'Select Drug', value: 'drug', width: '35%'},
                    {text: 'Quantity', value: 'quantity'},
                    {text: 'Unit Price', value: 'sellingPrice'},
                    {text: 'Total Price', value: 'totalPrice'},
                    {text: 'Stock Level', value: 'stockLevel'}
                ],
                selectedRows: [],
                subscriptions: {},
            }
        }),
        computed: {
            selectedDrugIds: function () {
                return this.sale.saleLines.map(saleLine => saleLine.drugId);
            },
            saleSubTotal: function () {
                return this.sale.saleLines.reduce((sum, saleLine,) => sum + saleLine.quantity * saleLine.sellingPrice, 0);
            },
            saleGrandTotal: function () {
                return this.saleSubTotal - this.sale.discount;
            },
        },
        apollo: {
            drugs: DRUGS
        },
        methods: {
            filterDrugs: function (drugId) {
                return this.drugs.filter(drug => !this.selectedDrugIds.includes(drug.id) || drug.id === drugId)
            },
            closeDialog: function () {
                this.$emit('update:active', false);
            },
            submit: function () {
                this.$refs.form.validate().then(success => {
                    if (!success)
                        return

                    this.$apollo.mutate({mutation: RECORD_SALE, variables: this.sanitizeSaleForSubmit()})
                        .then(() => {
                            this.$emit('complete-submit');
                            this.resetForm();
                            // this.$nextTick(() => this.$refs.form.reset())
                            this.closeDialog();
                        })
                })
            },
            addSaleLine: function () {
                this.sale.saleLines.push({
                    id: uuidv4(),
                    drugId: '',
                    sellingPrice: 0,
                    quantity: '',
                    stockLevel: 0,
                });
            },
            selectSaleLine: function (data) {
                if (data.value)
                    this.dataTable.selectedRows.push(data.item.id);
                else
                    this.dataTable.selectedRows = this.dataTable.selectedRows.filter(rowId => data.item.id !== rowId);
            },
            removeSaleLines: function () {
                this.sale.saleLines = this.sale.saleLines.filter(
                    saleLine => !this.dataTable.selectedRows.includes(saleLine.id)
                );
            },
            selectSaleLines: function (data) {
                data.items.forEach(item => this.selectSaleLine({item: item, value: data.value}));
            },
            getDrugSellingPrice: function (drugId) {
                return this.drugs.find(drug => drug.id === drugId).sellingPrice;
            },
            getStockLevelSubscription: function (drugId) {
                return this.$apollo.subscribe({query: STOCK_LEVEL_SUBSCRIPTION, variables: {drugId}});
            },
            presetRowData: function (rowId) {

                this.sale.saleLines.forEach(row => {
                    if (row.id === rowId) {
                        if (row.drugId === null || row.drugId === undefined || row.drugId === '') return;
                        // Get selling Price
                        row.sellingPrice = this.getDrugSellingPrice(row.drugId)

                        // Get current Stock Level at all times
                        this.$apollo.query({
                            query: DRUG_STOCK_LEVEL,
                            variables: {drugId: row.drugId},
                            fetchPolicy: 'no-cache'
                        }).then(response => {
                            row.stockLevel = response["data"]["stockLevel"];
                            this.$store.commit('unregisterSubscription', rowId);

                            const currentSubscription = this.getStockLevelSubscription(row.drugId);

                            this.$store.commit('registerSubscription', {
                                id: rowId,
                                subscription: currentSubscription.subscribe({
                                    next: (response => {
                                        row.stockLevel = response['data']['stockLevel'];
                                    })
                                })
                            })
                        })
                    }
                });
            },
            sanitizeSaleForSubmit: function () {
                const sale = {}
                sale.timestamp = new Date(this.sale.timestamp.date);
                const [hours, minutes] = this.sale.timestamp.time.split(':');
                sale.timestamp.setHours(parseInt(hours));
                sale.timestamp.setMinutes(parseInt(minutes))
                sale.discount = this.sale.discount
                sale.saleLines = this.sale.saleLines.map(saleLine => ({
                    drugId: saleLine.drugId,
                    quantity: saleLine.quantity,
                    sellingPrice: saleLine.sellingPrice
                }));
                return sale;
            },
            resetForm: function () {
                this.sale.discount = 0;
                this.sale.saleLines = []
                this.sale.timestamp.date = this.$utils.getCurrentDateFormatted();
                this.sale.timestamp.time = this.$utils.getCurrentTimeFormatted();
            }
        },
        mounted() {
            this.resetForm();
        }
    }
</script>

<style scoped>

</style>