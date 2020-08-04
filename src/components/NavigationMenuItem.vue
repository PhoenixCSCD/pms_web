<template>
    <v-list-item :key='item.title' :to='item.path' active-class="white--text" v-if="canActivate">
        <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
    </v-list-item>
</template>

<script>
    export default {
        name: 'NavigationMenuItem',
        props: {
            item: Object
        },
        data: () => ({
            canActivate: false,
        }),
        mounted() {
            this.$utils.hasPermission(this.item.permission)
            .then(hasPermission => this.canActivate = hasPermission)
        }
    };
</script>

<style scoped>

</style>