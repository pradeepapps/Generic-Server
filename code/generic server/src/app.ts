/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : app.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Root file.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import expressServer from './server/express_server';
import mongodbServer from './server/mongodb_server';
import nodeMailer from './mailer/node_mailer';
import config from './server/config.json';
import logger from './diagnostic/logger';

/**
 * Initialize mongodb database.
 */
mongodbServer.initialize((err, msg) => {
  err ? logger.error(msg) : startHttpServer();
});

/**
 * Start HTTP server.
 */
function startHttpServer() {

  logger.debug('Starting http server...');

  expressServer.listen(expressServer.port, config.http_server.ip_address, (data) => {
    const addr = expressServer.address();
    logger.debug('HTTP server started successfully.');
    logger.info('HTTP server running on : ' + addr.address + ':' + addr.port);
    logger.info('**********************************************************************************');
  });
}

/**
 * Global error handler.
 */
if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', (er) => {
    logger.error(er);
    nodeMailer.sendSystemMail(config.app_name + ': Error', er.stack);
  });
}
