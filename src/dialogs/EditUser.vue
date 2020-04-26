<template>
    <v-dialog :value="value" persistent width="800">
        <v-card>
            <v-card-title>
                Edit User
                <v-spacer/>
                <v-btn @click="hideDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <v-form @submit.prevent="handleSubmit" ref="form">
                <v-card-text>
                    <v-row>
                        <v-col md="8">

                            <v-row>
                                <v-col md="6">
                                    <v-text-field dense hide-details label="First Name" outlined
                                                  v-model="user.firstName"/>
                                </v-col>
                                <v-col md="6">
                                    <v-text-field dense hide-details label="Last Name" outlined
                                                  v-model="user.lastName"/>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-select :items="genderOptions" dense hide-details label="Gender"
                                              outlined v-model="user.gender"/>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-menu :close-on-content-click="false" absolute offset-y
                                            transition="scale-transition">
                                        <v-date-picker :max="maxDateOfBirth" :min="minDateOfBirth" landscape
                                                       v-model="user.dateOfBirth"/>
                                        <template v-slot:activator="{ on }">
                                            <v-text-field :value="user.dateOfBirth" dense hide-details
                                                          label="Date of Birth" outlined
                                                          readonly v-model="user.dateOfBirth"
                                                          v-on="on"/>
                                        </template>
                                    </v-menu>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field dense hide-details label="Email Address" outlined
                                                  v-model="user.email"/>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field dense hide-details label="Phone Number" outlined
                                                  v-model="user.phoneNumber"/>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-select :items="groups" dense hide-details item-text="name" item-value="id"
                                              label="Groups" multiple outlined v-model="user.groups"/>
                                </v-col>
                            </v-row>

                        </v-col>
                        <v-divider vertical/>
                        <v-col>
                            <v-layout align-center column fill-height justify-center>
                                <v-flex class="d-flex align-center">
                                    <input class="hidden-file-input" id="avatar" name="avatar" type="file"/>
                                    <label for="avatar" style="display: inline; border-radius: 100%">
                                        <n-avatar :image="user.avatar"/>
                                    </label>
                                </v-flex>
                                <v-flex>
                                    <v-btn color="primary" small text>Clear</v-btn>
                                </v-flex>
                            </v-layout>
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
    import {ADD_USER} from '@/graphql/mutations';
    import {GROUPS, USER} from '@/graphql/queries';
    import {GENDER} from '@/options';
    import NAvatar from '@/components/NAvatar';

    export default {
        name: 'EditUser',
        components: { NAvatar },
        props: {
            value: {
                type: Boolean,
                required: true
            },
            userId: {
                type: String,
                required: true,
            }
        },
        data: function () {
            return {
                user: {
                    firstName: '',
                    lastName: '',
                    gender: '',
                    groups: [],
                    dateOfBirth: '',
                    email: '',
                    phoneNumber: '',
                    avatar: ''
                },

                genderOptions: GENDER || [],
                groups: []
            }
        },
        computed: {
            maxDateOfBirth: () => {
                const now = new Date();
                now.setFullYear( now.getFullYear() - 18 );
                return now.toISOString();
            },
            minDateOfBirth: () => {
                const now = new Date();
                now.setFullYear( now.getFullYear() - 60 );
                return now.toISOString();
            }
        },
        methods: {
            handleInput: function ( value ) {
                this.$emit( 'input', value )
            },
            hideDialog: function () {
                this.handleInput( false );
            },
            handleSubmit: function () {
                this.$apollo.mutate( { mutation: ADD_USER, variables: this.user } )
                    .then( () => {
                        this.$emit( 'after-submit' );
                        this.hideDialog();
                    } )
            }
        },
        apollo: {
            user: {
                query: USER,
                update: data => data['userById'],
                skip: function () {
                    return !this.userId
                },
                variables: function () {
                    return { id: this.userId }
                }
            },
            groups: GROUPS,
        }
    }
</script>

<style scoped>
    .hidden-file-input {
        width: .1px;
        height: .1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
</style>