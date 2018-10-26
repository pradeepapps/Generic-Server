import * as winston from 'winston';

import { Config } from '../server/config';

const options = {
    file: {
        level: 'debug',
        filename: __dirname + '/logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true,
        format: winston.format.simple()
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: false
    }
};

const transportList = [];

if (Config.LOG.console.state === true && process.env.NODE_ENV !== 'production') {
    transportList.push(new (winston.transports.Console)(options.console));
}

if (Config.LOG.file.state === true) {
    transportList.push(new winston.transports.File(options.file));
}

const logger = winston.createLogger({
    transports: transportList,
    exceptionHandlers: [
        new winston.transports.File({ filename: __dirname + '/logs/exceptions.log' })
    ],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.json(),
        winston.format.simple()
    ),
    exitOnError: false, // do not exit on handled exceptions
});

const env = process.env.NODE_ENV === 'production' ? 'Production' : 'Development';
logger.debug(env + ' instance...');

export class LoggerStream {
    public write(message: string) {
        logger.info(message);
    }
}

export default logger;
