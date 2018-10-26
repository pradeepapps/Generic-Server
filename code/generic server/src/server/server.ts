import * as express from 'express';
import * as mongoose from 'mongoose';

import * as Routes from '../routes';
import * as Middleware from './middleware';
import { Config } from './config';
import logger from '../diagnostic/logger';

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.connectMongodb();
        this.handleGlobalError();
        Middleware.initialize(this.app);
        Routes.initialize(this.app);
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

        mongoose.connect(Config.MONGODB_SERVER.url, options, (err) => {
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

export default new Server().app;
