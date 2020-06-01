<template>
    <v-row justify="center">
        <v-col md="4" lg="3">
        <v-card class="py-6 px-6" outlined>
            <v-card-title class="justify-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                    <v-flex>
                        <v-text-field dense label="Email" outlined type="email" v-model="credentials.email"/>
                    </v-flex>
                    <v-flex>
                        <v-text-field dense label="Password" outlined type="password"
                                      v-model="credentials.password"/>
                    </v-flex>
                    <v-flex class="d-flex justify-center">
                        <v-btn block color="primary" depressed type="submit">Login</v-btn>
                    </v-flex>
                </v-form>
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>

    import {AUTH_DATA} from '@/graphql/queries';

    export default {
        name: 'Login',
        components: {},
        data () {
            return {
                credentials: {
                    email: 'admin@pms.com',
                    password: 'neutron45'
                }
            }
        },
        methods: {
            handleSubmit () {
                this.$apollo.query({query: AUTH_DATA, variables: this.credentials})
                    .then( data => {
                        localStorage.setItem( 'authData', JSON.stringify( data ) );
                        this.$router.push( { name: 'list-users' } )
                    } )
            }
        },
        mounted () {
            this.$utils.setPageTitle( 'Login' );
        }
    }
</script>
