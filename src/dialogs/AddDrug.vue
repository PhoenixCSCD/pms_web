<template>
    <v-dialog :value="active" persistent scrollable width="500">
        <v-card>
            <v-card-title>
                Add Drug
                <v-spacer/>
                <v-btn @click="closeDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-form @submit.prevent="submit" ref="form">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field dense hide-details label="Name" outlined v-model="drug.name"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field dense hide-details label="Selling Price" outlined
                                          v-model="drug.sellingPrice"/>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field dense hide-details label="Cost Price (Pack)" outlined
                                          v-model="drug.costPricePerPack"/>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field dense hide-details label="Qty Per Pack" outlined
                                          v-model="drug.quantityPerPack"/>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-btn @click="closeDialog" color="red" dark outlined>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {ADD_DRUG} from "@/graphql/mutations";

    export default {
        name: 'AddDrug',
        model: {
            prop: 'active',
            event: 'update:active'
        },
        props: {
            active: Boolean,
        },
        data: () => {
            return {
                drug: {
                    name: '',
                    sellingPrice: 0,
                    costPricePerPack: 0,
                    quantityPerPack: 0,
                }
            }
        },
        methods: {
            closeDialog: function () {
                this.$emit('update:active', false);
            },
            submit: function () {
                this.$apollo.mutate({mutation: ADD_DRUG, variables: this.drug})
                    .then(() => {
                        this.$refs.form.reset();
                        this.$emit('complete-submit');
                        this.closeDialog();
                    })

            }
        }
    }
</script>

<style scoped>

</style>
