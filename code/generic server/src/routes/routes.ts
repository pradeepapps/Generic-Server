import * as passport from 'passport';
import { Request, Response } from 'express';

import { AuthRoutes } from './auth-routes';
import { UserRoutes } from './user-routes';
import { Config } from '../server/config';
import { Constants } from '../utilities';

export function initialize(app) {

    new UserRoutes().initialize(app);
    new AuthRoutes().initialize(app);

    app.route('/').get(passport.authenticate(Constants.authType.JWT), (req: Request, res: Response) => {
        res.json({ message: 'Server running on ' + Config.EXPRESS_SERVER.ip + ':' +
         Config.EXPRESS_SERVER.port });
    });
}
