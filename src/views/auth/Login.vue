<template>
    <v-flex class="xs12 md5 lg3">
        <v-card class="pa-12" outlined>
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
    </v-flex>
</template>

<script>

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
                this.$graphql.queries.getAuthData( this.credentials )
                    .then( data => {
                        localStorage.setItem( 'authData', JSON.stringify( data.authData ) );
                        this.$router.push( { name: 'app' } )
                    } )
            }
        },
        mounted () {
            this.$utils.setPageTitle( 'Login' );
        }
    }
</script>
