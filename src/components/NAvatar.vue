<template>
    <v-avatar :color="color" :height="height" :width="width">
        <v-progress-circular :color="loaderColor" indeterminate v-if="loading"/>
        <v-img :src="`http://localhost:8000/media/${image}`" v-else-if="image"/>
        <span :style="{color: textColor}" class="display-3" v-else-if="alt">{{ alt }}</span>
        <v-icon :color="textColor" large v-else>mdi-camera</v-icon>
    </v-avatar>
</template>

<script>
    export default {
        name: 'NAvatar',
        props: {
            color: {
                type: String,
                default: 'primary'
            },
            textColor: {
                type: String,
                default: 'white'
            },
            height: {
                type: Number,
                default: 200
            },
            loading: {
                type: Boolean,
                default: false
            },
            loaderColor: {
                type: String,
                default: 'white'
            },
            width: {
                type: Number,
                default: 200
            },
            image: String,
            alt: String
        }
    };
</script>

<style scoped>

</style>
