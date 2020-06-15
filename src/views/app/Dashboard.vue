<template>
    <v-container fluid class="pt-10">
        <v-row>
            <v-col>
                <v-card>
                    <v-sheet class="v-card--heading pa-7 text-start " max-height="90" width="90" color="cyan">
                        <v-icon color="white" size="32">mdi-filter</v-icon>
                    </v-sheet>
                    <v-card-text style="margin-top: -80px" class="text-right">
                        Hello
                    </v-card-text>
                    <v-divider/>
                    <v-card-text>
                        World
                    </v-card-text>

                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-sheet class="v-sheet--offset" color="cyan">
                        <v-icon>mdi-filter</v-icon>
                    </v-sheet>
                    <v-card-text>
                        Hello
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-sheet class="v-sheet--offset" color="cyan">
                        <v-icon>mdi-filter</v-icon>
                    </v-sheet>
                    <v-card-text>
                        Hello
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-sheet class="v-sheet--offset" color="cyan">
                        <v-icon>mdi-filter</v-icon>
                    </v-sheet>
                    <v-card-text>
                        Hello
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
<!--        <v-row>-->
<!--            <v-col>-->
<!--                <v-card-->
<!--                        class="mx-auto text-center"-->
<!--                        color="orange"-->
<!--                        dark-->
<!--                        max-width="600"-->
<!--                >-->
<!--                    <v-card-text>-->
<!--                        <v-sheet color="rgba(0, 0, 0, .12)">-->
<!--                            <v-sparkline-->
<!--                                    :labels="labels"-->
<!--                                    :value="value"-->
<!--                                    height="100"-->
<!--                                    padding="10"-->
<!--                                    color="white"-->
<!--                            >-->
<!--                            </v-sparkline>-->
<!--                        </v-sheet>-->
<!--                    </v-card-text>-->

<!--                    <v-card-text>-->
<!--                        <span class="display-1">Sales</span>-->
<!--                    </v-card-text>-->
<!--                </v-card>-->
<!--            </v-col>-->
<!--            <v-col>-->
<!--                <v-card-->
<!--                        class="mx-auto text-center"-->
<!--                        color="green"-->
<!--                        dark-->
<!--                        max-width="600"-->
<!--                >-->
<!--                    <v-card-text>-->
<!--                        <v-sheet color="rgba(0, 0, 0, .12)">-->
<!--                            <v-sparkline-->
<!--                                    :value="value"-->
<!--                                    color="white"-->
<!--                                    height="100"-->
<!--                                    padding="10"-->
<!--                            >-->
<!--                            </v-sparkline>-->
<!--                        </v-sheet>-->
<!--                    </v-card-text>-->

<!--                    <v-card-text>-->
<!--                        <span class="display-1">Supplies</span>-->
<!--                    </v-card-text>-->
<!--                </v-card>-->
<!--            </v-col>-->
<!--        </v-row>-->
    </v-container>
</template>

<script>
    export default {
        name: 'Dashboard',
        data() {
            return {
                labels: [
                    '12am',
                    '3am',
                    '6am',
                    '9am',
                    '12pm',
                    '3pm',
                    '6pm',
                    '9pm',
                ],
                value: [
                    200,
                    675,
                    410,
                    390,
                    310,
                    460,
                    250,
                    240,
                ],
            }
        },
        methods: {
            reduce() {
                if (this.count > 0) this.count--;
            }
        },
        mounted() {
            this.$utils.setPageTitle('Dashboard');
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
