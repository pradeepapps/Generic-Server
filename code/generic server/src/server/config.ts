export class Config {

    public static EXPRESS_SERVER = {
        ip: 'localhost',
        port: '3000',
    };

    public static MONGODB_SERVER = {
        url : 'mongodb://pradeep:prdp2989@ds261302.mlab.com:61302/userdb',
    };

    public static JWT_TOKEN = {
        expire_in : 60 * 60 * 1, // ss * mm ** hh - expires in 5 minutes
        secret_key : 'prdp2989',
        algorithm: ['HS256', 'HS384'],
        token_ignore_expiry: false,
        issuer: '',
        audience: ''
    };

    public static LOG = {
        console : {
            state: true
        },
        file: {
            state: true
        }
    };
}
