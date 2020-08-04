<template>
    <v-container class="pa-10" fluid>
        <v-row>
            <y-date-field label="Start Date"/>
        </v-row>
        <v-row>
            <v-col>
                <v-card height="100">
                    <v-sheet class="py-5" color="green" height="100" style="text-align: center; position: absolute"
                             width="100">
                        <v-icon color="white" size="64">mdi-chart-timeline-variant</v-icon>
                    </v-sheet>
                    <div class="">
                        <span class="d-flex justify-end pa-2 display-2" style="">312</span>
                        <v-divider/>
                        <span class="d-flex justify-end px-2 py-1 grey--text font-weight-bold">Sales</span>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card height="100">
                    <v-sheet class="py-5" color="orange" height="100" style="text-align: center; position: absolute"
                             width="100">
                        <v-icon color="white" size="64">mdi-cart-arrow-up</v-icon>
                    </v-sheet>
                    <div class="">
                        <span class="d-flex justify-end pa-2 display-1" style="">312</span>
                        <v-divider/>
                        <span class="d-flex justify-end pa-2 grey--text font-weight-bold">Units Sold</span>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card height="100">
                    <v-sheet class="py-5" color="primary" height="100" style="text-align: center; position: absolute"
                             width="100">
                        <v-icon color="white" size="64">mdi-cart-arrow-down</v-icon>
                    </v-sheet>
                    <div class="">
                        <span class="d-flex justify-end pa-2 display-1" style="">312</span>
                        <v-divider/>
                        <span class="d-flex justify-end pa-2 grey--text font-weight-bold">Units in Stock</span>
                    </div>
                </v-card>
            </v-col>
            <v-col>
                <v-card height="100">
                    <v-sheet class="py-5" color="red" height="100" style="text-align: center; position: absolute"
                             width="100">
                        <v-icon color="white" size="64">mdi-cash-multiple</v-icon>
                    </v-sheet>
                    <div class="">
                        <span class="d-flex justify-end pa-2 display-1" style="">312</span>
                        <v-divider/>
                        <span class="d-flex justify-end pa-2 grey--text font-weight-bold">Revenue</span>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-data-table hide-default-footer>

        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: 'Dashboard',
        data() {
            return {
                dataTable: {
                    headers: [
                        {text: 'User', value: 'userFullName'},
                        {text: 'Drug', value: 'drugName'}
                        // {text: }
                    ]
                }
            };
        },
        mounted() {
            this.$utils.setPageTitle('Dashboard');
            this.$topBar.disableAdd();
            this.$topBar.disableDelete();
            this.$topBar.disableRefresh();
        }
    };
</script>

<style scoped>

    .v-card--heading {
        position: relative;
        top: -40px;
        left: 10px;
        z-index: 1;
    }
</style>
