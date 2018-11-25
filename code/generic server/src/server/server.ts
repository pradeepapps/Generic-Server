import * as express from 'express';
import * as mongoose from 'mongoose';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';

import * as Routes from '../routes';
import * as Middleware from './middleware';
import logger from '../diagnostic/logger';

class Server {

    public CONFIG = require('../server/config.json');

    public server;
    public app: express.Application;

    constructor() {
        this.app = express();
        this.connectMongodb();
        Middleware.initialize(this.app);
        Routes.initialize(this.app);
        this.handleGlobalError();
        this.initialize();
    }

    /**
     * Initialize server configuration.
     */
    private initialize() {

        logger.debug('Initialize server configuration...');
        logger.debug('Https mode : ' + this.CONFIG.express_server.https);

        // SSL Certificates
        const options = {
            key: fs.readFileSync(__dirname + '/certificates/private.key'),
            cert: fs.readFileSync(__dirname + '/certificates/certificate.crt')
        };

        // Set server port number.
        this.CONFIG.express_server.port = this.CONFIG.express_server.https ? '443' : this.CONFIG.express_server.port;

        // Enable https
        this.server = this.CONFIG.express_server.https ? https.createServer(options, this.app) :
        http.createServer(this.app);

        // Listen error event on express server.
        this.server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
        });
    }

    /**
     * Setup mongodb connection.
     */
    private connectMongodb(): void {

        logger.debug('Connecting database...');

        const options = {
            useNewUrlParser: true
        };
        mongoose.set('debug', true);
        mongoose.connect(this.CONFIG.mongodb_server.url, options, (err) => {
            if (err) {
                logger.error(err);
            } else {
                logger.info('Database connected.');
            }
        });
    }

    /**
     * Global error handler.
     */
    private handleGlobalError() {
        process.on('uncaughtException', (err) => {
            logger.error('Uncaught Error: ' + err.stack);
        });
    }
}

export default new Server().server;
