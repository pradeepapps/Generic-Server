/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : middleware.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Configure middleware for express server.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import compression from 'compression';
import expressValidator from 'express-validator';

import authController from '../controllers/auth_controller';
import { ApiLimiter } from '../routes/api-rate-limiter';
import { LoggerStream } from '../diagnostic/logger';
import config from '../server/config.json';
import logger from '../diagnostic/logger';

export function initialize(app) {

  logger.debug('Initialize middleware...');

  // Protect app from some well-known web vulnerabilities.
  app.use(helmet());

  // Compress response bodies for all request.
  app.use(compression());

  //
  app.use(express.static('public'));
  // app.use('/static', express.static(path.join(__dirname, 'public')))

  // Parse request body to application/json
  app.use(bodyParser.json({ limit: '50mb' }));

  // support text/plain type post data
  // app.use(bodyParser.text());

  // support application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: false }));

  // app.use(require('cookie-parser')());

  // support http logs
  if (config.http_server.logging) {
    app.use(morgan('combined', { stream: new LoggerStream() }));
  }

  // API rate limiter
  app.use(ApiLimiter.DEFAULT);

  // app.use(require('express-session')({
  //     secret: 'keyboard cat',
  //     resave: true,
  //     saveUninitialized: true
  // }));

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Validate request body parameters.
  app.use(expressValidator());

  // Initialize passport strategy.
  // app.use(authController.default.initialize());
  authController.initialize();
}

export default this;
