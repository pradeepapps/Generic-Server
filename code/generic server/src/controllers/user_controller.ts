/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : user_controller.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : User controller.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserSchema } from '../models/user';
import logger from '../diagnostic/logger';
import utility from '../shared/utility';
import { Constants } from '../shared';

const User = mongoose.model('User', UserSchema);

class UserController {

  /**
   * Create a new user account.
   * @param req Request object
   * @param res Response object
   */
  public createUserAccount(req: Request, res: Response) {

    logger.debug('In createUserAccount...');

    const query = User.where({ username: req.body.username });

    query.findOne((er, user) => {
      if (er) {
        logger.error(er);
        utility.sendResponse(res, Constants.statusCode.INTERNAL_SERVER_ERROR, {
          error: Constants.msg.SERVER_ERROR
        });
      } else if (user) {
        utility.sendResponse(res, Constants.statusCode.PRECONDITION_FAILED, {
          error: Constants.msg.ACCOUNT_ALREADY_EXIST
        });
      } else {
        // req.body.password = bcrypt.hashSync(req.body.password, 8);
        const newUser = new User(req.body);
        newUser.save((err, data) => {
          if (err) {
            logger.error(er);
            utility.sendResponse(res, Constants.statusCode.INTERNAL_SERVER_ERROR, {
              error: Constants.msg.SERVER_ERROR
            });
          } else {
            utility.sendResponse(res, Constants.statusCode.OK, {
              message: Constants.msg.CREATE_ACCOUNT_SUCCESS_EMAIL
            });
          }
        });
      }
    });
  }

  /**
   * Verify a user account.
   * @param req Request object
   * @param res Response object
   */
  public verifyUserAccount(req: Request, res: Response) {

    logger.debug('In verifyUserAccount...');

  }

  /**
   * Update user details.
   * @param req Request object
   * @param res Response object
   */
  public updateUser(req: Request, res: Response) {

    logger.debug('In updateUser...');

    User.findOneAndUpdate({ _id: req.params.user_id }, req.body, { new: true }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  /**
   * Get user details by user id.
   * @param req Request object
   * @param res Response object
   */
  public getUserWithID(req: Request, res: Response) {

    logger.debug('In getUserWithID...');

    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  /**
   * Get user list.
   * @param req Request object
   * @param res Response object
   */
  public getUsers(req: Request, res: Response) {

    logger.debug('In getUsers...');

    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  /**
   * Delete a user.
   * @param req Request object
   * @param res Response object
   */
  public deleteUser(req: Request, res: Response) {

    logger.debug('In deleteUser...');

    User.remove({ _id: req.params.user_id }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User deleted successfully!' });
    });
  }
}

export default new UserController();
