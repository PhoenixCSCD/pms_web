<template>
    <v-dialog :value="value" @input="handleInput" width="500">
        <v-card>
            <v-card-text>
                <v-layout align-center column>
                    <v-flex>
                        <v-card-text class="justify-center">
                            <n-avatar :src="user.avatar"/>
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
    import NAvatar from '@/components/NAvatar';

    export default {
        name: 'ViewUser',
        components: {NAvatar},
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
            }
        },
        methods: {
            handleInput: function (value) {
                this.$emit('input', value);
            }
        },
        apollo: {
            user: {
                query: USER,
                update: data => data.userById,
                skip: function () {
                    return !this.userId || !this.value;
                },
                variables: function () {
                    return {id: this.userId}
                }
            }
        }
    }
</script>

<style scoped>

</style>
<!--{"errors":[{"message":"(534, b'5.7.14 <https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbu\\n5.7.14 X5zigM9x9EUFExhltrfpsLhNTBmlN74iQARKwKttDUg9aQpkTKCo9sDbziHsxtPZkmEVZ\\n5.7.14 35JxCGO0sYDy27WlHtF1-RMKc62CQTSzhiY5fNH6E2rQNXISFq5V6lvzUadzAyIl>\\n5.7.14 Please log in via your web browser and then try again.\\n5.7.14  Learn more at\\n5.7.14  https://support.google.com/mail/answer/78754 m32sm1917213qtd.94 - gsmtp')","locations":[{"line":2,"column":3}],"path":["addUser"]}],"data":{"addUser":null}}-->