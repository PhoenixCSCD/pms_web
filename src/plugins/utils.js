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
    uploadImage: (oldImage, image) => {
        const formData = new FormData();
        formData.append('oldImage', oldImage)
        formData.append('image', image)

        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return new Promise(((resolve, reject) => {
            axios.post('http://localhost:8000/upload-image/', formData, {headers})
                .then(response => {
                    resolve(response.data.image);
                })
                .catch(() => {
                    reject('Error Upload file');
                });
        }));
    },
    hasPermission: (permission) => {
        apolloClient.query({query: HAS_PERMISSION, variables: {permission}});
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
