<template>
    <div>
        <add-sale :active.sync="addDialog"/>
    </div>
</template>

<script>
    import AddSale from "@/dialogs/AddSale";
    export default {
        name: "ListSales",
        components: {AddSale},
        data: () => ({
           addDialog: false
        }),
        mounted() {
            this.$utils.setPageTitle('Sales')
            this.$topBar.enableAdd();
            this.$topBar.disableRefresh();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('add', () => {this.addDialog = true;});

            // this.$apollo.subscribe({query: HELLO})
            // .subscribe(response => console.log(response["data"]["hello"]));
        }
    }
</script>

<style scoped>

</style>