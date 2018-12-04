/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : routes.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : All HTTP REST APIs.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import { Request, Response } from 'express';
import passport from 'passport';
import UserRoutes from './user_routes';
import { Constants } from '../shared';
import config from '../server/config.json';
import logger from '../diagnostic/logger';

export function initialize(app) {

  logger.debug('Initialize routes...');

  app.use('/api/v1/user', UserRoutes); // User REST APIs
  // app.use('/api/v1/', ServerRoutes); // System

  // Get server configuration details.
  app.get('/', passport.authenticate(Constants.authType.JWT, { session: false }), (req: Request, res: Response) => {
    const packageJson = require('../../package.json');
    res.json({
      app_name: config.app_name,
      version: packageJson.version,
      ip_address: config.http_server.ip_address,
      port: config.http_server.port,
      https: config.http_server.https,
      instance: Constants.IS_PRODUCTION ? 'production' : 'development',
      token_expired_in: config.jwt_token.expire_in + ' '
    });
  });

  /* The 404 Route (ALWAYS Keep this as the last route) */
  app.get('*', (req, res) => {
    res.send('404 Error: API not found.');
    // res.sendFile(path.join(__dirname, 'public/index.html'));
    // res.redirect(301, '/');
  });

  // app.use((req, res, next) => {
  //     if (req.headers['x-forwarded-proto'] === 'http') {
  //         return res.redirect(301, 'https://' + req.headers.host + '/');
  //     } else {
  //         return next();
  //     }
  // });
}

export default this;
