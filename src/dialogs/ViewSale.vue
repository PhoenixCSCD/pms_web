<template>
    <v-dialog :value="value" @input="closeDialog" width="600">
        <v-card>
            <v-card-text>
                <v-simple-table>
                    <thead>
                    <th>Drug</th>
                    <th>Quantity</th>
                    <th>Selling Price</th>
                    </thead>
                    <tbody>
                    <tr v-for="saleLine in saleLines" :key="saleLine.id">
                        <td>{{saleLine.drug.name}}</td>
                        <td>{{saleLine.quantity}}</td>
                        <td>{{saleLine.sellingPrice}}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ViewSale",
        props: {
            value: Boolean,
            saleLines: Array
        },
        data: () => ({

        }),
        methods: {
            closeDialog: function () {
                this.$emit('input', false);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>