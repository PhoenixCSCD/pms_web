<template>
    <v-navigation-drawer :value="value" @input="handleInput" absolute color="grey lighten-4" hide-overlay right
                         temporary width="350">
        <v-list-item>
            <v-list-item-title>Notifications</v-list-item-title>
        </v-list-item>
        <v-divider/>
        <v-fade-transition group mode="in-out">
            <template v-for="notification in notifications">
                <v-alert :key="notification.id" :type="notification.type"
                         @input="(val) => {if (val === false) removeNotification(notification.id)}" border="left"
                         class="mx-2"
                         colored-border dense dismissible
                         transition="slide-y-transition">
                    {{notification.message}}
                </v-alert>
            </template>
        </v-fade-transition>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NotificationDrawer",
        props: {
            value: Boolean
        },
        data() {
            return {
                notifications: [
                    {
                        id: 0,
                        message: "Welcome to PMS!",
                        type: "success"
                    },
                    {
                        id: 1,
                        message: "Welcome to PM! cvzdfg  xhz   dz  zg gzg  f gr b rg gdfg fdgs h th hhgfghs h gh sh g fg gs gs y",
                        type: "error"
                    },
                    {
                        id: 2,
                        message: "Welcome to PM!",
                        type: "warning"
                    },
                    {
                        id: 3,
                        message: "Welcome to PM!",
                        type: "info"
                    },
                    {
                        id: 4,
                        message: "Welcome to PM!",
                        // type: ""
                    }
                ]
            }
        },
        methods: {
            handleInput(value) {
                this.$emit('input', value);
            },
            removeNotification(id) {
                this.notifications = this.notifications.filter(notification => {
                    return notification.id !== id
                });
            }
        }
    }
</script>

<style scoped>

</style>
