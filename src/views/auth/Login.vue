<template>
    <v-flex class="xs12 md5 lg3 xl2">
        <v-card outlined>
            <v-card-title class="justify-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                    <v-flex>
                        <v-text-field dense outlined placeholder="Email" type="email" v-model="credentials.email"/>
                    </v-flex>
                    <v-flex>
                        <v-text-field dense outlined placeholder="Password" type="password"
                                      v-model="credentials.password"/>
                    </v-flex>
                    <v-flex class="d-flex justify-center">
                        <v-btn color="primary" type="submit">Login</v-btn>
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
        data() {
            return {
                credentials: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                console.log("Login with credentials" + JSON.stringify(this.credentials));
            }
        }
    }
</script>
