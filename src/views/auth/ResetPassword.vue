<template>
    <v-row justify="center">
        <v-col lg="3" md="4">
            <v-card class="py-6 px-6" outlined :loading="$apollo.loading" :disabled="$apollo.loading">
                <v-card-title class="justify-center">Reset Password</v-card-title>
                <v-card-text>
                    <validation-observer v-slot="{invalid}">
                        <v-form @submit.prevent="onSubmit">
                            <v-flex>
                                <validation-provider rules="required" v-slot="{errors}" vid="password">
                                    <v-text-field :error-messages="errors" autocomplete="new-password" dense label="Password" outlined
                                                  type="password" v-model="password"/>
                                </validation-provider>
                            </v-flex>
                            <v-flex>
                                <validation-provider rules="required|confirmed:password" v-slot="{errors}">
                                    <v-text-field :error-messages="errors" autocomplete="new-password" dense label="Re-type Password"
                                                  outlined
                                                  type="password" v-model="passwordConfirmation"/>
                                </validation-provider>
                            </v-flex>
                            <v-flex class="d-flex justify-center">
                                <v-btn :disabled="invalid" block color="primary" depressed type="submit">Reset</v-btn>
                            </v-flex>
                        </v-form>
                    </validation-observer>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    import {extend} from 'vee-validate';
    import {confirmed} from 'vee-validate/dist/rules';
    import {PASSWORD_RESET_TOKEN_IS_VALID} from '@/graphql/queries';
    import {RESET_PASSWORD} from '@/graphql/mutations';

    extend('confirmed', {
        ...confirmed,
        message: 'Password\'s do not match'
    });

    export default {
        name: 'ResetPassword',
        components: {},
        data() {
            return {
                email: undefined,
                token: undefined,
                password: '',
                passwordConfirmation: ''
            };
        },
        methods: {
            onSubmit() {
                this.$apollo.mutate({
                    mutation: RESET_PASSWORD,
                    variables: {
                        email: this.email,
                        token: this.token,
                        password: this.password
                    }})
                .then(() => {
                    this.$router.push({name: 'login'});
                })
            }
        },
        mounted() {
            this.$utils.setPageTitle('Reset Password');

            const email = this.$route.query['email'];
            const token = this.$route.query['token'];

            if (!email || !token)
                this.$router.push({name: 'login'});

            this.$apollo.query({query: PASSWORD_RESET_TOKEN_IS_VALID, variables: {email, token}})
                .then(response => {
                    if (!response['data']['passwordResetTokenIsValid'])
                        this.$router.push({name: 'login'});
                });

            this.email = email;
            this.token = token;
        }
    };
</script>
