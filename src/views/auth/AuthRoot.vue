<template>
    <v-container fluid style="height: 100vh; overflow-y: hidden; background-image: url('/bg.jpg')">
        <router-view/>
    </v-container>
</template>

<script>
    export default {
        name: 'AuthRoot'
    };
</script>
