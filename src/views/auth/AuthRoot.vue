<template>
    <v-container class="primary" fluid style="height: 100vh">
        <v-row class="py-5">
            <v-col>
                <div class="d-flex justify-center">
                    <v-img contain height="70" src="@/assets/logos/cloud32.png"/>
                </div>
            </v-col>
        </v-row>
        <v-row class="py-5">
            <v-col>
                <div class="d-flex justify-center">
                    <span class="display-1 white--text font-weight-light">Log in to PMS</span>
                </div>
            </v-col>
        </v-row>
        <router-view/>
        <v-row>
            <v-col>
                <div class="d-flex justify-center">
                    <v-btn color="white" text small>Reset Password</v-btn>
                </div>
            </v-col>
        </v-row>
        <div style="width:100%; position: absolute; bottom: 5px ">
            <div class="d-flex justify-center">
            <v-btn color="white" text small>Privacy</v-btn>
            <v-btn color="white" text small>Terms</v-btn>
            <v-btn color="white" text small>Help</v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'AuthRoot'
    }
</script>
