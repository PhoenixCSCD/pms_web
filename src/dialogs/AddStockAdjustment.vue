<template>
    <v-dialog :value="active" persistent width="80%">
        <v-card>
            <v-card-title>
                Record Stock Adjustment
                <v-spacer/>
                <v-btn color="red" icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <validation-observer ref="form" v-slot="{invalid}">
                <v-form @submit.prevent="submit">
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <validation-provider rules="required" v-slot="{errors}">
                                    <y-date-field :error-messages="errors" dense hide-details="auto" label="Date"
                                                  outlined v-model="form.stockAdjustment.timestamp.date"/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <validation-provider rules="required" v-slot="{errors}">
                                    <y-time-field :error-messages="errors" dense hide-details="auto" label="Time"
                                                  outlined v-model="form.stockAdjustment.timestamp.time"/>
                                </validation-provider>
                            </v-col>
                            <v-col>
                                <validation-provider rules="required" v-slot="{errors}">
                                    <v-text-field :error-messages="errors" dense hide-details="auto" label="Reason"
                                                  outlined v-model="form.stockAdjustment.reason"/>
                                </validation-provider>
                            </v-col>

                        </v-row>
                    </v-container>
                    <v-divider/>
                    <v-card-text style="height: 50vh; overflow-y: auto">
                        <v-data-table show-select :items="form.stockAdjustment.stockAdjustmentLines" hide-default-footer item-key="id" :headers="dataTable.headers" @item-selected="selectRow" @toggle-select-all="selectRows">
                            <template v-slot:item.drug="{item}">
                                <validation-provider v-slot="{errors}">
                                    <v-autocomplete :items="drugs" outlined v-model="item.drugId" dense hide-details item-text="name" item-value="id" :error-messages="errors" @change="getLotNumbers(item)"/>
                                </validation-provider>
                            </template>
                            <template v-slot:item.lotNumber="{item}">
                                <validation-provider v-slot="{errors}">
                                    <v-autocomplete outlined v-model="item.lotNumber" dense hide-details :error-messages="errors" :items="item.lotNumberOptions" @change="getDrugLotStockLevel(item)"/>
                                </validation-provider>
                            </template>
                            <template v-slot:item.quantity="{item}">
                                <validation-provider v-slot="{errors}">
                                    <v-text-field outlined v-model="item.quantity" dense hide-details :error-messages="errors"/>
                                </validation-provider>
                            </template>
                            <template v-slot:item.stockLevel="{item}">
                                <span>{{ item.stockLevel }}</span>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" dark outlined @click="() => {resetForm(); closeDialog()}">Cancel</v-btn>
                        <v-spacer/>
                        <v-btn-toggle dense rounded>
                            <v-btn icon @click="deleteRows">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <v-btn icon @click="addRow">
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
    import {required} from 'vee-validate/dist/rules'
    import {DRUG_BATCH_STOCK_LEVEL, DRUG_LOT_NUMBERS, DRUGS} from '@/graphql/queries'
    import {RECORD_STOCK_ADJUSTMENT} from '@/graphql/mutations'
    import {STOCK_LEVEL_SUBSCRIPTION} from "@/graphql/subscriptions";

    extend('required', {
        ...required,
        message: 'This field is required'
    });

    export default {
        name: "AddStockAdjustment",
        model: {
            prop: 'active',
            event: 'update:active'
        },
        props: {
            active: Boolean
        },
        data: () => ({
            drugs: [],
            form: {
                stockAdjustment: {
                    timestamp: {
                        date: undefined,
                        time: undefined,
                    },
                    reason: '',
                    stockAdjustmentLines: []
                }
            },
            dataTable: {
                headers: [
                    {text: 'Select Drug', value: 'drug'},
                    {text: 'Select LOT Number', value: 'lotNumber'},
                    {text: 'Adjust By', value: 'quantity'},
                    {text: 'Stock Level', value: 'stockLevel'}
                ],
                selectedRows: []
            }
        }),
        methods: {
            closeDialog: function () {
                this.$emit('update:active', false);
            },
            resetForm: function () {
                this.form.stockAdjustment.stockAdjustmentLines.forEach(stockAdjustmentLine => {
                    this.$store.commit('unregisterSubscription', stockAdjustmentLine.id);
                })
                this.form.stockAdjustment.reason = '';
                this.form.stockAdjustment.timestamp.date = this.$utils.getCurrentDateFormatted();
                this.form.stockAdjustment.timestamp.time = this.$utils.getCurrentTimeFormatted();
                this.form.stockAdjustment.stockAdjustmentLines = [];
            },
            addRow: function () {
                this.form.stockAdjustment.stockAdjustmentLines.push({
                    id: uuidv4(),
                    drugId: undefined,
                    lotNumber: undefined,
                    lotNumberOptions: [],
                    quantity: 0,
                    stockLevel: 0
                })
            },
            selectRow: function (data) {
                if (data.value)
                    this.dataTable.selectedRows.push(data.item.id);
                else
                    this.dataTable.selectedRows = this.dataTable.selectedRows.filter(rowId => data.item.id !== rowId);
            },
            deleteRows: function () {
                this.form.stockAdjustment.stockAdjustmentLines = this.form.stockAdjustment.stockAdjustmentLines.filter(
                    stockAdjustmentLine => !this.dataTable.selectedRows.includes(stockAdjustmentLine.id)
                )
            },
            selectRows: function (data) {
                data.items.forEach(item => this.selectRow({item: item, value: data.value}))
            },
            getLotNumbers: function (item) {
                item.lotNumber = undefined;
                this.getDrugLotStockLevel(item);
               this.$apollo.query({query: DRUG_LOT_NUMBERS, variables: {drugId: item.drugId}})
               .then((response => {
                   item.lotNumberOptions = response['data']['drugLotNumbers'];
               }))
            },
            getDrugLotStockLevel: function (item) {
                if (!item.drugId || !item.lotNumber) {
                    item.stockLevel = 0;
                    return ;
                }
                this.$apollo.query({
                    query: DRUG_BATCH_STOCK_LEVEL,
                    variables: {
                        drugId: item.drugId,
                        lotNumber: item.lotNumber
                    },
                    fetchPolicy: 'no-cache'
                }).then(response => {
                    item.stockLevel = response['data']['stockLevel'];
                    this.$store.commit('unregisterSubscription', item.id);

                    const currentSubscription = this.$apollo.subscribe({
                        query: STOCK_LEVEL_SUBSCRIPTION,
                        variables: {
                            drugId: item.drugId,
                            lotNumber: item.lotNumber
                        }
                    });

                    this.$store.commit('registerSubscription', {
                        id: item.id,
                        subscription: currentSubscription.subscribe({
                            next(response) {
                                item.stockLevel = response['data']['stockLevel'];
                            }
                        })
                    })
                })
            },
            sanitizeForSubmit: function () {
                const stockAdjustment = {};
                stockAdjustment.timestamp = new Date(this.form.stockAdjustment.timestamp.date);
                const [hours, minutes] = this.form.stockAdjustment.timestamp.time.split(':');
                stockAdjustment.timestamp.setHours(parseInt(hours));
                stockAdjustment.timestamp.setMinutes(parseInt(minutes));
                stockAdjustment.reason = this.form.stockAdjustment.reason;
                stockAdjustment.stockAdjustmentLines = this.form.stockAdjustment.stockAdjustmentLines.map(stockAdjustmentLine => ({
                    drugId: stockAdjustmentLine.drugId,
                    lotNumber: stockAdjustmentLine.lotNumber,
                    quantity: stockAdjustmentLine.quantity
                }));
                return stockAdjustment;
            },
            submit: function () {
                this.$refs.form.validate().then(success => {
                    if (!success) return;

                    this.$apollo.mutate({mutation: RECORD_STOCK_ADJUSTMENT, variables: this.sanitizeForSubmit()})
                    .then(() => {
                        this.$emit('submit');
                        this.resetForm();
                        this.closeDialog();
                    })
                })
            }
        },
        apollo: {
            drugs: DRUGS
        },
        mounted() {
            this.resetForm();
        }
    }
</script>

<style scoped>

</style>