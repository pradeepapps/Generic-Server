import * as express from 'express';
import * as passport from 'passport';

import { UserController } from '../controllers/user-controller';
import { ApiLimiter } from '../routes/api-rate-limiter';
import { Constants } from '../utilities';

const router = express.Router();
const userController: UserController = new UserController();

// Create a new user
router.post('/user', ApiLimiter.NEW_USER, userController.addNewUser);

// Get all users
router.get('/users', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
    { session: false }), userController.getUsers);

// Get a specific user
router.get('/user/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
    { session: false }), userController.getUserWithID);

// Update a specific user
router.put('/user/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
    { session: false }), userController.updateUser);

// Delete a specific user
router.delete('/user/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
    { session: false }), userController.deleteUser);

module.exports = router;
