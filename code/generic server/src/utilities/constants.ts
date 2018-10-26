export class Constants {

    public static IS_PRODUCTION = process.env.NODE_ENV === 'production';

    public static authType = {
        LOCAL: 'local',
        BASIC: 'basic',
        DIGEST: 'digest',
        BEARER: 'bearer',
        JWT: 'jwt'
    };
}
