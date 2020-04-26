<template>
    <v-dialog :value="value" persistent width="500">
        <v-card>
            <v-card-title>
                Add Group
                <v-spacer/>
                <v-btn @click="hideDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <v-form @submit.prevent="handleSubmit" ref="form">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field dense hide-details label="Name"
                                          outlined v-model="group.name"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-select :items="permissions" dense hide-details item-text="name" item-value="id"
                                      label="Permissions" multiple outlined v-model="group.permissions"/>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-btn @click="hideDialog" color="red" dark outlined>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import {PERMISSIONS} from '@/graphql/queries';
    import {ADD_GROUP} from '@/graphql/mutations';

    export default {
        name: 'AddGroup',
        props: {
            value: Boolean
        },
        data: function () {
            return {
                permissions: [],
                group: {
                    name: '',
                    permissions: []
                }
            }
        },
        methods: {
            handleInput: function ( value ) {
                this.$emit( 'input', value )
            },
            hideDialog: function () {
                this.$refs.form.reset();
                this.handleInput( false );
            },
            handleSubmit: function () {
                this.$apollo.mutate( { mutation: ADD_GROUP, variables: this.group } )
                    .then( () => {
                        this.$emit( 'after-submit' );
                        this.hideDialog();
                    } )
            }
        },
        apollo: {
            permissions: PERMISSIONS,
        }
    }
</script>

<style scoped>

</style>
