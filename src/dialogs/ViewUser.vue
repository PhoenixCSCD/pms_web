<template>
    <v-dialog :value="value" @input="handleInput" width="500">
        <v-card>
            <v-card-text>
                <v-layout align-center column>
                    <v-flex>
                        <v-card-text class="justify-center">
                            <n-avatar :image="user.avatar"/>
                        </v-card-text>
                    </v-flex>
                    <v-flex>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td class="text-right">{{ user.firstName }}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td class="text-right">{{ user.lastName }}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td class="text-right">{{ new Date(user.dateOfBirth).toDateString() }}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td class="text-right">{{ user.gender === 'M' ? 'Male' : 'Female' }}</td>
                                </tr>
                                <tr>
                                    <td>Email Address</td>
                                    <td class="text-right">{{ user.email }}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td class="text-right">{{ user.phoneNumber }}</td>
                                </tr>
                                <tr v-if="user.lastLogin">
                                    <td>Last Login</td>
                                    <td class="text-right">{{ user.lastLogin }}</td>
                                </tr>
                                <tr v-if="user.groups && user.groups.length > 0">
                                    <td>Groups</td>
                                    <td class="text-right">{{ user.groups.map(group => group.name).join(', ') }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-flex>
                </v-layout>
            </v-card-text>

            <v-overlay :value="$apollo.loading" absolute>
                <v-progress-circular indeterminate/>
            </v-overlay>
        </v-card>
    </v-dialog>
</template>

<script>
    import {USER} from '@/graphql/queries'
    import avatar from '@/assets/avatar.jpg'
    import NAvatar from '@/components/NAvatar';

    export default {
        name: 'ViewUser',
        components: { NAvatar },
        props: {
            value: {
                type: Boolean,
                required: true
            },
            userId: {
                type: String,
                required: false,
            }
        },
        data: function () {
            return {
                user: {},
                avatar: avatar
            }
        },
        methods: {
            handleInput: function ( value ) {
                this.$emit( 'input', value );
            }
        },
        mounted () {
            console.log( this.userId );
        },
        apollo: {
            user: {
                query: USER,
                update: data => data.userById,
                skip: function () {
                    return !this.userId
                },
                variables: function () {
                    return { id: this.userId }
                }
            }
        }
    }
</script>

<style scoped>

</style>
