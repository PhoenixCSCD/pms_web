const utils = {
    setPageTitle: ( title ) => {
        document.title = `${ title } | PMS`;
    }
};

export default {
    install ( Vue ) {
        Vue.prototype.$utils = utils;
    }
}

export {utils};
