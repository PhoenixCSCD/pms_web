<template>
    <v-navigation-drawer :mini-variant="miniVariant" :v-model='true' app color="primary"
                         dark permanent>
        <template v-slot:prepend>
            <v-list-item>
                <v-list-item-icon @click="miniVariant = !miniVariant">
                    <v-icon v-if="miniVariant">mdi-menu</v-icon>
                    <v-icon v-else>mdi-menu-open</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </template>

        <template style="overflow-y: hidden" v-for='section in sections'>
            <v-divider :key='section.title' style="border-color: rgba(255, 255, 255, .3)"/>
            <navigation-menu-item :key='item.title' v-for='item in section.items' :item="item">
            </navigation-menu-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
    import NavigationMenuItem from '@/components/NavigationMenuItem';
    export default {
        name: 'NavigationDrawer',
        components: {NavigationMenuItem},
        props: {
            value: Boolean
        },
        data() {
            return {
                miniVariant: false,
                sections: [
                    {
                        title: 'transactions',
                        items: [
                            {
                                title: 'Dashboard',
                                icon: 'mdi-speedometer',
                                path: {name: 'dashboard'},
                                permission: 'core.view_dashboard',
                            },
                            {
                                title: 'Sales',
                                icon: 'mdi-clipboard-text-outline',
                                path: {name: 'list-sales'},
                                permission: 'dispensary.view_sale',
                            },
                            {
                                title: 'Supplies',
                                icon: 'mdi-clipboard-outline',
                                path: {name: 'list-supplies'},
                                permission: 'inventory.view_supply',
                            },
                            {
                                title: 'Stock Adjustment',
                                icon: 'mdi-book-open-outline',
                                path: {name: 'list-stock-adjustments'},
                                permission: 'inventory.view_stockadjustment',
                            },
                            {
                                title: 'Expired Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'dashboard'},
                                permission: 'inventory.view_expireddrug'
                            }
                        ]
                    },
                    {
                        title: 'setups',
                        items: [
                            {
                                title: 'Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'list-drugs'},
                                permission: 'core.view_drug',
                            },
                            {
                                title: 'Suppliers',
                                icon: 'mdi-account-group',
                                path: {name: 'dashboard'},
                                permission: 'core.view_supplier',
                            },
                            {
                                title: 'Users',
                                icon: 'mdi-account-group',
                                path: {name: 'list-users'},
                                permission: 'core.view_user',
                            },
                            {
                                title: 'Groups',
                                icon: 'mdi-account-cog-outline',
                                path: {name: 'list-groups'},
                                permission: 'core.view_group',
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            handleInput(value) {
                this.$emit('input', value);
            }
        },
        mounted() {
        }
    };
</script>

<style scoped>
    /*#navigationDrawer {*/
    /*    overflow-y: hidden;*/
    /*}*/
</style>
