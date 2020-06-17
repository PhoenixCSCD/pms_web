<template>
    <v-layout>
        <add-stock-adjustment :active.sync="addDialog"/>
    </v-layout>
</template>

<script>
    import AddStockAdjustment from "@/dialogs/AddStockAdjustment";
    export default {
        name: 'ListStockAdjustments',
        components: {AddStockAdjustment},
        mounted() {
            this.$utils.setPageTitle('Stock Adjustments');

            this.$topBar.enableAdd();
            this.$topBar.disableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => this.addDialog = true);
        },
        data: () => ({
            addDialog: false
        })
    }
</script>

<style scoped>

</style>