import http from '@/plugins/http';

const graphql = {
    queries: {
        getUsers: () => {
            const query = '{users {firstName, lastName, id}}';
            graphql.query( query )
                .then( response => console.log( response.data ) );
        },
        getAuthData: ( { email, password } ) => {
            const query = '{' +
                '  authData(email: "' + email + '", password: "' + password + '") {\n' +
                '    token,\n' +
                '    firstName\n' +
                '    lastName\n' +
                '    email\n' +
                '    branches {\n' +
                '      id\n' +
                '      name\n' +
                '    }\n' +
                '  }\n' +
                '}';
            return new Promise( ( resolve ) => {
                graphql.query( query )
                    .then( data => resolve( data ) );
            } );
        }
    },
    mutations: {},
    query: ( query ) => {
        return http.post( 'http://localhost:8000/graphql/', { query: query } )
            .then( response => Promise.resolve( response.data.data ) );
    },
    mutate: ( mutation ) => {
        mutation = `mutation pmsMutation {${ mutation }}`;
        return graphql.query( mutation );
    }
};

export default {
    install ( Vue ) {
        Vue.prototype.$graphql = graphql;
    }
}
