<template>
    <div>
        <add-supply v-model="addDialog"/>
    </div>
</template>

<script>
    import AddSupply from '@/dialogs/AddSupply';

    export default {
        name: 'ListSupplies',
        components: {AddSupply},
        data: () => {
            return {
                addDialog: false
            };
        },
        mounted: function () {
            this.$utils.setPageTitle('Supplies');
            this.$topBar.enableAdd();
            this.$topBar.disableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => this.addDialog = true);
        }
    };
</script>

<style scoped>

</style>