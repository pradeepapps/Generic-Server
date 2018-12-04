/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : logger.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Use for logging.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import winston from 'winston';
import CONFIG from '../server/config.json';

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

if (CONFIG.log_output.console === true && process.env.NODE_ENV !== 'production') {
  transportList.push(new (winston.transports.Console)(options.console));
}

if (CONFIG.log_output.file === true) {
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

logger.info('**********************************************************************************');
logger.debug('Environment ' + env + '...');

export class LoggerStream {
  public write(message: string) {
    logger.info(message);
  }
}

export default logger;
