/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : mongodb_server.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Configure mongodb database & connect to mongodb server.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import mongoose from 'mongoose';
import config from './config.json';
import logger from '../diagnostic/logger';

export function initialize(callback): void {

  logger.debug('Initialize mongodb database...');

  // Mongodb console log enable/disable.
  mongoose.set('debug', config.mongodb.logging);

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: false, // Don't build indexes
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    keepAliveInitialDelay: 300000 // Number of milliseconds to wait before initiating keepAlive on the socket
  };

  logger.debug('Connecting mongodb database...');

  mongoose.connect(config.mongodb.url, options, (err) => {
    if (err) {
      if (err.message.indexOf('ECONNREFUSED') !== -1) {
        logger.error('Error: The server was not able to reach MongoDB. Maybe it\'s not running?');
      } else {
        logger.error(err);
      }
      return callback(true, 'Mongodb database connection failed.');
    } else {
      logger.info('Mongodb database connected successfully.');
      return callback(false, 'done');
    }
  });

  const db = mongoose.connection;
  db.on('error', (err) => logger.error('Mongodb Error: ' + err));
  db.on('open', () => logger.info('Mongodb connected.'));
}

export default this;
