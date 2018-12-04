export class Constants {

  public static IS_PRODUCTION = process.env.NODE_ENV === 'production';

  public static authType = {
    LOCAL: 'local',
    BASIC: 'basic',
    DIGEST: 'digest',
    BEARER: 'bearer',
    JWT: 'jwt'
  };

  public static statusCode = {
    'OK': 200,
    'CREATED': 201,
    'ACCEPTED': 202,
    'NO_CONTENT': 204,
    'MOVED_PERMANENTLY': 301,
    'NOT_MODIFIED': 304,
    'TEMPORARY_REDIRECT': 307,
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'METHOD_NOT_ALLOWED': 405,
    'REQUEST TIMEOUT': 408,
    'CONFLICT': 409,
    'PRECONDITION_FAILED': 412,
    'UNSUPPORTED_MEDIA_TYPE': 415,
    'UNPROCESSABLE_ENTITY': 422,
    'TOO_MANY_REQUESTS': 429,
    'INTERNAL_SERVER_ERROR': 500
  };

  public static msg = {
    CREATE_ACCOUNT_SUCCESS_MOB: 'Your account activation is pending. Please check your number for' +
    'an otp to activate account.',
    CREATE_ACCOUNT_SUCCESS_EMAIL: 'Your account activation is pending.' +
     'Please check your inbox or spam folder for activation email.',
    ACCOUNT_ALREADY_EXIST: 'User with same username already exist. Try to use another username.',
    SERVER_ERROR: 'Server is down. Try after some time.',
    LOGIN_CREDENTIAL_REQUIRED: 'Username & password is required!',
    INVALID_USERNAME: 'Username not found.',
    INVALID_PASSWORD: 'Password is incorrect.',
    APPROVE_ADMIN_ACCOUNT: 'Your account activation is pending by the Administrator.',
  };

}
