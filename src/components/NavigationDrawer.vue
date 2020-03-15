<template>
    <v-navigation-drawer :expand-on-hover="value" :v-model="true" app clipped color="grey darken-3" dark permanent>
        <v-list-item>
            <v-list-item-icon>
                <v-icon @click="() => {handleInput(!value)}">mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Navigation</v-list-item-title>
        </v-list-item>

        <template v-for="section in sections">
            <v-divider :key="section.title"/>
            <v-list-item :key="item.title" :to="item.path" class="white--text" v-for="item in section.items">
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
        name: "NavigationDrawer",
        props: {
            value: Boolean
        },
        data() {
            return {
                sections: [
                    {
                        title: "transactions",
                        items: [
                            {
                                title: 'Dashboard',
                                icon: 'mdi-speedometer',
                                path: {name: 'dashboard'}
                            },
                            {
                                title: 'Dispensary',
                                icon: 'mdi-clipboard-text-outline',
                                path: {name: 'login'}
                            },
                            {
                                title: 'Purchase Order',
                                icon: 'mdi-clipboard-outline',
                                path: {name: 'login'}
                            },
                            {
                                title: 'Stock Adjustment',
                                icon: 'mdi-book-open-outline',
                                path: {name: 'login'}
                            },
                            {
                                title: 'Expired Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'login'}
                            },
                        ]
                    },
                    {
                        title: "setups",
                        items: [
                            {
                                title: 'Drugs',
                                icon: 'mdi-pill',
                                path: {name: 'list-drugs'}
                            },
                            {
                                title: 'Users',
                                icon: 'mdi-account-group-outline',
                                path: {name: 'login'}
                            },
                            {
                                title: 'Suppliers',
                                icon: 'mdi-account-group',
                                path: {name: 'login'}
                            },
                        ]
                    },
                    {
                        title: "add-ons",
                        items: [
                            {
                                title: 'Mail',
                                icon: 'mdi-mail',
                                path: {name: 'login'}
                            },
                            {
                                title: 'Calender',
                                icon: 'mdi-mail',
                                path: {name: 'login'}
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

</style>