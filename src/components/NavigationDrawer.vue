<template>
    <v-navigation-drawer :mini-variant="miniVariant" :v-model='true' app color="primary"
                         dark permanent>
        <template v-slot:prepend>
            <v-list-item>
                <v-list-item-icon v-if="miniVariant">
                    <v-responsive>
                        <v-img contain src="@/assets/logos/logo_dark.svg"/>
                    </v-responsive>
                </v-list-item-icon>
                <v-responsive v-else>
                    <v-img contain height="20" src="@/assets/logos/logo.svg"/>
                </v-responsive>
            </v-list-item>
        </template>

        <template v-slot:append>
            <v-btn @click="miniVariant = !miniVariant" block color="transparent">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </template>

        <template style="overflow-y: hidden" v-for='section in sections'>
            <v-divider :key='section.title' style="border-color: rgba(255, 255, 255, .3)"/>
            <v-list-item :key='item.title' :to='item.path' active-class="white--text" v-for='item in section.items'>
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'NavigationDrawer',
        props: {
            value: Boolean
        },
        data() {
            return {
                miniVariant: true,
                sections: [
                    {
                        title: 'transactions',
                        items: [
                            {
                                title: 'Dashboard',
                                icon: 'mdi-speedometer',
                                path: {name: 'dashboard'}
                            },
                            {
                                title: 'Sales',
                                icon: 'mdi-clipboard-text-outline',
                                path: {name: 'list-sales'}
                            },
                            {
                                title: 'Supplies',
                                icon: 'mdi-clipboard-outline',
                                path: {name: 'list-supplies'}
                            },
                            {
                                title: 'Stock Adjustment',
                                icon: 'mdi-book-open-outline',
                                path: {name: 'list-stock-adjustments'}
                            },
                            {
                                title: 'Expired Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'dashboard'}
                            },
                        ]
                    },
                    {
                        title: 'setups',
                        items: [
                            {
                                title: 'Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'list-drugs'}
                            },
                            {
                                title: 'Suppliers',
                                icon: 'mdi-account-group',
                                path: {name: 'dashboard'}
                            },
                            {
                                title: 'Users',
                                icon: 'mdi-account-group',
                                path: {name: 'list-users'}
                            },
                            {
                                title: 'Groups',
                                icon: 'mdi-account-cog-outline',
                                path: {name: 'list-groups'}
                            },
                        ]
                    },
                    {
                        title: 'add-ons',
                        items: [
                            {
                                title: 'Mail',
                                icon: 'mdi-mail',
                                path: {name: 'dashboard'}
                            },
                            {
                                title: 'Calender',
                                icon: 'mdi-mail',
                                path: {name: 'dashboard'}
                            },
                        ]
                    }
                ]
            }
        },
        methods: {
            handleInput(value) {
                this.$emit('input', value)
            }
        }
    }
</script>

<style scoped>
    /*#navigationDrawer {*/
    /*    overflow-y: hidden;*/
    /*}*/
</style>
