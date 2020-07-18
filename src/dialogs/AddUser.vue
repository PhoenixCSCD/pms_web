<template>
    <v-dialog :value="value" persistent width="800">
        <v-card>
            <v-card-title>
                Add User
                <v-spacer/>
                <v-btn @click="hideDialog" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <validation-observer ref="form" v-slot="{invalid}">
                <v-form @submit.prevent="handleSubmit">
                    <v-card-text>
                        <v-row>
                            <v-col md="8">

                                <v-row>
                                    <v-col md="6">
                                        <validation-provider rules="required" v-slot="{errors}">
                                            <v-text-field :error-messages="errors" dense hide-details="auto" label="First Name"
                                                          outlined v-model="user.firstName"/>
                                        </validation-provider>
                                    </v-col>
                                    <v-col md="6">
                                        <validation-provider rules="required" v-slot="{errors}">
                                            <v-text-field :error-messages="errors" dense hide-details="auto" label="Last Name"
                                                          outlined v-model="user.lastName"/>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <validation-provider rules="required" v-slot="{errors}">
                                            <v-select :error-messages="errors" :items="genderOptions" dense hide-details="auto"
                                                      label="Gender" outlined v-model="user.gender"/>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-menu :close-on-content-click="false" absolute offset-y
                                                transition="scale-transition">
                                            <v-date-picker :max="maxDateOfBirth" :min="minDateOfBirth" landscape
                                                           v-model="user.dateOfBirth"/>
                                            <template v-slot:activator="{ on }">
                                                <v-text-field :value="user.dateOfBirth" dense hide-details="auto"
                                                              label="Date of Birth" outlined
                                                              readonly v-model="user.dateOfBirth"
                                                              v-on="on"/>
                                            </template>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <validation-provider rules="required|email|email_unique" v-slot="{errors}">
                                            <v-text-field :error-messages="errors" dense hide-details="auto" label="Email Address"
                                                          outlined v-model="user.email"/>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <validation-provider rules="required" v-slot="{errors}">
                                            <v-text-field :error-messages="errors" dense hide-details="auto" label="Phone Number"
                                                          outlined v-model="user.phoneNumber"/>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-select :items="groups" dense hide-details="auto" item-text="name"
                                                  item-value="id"
                                                  label="Groups" multiple outlined v-model="user.groups"/>
                                    </v-col>
                                </v-row>

                            </v-col>
                            <v-divider vertical/>
                            <v-col>
                                <v-layout align-center column fill-height justify-center>
                                    <v-flex class="d-flex align-center">
                                        <input @change="handleAvatarChange" class="hidden-file-input" id="avatar"
                                               name="avatar"
                                               type="file"/>
                                        <label for="avatar" style="display: inline; border-radius: 100%">
                                            <n-avatar :image="user.avatar" :loading="uploadingAvatar"/>
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
                        <v-btn :disabled="invalid" color="primary" type="submit">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </validation-observer>
        </v-card>
    </v-dialog>
</template>

<script>
    import {GENDER} from '@/options';
    import {ADD_USER} from '@/graphql/mutations';
    import {EMAIL_EXISTS, GROUPS} from '@/graphql/queries';
    import NAvatar from '@/components/NAvatar';
    import {extend} from 'vee-validate';
    import {email} from 'vee-validate/dist/rules';
    import {createClient} from '@/vue-apollo';

    const apolloClient = createClient();
    extend('email', {
        ...email,
        message: 'Invalid email'
    });
    extend('email_unique', {
        message: 'This email has already been used',
        validate: (value) => {
            return new Promise(resolve => {
                apolloClient.query({query: EMAIL_EXISTS, variables: {email: value}})
                    .then((response) => {
                        resolve({valid: !response.data['emailExists']});
                    });
            });
        }
    });
    export default {
        name: 'AddUser',
        components: {NAvatar},
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        data: function () {
            return {
                genderOptions: GENDER || [],
                groups: [],
                uploadingAvatar: false,
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
                temp: {
                    avatarId: ''
                }
            };
        },
        computed: {
            maxDateOfBirth: () => {
                const now = new Date();
                now.setFullYear(now.getFullYear() - 18);
                return now.toISOString();
            },
            minDateOfBirth: () => {
                const now = new Date();
                now.setFullYear(now.getFullYear() - 60);
                return now.toISOString();
            }
        },
        methods: {
            handleInput: function (value) {
                this.$emit('input', value);
            },
            hideDialog: function () {
                this.$refs.form.reset();
                this.handleInput(false);
            },
            handleSubmit: function () {
                this.$apollo.mutate({mutation: ADD_USER, variables: this.user})
                    .then(() => {
                        this.$emit('after-submit');
                        this.hideDialog();
                    });
            },
            handleAvatarChange: function (e) {
                this.uploadingAvatar = true;
                this.$utils.uploadImage(this.user.avatar, e.target.files[0])
                    .then(avatar => {
                        this.user.avatar = avatar;
                        this.uploadingAvatar = false;
                    });
                // if ( this.user.avatar ) {
                //     this.$utils.imageKit.delete( this.user.avatar )
                //         .then( val => val ? 'True oh' : 'Na lie' )
                // }
                // this.$utils.imageKit.upload( e.target.files[0] )
                //     .then( data => {
                //         this.user.avatar = data.url;
                //         this.temp.avatarId = data.fileId;
                //         this.uploadingAvatar = false;
                //     } )
            }
        },
        apollo: {
            groups: GROUPS
        }
    };
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
