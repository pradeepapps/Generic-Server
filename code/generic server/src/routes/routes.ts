import { Request, Response } from 'express';
import * as path from 'path';

import * as authRoutes from './auth-routes';
import * as userRoutes from './user-routes';
import log from '../diagnostic/logger';

export function initialize(app) {

    const CONFIG = require('../server/config.json');

    app.use((req: Request, res: Response, next) => {
        next();
    });

    app.get('/', (req: Request, res: Response) => {
        const packageJson = require('../../package.json');
        res.json({
            app_name: CONFIG.app_name,
            ip_address: CONFIG.express_server.ip,
            port: CONFIG.express_server.port,
            version: packageJson.version
        });
    });

    app.use(userRoutes);
    app.use(authRoutes);

    // Send all other requests to the Angular app
    app.get('*', (req, res) => {
        res.redirect(301, '/');
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    /* The 404 Route (ALWAYS Keep this as the last route) */
    app.get('/*', (req, res) => {
        res.render('404');
    });

    // app.use((req, res, next) => {
    //     if (req.headers['x-forwarded-proto'] === 'http') {
    //         return res.redirect(301, 'https://' + req.headers.host + '/');
    //     } else {
    //         return next();
    //     }
    // });
}
