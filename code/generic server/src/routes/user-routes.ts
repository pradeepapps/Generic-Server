import * as passport from 'passport';

import { UserController } from '../controllers/user-controller';
import { ApiLimiter } from '../routes/api-rate-limiter';
import { Constants } from '../utilities';

export class UserRoutes {

    public userController: UserController = new UserController();

    public initialize(app): void {

        // Create a new user
        app.route('/user').post(ApiLimiter.NEW_USER, this.userController.addNewUser);

        // Get all users
        app.route('/users').get(ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
             { session: false }), this.userController.getUsers);

        app.route('/user/:user_id')

            // get a specific user
            .get(ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
                 { session: false }), this.userController.getUserWithID)

            // update a specific user
            .put(ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
                { session: false }), this.userController.updateUser)

            // delete a specific user
            .delete(ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
                { session: false }), this.userController.deleteUser);
    }
}
