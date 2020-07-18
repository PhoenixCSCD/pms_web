<template>
    <div>
        <slot v-if="hasPermission"></slot>
    </div>
</template>

<script>
    import {HAS_PERMISSION} from '@/graphql/queries';

    export default {
        props: {
            permission: {
                type: String,
                required: false
            }
        },
        name: 'Permission',
        data: function () {
            return {
                hasPermission: this.permission === undefined
            };
        },
        mounted() {
        },
        apollo: {
            hasPermission: {
                query: HAS_PERMISSION,
                variables: function () {
                    return {permission: this.permission};
                },
                skip: function () {
                    return this.permission === undefined;
                }

            }
        }
    };
</script>

<style scoped>

</style>