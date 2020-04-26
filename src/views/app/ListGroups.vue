<template>
    <v-layout class="justify-center align-center py-10">
        <v-flex class="md12 px-12">
            <v-card outlined>
                <v-data-table :headers="dataTable.headers" :items="groups" :loading="$apollo.loading"
                              item-key="id" show-select>
                    <template v-slot:item.actions="{item}">
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
        <add-group @after-submit="$apollo.queries.groups.refetch()" v-model="addDialog"/>
        <edit-group :group-id="activeGroupId" @after-submit="$apollo.queries.groups.refetch()" v-model="editDialog"/>
    </v-layout>
</template>

<script>
    import {GROUPS} from '@/graphql/queries';
    import AddGroup from '@/dialogs/AddGroup';
    import EditGroup from '@/dialogs/EditGroup';
    import {DELETE_GROUP} from '@/graphql/mutations';

    export default {
        name: 'ListGroups',
        components: { EditGroup, AddGroup },
        data: function () {
            return {
                groups: [],
                addDialog: false,
                editDialog: false,
                activeGroupId: '',
                dataTable: {
                    headers: [
                        { text: 'Name', value: 'name' },
                        { text: 'Actions', value: 'actions', width: '20%' }
                    ]
                },
            }
        },
        methods: {
            handleEditClick: function ( groupId ) {
                this.activeGroupId = groupId;
                this.editDialog = true;
            },
            handleDeleteClick: function ( groupId ) {
                this.$apollo.mutate( { mutation: DELETE_GROUP, variables: {id: groupId} } )
                    .then( () => this.$apollo.queries.groups.refetch() )
            }
        },
        mounted () {
            this.$utils.setPageTitle( 'Groups' );
            this.$topBar.enableRefresh();
            this.$topBar.enableAdd();
            this.$topBar.disableDelete();
            this.$topBar.eventBus.$on( 'addClick', () => {
                this.addDialog = true;
            } )
        },
        apollo: {
            groups: {
                query: GROUPS
            }
        }
    }
</script>

<style scoped>

</style>
