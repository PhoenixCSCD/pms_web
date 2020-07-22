import store from '@/store';
import axios from 'axios';
import {createClient} from "@/vue-apollo";
import {HAS_PERMISSION} from "@/graphql/queries";

const apolloClient = createClient();
const utils = {
    setPageTitle: (title) => {
        document.title = `${title} | PMS`;
        store.commit('setPageTitle', title);
    },
    isValidHttpUrl: (string) => {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    },
    uploadFile: (file) => {
        const formData = new FormData();
        formData.append('file', file)

        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return new Promise(((resolve, reject) => {
            axios.post(process.env.VUE_APP_FILE_UPLOAD_URL, formData, {headers})
                .then(response => {
                    resolve(response.data);
                })
                .catch(() => {
                    reject('Error Uploading file');
                });
        }));
    },
    hasPermission: (permission) => {
        return new Promise((resolve => {
            apolloClient.query({query: HAS_PERMISSION, variables: {permission}})
                .then(response => {
                    resolve(response.data.hasPermission)
                })
        }))

    },
    getCurrentDateFormatted: function () {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()}-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`;
        },
    getCurrentTimeFormatted: function () {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}`;
    }
};

export default {
    install(Vue) {
        Vue.prototype.$utils = utils;
    }
}

export {utils};
