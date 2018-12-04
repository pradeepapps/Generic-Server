/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : user_routes.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : User releated HTTP REST APIs.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import express from 'express';
import passport from 'passport';

import userController from '../controllers/user_controller';
import authController from '../controllers/auth_controller';
import { ApiLimiter } from './api-rate-limiter';
import { Constants } from '../shared';

const router = express.Router();

/** GET REST APIs */

// Get all users
router.get('/', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
  { session: false }), userController.getUsers);

// Get a specific user
router.get('/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
  { session: false }), userController.getUserWithID);

// User logout.
router.get('/logout', passport.authenticate(Constants.authType.JWT), (req, res) => {
  res.status(200).send({ token: null });
});

// Get a specific user
router.get('/verify/:token', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
  { session: false }), userController.verifyUserAccount);

/** PUT REST APIs */

// Update a specific user
router.put('/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
  { session: false }), userController.updateUser);

/** POST REST APIs */
// User login
router.post('/login', authController.loginUser);

/**
 * @api {post} /api/v1/user Create a new user account.
 * @apiName CreateUserAccount
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiPermission Un-authenticated user
 *
 * @apiParam {String} name User name.
 * @apiParam {String} username Username may be a unique email_id or mobile number.
 * @apiParam {String} password Use uppercase, lowercase, numeric, special
 * character & at least 6 characters long password.
 *
 * @apiExample {js} Example usage:
 * const data = {
 *  "name": "James Bond",
 *  "username": "jamesbond@mailinator.com",
 *  "password": "Q@q12345",
 *  "confirm_password": "Q@q12345"
 * }
 *
 * @apiSuccess {String} message Sucess message.
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTPS 200 OK
 *  If username is email id:
 *  {
 *    "message": "Your account activation is pending. Please check your inbox or spam folder for activation email."
 *  }
 *  If username is mobile number :
 *  {
 *    "message": "Your account activation is pending. Please check your number for an otp to activate account."
 *  }
 */
router.post('/', ApiLimiter.NEW_USER, userController.createUserAccount);

/** DELETE REST APIs */

/**
 * @api {post} /api/v1/user/:user_id Delete a user account.
 * @apiName DeleteUserAccount
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiPermission Un-authenticated user
 *
 * @apiParam (Request body) {String} name User name.
 * @apiParam (Request body) {String} username Username can be email_id or mobile number.
 * @apiParam (Request body) {String} password Password
 * @apiParam (Request body) {String} confirm_password Confirm password
 *
 * @apiExample {js} Example usage:
 * const data = {
 *  "name": "James Bond",
 *  "username": "jamesbond@mailinator.com",
 *  "password": "Q@q12345",
 *  "confirm_password": "Q@q12345"
 * }
 *
 * @apiSuccessExample {json} Success response:
 *  HTTPS 201 OK
 *  {
 *    "message": "Account deleted successfully.",
 *  }
 *
 */
router.delete('/:user_id', ApiLimiter.DEFAULT, passport.authenticate(Constants.authType.JWT,
  { session: false }), userController.deleteUser);

export default router;
