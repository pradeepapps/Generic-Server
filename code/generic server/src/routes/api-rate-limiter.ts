import * as RateLimit from 'express-rate-limit';
import logger from '../diagnostic/logger';

export class ApiLimiter {

    public static DEFAULT = new RateLimit({
        windowMs: 5 * 60 * 1000,  // 5 minutes window
        max: 5000, // start blocking after 5000 requests in 5 minutes
        message: 'Too many requests, please try again later.',
        statusCode: 429,
        headers: true,
        keyGenerator : (req /*, res*/) => {
            logger.info('Request from IP :' + req.ip);
            return req.ip;
        }
    });

    public static NEW_USER = new RateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 5, // start blocking after 5 requests in 1 hour
        message: 'Too many accounts created from this IP, please try again after an hour.'
    });
}
