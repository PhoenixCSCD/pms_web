<template>
    <v-dialog :value="value" persistent width="500">
        <v-card>
            <v-card-title>
                Add User
                <v-spacer/>
                <v-btn @click="() => { handleInput( false ) }" color="red" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider/>
            <v-form>
                <v-card-text>
                    <v-text-field outlined dense label="First Name"/>
                    <v-text-field outlined dense label="Last Name"/>
                    <v-select outlined dense label="Gender" :items="genderOptions"/>
                    <v-select outlined dense label="Date of Birth"/>
                    <v-text-field outlined dense label="Email Address"/>
                    <v-text-field outlined dense label="Phone Number"/>
                </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import { GENDER } from '@/options'

    export default {
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        name: 'AddUser',
        data: function () {
            return {
                genderOptions: GENDER || []
            }
        },
        methods: {
            handleInput: function ( value ) {
                this.$emit( 'input', value )
            }
        },
    }
</script>

<style scoped>

</style>
