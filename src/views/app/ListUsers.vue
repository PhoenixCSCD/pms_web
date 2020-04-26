<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined>
                <v-data-table :headers="dataTable.headers" :items="users" :loading="$apollo.loading"
                              @item-selected="handleItemSelected"
                              @toggle-select-all="handleToggleSelectAll"
                              item-key="id" show-select>
                    <template v-slot:item.actions="{item}">
                        <v-btn @click="() => handleViewClick(item.id)" icon>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn @click="() => handleEditClick(item.id)" color="orange" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="() => handleDeleteClick(item.id)" color="red" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <add-user @after-submit="$apollo.queries.users.refetch()" v-model="addDialog"/>
        <view-user :user-id="activeUserId" v-model="viewDialog"/>
        <edit-user :user-id="activeUserId" @after-submit="$apollo.queries.users.refetch()" v-model="editDialog"/>
    </v-layout>
</template>

<script>
    import AddUser from '@/dialogs/AddUser'
    import {USERS} from '@/graphql/queries'
    import ViewUser from '@/dialogs/ViewUser'
    import EditUser from '@/dialogs/EditUser'

    export default {
        name: 'ListUsers',
        components: { EditUser, ViewUser, AddUser },
        data: function () {
            return {
                addDialog: false,
                editDialog: false,
                delDialog: false,
                viewDialog: false,
                users: [],
                dataTable: {
                    headers: [
                        { text: 'First Name', value: 'firstName' },
                        { text: 'Last Name', value: 'lastName' },
                        { text: 'Email', value: 'email' },
                        { text: 'Phone Number', value: 'phoneNumber' },
                        { text: 'Actions', value: 'actions' }
                    ]
                },
                selectedUserIds: [],
                activeUserId: ''
            }
        },
        watch: {
            selectedUserIds: function ( val ) {
                if ( val.length > 0 )
                    this.$topBar.enableDelete();
                else
                    this.$topBar.disableDelete();
            }
        },
        methods: {
            handleViewClick: function ( userId ) {
                this.activeUserId = userId;
                this.viewDialog = true;
            },
            handleEditClick: function ( userId ) {
                this.activeUserId = userId;
                this.editDialog = true;
            },
            handleDeleteClick: function ( userId ) {
                console.log( 'Deletes user with ID ' + userId );
            },
            handleItemSelected: function ( e ) {
                if ( e.value )
                    this.selectedUserIds.push( e.item.id );
                else
                    this.selectedUserIds = this.selectedUserIds.filter( userId => userId !== e.item.id )
            },
            handleToggleSelectAll: function ( e ) {
                if ( e.value )
                    this.selectedUserIds = e.items.map( item => item.id );
                else
                    this.selectedUserIds = [];
            }
        },
        mounted: function () {
            this.$utils.setPageTitle( 'Users' );
            this.$topBar.enableRefresh();
            this.$topBar.enableAdd();
            this.$topBar.disableDelete();

            this.$topBar.eventBus.$on( 'refreshClick', () => {

                this.$apollo.queries.users.refetch();
            } );
            this.$topBar.eventBus.$on( 'addClick', () => {
                this.addDialog = true;
            } );
            this.$topBar.eventBus.$on( 'deleteClick', () => {
                console.log( 'Delete Clicked' )
            } );
        },
        apollo: {
            users: USERS
        }
    }
</script>

<style scoped>

</style>
