<template>
    <v-row justify="center">
        <v-col md="4" lg="3">
            <v-card class="py-6 px-6" outlined>
                <v-card-title class="justify-center">Reset Password</v-card-title>
                <v-card-text>
                    <validation-observer v-slot="{invalid}">
                    <v-form @submit.prevent="handleSubmit">
                        <v-flex>
                            <validation-provider rules="required" vid="password" v-slot="{errors}">
                            <v-text-field dense label="Password" outlined type="password" v-model="password"
                            autocomplete="new-password" :error-messages="errors"/>
                            </validation-provider>
                        </v-flex>
                        <v-flex>
                            <validation-provider rules="required|confirmed:password" v-slot="{errors}">
                            <v-text-field dense label="Re-type Password" outlined type="password" autocomplete="new-password"
                                          v-model="passwordConfirmation" :error-messages="errors"/>
                            </validation-provider>
                        </v-flex>
                        <v-flex class="d-flex justify-center">
                            <v-btn block color="primary" depressed type="submit" :disabled="invalid">Reset</v-btn>
                        </v-flex>
                    </v-form>
                    </validation-observer>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    import {extend} from 'vee-validate'
    import {confirmed} from 'vee-validate/dist/rules'
    import {VERIFY_PASSWORD_RESET_TOKEN} from "@/graphql/mutations";

    extend('confirmed', {
        ...confirmed,
        message: 'Password\'s do not match'
    })

    export default {
        name: 'ResetPassword',
        components: {},
        data() {
            return {
                verifyingToken: true,
                userId: undefined,
                token: undefined,
                password: '',
                passwordConfirmation: '',
            }
        },
        methods: {
            handleSubmit() {
                console.log('Resetting Password!')
            }
        },
        mounted() {
            this.$utils.setPageTitle('Reset Password');

            const userId = this.$route.query['user-id'];
            const token = this.$route.query['token'];

            if (!userId || !token)
                this.$router.push({name: 'login'});

            this.$apollo.mutate({mutation: VERIFY_PASSWORD_RESET_TOKEN, variables: {userId, token}})
            .then(response => {
                if (!response['data']['verifyPasswordResetToken']['valid'])
                    this.$router.push({name: 'login'});
                this.verifyingToken = false;
            })

            this.userId = userId;
            this.token = token
        }
    }
</script>