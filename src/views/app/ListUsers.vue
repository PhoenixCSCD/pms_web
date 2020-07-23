<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined :disabled="$apollo.loading">
<!--                <v-skeleton-loader type="table-tbody" v-if="$apollo.loading"></v-skeleton-loader>-->
                <v-data-table :headers="dataTable.headers" :items="users" :items-per-page="50"
                              :page.sync="dataTable.page"
                              :search="dataTable.search"
                              @item-selected="handleItemSelected"
                              :loading="$apollo.loading"
                              @page-count="dataTable.pageCount = $event"
                              @toggle-select-all="handleToggleSelectAll"
                              hide-default-footer
                              item-key="id" show-select>
                    <template v-slot:item.actions="{item}">
                        <v-btn @click="() => handleViewClick(item.id)" icon>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn @click="() => handleEditClick(item.id)" color="orange" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="() => handleDelete(item.id)" color="red" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-pagination :length="dataTable.pageCount" v-if="dataTable.pageCount > 1" v-model="dataTable.page"/>
        </v-flex>
        <add-user @after-submit="$apollo.queries.users.refetch()" v-model="addDialog"/>
        <view-user :user-id="activeUserId" v-model="viewDialog"/>
        <edit-user :user-id="activeUserId" @after-submit="$apollo.queries.users.refetch()" v-model="editDialog"/>
        <confirmation-dialog
                :actions="[{name: 'No', color: 'primary', outlined: true}, {name: 'Yes', color: 'primary',}]"
                @no-click="handleDeleteCancelled"
                @yes-click="handleDeleteConfirmed"
                message="You are about to delete users. Are you sure you want to continue?"
                title="Confirm Delete"
                v-model="deleteDialog"
        />
        <confirmation-dialog
                :actions="[{name: 'No', color: 'primary', outlined: true}, {name: 'Yes', color: 'primary',}]"
                @no-click="handleBulkDeleteCancelled"
                @yes-click="handleBulkDeleteConfirmed"
                message="You are about to delete users. Are you sure you want to continue?"
                title="Confirm Delete"
                v-model="bulkDeleteDialog"
        />
    </v-layout>
</template>

<script>
    import AddUser from '@/dialogs/AddUser';
    import {USERS} from '@/graphql/queries';
    import ViewUser from '@/dialogs/ViewUser';
    import EditUser from '@/dialogs/EditUser';
    import ConfirmationDialog from '@/components/ConfirmationDialog';
    import {DELETE_USERS} from '@/graphql/mutations';

    export default {
        name: 'ListUsers',
        components: {ConfirmationDialog, EditUser, ViewUser, AddUser},
        data: function () {
            return {
                addDialog: false,
                editDialog: false,
                deleteDialog: false,
                bulkDeleteDialog: false,
                viewDialog: false,
                users: [],
                dataTable: {
                    pageCount: 1,
                    page: 1,
                    search: '',
                    headers: [
                        {text: 'First Name', value: 'firstName'},
                        {text: 'Last Name', value: 'lastName'},
                        {text: 'Email', value: 'email'},
                        {text: 'Phone Number', value: 'phoneNumber'},
                        {text: 'Actions', value: 'actions'}
                    ]
                },
                selectedUserIds: [],
                activeUserId: ''
            };
        },
        watch: {
            selectedUserIds: function (val) {
                if (val.length > 0)
                    this.$topBar.enableDelete();
                else
                    this.$topBar.disableDelete();
            }
        },
        methods: {
            handleDelete: function (userId) {
                this.activeUserId = userId;
                this.deleteDialog = true;
            },
            handleViewClick: function (userId) {
                this.activeUserId = userId;
                this.viewDialog = true;
            },
            handleEditClick: function (userId) {
                this.activeUserId = userId;
                this.editDialog = true;
            },
            handleItemSelected: function (e) {
                if (e.value)
                    this.selectedUserIds.push(e.item.id);
                else
                    this.selectedUserIds = this.selectedUserIds.filter(userId => userId !== e.item.id);
            },
            handleToggleSelectAll: function (e) {
                if (e.value)
                    this.selectedUserIds = e.items.map(item => item.id);
                else
                    this.selectedUserIds = [];
            },
            handleDeleteConfirmed: function () {
                this.deleteDialog = false;
                this.$apollo.mutate({mutation: DELETE_USERS, variables: {userIds: [this.activeUserId]}})
                .then(() => this.$apollo.queries.users.refetch())
            },
            handleDeleteCancelled: function () {
                this.deleteDialog = false;
            },
            handleBulkDeleteConfirmed: function () {
                this.bulkDeleteDialog = false;
                this.$apollo.mutate({mutation: DELETE_USERS, variables: {userIds: this.selectedUserIds}})
                this.$apollo.queries.users.refetch();
                this.selectedUserIds = [];
            },
            handleBulkDeleteCancelled: function () {
                this.bulkDeleteDialog = false;
            }
        },
        mounted: function () {
            this.$utils.setPageTitle('Users');
            this.$topBar.enableRefresh();
            this.$topBar.enableAdd();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on('refresh', () => {
                this.$apollo.queries.users.refetch();
            });
            this.$topBar.eventBus.$on('add', () => {
                this.addDialog = true;
            });
            this.$topBar.eventBus.$on('delete', () => this.bulkDeleteDialog = true);
            this.$topBar.eventBus.$on('search', (search) => this.dataTable.search = search);
        },
        apollo: {
            users: USERS
        }
    };
</script>

<style scoped>

</style>
