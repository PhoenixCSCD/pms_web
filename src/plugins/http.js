import Axios from "axios";

// const isHandlerEnabled = (config = {}) => {
//     // eslint-disable-next-line no-prototype-builtins
//     return !(config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled);
// };

const errorHandler = ( error ) => {
    // if (isHandlerEnabled(error.config)) {
    //     if (error.response) {
    //         if (error.response.status === 401) {
    //             window.location = process.env.VUE_APP_LOGIN_URL;
    //         } else if (error.response.status === 500) {
    //             notifier.notifications.error('Something unexpected happened');
    //         } else {
    //             notifier.notifications.error(error.response.data.detail);
    //         }
    //     } else {
    //         notifier.notifications.error('Server is unreachable');
    //     }
    // }
    return Promise.reject( { ...error } )
};

const successHandler = ( response ) => {
    return response;
};

const headers = {
    'Content-Type': 'application/json',
};

// const user = localStorage.getItem('access_token');
//
// if (user)
//     headers['Authorization'] = `Bearer ${localStorage.getItem('access_token').toString()}`;

const http = Axios.create( {
    headers: headers
} );

http.interceptors.request.use( request => {
    const authData = JSON.parse( localStorage.getItem( 'authData' ) );
    console.log( authData );

    if ( authData )
        request.headers['Authorization'] = `Bearer ${ authData.token }`;

    return request;
} );

http.interceptors.response.use(
    response => successHandler( response ),
    error => errorHandler( error )
);

export default http;
