import ImageKit from 'imagekit-javascript'
import store from '@/store';

const imageKit = new ImageKit( {
    publicKey: "public_7/xIjAxG2LvxezZFcU5XVjHQv50=",
    // privateKey: 'private_7zgXhRBx6JkdbiffUrT6Iz+RC70=',
    urlEndpoint: "https://ik.imagekit.io/quava",
    authenticationEndpoint: "http://localhost:8000/core/image-kit-signature/"
} );

const utils = {
    setPageTitle: ( title ) => {
        document.title = `${ title } | PMS`;
        store.commit( 'setPageTitle', title );
    },
    imageKit: {
        upload: ( file ) => {
            return new Promise( ( resolve ) => {

                imageKit.upload( {
                    file: file,
                    fileName: file.name,
                    tags: [ 'pms' ]
                }, ( err, response ) => {
                    if ( err )  alert(err);

                    resolve( { url: response.url, fileId: response.fileId } )
                } )
            } );
        },
        transform: ( src, transformation ) => {
            return imageKit.url( {
                src: src,
                transformation: transformation
            } )
        },
        delete: ( url ) => {
            return new Promise( resolve => {
                imageKit.deleteFile( url, ( ) => {
                    // if ( err ) console.log( err );

                    resolve( true );
                } )
            } )
        }
    }
};

export default {
    install ( Vue ) {
        Vue.prototype.$utils = utils;
    }
}

export {utils};
