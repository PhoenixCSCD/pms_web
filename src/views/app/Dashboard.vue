<template>
    <v-container fluid class="pa-10">
        <v-row>
            <y-date-field label="Start Date"/>
        </v-row>
        <v-row>
            <v-col>
                <v-card height="100">
                    <v-sheet color="green" height="100" width="100" class="py-5"
                             style="text-align: center; position: absolute">
                        <v-icon size="64" color="white">mdi-chart-timeline-variant</v-icon>
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
                    <v-sheet color="orange" height="100" width="100" class="py-5"
                             style="text-align: center; position: absolute">
                        <v-icon size="64" color="white">mdi-cart-arrow-up</v-icon>
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
                    <v-sheet color="primary" height="100" width="100" class="py-5"
                             style="text-align: center; position: absolute">
                        <v-icon size="64" color="white">mdi-cart-arrow-down</v-icon>
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
                    <v-sheet color="red" height="100" width="100" class="py-5"
                             style="text-align: center; position: absolute">
                        <v-icon size="64" color="white">mdi-cash-multiple</v-icon>
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
                        {text: 'Drug', value: 'drugName'},
                        // {text: }
                    ]
                }
            }
        },
        mounted() {
            this.$utils.setPageTitle('Dashboard');
            this.$topBar.disableAdd();
            this.$topBar.disableDelete();
            this.$topBar.disableRefresh();
        }
    }
</script>

<style scoped>

    .v-card--heading {
        position: relative;
        top: -40px;
        left: 10px;
        z-index: 1;
    }
</style>
