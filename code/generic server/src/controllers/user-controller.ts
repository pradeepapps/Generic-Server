import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

  /**
   * Add a new user.
   * @param req Request object
   * @param res Response object
   */
  public addNewUser(req: Request, res: Response) {

    let newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  /**
   * Update user details.
   * @param req Request object
   * @param res Response object
   */
  public updateUser(req: Request, res: Response) {
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
    User.remove({ _id: req.params.user_id }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User deleted successfully!' });
    });
  }
}
