<template>
    <y-dialog :value="value" @input="handleInput" persistent width="500">
        <template v-slot:title>Add Group</template>
        <template slot-scope="props">
            <v-form @submit.prevent="() => handleSubmit(props.closeDialog)" ref="form">
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
                    <v-btn @click="props.closeDialog" color="red" dark outlined>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
            </v-form>
        </template>
    </y-dialog>
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
            handleInput: function (value) {
                this.$emit('input', value)
            },
            hideDialog: function () {
                this.$refs.form.reset();
                this.handleInput(false);
            },
            handleSubmit: function (callback) {
                this.$apollo.mutate({mutation: ADD_GROUP, variables: this.group})
                    .then(() => {
                        this.$refs.form.reset();
                        this.$emit('after-submit');
                        callback();
                    })
            }
        },
        apollo: {
            permissions: PERMISSIONS,
        }
    }
</script>

<style scoped>

</style>
