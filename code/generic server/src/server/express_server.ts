/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : express_server.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Configure express server.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';

import routes from '../routes/routes';
import middleware from './middleware';
import config from './config.json';
import logger from '../diagnostic/logger';

class Server {

  public server: any;
  public app: express.Application;

  constructor() {
    this.app = express();
    middleware.initialize(this.app);
    routes.initialize(this.app);
    this.initialize();
  }

  /**
   * Initialize server configuration.
   */
  private initialize() {

    logger.debug('Initialize express server...');

    logger.debug('Https : ' + config.http_server.https);

    // SSL Certificates
    const options = {
      key: fs.readFileSync(__dirname + '/certificates/private.key'),
      cert: fs.readFileSync(__dirname + '/certificates/certificate.crt')
    };

    // Set server port number.
    const port = this.normalizePort(process.env.PORT || config.http_server.port);
    config.http_server.port = port + '';

    // Enable https
    this.server = config.http_server.https ? https.createServer(options, this.app) :
      http.createServer(this.app);
    this.server.port = config.http_server.https ? '443' : port;

    // Express events handler.
    this.server.on('error', this.onError);
    // this.server.on('listening', this.onListening);
  }

  private normalizePort(val: number | string): number | string | boolean {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return false; }
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') { throw error; }
    const port = config.http_server.port;
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

export default new Server().server;
